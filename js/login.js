import { supabase } from "./supabaseClient.js";
import { isLogged } from "./auth.js";
import { showReports } from "./loadReport.js";

const modal = document.querySelector("[data-modal-login]");
const btnLogin = document.querySelector("#modalBtnLogin");

export function toggleLoginModal() {
  if (!modal) return;
  modal.classList.toggle("is-hidden");
}

export function login() {
  if (!btnLogin) return;

  btnLogin.addEventListener("click", async () => {
    const email = document.querySelector("#modalLoginEmail").value;
    const password = document.querySelector("#modalLoginPassword").value;
    const msg = document.querySelector("#modalLoginMessage");

    msg.textContent = "";

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      msg.textContent = error.message;
      return;
    }

    await isLogged();
    toggleLoginModal();
    showReports();
  });
}

export async function logOut() {
  await supabase.auth.signOut();
  await isLogged();
}
