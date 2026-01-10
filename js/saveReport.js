export function saveReportModal() {}

(() => {
  const refs = {
    openModalBtn: document.querySelector("[data-modal-open-saveReport]"),
    closeModalBtn: document.querySelector("[data-modal-close-saveReport]"),
    modal: document.querySelector("[data-modal-saveReport]"),
  };

  // If not found - ignore, do nothing
  if (!refs.openModalBtn || !refs.closeModalBtn || !refs.modal) return;

  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle("is-hidden");
  }
})();
