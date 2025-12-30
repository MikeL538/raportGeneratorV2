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

document.addEventListener("DOMContentLoaded", () => {
  generateRaport();
  addStudent();
  deleteStudent();
});

publisherValue.addEventListener("change", () => {
  otherPublisherInput();
});

btnGenerate.addEventListener("click", (s) => {
  generateRaport(s);
});

btnDownload.addEventListener("click", async () => {
  try {
    await downloadPDF();
    alert("PDF został pomyślnie wygenerowany");
  } catch (error) {
    alert("Błąd podczas generowania PDF:", error);
  }
});
