const btnGenerate = document.querySelector("#btnGenerate");
// const btnDownload = document.querySelector("#btnDownload");
// const btnDownloadEnd = document.querySelector("#btnDownloadEnd");
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
const maxPointsTarget = document.querySelectorAll(".maxPointsTarget");

// // Input elements for second part report details

// // Target elements for second part report details
// const maxPointsSummary = document.querySelector("#maxPointsSummary");
// const minPointsSummary = document.querySelector("#minPointsSummary");
// const averagePointsSummary = document.querySelector("#averagePointsSummary");
// const medianPointsSummary = document.querySelector("#medianPointsSummary");
// const modePointsSummary = document.querySelector("#modePointsSummary");
// const sheetLevel = document.querySelector("#sheetLevel");

// function generateSecondPart() {
//   let maxPoints = 0;
//   let minPoints = maxPointsValue.value;
//   let average = 0.0;
//   let medianArray = [];
//   let median = 0.0;

//   const scoredPointsArea = document.querySelectorAll(".scoredPointsArea");

//   // Calculating maximum
//   scoredPointsArea.forEach((e) => {
//     e = parseInt(e.value, 10) || 0;
//     maxPoints < e ? (maxPoints = e) : null;
//   });
//   maxPointsSummary.textContent = maxPoints;

//   // Calculating minimum
//   scoredPointsArea.forEach((e) => {
//     e = parseInt(e.value, 10) || 0;
//     minPoints > e ? (minPoints = e) : null;
//   });
//   minPointsSummary.textContent = minPoints;

//   // Calculating average
//   scoredPointsArea.forEach((e) => {
//     e = parseInt(e.value, 10) || 0;
//     average += e;
//   });
//   average = average / scoredPointsArea.length;
//   const averageProcent = (average / maxPointsValue.value) * 100;
//   averagePointsSummary.textContent = ` ${average.toFixed(
//     2
//   )} / ${averageProcent.toFixed(2)}%`;

//   // Calculating median
//   scoredPointsArea.forEach((e) => {
//     e = parseInt(e.value, 10) || 0;
//     medianArray.push(e);
//   });
//   medianArray.sort((a, b) => a - b);

//   if (medianArray.length % 2 === 0) {
//     const mid1 = medianArray[medianArray.length / 2 - 1];
//     const mid2 = medianArray[medianArray.length / 2];
//     median = (mid1 + mid2) / 2;
//     median = parseFloat(median);
//     medianPointsSummary.textContent = median.toFixed(2);
//   } else {
//     median = medianArray[Math.floor(medianArray.length / 2)];
//     median = parseFloat(median);
//     medianPointsSummary.textContent = median.toFixed(2);
//   }

//   // Calculating mode
//   const modeMap = {};
//   let mostFrequent = null;
//   let mostFrequentCount = 0;

//   medianArray.forEach((num) => {
//     const n = parseInt(num, 10) || 0;
//     if (!modeMap[n]) {
//       modeMap[n] = 0;
//     }
//     modeMap[n] += 1;

//     if (modeMap[n] > mostFrequentCount) {
//       mostFrequentCount = modeMap[n];
//       mostFrequent = n;
//     }
//   });

//   if (mostFrequentCount <= 1) {
//     mostFrequent = "—";
//   }
//   modePointsSummary.textContent = mostFrequent;

//   // Calculating sheet level
//   sheetLevel.textContent =
//     ((average / maxPointsValue.value) * 100).toFixed(2) + "%";
// }

// async function downloadPDF() {
//   const report = document.querySelector("#reportToPdf");
//   const clone = report.cloneNode(true);

//   clone.classList.add("pdf-mode");
//   clone.style.width = "210mm";
//   clone.style.maxWidth = "210mm";

//   let bodyZoom = parseFloat(getComputedStyle(document.body).zoom) || 1;
//   const currentZoom = bodyZoom;
//   bodyZoom = 1;
//   document.body.style.zoom = bodyZoom;

