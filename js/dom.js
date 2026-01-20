import {
  studentsTableGenerator,
  initStudentsTableEvents,
} from "./studentsTable.js";

// ADD STUDENT BUTTON
const thAddStudentBtn = document.querySelector(".students-table__btn--add");
export const publisherValue = document.querySelector("#publisherValue");
publisherValue.value = "Operon";
const maxStudentsAmount = 150;

maxPointsValue.value = 50;

//====== Setters for table 1 =======

// Publisher setter
function setPublisher() {
  const publisherValueInput = document.querySelector("#publisherValueInput");
  const publisherTarget = document.querySelector("#publisherTarget");

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
  const dateTarget = document.querySelector("#dateTarget");

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
        "DD.MM.YYYY",
      )}`;
    },
  );
}

// Class setter
function setClass() {
  const classValue = document.querySelector("#classValue");
  const classTarget = document.querySelector("#classTarget");

  classValue.value = "4A";
  classValue.addEventListener("input", () => {
    classTarget.textContent = classValue.value;
  });
}

// Subject setter
function setSubject() {
  const subjectValue = document.querySelector("#subjectValue");
  const subjectTarget = document.querySelector("#subjectTarget");

  subjectValue.value = "informatyki";
  subjectValue.addEventListener("input", () => {
    subjectTarget.textContent = subjectValue.value;
  });
}

// Level setter
function setLevel() {
  const levelValue = document.querySelector("#levelValue");
  const levelTarget = document.querySelector("#levelTarget");

  levelValue.value = "rozszerzony";
  levelValue.addEventListener("change", () => {
    levelTarget.textContent = levelValue.value;
  });
}

// Max points setter
function setMaxPoints() {
  let maxPointsTarget = 50;

  maxPointsValue.addEventListener("input", () => {
    maxPointsTarget = maxPointsValue.value;

    const tdMaxPoints = document.querySelectorAll(
      ".students-table__max-points",
    );

    tdMaxPoints.forEach((e) => {
      e.textContent = maxPointsValue.value;
    });
  });
}

// Generate whole report
export function generateRaport() {
  const studentsAmountValue = document.querySelector("#studentsAmountValue");
  const tableStudentsData = document.querySelector("#tableStudentsData");
  console.log(studentsAmountValue.textContent);

  if (studentsAmountValue.value === "") {
    studentsAmountValue.value = 3;
  }

  setPublisher();
  setDate();
  setClass();
  setSubject();
  setLevel();
  setMaxPoints();

  if (studentsAmountValue.value > maxStudentsAmount) {
    studentsAmountValue.value = maxStudentsAmount;
  }

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
