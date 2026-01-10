import { generateRaport, initStudentsTableEventsWrapper } from "./dom.js";
import { downloadPDF } from "./pdf.js";
import { isLogged } from "./auth.js";
import { toggleRegisterModal, register } from "./register.js";
import { toggleLoginModal, login, logOut } from "./login.js";
import { toggleReportModal, toggleSavedReportModal } from "./saveReport.js";
// import { toggleRegisterModal } from "./saveReport.js";
// ====

const btnGenerate = document.querySelector("#btnGenerate");
const btnDownload = document.querySelector("#btnDownload");
const btnDownloadBottom = document.querySelector("#btnDownloadBottom");
// const headerContainerRightList = document.querySelector(".header__nav-list");

// Initial raport generation on page load, listeners for buttons
document.addEventListener("DOMContentLoaded", () => {
  isLogged();
  register();
  login();
  generateRaport();
  initStudentsTableEventsWrapper();
});

// Generate raport button
btnGenerate.addEventListener("click", () => {
  const proceed = confirm(
    `WSZYSTKIE DANE W TABELI ZOSTANĄ USUNIĘTE.
Czy na pewno chcesz kontynuować? 
      
Możesz edytować tabelę bez utraty danych poprzez przyciski w tabeli.`
  );
  if (!proceed) return;

  generateRaport();
});

// Download in PDF button
btnDownload.addEventListener("click", async () => {
  try {
    await downloadPDF();
  } catch (error) {
    alert("Błąd podczas generowania PDF:", error);
    console.log(error);
  }
});

// Download in PDF mobile button
btnDownloadBottom.addEventListener("click", async () => {
  try {
    await downloadPDF();
  } catch (error) {
    alert("Błąd podczas generowania PDF:", error);
    console.log(error);
  }
});

// MODALS AND LOGOUTS
document.addEventListener("click", (e) => {
  if (e.target.closest("[data-modal-open-register]")) {
    toggleRegisterModal();
  }
  if (e.target.closest("[data-modal-close-register]")) {
    toggleRegisterModal();
  }
  if (e.target.closest("[data-modal-open-login]")) {
    toggleLoginModal();
  }
  if (e.target.closest("[data-modal-close-login]")) {
    toggleLoginModal();
  }
  if (e.target.closest("[data-logout]")) {
    logOut();
  }
  if (e.target.closest("[data-modal-open-saveReport]")) {
    toggleReportModal();
  }
  if (e.target.closest("[data-modal-close-saveReport]")) {
    toggleReportModal();
  }
  if (e.target.closest("[data-modal-open-loadReport]")) {
    toggleSavedReportModal();
  }
  if (e.target.closest("[data-modal-close-loadReport]")) {
    toggleSavedReportModal();
  }
});

// =============

import { saveReport } from "./saveReport.js";

const btnSaveReport = document.querySelector("#btnSaveReport");

btnSaveReport.addEventListener("click", () => {
  const reportName = prompt("Podaj nazwę raportu:");
  if (!reportName) return;

  const studentsTableRows = [
    ...document.querySelectorAll("#tableStudentsData tr"),
  ];
  saveReport(reportName, studentsTableRows);
});
