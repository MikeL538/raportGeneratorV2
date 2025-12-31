import {
  generateRaport,
  // deleteStudent,
  // addStudent,
  // setPublisher,
} from "./dom.js";
import { downloadPDF } from "./pdf.js";

const btnGenerate = document.querySelector("#btnGenerate");
const btnDownload = document.querySelector("#btnDownload");

// Initial raport generation on page load, listeners for buttons
document.addEventListener("DOMContentLoaded", () => {
  // DOM.js basic functions
  generateRaport();
  // addStudent();
  // deleteStudent();

  // Generate raport button
  btnGenerate.addEventListener("click", () => {
    // Alert about deleting previous data in the students table
    const proceed = confirm(
      `WSZYSTKIE DANE W TABELI ZOSTANĄ USUNIĘTE.
Czy na pewno chcesz kontynuować? 
      
Możesz edytować tabelę bez utraty danych poprzez przyciski w tabeli.`
    );
    if (!proceed) {
      return;
    }

    generateRaport();
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
});
