import {
  generateRaport,
  publisherValue,
  otherPublisherInput,
  deleteStudent,
} from "./dom.js";
import { downloadPDF } from "./pdf.js";

const btnGenerate = document.querySelector("#btnGenerate");
const btnDownload = document.querySelector("#btnDownload");
const tdDeleteButtons = document.querySelectorAll(".tdDeleteButton");

document.addEventListener("DOMContentLoaded", (s) => {
  generateRaport(s);
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
