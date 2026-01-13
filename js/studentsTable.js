import { generateSecondPart } from "./calculations.js";

const tableStudentsData = document.querySelector("#tableStudentsData");
const maxPointsValue = document.querySelector("#maxPointsValue");
let studentsAmountTargetCount = document.querySelector(
  "#studentsAmountTargetCount"
);

// DELETE BUTTON CELL
function createDeleteCell() {
  const td = document.createElement("td");
  td.classList.add("students-table__delete-cell");

  td.innerHTML = `
    <button class="students-table__btn students-table__btn--delete" aria-label="Usuń wiersz">
      <svg width="22" height="22" data-action="remove">
        <use href="./imgs/icons.svg#iconDelete" data-action="remove"></use>
      </svg>
    </button>
  `;

  return td;
}

// NUMBER CELL
function createNumberCell() {
  const td = document.createElement("td");
  td.classList.add("students-table__number");
  td.textContent = 1;
  return td;
}

// NAME CELL
function createNameCell() {
  const td = document.createElement("td");
  const input = document.createElement("input");

  input.placeholder = "Imię i nazwisko";
  input.classList.add("students-table__name");
  input.type = "text";

  td.appendChild(input);
  return td;
}

// MAX POINTS CELL
function createMaxPointsCell() {
  const td = document.createElement("td");
  td.textContent = maxPointsValue.value;
  td.classList.add("students-table__max-points");
  return td;
}

// PERCENTAGE CALCULATION
function calculatePercentage(input) {
  input.addEventListener("input", () => {
    const max = Number(maxPointsValue.value);
    const value = Math.min(Number(input.value) || 0, max);

    input.value = value;

    const row = input.closest("tr");
    const tdPercentage = row.querySelector(".students-table__percentage");

    tdPercentage.textContent = `${((value / max) * 100 || 0).toFixed(0)}%`;

    // generateSecondPart(max);
  });
}

// SCORED POINTS CELL
function createScoredPointsCell() {
  const td = document.createElement("td");
  const input = document.createElement("input");

  input.classList.add("students-table__points-input");
  input.placeholder = "0";
  input.type = "number";
  input.min = "0";
  input.step = "1";

  input.addEventListener("input", () => {
    calculatePercentage(input);
    const max = maxPointsValue.value;
    generateSecondPart(max);
  });

  td.appendChild(input);
  return td;
}

// PERCENTAGE CELL
function createPercentageCell() {
  const td = document.createElement("td");
  td.classList.add("students-table__percentage");
  td.textContent = "0%";
  return td;
}

// RENUMERATE STUDENTS
function renumarateStudents() {
  const rows = tableStudentsData.querySelectorAll("tr");

  rows.forEach((row, i) => {
    row.querySelector(".students-table__number").textContent = i + 1;
    studentsAmountTargetCount.textContent = i + 1;
  });
}

// DELETE ROW
function removeStudentRow(target) {
  const removeBtn = target.closest('[data-action="remove"]');
  if (!removeBtn) return;

  removeBtn.closest("tr").remove();
  renumarateStudents();
  generateSecondPart(maxPointsValue.value);
}

export function initStudentsTableEvents() {
  tableStudentsData.addEventListener("click", (e) => {
    removeStudentRow(e.target);
  });
}

// GENERATE ROW
export function studentsTableGenerator() {
  const tr = document.createElement("tr");

  tr.appendChild(createDeleteCell());
  tr.appendChild(createNumberCell());
  tr.appendChild(createNameCell());
  tr.appendChild(createMaxPointsCell());
  tr.appendChild(createScoredPointsCell());
  tr.appendChild(createPercentageCell());

  tableStudentsData.appendChild(tr);
  renumarateStudents();
  generateSecondPart(maxPointsValue.value);
}
