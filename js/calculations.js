// Calculate highest score
function calcHighestScore() {
  const maxPointsSummary = document.querySelector("#maxPointsSummary");
  let highestPoints = 0;
  const scoredPointsInput = document.querySelectorAll(
    ".students-table__points-input"
  );

  if (scoredPointsInput.length < 1) {
    maxPointsSummary.textContent = "—";
    return;
  }

  scoredPointsInput.forEach((e) => {
    e = parseInt(e.value, 10) || 0;
    highestPoints < e ? (highestPoints = e) : null;
  });
  maxPointsSummary.textContent = highestPoints;
}

// Calculate lowest score
function calcLowestScore(maxPointsValue) {
  const minPointsSummary = document.querySelector("#minPointsSummary");
  let lowestScore = maxPointsValue;
  const scoredPointsInput = document.querySelectorAll(
    ".students-table__points-input"
  );

  if (scoredPointsInput.length < 1) {
    minPointsSummary.textContent = "—";
    return;
  }

  scoredPointsInput.forEach((e) => {
    e = parseInt(e.value, 10) || 0;
    lowestScore > e ? (lowestScore = e) : null;
  });
  minPointsSummary.textContent = lowestScore;
}

// Calculate average
function calcAverageScore(maxPointsValue) {
  const averagePointsSummary = document.querySelector("#averagePointsSummary");
  let average = 0;

  const scoredPointsInput = document.querySelectorAll(
    ".students-table__points-input"
  );

  if (scoredPointsInput.length < 1) {
    averagePointsSummary.textContent = "—";
    return;
  }

  scoredPointsInput.forEach((e) => {
    e = parseInt(e.value, 10) || 0;
    average += e;
  });
  average = average / scoredPointsInput.length;

  const averageProcent = (average / maxPointsValue) * 100;
  averagePointsSummary.textContent = ` ${average.toFixed(
    0
  )} / ${averageProcent.toFixed(0)}%`;

  if (!average) {
    averagePointsSummary.textContent = "0";
  }

  return average;
}

// Calculate median and mode
function calcMedianAndModeScore() {
  const medianPointsSummary = document.querySelector("#medianPointsSummary");
  const modePointsSummary = document.querySelector("#modePointsSummary");
  const scoredPointsInput = document.querySelectorAll(
    ".students-table__points-input"
  );

  if (scoredPointsInput.length === 0) {
    medianPointsSummary.textContent = "—";
    modePointsSummary.textContent = "—";
    return;
  }

  let medianArray = [];
  let median = 0.0;

  scoredPointsInput.forEach((e) => {
    e = parseInt(e.value, 10) || 0;
    medianArray.push(e);
  });
  medianArray.sort((a, b) => a - b);

  if (medianArray.length % 2 === 0) {
    const mid1 = medianArray[medianArray.length / 2 - 1];
    const mid2 = medianArray[medianArray.length / 2];
    median = (mid1 + mid2) / 2;
    median = parseFloat(median);
    medianPointsSummary.textContent = median.toFixed(1);
  } else {
    median = medianArray[Math.floor(medianArray.length / 2)];
    median = parseFloat(median);
    medianPointsSummary.textContent = median.toFixed(0);
  }

  if (!median) {
    medianPointsSummary.textContent = "0";
  }

  if (medianArray.length === 0) {
    medianPointsSummary.textContent = "—";
    return;
  }

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

  const modes = Object.keys(modeMap).filter(
    (key) => modeMap[key] === mostFrequentCount
  );

  modePointsSummary.textContent = modes.length === 1 ? modes[0] : "—";
}

// Set sheet level
function setSheetLevelValue(max) {
  const sheetLevel = document.querySelector("#sheetLevel");
  const average = calcAverageScore(max);

  const sheetLevelValue = (average / max) * 100;

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
    case sheetLevelValue >= 0:
      sheetLevel.textContent = "Bardzo trudne";
      break;
    default:
      sheetLevel.textContent = "—";
      break;
  }
}

export function generateSecondPart(max) {
  calcHighestScore();
  calcLowestScore(max);
  calcAverageScore(max);
  calcMedianAndModeScore();
  setSheetLevelValue(max);
}
