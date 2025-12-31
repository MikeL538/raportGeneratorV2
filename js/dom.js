import { generateSecondPart } from "./calculations.js";

const tBody = document.querySelector("#tBody");
const thAddStudentBtn = document.querySelector('[data-action="add"]');

// Input elements for first part report details
export const publisherValue = document.querySelector("#publisherValue");
const publisherValueInput = document.querySelector("#publisherValueInput");
const dateValue = document.querySelector("#dateValue");
const classValue = document.querySelector("#classValue");
const levelValue = document.querySelector("#levelValue");
const subjectValue = document.querySelector("#subjectValue");
const studentsAmountValue = document.querySelector("#studentsAmountValue");
const maxPointsValue = document.querySelector("#maxPointsValue");

// Target elements for first part report details
const publisherTarget = document.querySelector("#publisherTarget");
const dateTarget = document.querySelector("#dateTarget");
const classTarget = document.querySelector("#classTarget");
const levelTarget = document.querySelector("#levelTarget");
const subjectTarget = document.querySelector("#subjectTarget");
let studentsAmountTarget = 0;
let studentsAmountTargetCount = document.querySelector(
  "#studentsAmountTargetCount"
);
export let maxPointsTarget = 50;

// Setting start values on load up
publisherValue.value = "Operon";
dateValue.value = "29.12.2025 - 31.12.2025";
classValue.value = "4A";
subjectValue.value = "informatyki";
levelValue.value = "podstawowy";
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
// Date range picker function + set date in the raport
function setDate() {
  $('input[name="daterange"]').daterangepicker(
    {
      locale: { format: "DD.MM.YYYY" },
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

// Function for generatring students - either by +_button one by one or Generate_button
function studentsTableGenerator() {
  // Creating table row and cells
  const tr = document.createElement("tr");

  // Delete td button for students
  const tdDelete = document.createElement("td");
  tdDelete.innerHTML = `<button class="tdButton"  data-action="remove">x</button>`;
  tr.appendChild(tdDelete);

  // Numering table
  const td = document.createElement("td");
  td.classList.add("tdNumeric");
  td.textContent = 1;
  tr.appendChild(td);

  // Creating textarea for student name
  const tdName = document.createElement("td");
  const tdNameInput = document.createElement("input");

  tdNameInput.placeholder = "Imię i nazwisko";
  tdNameInput.className = "studentNameArea";
  tdNameInput.type = "text";
  tdName.appendChild(tdNameInput);
  tr.appendChild(tdName);

  // Creating max points cell
  const tdMaxPoints = document.createElement("td");
  tdMaxPoints.textContent = maxPointsValue.value;
  tdMaxPoints.classList.add("tdMaxPoints");
  maxPointsTarget = maxPointsValue.value;
  tr.appendChild(tdMaxPoints);

  // Creating textarea for scored points
  const tdScoredPoints = document.createElement("td");
  const tdScoredPointsInput = document.createElement("input");
  tdScoredPointsInput.className = "scoredPointsInput";
  tdScoredPointsInput.placeholder = "0";
  tdScoredPointsInput.type = "number";
  tdScoredPointsInput.min = "0";
  tdScoredPointsInput.step = "1";
  tdScoredPoints.appendChild(tdScoredPointsInput);
  tr.appendChild(tdScoredPoints);

  // Creating percentage cell and adding event listener for real-time calculation
  const tdPercentage = document.createElement("td");
  tdPercentage.className = "scoredPercentageArea";
  tdPercentage.textContent = "0%";

  // Prevent letters into achieved points input
  tdScoredPointsInput.addEventListener("beforeinput", (e) => {
    if (!/^\d*$/.test(e.data ?? "")) {
      e.preventDefault();
    }
  });

  calculatePercentage(tdScoredPointsInput, maxPointsTarget);
  tr.appendChild(tdPercentage);

  tBody.appendChild(tr);
}

function setMaxPoints() {
  maxPointsValue.addEventListener("input", () => {
    maxPointsTarget = maxPointsValue.value;
    const tdMaxPoints = document.querySelectorAll(".tdMaxPoints");

    tdMaxPoints.forEach((e) => {
      e.textContent = maxPointsValue.value;
    });
  });
}

//====== function to calculate in real time scores for table 2. =======
function calculatePercentage(tdScoredPointsInput, maxPointsTarget) {
  tdScoredPointsInput.addEventListener("input", () => {
    // WARNING if above max
    maxPointsTarget = maxPointsValue.value;

    const tdScoredPointsInputPointsIntoNumber = parseInt(
      tdScoredPointsInput.value
    );
    if (tdScoredPointsInputPointsIntoNumber > maxPointsTarget) {
      tdScoredPointsInput.classList.add("errorScoredPointsInput");
    } else {
      tdScoredPointsInput.classList.remove("errorScoredPointsInput");
    }

    // Preventing leading zeros
    if (
      tdScoredPointsInput.value.length > 1 &&
      tdScoredPointsInput.value[0] === "0"
    ) {
      tdScoredPointsInput.value = tdScoredPointsInput.value.slice(1);
    }

    const scoredPoints = parseInt(tdScoredPointsInput.value);
    const tdPercentage = document.querySelector(".scoredPercentageArea");
    tdPercentage.textContent = isNaN(scoredPoints)
      ? "0%"
      : `${((scoredPoints / maxPointsTarget) * 100).toFixed(0)}%`;

    generateSecondPart(maxPointsTarget);
  });
}

// Delete student with the "x" button from the table (one by one)
function deleteStudent() {
  tBody.addEventListener("click", (e) => {
    if (e.target.dataset.action === "remove") {
      e.target.closest("tr").remove();

      const tdNumeric = document.querySelectorAll(".tdNumeric");
      let i = 1;
      tdNumeric.forEach((e) => {
        e.textContent = i;
        i++;
      });

      let studentCount = 0;
      tdNumeric.forEach(() => {
        studentCount++;
      });

      studentsAmountTargetCount.textContent = studentCount;
      generateSecondPart(maxPointsTarget);
    }
  });
}

// Add student to the students table
function addStudent() {
  thAddStudentBtn.addEventListener("click", () => {
    studentsTableGenerator();

    const tdNumeric = document.querySelectorAll(".tdNumeric");
    let i = 1;
    tdNumeric.forEach((e) => {
      e.textContent = i;
      i++;
    });

    let studentCount = 0;
    tdNumeric.forEach(() => {
      studentCount++;
    });

    studentsAmountTargetCount.textContent = studentCount;
    generateSecondPart(maxPointsTarget);
  });
}

// Function to Generate whole report with datas
export function generateRaport() {
  // REPORT FIRST PART //
  // Setters for raport
  setPublisher();
  setDate();
  setClass();
  setSubject();
  setLevel();
  setMaxPoints();

  // basic funcitons
  addStudent();
  deleteStudent();
  // Assigning values from inputs to targets

  studentsAmountTarget = studentsAmountValue.value;

  // Setting the students count in the report
  const studentsCount = parseInt(studentsAmountValue.value, 10) || 0;
  studentsAmountTargetCount.textContent = studentsCount;

  // Generating student rows, clearing previous rows first
  tBody.innerHTML = "";

  // Loop to create rows based on the number of students
  for (let i = 0; i < studentsAmountTarget; i++) {
    studentsTableGenerator();
  }

  const tdNumeric = document.querySelectorAll(".tdNumeric");
  let i = 1;
  tdNumeric.forEach((e) => {
    e.textContent = i;
    i++;
  });
}
