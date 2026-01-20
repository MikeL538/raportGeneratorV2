import { supabase } from "./supabaseClient.js";

function renderNav(isLoggedIn) {
  const nav = document.querySelector(".header__nav-list");
  const savedReportsButton = document.querySelector(".form__logged");

  nav.innerHTML = "";

  if (isLoggedIn) {
    nav.innerHTML = `
      <li><button id="savedReports" data-modal-open-loadReport>Zapisane raporty</button></li>
      <li><button id="btnContact" data-modal-open-contact>Kontakt</button></li>
      <li><button class="logOutButton" data-logout>Wyloguj</button></li>
    `;
    savedReportsButton.style.display = "flex";
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
        <button id="btnContact" class="header__nav-button" type="button" data-modal-open-contact>
          Kontakt
        </button>
      </li>
    `;
    savedReportsButton.style.display = "none";
  }
}

export async function isLogged() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  renderNav(!!session);
}

export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) return null;
  return user;
}
