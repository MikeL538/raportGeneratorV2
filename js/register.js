import { supabase } from "./supabaseClient.js";

const modal = document.querySelector("[data-modal-register]");
const btnRegister = document.querySelector("#modelBtnRegister");

export function toggleRegisterModal() {
  if (!modal) return;
  modal.classList.toggle("is-hidden");
}

export function register() {
  if (!btnRegister) return;

  btnRegister.addEventListener("click", async () => {
    const email = document.querySelector("#modalRegisterEmail").value;
    const password = document.querySelector("#modalRegisterPassword").value;
    const passRepeat = document.querySelector(
      "#modalRegisterPasswordRepeat"
    ).value;
    const msg = document.querySelector("#modalRegisterMessage");

    msg.textContent = "";

    if (password !== passRepeat) {
      msg.textContent = "Hasła są różne";
      msg.style.color = "red";
      return;
    }

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      msg.textContent = error.message;
      msg.style.color = "red";
      return;
    }

    msg.textContent = "Sprawdź email w celu potwierdzenia konta";
    msg.style.color = "green";
  });
}
