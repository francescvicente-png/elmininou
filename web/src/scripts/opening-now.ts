// Opening status — "Open now / Closed" badge controller.
//
// Reads the config serialised by OpeningHours.astro into a JSON
// `data-opening-config` attribute (hours table + i18n templates +
// translated day names) and computes one of three states based on the
// visitor's local clock:
//
//   - 'open'         — currently inside an open slot today.
//                      Shows: "Obert ara · tanca a les 14:00"
//   - 'opens-later'  — closed right now but the same day still has
//                      a future slot.
//                      Shows: "Tancat ara · obrim a les 16:00"
//   - 'closed'       — closed today; finds the next opening day.
//                      Shows: "Tancat avui · obrim dimarts a les 9:00"
//
// The state is written as `data-opening-state` on the badge element;
// the CSS in OpeningHours.astro flips visibility and colours based on
// that attribute. Without JS the badge stays display:none and the
// visitor only sees the regular hours table — graceful degradation.
//
// Recalculated every 60 seconds so a visitor who keeps the page open
// across a slot boundary (e.g. opens at 13:55, reads at 14:01) sees
// the badge update without a refresh. Cap is 60s rather than the
// "minutes until next event" because the cost is one cheap function
// call per minute and freshness is more valuable than the saving.
//
// Timezone caveat: we rely on the visitor's local clock. For a local
// business in L'Ametlla del Vallès this is fine (almost all visitors are in
// CET). If a visitor in another timezone reads the page, they'll see
// a status that reflects their own clock — also acceptable because
// the schedule is stored in local Spanish time and any visitor who
// genuinely wants to call/visit needs to think in CET anyway.

type DayKey =
	| 'monday'
	| 'tuesday'
	| 'wednesday'
	| 'thursday'
	| 'friday'
	| 'saturday'
	| 'sunday';

type Slot = readonly [string, string];

interface OpeningConfig {
	hours: Record<DayKey, ReadonlyArray<Slot> | null>;
	i18n: {
		open: string;
		closesAt: string;
		closedNow: string;
		opensAt: string;
		closedToday: string;
		opensOn: string;
	};
	days: Record<DayKey, string>;
}

type Status =
	| { state: 'open'; closeAt: string }
	| { state: 'opens-later'; openAt: string }
	| { state: 'closed'; nextOpenDay: DayKey; nextOpenAt: string };

// JS Date.getDay() returns 0=Sunday … 6=Saturday. Mirror that index.
const dayKeyByJsDay: ReadonlyArray<DayKey> = [
	'sunday',
	'monday',
	'tuesday',
	'wednesday',
	'thursday',
	'friday',
	'saturday',
];

function parseTime(hhmm: string): number {
	const [h, m] = hhmm.split(':').map(Number);
	return (h ?? 0) * 60 + (m ?? 0);
}

function computeStatus(
	now: Date,
	hours: OpeningConfig['hours'],
): Status {
	const todayJsDay = now.getDay();
	const todayKey = dayKeyByJsDay[todayJsDay] ?? 'monday';
	const todaySlots = hours[todayKey];
	const nowMins = now.getHours() * 60 + now.getMinutes();

	if (todaySlots && todaySlots.length > 0) {
		// Currently inside any slot?
		for (const [from, to] of todaySlots) {
			const start = parseTime(from);
			const end = parseTime(to);
			if (nowMins >= start && nowMins < end) {
				return { state: 'open', closeAt: to };
			}
		}
		// Not in any slot but today still has slots ahead?
		for (const [from] of todaySlots) {
			if (parseTime(from) > nowMins) {
				return { state: 'opens-later', openAt: from };
			}
		}
		// Already past the last slot today — fall through to "closed".
	}

	// Find the next day with at least one slot.
	for (let ahead = 1; ahead <= 7; ahead++) {
		const nextJsDay = (todayJsDay + ahead) % 7;
		const nextKey = dayKeyByJsDay[nextJsDay] ?? 'monday';
		const nextSlots = hours[nextKey];
		if (nextSlots && nextSlots.length > 0) {
			return {
				state: 'closed',
				nextOpenDay: nextKey,
				nextOpenAt: nextSlots[0][0],
			};
		}
	}

	// Defensive fallback — shouldn't be reached because the shop opens
	// at least one day per week. Keeps the type-system honest.
	return { state: 'closed', nextOpenDay: 'monday', nextOpenAt: '09:00' };
}

function renderText(status: Status, config: OpeningConfig): string {
	switch (status.state) {
		case 'open': {
			const tail = config.i18n.closesAt.replace('{time}', status.closeAt);
			return `${config.i18n.open} · ${tail}`;
		}
		case 'opens-later': {
			const tail = config.i18n.opensAt.replace('{time}', status.openAt);
			return `${config.i18n.closedNow} · ${tail}`;
		}
		case 'closed': {
			const dayName = config.days[status.nextOpenDay];
			const tail = config.i18n.opensOn
				.replace('{day}', dayName)
				.replace('{time}', status.nextOpenAt);
			return `${config.i18n.closedToday} · ${tail}`;
		}
	}
}

let timerId: number | null = null;

function clearTimer() {
	if (timerId !== null) {
		window.clearTimeout(timerId);
		timerId = null;
	}
}

function update() {
	const el = document.querySelector<HTMLElement>('[data-opening-status]');
	if (!el) {
		// The OpeningHours component isn't on this page; release the
		// timer and bail. Will re-mount on the next page-load.
		clearTimer();
		return;
	}

	let config: OpeningConfig;
	try {
		const raw = el.getAttribute('data-opening-config');
		if (!raw) return;
		config = JSON.parse(raw) as OpeningConfig;
	} catch {
		// Malformed JSON would be a build-time bug; fail silently in
		// prod rather than spam the console. The badge stays hidden.
		return;
	}

	const status = computeStatus(new Date(), config.hours);
	el.dataset.openingState = status.state;

	const text = el.querySelector<HTMLElement>('.opening-status-text');
	if (text) text.textContent = renderText(status, config);

	// Recalculate every minute so the badge tracks slot transitions
	// (e.g. switches from "Obert · tanca a les 14:00" to "Tancat · obrim
	// a les 16:00" when 14:00 passes). Cleared and re-armed on page-load
	// so we don't pile up overlapping timers across SPA navigations.
	clearTimer();
	timerId = window.setTimeout(update, 60_000);
}

if (typeof document !== 'undefined') {
	update();
	document.addEventListener('astro:page-load', update);
	// View Transitions destroy the previous DOM; clear the timer so we
	// don't keep poking a detached element until the next minute fires.
	document.addEventListener('astro:before-swap', clearTimer);
}
