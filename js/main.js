import { generateRaport, initStudentsTableEventsWrapper } from "./dom.js";
import { downloadPDF } from "./pdf.js";
import { isLogged } from "./auth.js";
import { toggleRegisterModal, register } from "./register.js";
import { toggleLoginModal, login, logOut } from "./login.js";
import { saveReport } from "./saveReport.js";
import { toggleSavedReportModal, showReports } from "./loadReport.js";

const btnGenerate = document.querySelector("#btnGenerate");
const btnDownload = document.querySelector("#btnDownload");
const btnDownloadBottom = document.querySelector("#btnDownloadBottom");
const btnSaveReport = document.querySelector("#btnSaveReport");

// Initial raport generation on page load, listeners for buttons
document.addEventListener("DOMContentLoaded", () => {
  isLogged();
  register();
  login();
  generateRaport();
  initStudentsTableEventsWrapper();
  showReports();
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

// Report save button
btnSaveReport.addEventListener("click", () => {
  const reportName = prompt("Podaj nazwę raportu:");
  if (!reportName) return;

  const studentsTableRows = [
    ...document.querySelectorAll("#tableStudentsData tr"),
  ];
  saveReport(reportName, studentsTableRows);
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
  if (e.target.closest("[data-modal-open-loadReport]")) {
    toggleSavedReportModal();
    showReports();
  }
  if (e.target.closest("[data-modal-close-loadReport]")) {
    toggleSavedReportModal();
  }
  // if (e.target.hasAttribute("[data-modal-open-load-report]")) {
  //   showReports();
  // }
});
