import { generateRaport, initStudentsTableEventsWrapper } from "./dom.js";
import { downloadPDF } from "./pdf.js";
import { isLogged } from "./auth.js";
import { toggleRegisterModal, register } from "./register.js";
import { toggleLoginModal, login, logOut } from "./login.js";
import { saveReport } from "./saveReport.js";
import {
  toggleSavedReportModal,
  showReports,
  deleteReport,
} from "./loadReport.js";
import { toggleContactModal } from "./contact.js";

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
      
Możesz edytować tabelę bez utraty danych poprzez przyciski w tabeli.`,
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
  // Proposed name
  const defaultName =
    document.querySelector("#classTarget").textContent +
    " | " +
    document.querySelector("#dateTarget").textContent +
    " | " +
    document.querySelector("#levelTarget").textContent.trim();

  const reportName = prompt("Podaj nazwę raportu:", defaultName);
  if (!reportName) return;

  const studentsTableRows = [
    ...document.querySelectorAll("#tableStudentsData tr"),
  ];

  const maxPointsElement = document.querySelector(
    ".students-table__max-points",
  );
  const maxPoints = Number(maxPointsElement.textContent);

  saveReport(reportName, maxPoints, studentsTableRows);
});

// MODALS AND LOGOUTS
document.addEventListener("click", (e) => {
  // REGISTER
  if (e.target.closest("[data-modal-open-register]")) {
    toggleRegisterModal();
  }
  if (e.target.closest("[data-modal-close-register]")) {
    toggleRegisterModal();
  }
  // LOGIN
  if (e.target.closest("[data-modal-open-login]")) {
    toggleLoginModal();
  }
  if (e.target.closest("[data-modal-close-login]")) {
    toggleLoginModal();
  }
  // LOGOUT
  if (e.target.closest("[data-logout]")) {
    logOut();
  }
  // SAVED REPORTS
  if (e.target.closest("[data-modal-open-loadReport]")) {
    toggleSavedReportModal();
    showReports();
  }
  if (e.target.closest("[data-modal-close-loadReport]")) {
    toggleSavedReportModal();
  }
  // CONTACT
  if (e.target.closest("[data-modal-open-contact]")) {
    toggleContactModal();
  }
  if (e.target.closest("[data-modal-close-contact]")) {
    toggleContactModal();
  }
  if (e.target.classList.contains("btn-del")) {
    const btn = e.target.closest("[data-report-id]");
    const reportId = Number(btn.dataset.reportId);
    deleteReport(reportId);
  }
});
