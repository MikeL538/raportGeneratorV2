import { generateSecondPart } from "./calculations.js";

const defaultRows = 15;
const tBody = document.querySelector("#tBody");

// // Input elements for first part report details
const publisherValue = document.querySelector("#publisherValue");
const dateValue = document.querySelector("#dateValue");
const classValue = document.querySelector("#classValue");
const levelValue = document.querySelector("#levelValue");
const subjectValue = document.querySelector("#subjectValue");
const studentsAmountValue = document.querySelector("#studentsAmountValue");
const maxPointsValue = document.querySelector("#maxPointsValue");

// // Target elements for first part report details
const publisherTarget = document.querySelector("#publisherTarget");
const dateTarget = document.querySelector("#dateTarget");
const classTarget = document.querySelector("#classTarget");
const levelTarget = document.querySelector("#levelTarget");
const subjectTarget = document.querySelector("#subjectTarget");
let studentsAmountTarget = 0;
let studentsAmountTargetCount = document.querySelector(
  "#studentsAmountTargetCount"
);
let maxPointsTarget = maxPointsValue.value;

// Create placeholders rows after page load up
export function createRow() {
  //   return ;

  for (let i = 1; i <= defaultRows; i++) {
    tBody.insertAdjacentHTML(
      "beforeend",
      `
    <tr>
      <td>${i}</td>
      <td><input class="studentNameArea" placeholder="Imię i nazwisko"></input></td>
      <td class="maxPointsTarget">0</td>
      <td><input class="scoredPointsArea" placeholder="0"></input></td>
      <td class="scoredPercentageArea">0%</td>
    </tr>
  `
    );
  }
}

export function generateRaport(s) {
  // REPORT FIRST PART //
  s.preventDefault();
  // Assigning values from inputs to targets
  publisherTarget.textContent = publisherValue.value;
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
    // Creating table row and cells
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.textContent = i + 1;
    tr.appendChild(td);

    // Creating textarea for student name
    const tdName = document.createElement("td");
    const tdNameArea = document.createElement("input");

    tdNameArea.placeholder = "Imię i nazwisko";
    tdNameArea.className = "studentNameArea";
    tdName.appendChild(tdNameArea);
    tr.appendChild(tdName);

    // Creating max points cell
    const tdMaxPoints = document.createElement("td");
    tdMaxPoints.textContent = maxPointsValue.value;
    maxPointsTarget = maxPointsValue.value;
    tr.appendChild(tdMaxPoints);

    // Creating textarea for scored points
    const tdScoredPoints = document.createElement("td");
    const tdScoredPointsArea = document.createElement("input");
    tdScoredPointsArea.className = "scoredPointsArea";
    tdScoredPointsArea.placeholder = "0";
    tdScoredPoints.appendChild(tdScoredPointsArea);
    tr.appendChild(tdScoredPoints);

    // Creating percentage cell and adding event listener for real-time calculation
    const tdPercentage = document.createElement("td");
    tdPercentage.className = "scoredPercentageArea";
    tdPercentage.textContent = "0%";

    tdScoredPointsArea.addEventListener("input", () => {
      // Preventing leading zeros
      if (
        tdScoredPointsArea.value.length > 1 &&
        tdScoredPointsArea.value[0] === "0"
      ) {
        tdScoredPointsArea.value = tdScoredPointsArea.value.slice(1);
      }

      const scoredPoints = parseInt(tdScoredPointsArea.value);

      tdPercentage.textContent = isNaN(scoredPoints)
        ? "0%"
        : `${((scoredPoints / maxPointsTarget) * 100).toFixed(0)}%`;

      generateSecondPart();
    });
    tr.appendChild(tdPercentage);

    tBody.appendChild(tr);
  }
}
