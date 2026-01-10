import { supabase } from "./supabaseClient.js";

function renderNav(isLoggedIn) {
  const nav = document.querySelector(".header__nav-list");
  const formLeftDivLogged = document.querySelector(".form__logged");

  nav.innerHTML = "";

  if (isLoggedIn) {
    nav.innerHTML = `
      <li><button id="savedReports" data-modal-open-loadReport>Zapisane raporty</button></li>
      <li><button id="contact">Kontakt</button></li>
      <li><button class="logOutButton" data-logout>Wyloguj</button></li>
    `;
    formLeftDivLogged.style.display = "flex";
  } else {
    nav.innerHTML = `
      <li>
        <button class="logInButton header__nav-button" type="button" data-modal-open-login>
          Zaloguj
        </button>
      </li>
      <li>
        <button id="registerButton" class="header__nav-button" type="button" data-modal-open-register>
          Rejestracja
        </button>
      </li>
      <li>
        <button class="header__nav-button" type="button">
          Kontakt
        </button>
      </li>
    `;
    formLeftDivLogged.style.display = "none";
  }
}

export async function isLogged() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  renderNav(!!session);
}

// ======

export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) return null;
  return user;
}
