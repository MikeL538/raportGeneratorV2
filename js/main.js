import { generateRaport } from "./dom.js";
import { downloadPDF } from "./pdf.js";
import { showModal } from "./register.js";

const btnGenerate = document.querySelector("#btnGenerate");
const btnDownload = document.querySelector("#btnDownload");
const registerButton = document.querySelector("#registerButton");

// Initial raport generation on page load, listeners for buttons
document.addEventListener("DOMContentLoaded", () => {
  // DOM.js basic functions
  generateRaport();

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
});

// Register button modal show
registerButton.addEventListener("click", () => {
  showModal();
});

// Download in PDF button
btnDownload.addEventListener("click", async () => {
  try {
    await downloadPDF();
    // alert("PDF został pomyślnie wygenerowany");
  } catch (error) {
    alert("Błąd podczas generowania PDF:", error);
    console.log(error);
  }
});
