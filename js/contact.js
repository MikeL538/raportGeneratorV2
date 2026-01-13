export function toggleContactModal() {
  // const btnContact = document.querySelector("#btnContact");

  // btnContact.addEventListener("click", (e) => {
  //   e.preventDefault();

  const modal = document.querySelector("[data-modal-contact]");
  if (!modal) return;
  modal.classList.toggle("is-hidden");
  // });
}
