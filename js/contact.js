export function toggleContactModal() {
  const modal = document.querySelector("[data-modal-contact]");
  if (!modal) return;
  modal.classList.toggle("is-hidden");
  // });
}
