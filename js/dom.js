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
dateValue.value = "2025-12-29";
classValue.value = "4A";
subjectValue.value = "Informatyki";
levelValue.value = "Podstawowy";
studentsAmountValue.value = 3;
maxPointsValue.value = 50;

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

  //====== Input to achieved points function =======
  tdScoredPointsInput.addEventListener("input", () => {
    // WARNING if above max
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

    tdPercentage.textContent = isNaN(scoredPoints)
      ? "0%"
      : `${((scoredPoints / maxPointsTarget) * 100).toFixed(0)}%`;

    generateSecondPart(maxPointsTarget);
  });
  tr.appendChild(tdPercentage);

  tBody.appendChild(tr);
}

// Function for showing input if wanted Publisher is not on the list
export function otherPublisherInput() {
  if (publisherValue.value === "Inne, wprowadź") {
    publisherValueInput.style.display = "block";
  } else {
    publisherValueInput.style.display = "none";
  }
}

// Function to Generate whole report with datas
export function generateRaport() {
  // REPORT FIRST PART //

  // Assigning values from inputs to targets
  publisherTarget.textContent = publisherValue.value;
  if (publisherValueInput.style.display === "block") {
    publisherTarget.textContent = publisherValueInput.value;
  }
  dateTarget.textContent = dateValue.value;
  classTarget.textContent = classValue.value;
  subjectTarget.textContent = subjectValue.value;
  levelTarget.textContent = levelValue.value;
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

  $(function () {
    $('input[name="daterange"]').daterangepicker(
      {
        opens: "left",
        locale: {
          format: "DD.MM.YYYY",
        },
      },
      function (start, end, label) {
        console.log(
          "A new date selection was made: " +
            start.format("YYYY-MM-DD") +
            " to " +
            end.format("YYYY-MM-DD")
        );
      }
    );
  });
}

// Delete student with the "x" button from the table (one by one)
export function deleteStudent() {
  tBody.addEventListener("click", (e) => {
    if (e.target.dataset.action === "remove") {
      e.target.closest("tr").remove();

      const tdNumeric = document.querySelectorAll(".tdNumeric");
      let i = 1;
      tdNumeric.forEach((e) => {
        e.textContent = i;
        i++;
      });

      generateSecondPart(maxPointsTarget);
    }
  });
}

// Add student to the students table
export function addStudent() {
  thAddStudentBtn.addEventListener("click", (e) => {
    studentsTableGenerator();

    const tdNumeric = document.querySelectorAll(".tdNumeric");
    let i = 1;
    tdNumeric.forEach((e) => {
      e.textContent = i;
      i++;
    });

    generateSecondPart(maxPointsTarget);
  });
}
