import { generateSecondPart } from "./calculations.js";
import { supabase } from "./supabaseClient.js";

const savedReports = document.querySelector("#savedReports");
const tableBody = document.querySelector("#tableStudentsData");

export function toggleSavedReportModal() {
  const modalSaved = document.querySelector("[data-modal-loadReport]");
  if (!modalSaved) return;
  modalSaved.classList.toggle("is-hidden");
}

// ===============================================
// Create list item for saved report
function createListItem(report) {
  const li = document.createElement("li");

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = report.name;
  button.classList.add("btn");
  button.dataset.reportId = report.id;

  li.appendChild(button);
  return li;
}

function renderStudentsTable(studentsArray, maxPoints) {
  tableBody.innerHTML = "";

  studentsArray.forEach((student, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td class="students-table__delete-cell">
        <button class="students-table__btn students-table__btn--delete" aria-label="Usuń wiersz">
            <svg width="22" height="22" data-action="remove">
                <use href="./imgs/icons.svg#iconDelete" data-action="remove"></use>
            </svg>
        </button>
      </td>
      <td class="students-table__number">${index + 1}</td>
      <td>
        <input
          class="students-table__name"
          type="text"
          value="${student.name}"
        />
      </td>
      <td class="students-table__max-points">${maxPoints}</td>
      <td>
        <input
          class="students-table__points-input"
          type="number"
          value="${student.points}"
          min="0"
          max="${maxPoints}"
        />
      </td>
      <td class="students-table__percentage">
        ${Math.round((student.points / maxPoints) * 100)}%
      </td>
    `;

    tableBody.appendChild(tr);
  });
  renumarateStudents();
  generateSecondPart(maxPoints);
}

// show saved reports in modal
export async function showReports() {
  savedReports.innerHTML = "";

  const { data, error } = await supabase
    .from("reports")
    .select("id, name")
    .order("created_at", { ascending: false });
  // .select("*");

  if (error) {
    console.error(error);
    return;
  }

  data.forEach((report) => {
    savedReports.appendChild(createListItem(report));
  });
}

async function loadReport(reportId) {
  const { data, error } = await supabase
    .from("reports")
    .select("name, students")
    .eq("id", reportId)
    .single();

  if (error) {
    console.error(error);
    return;
  }

  // Check if it's already an object or needs parsing
  let studentsArray;
  if (typeof data.students === "string") {
    studentsArray = JSON.parse(data.students);
  } else if (Array.isArray(data.students)) {
    studentsArray = data.students;
  } else {
    console.error("Error: ", data.students);
    return;
  }

  const maxPoints = 50;

  renderStudentsTable(studentsArray, maxPoints);
}

// Chosen report load
savedReports.addEventListener("click", (e) => {
  const button = e.target.closest("button[data-report-id]");
  if (!button) return;

  const reportId = button.dataset.reportId;
  loadReport(reportId);
  toggleSavedReportModal();
});

// ============================

//============= RENUMERATE STUDENTS================
const studentsAmountTargetCount = document.querySelector(
  "#studentsAmountTargetCount"
);

function renumarateStudents() {
  const rows = tableBody.querySelectorAll("tr");

  rows.forEach((row, i) => {
    row.querySelector(".students-table__number").textContent = i + 1;
    studentsAmountTargetCount.textContent = i + 1;
  });
}
