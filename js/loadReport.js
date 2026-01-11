import { generateSecondPart } from "./calculations.js";

const modalSaved = document.querySelector("[data-modal-loadReport]");

export function toggleSavedReportModal() {
  if (!modalSaved) return;
  modalSaved.classList.toggle("is-hidden");
}

const savedReports = document.querySelector("#savedReports");

// Create list item for saved report
function createListItem(report) {
  const li = document.createElement("li");

  const button = document.createElement("button");
  button.textContent = report.name;
  button.classList.add("btn");
  button.dataset.reportId = report.id;

  li.appendChild(button);
  return li;
}

// show saved reports in modal
export function showReports() {
  savedReports.innerHTML = "";
  fetch("./example.json")
    .then((res) => res.json())
    .then((data) => {
      console.log(data.reports);

      data.reports.forEach((report) => {
        savedReports.appendChild(createListItem(report));
      });
    });
}

savedReports.addEventListener("click", (e) => {
  const button = e.target.closest("button[data-report-id]");
  if (!button) return;

  const reportId = button.dataset.reportId;
  loadReport(reportId);
  toggleSavedReportModal();
});

function loadReport(reportId) {
  fetch("./example.json")
    .then((res) => res.json())
    .then((data) => {
      const report = data.reports.find((r) => r.id === reportId);
      if (!report) return;

      renderStudentsTable(report);
    });
}

// ============================

const tableBody = document.querySelector("#tableStudentsData");

function renderStudentsTable(report) {
  tableBody.innerHTML = "";

  report.students.forEach((student, index) => {
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
          value="${student.full_name}"
        />
      </td>
      <td class="students-table__max-points">${report.meta.max_points}</td>
      <td>
        <input
          class="students-table__points-input"
          type="number"
          value="${student.points}"
          min="0"
          max="${report.meta.max_points}"
        />
      </td>
      <td class="students-table__percentage">
        ${Math.round((student.points / report.meta.max_points) * 100)}%
      </td>
    `;

    tableBody.appendChild(tr);
  });
  renumarateStudents();
  generateSecondPart(report.meta.max_points);
}

//============= RENUMERATE STUDENTS================
function renumarateStudents() {
  const rows = tableStudentsData.querySelectorAll("tr");

  rows.forEach((row, i) => {
    row.querySelector(".students-table__number").textContent = i + 1;
    studentsAmountTargetCount.textContent = i + 1;
  });
}
