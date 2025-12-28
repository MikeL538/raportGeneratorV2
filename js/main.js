import {
  generateRaport,
  createRow,
  publisherValue,
  otherPublisherInput,
} from "./dom.js";
import { downloadPDF } from "./pdf.js";

const btnGenerate = document.querySelector("#btnGenerate");
const btnDownload = document.querySelector("#btnDownload");

document.addEventListener("DOMContentLoaded", () => {
  createRow();
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
