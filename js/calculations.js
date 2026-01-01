// Target elements for second part report details
const maxPointsSummary = document.querySelector("#maxPointsSummary");
const minPointsSummary = document.querySelector("#minPointsSummary");
const averagePointsSummary = document.querySelector("#averagePointsSummary");
const medianPointsSummary = document.querySelector("#medianPointsSummary");
const modePointsSummary = document.querySelector("#modePointsSummary");
const sheetLevel = document.querySelector("#sheetLevel");

// Calculate highest score
function calcHighestScore() {
  let highestPoints = 0;
  const scoredPointsArea = document.querySelectorAll(".scoredPointsInput");

  scoredPointsArea.forEach((e) => {
    e = parseInt(e.value, 10) || 0;
    highestPoints < e ? (highestPoints = e) : null;
  });
  maxPointsSummary.textContent = highestPoints;
}

// Calculate lowest score
function calcLowestScore(maxPointsValue) {
  let lowestScore = maxPointsValue;
  const scoredPointsArea = document.querySelectorAll(".scoredPointsInput");

  scoredPointsArea.forEach((e) => {
    e = parseInt(e.value, 10) || 0;
    lowestScore > e ? (lowestScore = e) : null;
  });
  minPointsSummary.textContent = lowestScore;
}

export function generateSecondPart(maxPointsTarget) {
  let average = 0.0;
  let medianArray = [];
  let median = 0.0;

  const scoredPointsArea = document.querySelectorAll(".scoredPointsInput");

  calcHighestScore();
  calcLowestScore(maxPointsTarget);
  // Calculating average
  scoredPointsArea.forEach((e) => {
    e = parseInt(e.value, 10) || 0;
    average += e;
  });
  average = average / scoredPointsArea.length;
  const averageProcent = (average / maxPointsValue.value) * 100;
  averagePointsSummary.textContent = ` ${average.toFixed(
    0
  )} / ${averageProcent.toFixed(0)}%`;

  // Calculating median
  scoredPointsArea.forEach((e) => {
    e = parseInt(e.value, 10) || 0;
    medianArray.push(e);
  });
  medianArray.sort((a, b) => a - b);

  if (medianArray.length % 2 === 0) {
    const mid1 = medianArray[medianArray.length / 2 - 1];
    const mid2 = medianArray[medianArray.length / 2];
    median = (mid1 + mid2) / 2;
    median = parseFloat(median);
    medianPointsSummary.textContent = median.toFixed(0);
  } else {
    median = medianArray[Math.floor(medianArray.length / 2)];
    median = parseFloat(median);
    medianPointsSummary.textContent = median.toFixed(0);
  }

  // Calculating mode
  const modeMap = {};
  let mostFrequent = null;
  let mostFrequentCount = 0;

  medianArray.forEach((num) => {
    const n = parseInt(num, 10) || 0;
    if (!modeMap[n]) {
      modeMap[n] = 0;
    }
    modeMap[n] += 1;

    if (modeMap[n] > mostFrequentCount) {
      mostFrequentCount = modeMap[n];
      mostFrequent = n;
    }
  });

  if (mostFrequentCount <= 1) {
    mostFrequent = "—";
  }
  modePointsSummary.textContent = mostFrequent;

  // Calculating sheet level
  const sheetLevelValue = (average / maxPointsTarget) * 100;

  switch (true) {
    case sheetLevelValue >= 85:
      sheetLevel.textContent = "Bardzo łatwy";
      break;
    case sheetLevelValue >= 75:
      sheetLevel.textContent = "Łatwy";
      break;
    case sheetLevelValue >= 50:
      sheetLevel.textContent = "Średnie";
      break;
    case sheetLevelValue >= 35:
      sheetLevel.textContent = "Trudne";
      break;
    default:
      sheetLevel.textContent = "Bardzo trudne";
      break;
  }
}
