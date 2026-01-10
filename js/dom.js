import {
  studentsTableGenerator,
  initStudentsTableEvents,
} from "./studentsTable.js";

// ADD STUDENT BUTTON
const thAddStudentBtn = document.querySelector(".students-table__btn--add");

// Input elements for first part report details
export const publisherValue = document.querySelector("#publisherValue");
const publisherValueInput = document.querySelector("#publisherValueInput");
const dateValue = document.querySelector("#dateValue");
const classValue = document.querySelector("#classValue");
const levelValue = document.querySelector("#levelValue");
const subjectValue = document.querySelector("#subjectValue");
const studentsAmountValue = document.querySelector("#studentsAmountValue");
const maxStudentsAmount = 150;

// Target elements for first part report details
const publisherTarget = document.querySelector("#publisherTarget");
const dateTarget = document.querySelector("#dateTarget");
const classTarget = document.querySelector("#classTarget");
const levelTarget = document.querySelector("#levelTarget");
const subjectTarget = document.querySelector("#subjectTarget");
let maxPointsTarget = 50;

// Setting start values on load up
publisherValue.value = "Operon";
dateValue.value = "29.12.2025 - 31.12.2025";
classValue.value = "4A";
subjectValue.value = "informatyki";
levelValue.value = "rozszerzony";
studentsAmountValue.value = 15;
maxPointsValue.value = 50;

//====== Setters for table 1 =======

// Publisher setter
function setPublisher() {
  publisherValue.addEventListener("change", () => {
    if (publisherValue.value === "Inne, wprowadź") {
      publisherValueInput.style.display = "block";
      publisherValueInput.addEventListener("input", () => {
        publisherTarget.textContent = publisherValueInput.value;
      });
    } else {
      publisherValueInput.style.display = "none";
      publisherTarget.textContent = publisherValue.value;
    }
  });
}

// Date range picker
function setDate() {
  $('input[name="daterange"]').daterangepicker(
    {
      locale: {
        format: "DD.MM.YYYY",
        separator: " - ",
        applyLabel: "Zastosuj",
        cancelLabel: "Anuluj",
        fromLabel: "Od",
        toLabel: "Do",
        customRangeLabel: "Własny",
        weekLabel: "T",
        daysOfWeek: ["Nd", "Pn", "Wt", "Śr", "Cz", "Pt", "So"],
        monthNames: [
          "Styczeń",
          "Luty",
          "Marzec",
          "Kwiecień",
          "Maj",
          "Czerwiec",
          "Lipiec",
          "Sierpień",
          "Wrzesień",
          "Październik",
          "Listopad",
          "Grudzień",
        ],
        firstDay: 1,
      },
      opens: "left",
    },
    function (start, end) {
      dateTarget.textContent = `${start.format("DD.MM.YYYY")} - ${end.format(
        "DD.MM.YYYY"
      )}`;
    }
  );
}

// Class setter
function setClass() {
  classValue.addEventListener("input", () => {
    classTarget.textContent = classValue.value;
  });
}

// Subject setter
function setSubject() {
  subjectValue.addEventListener("input", () => {
    subjectTarget.textContent = subjectValue.value;
  });
}

// Level setter
function setLevel() {
  levelValue.addEventListener("change", () => {
    levelTarget.textContent = levelValue.value;
  });
}

// Max points setter
function setMaxPoints() {
  maxPointsValue.addEventListener("input", () => {
    maxPointsTarget = maxPointsValue.value;

    const tdMaxPoints = document.querySelectorAll(
      ".students-table__max-points"
    );

    tdMaxPoints.forEach((e) => {
      e.textContent = maxPointsValue.value;
    });
  });
}

// Generate whole report
export function generateRaport() {
  setPublisher();
  setDate();
  setClass();
  setSubject();
  setLevel();
  setMaxPoints();

  if (studentsAmountValue.value > maxStudentsAmount) {
    studentsAmountValue.value = maxStudentsAmount;
  }

  const tableStudentsData = document.querySelector("#tableStudentsData");
  tableStudentsData.innerHTML = "";

  for (let i = 0; i < studentsAmountValue.value; i++) {
    studentsTableGenerator();
  }
}

// Init table events
export function initStudentsTableEventsWrapper() {
  thAddStudentBtn.addEventListener("click", studentsTableGenerator);
  initStudentsTableEvents();
}