//   clone
//     .querySelectorAll(
//       ".taskAnalysisDifficultyTextArea, .studentNameArea, .scoredPointsArea, .taskDifficultyTextArea"
//     )
//     .forEach((e) => {
//       const div = document.createElement("div");
//       div.style.whiteSpace = "normal";
//       div.style.wordBreak = "break-word";
//       div.style.overflowWrap = "anywhere";
//       div.style.fontSize = "10px";
//       div.style.textAlign = "center";
//       div.style.marginBottom = "5px";
//       // div.style.maxWidth = "300px";
//       div.textContent = e.value;

//       e.replaceWith(div);
//     });

//   clone
//     .querySelectorAll(".scoredPercentageArea, .maxPointsTarget")
//     .forEach((e) => {
//       e.style.fontSize = "10px";
//     });

//   clone.style.color = "#000";
//   clone.style.margin = "0";

//   document.body.appendChild(clone);

//   const options = {
//     margin: 0,
//     filename: "raport_matura.pdf",
//     image: { type: "jpeg", quality: 0.98 },
//     html2canvas: {
//       scale: 2,
//       width: clone.offsetWidth,
//       scrollX: 0,
//       scrollY: 0,
//     },
//     jsPDF: {
//       unit: "mm",
//       format: "a4",
//       orientation: "portrait",
//     },
//     pagebreak: {
//       mode: ["auto", "css"],
//     },
//   };

//   await html2pdf().set(options).from(clone).save();
//   clone.remove();
//   document.body.style.zoom = currentZoom;
// }

btnGenerate.addEventListener("click", (s) => {
  // REPORT FIRST PART //
  s.preventDefault();
  // Assigning values from inputs to targets
  publisherTarget.textContent = publisherValue.value;
  dateTarget.textContent = dateValue.value;
  classTarget.textContent = classValue.value;
  subjectTarget.textContent = subjectValue.value;
  levelTarget.textContent = levelValue.value;
  studentsAmountTarget = studentsAmountValue.value;

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
    const tdNameArea = document.createElement("textarea");

    tdNameArea.style.textAlign = "center";
    tdNameArea.placeholder = "Imię i nazwisko";
    tdNameArea.className = "studentNameArea";
    tdName.appendChild(tdNameArea);
    tr.appendChild(tdName);

    // Creating max points cell
    const tdMaxPoints = document.createElement("td");
    tdMaxPoints.className = "maxPointsTarget";
    tdMaxPoints.textContent = maxPointsValue.value;
    tr.appendChild(tdMaxPoints);

    // Creating textarea for scored points
    const tdScoredPoints = document.createElement("td");
    const tdScoredPointsArea = document.createElement("textarea");
    tdScoredPointsArea.placeholder = "0";
    tdScoredPointsArea.style.width = "100%";
    tdScoredPointsArea.style.textAlign = "center";
    tdScoredPointsArea.style.resize = "none";
    tdScoredPointsArea.className = "scoredPointsArea";
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
        : `${((scoredPoints / maxPointsValue.value) * 100).toFixed(0)}%`;

      generateSecondPart();
    });
    tr.appendChild(tdPercentage);

    tBody.appendChild(tr);
  }
});

//   // REPORT SECOND PART //
//   // Setting the students count in the report
//   const studentsCount = parseInt(studentsAmountValue.value, 10) || 0;
//   studentsAmountTargetCount.textContent = studentsCount;
// });

// // Download report as PDF
// btnDownload.addEventListener("click", async () => {
//   try {
//     await downloadPDF();
//     alert("PDF został pomyślnie wygenerowany");
//   } catch (error) {
//     alert("Błąd podczas generowania PDF:", error);
//   }
// });

// // Fix headers button functionality
// btnFixHeaders.addEventListener("click", () => {
//   console.log("Fix headers button clicked");
//   publisherTarget.textContent = publisherValue.value;
//   dateTarget.textContent = dateValue.value;
//   classTarget.textContent = classValue.value;
//   subjectTarget.textContent = subjectValue.value;
//   levelTarget.textContent = levelValue.value;
//   studentsAmountTarget = studentsAmountValue.value;
// });

// btnDownloadEnd.addEventListener("click", async () => {
//   try {
//     await downloadPDF();
//     alert("PDF został pomyślnie wygenerowany");
//   } catch (error) {
//     alert("Błąd podczas generowania PDF:", error);
//   }
// })
