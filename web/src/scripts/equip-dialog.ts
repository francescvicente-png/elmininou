/**
 * Opens team profile <dialog> modals when the user clicks the photo trigger.
 * Clicking the dimmed backdrop (event target is the <dialog> itself) closes the
 * modal, same UX as the close button. Re-binds on astro:page-load for
 * View Transitions.
 */
function bindEquipProfileDialogs(): void {
	document.querySelectorAll<HTMLButtonElement>('[data-equip-profile-open]').forEach((button) => {
		if (button.dataset.bound === 'true') return;
		button.dataset.bound = 'true';
		button.addEventListener('click', () => {
			const id = button.getAttribute('aria-controls');
			if (!id) return;
			const dialog = document.getElementById(id);
			if (dialog instanceof HTMLDialogElement) {
				dialog.showModal();
			}
		});
	});

	document.querySelectorAll<HTMLDialogElement>('.equip-profile-dialog').forEach((dialog) => {
		if (dialog.dataset.boundDismiss === 'true') return;
		dialog.dataset.boundDismiss = 'true';

		dialog.addEventListener('click', (event) => {
			if (event.target === dialog) {
				dialog.close();
			}
		});
	});
}

bindEquipProfileDialogs();
document.addEventListener('astro:page-load', bindEquipProfileDialogs);
