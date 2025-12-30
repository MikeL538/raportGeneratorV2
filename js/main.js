import {
  generateRaport,
  publisherValue,
  otherPublisherInput,
  deleteStudent,
  addStudent,
} from "./dom.js";
import { downloadPDF } from "./pdf.js";

const btnGenerate = document.querySelector("#btnGenerate");
const btnDownload = document.querySelector("#btnDownload");

// Initial raport generation on page load, listeners for buttons
document.addEventListener("DOMContentLoaded", () => {
  generateRaport();
  addStudent();
  deleteStudent();
});

// If other Publisher than one from the list is needed
publisherValue.addEventListener("change", () => {
  otherPublisherInput();
});

// Generate raport button
btnGenerate.addEventListener("click", (s) => {
  generateRaport(s);
});

// Download in PDF button
btnDownload.addEventListener("click", async () => {
  try {
    await downloadPDF();
    alert("PDF został pomyślnie wygenerowany");
  } catch (error) {
    alert("Błąd podczas generowania PDF:", error);
  }
});
