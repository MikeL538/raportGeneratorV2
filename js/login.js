import { supabase } from "./supabaseClient.js";
import { isLogged } from "./auth.js";
import { showReports } from "./loadReport.js";

export function toggleLoginModal() {
  const modal = document.querySelector("[data-modal-login]");
  if (!modal) return;
  modal.classList.toggle("is-hidden");
}

export function login(e) {
  const btnLogin = document.querySelector("#modalBtnLogin");
  if (!btnLogin) return;

  btnLogin.addEventListener("click", async (e) => {
    e.preventDefault();
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
      msg.style.color = "red";
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
