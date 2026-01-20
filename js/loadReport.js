import { generateSecondPart } from "./calculations.js";
import { supabase } from "./supabaseClient.js";

const savedReports = document.querySelector("#savedReportsList");
const tableBody = document.querySelector("#tableStudentsData");
const reportSearch = document.querySelector("#reportSearch");

export function toggleSavedReportModal() {
  const modalSaved = document.querySelector("[data-modal-loadReport]");
  if (!modalSaved) return;
  modalSaved.classList.toggle("is-hidden");
}

// show saved reports in modal
export async function showReports() {
  savedReports.innerHTML = "";

  const { data, error } = await supabase
    .from("reports")
    .select("id, name")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  data.forEach((report) => {
    savedReports.appendChild(createListItem(report));
  });
}

// Create buttons for reports with name
function createListItem(report) {
  const li = document.createElement("li");
  li.classList.add("report-loaded");
  li.dataset.reportId = report.id;

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = report.name;
  button.classList.add("btn");
  button.dataset.reportId = report.id;

  const buttonDel = document.createElement("button");
  buttonDel.type = "button";
  buttonDel.textContent = "Usuń";

  buttonDel.classList.add("btn-del");
  li.appendChild(button);
  li.appendChild(buttonDel);

  return li;
}

function renderStudentsTable(studentsArray, maxPointsData) {
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
      <td class="students-table__max-points">${maxPointsData}</td>
      <td>
        <input
          class="students-table__points-input"
          type="number"
          value="${student.points}"
          min="0"
          max="${maxPointsData}"
        />
      </td>
      <td class="students-table__percentage">
        ${Math.round((student.points / maxPointsData) * 100)}%
      </td>
    `;

    tableBody.appendChild(tr);
  });
  tableInputListeners(maxPointsData);

  renumarateStudents();
  generateSecondPart(maxPointsData);
}

function tableInputListeners(maxPointsData) {
  const pointsInputs = tableBody.querySelectorAll(
    ".students-table__points-input",
  );

  pointsInputs.forEach((input) => {
    input.addEventListener("input", () => {
      const value = Math.min(Number(input.value) || 0, maxPointsData);
      input.value = value;

      const row = input.closest("tr");
      const tdPercentage = row.querySelector(".students-table__percentage");
      tdPercentage.textContent = `${(
        (value / maxPointsData) * 100 || 0
      ).toFixed(0)}%`;

      generateSecondPart(maxPointsData);
    });
  });
}

async function loadReport(reportId) {
  const { data, error } = await supabase
    .from("reports")
    .select("name, max_points, students, headers, analysis")
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

  const maxPointsData = data.max_points;

  renderStudentsTable(studentsArray, maxPointsData);
  injectHeaders(data);
  injectAnalysis(data);
}

function injectHeaders(data) {
  const publisher = document.querySelector("#publisherTarget");
  const date = document.querySelector("#dateTarget");
  const grade = document.querySelector("#classTarget");
  const subject = document.querySelector("#subjectTarget");
  const level = document.querySelector("#levelTarget");

  publisher.textContent = data.headers.publisher;
  date.textContent = data.headers.date;
  grade.textContent = data.headers.class;
  subject.textContent = data.headers.subject;
  level.textContent = data.headers.level;
}

function injectAnalysis(data) {
  const very_easy = document.querySelector("#taskVeryEasy");
  const easy = document.querySelector("#taskEasy");
  const medium = document.querySelector("#taskMedium");
  const hard = document.querySelector("#taskHard");
  const very_hard = document.querySelector("#taskVeryHard");
  const analysisEasy = document.querySelector("#analysisEasy");
  const analysisHard = document.querySelector("#analysisHard");
  const author = document.querySelector("#reportPreparedBy");

  very_easy.value = data.analysis.difficulty.very_easy;
  easy.value = data.analysis.difficulty.easy;
  medium.value = data.analysis.difficulty.medium;
  hard.value = data.analysis.difficulty.hard;
  very_hard.value = data.analysis.difficulty.very_hard;
  analysisEasy.value = data.analysis.analysisEasy;
  analysisHard.value = data.analysis.analysisHard;
  author.value = data.analysis.author;
}

export async function deleteReport(reportId) {
  const { error } = await supabase.from("reports").delete().eq("id", reportId);

  if (error) {
    console.error(error);
    alert("Błąd podczas usuwania");
    return false;
  }
  showReports();
  return true;
}

// Chosen report load
savedReports.addEventListener("click", (e) => {
  const button = e.target.closest("button[data-report-id]");
  if (!button) return;

  const reportId = button.dataset.reportId;
  loadReport(reportId);
  toggleSavedReportModal();
});

// Reports search filter
reportSearch.addEventListener("input", () => {
  const query = reportSearch.value.toLowerCase();
  const items = document.querySelectorAll(".report-loaded");

  items.forEach((li) => {
    const button = li.querySelector("button[data-report-id]");
    const text = button.textContent.toLowerCase();

    li.style.display = text.includes(query) ? "" : "none";
  });
});

//============= RENUMERATE STUDENTS================
const studentsAmountTargetCount = document.querySelector(
  "#studentsAmountTargetCount",
);

function renumarateStudents() {
  const rows = tableBody.querySelectorAll("tr");

  rows.forEach((row, i) => {
    row.querySelector(".students-table__number").textContent = i + 1;
    studentsAmountTargetCount.textContent = i + 1;
  });
}
