let bodyZoom = parseFloat(getComputedStyle(document.body).zoom) || 1;
const currentZoom = bodyZoom;

function backToNormal() {
  const spans = document.querySelectorAll(".reportHeadersSpan");
  const tdButton = document.querySelectorAll(".tdButton");

  spans.forEach((e) => {
    e.style.textDecoration = "underline";
  });
  tdButton.forEach((e) => {
    e.style.display = "inline-block";

    const thCell = e.closest("th");
    if (thCell) {
      thCell.style.display = "inline-block";
    }

    const tdCell = e.closest("td");
    if (tdCell) {
      tdCell.style.display = "table-cell";
    }
  });

  document.body.style.zoom = currentZoom;
}

function prepareForPdf() {
  const spans = document.querySelectorAll(".reportHeadersSpan");
  const tdButton = document.querySelectorAll(".tdButton");

  spans.forEach((e) => {
    e.style.textDecoration = "none";
  });
  tdButton.forEach((e) => {
    e.style.display = "none";

    const thCell = e.closest("th");
    if (thCell) {
      thCell.style.display = "none";
    }

    const tdCell = e.closest("td");
    if (tdCell) {
      tdCell.style.display = "none";
    }
  });

  bodyZoom = 1;
  document.body.style.zoom = bodyZoom;
}

// Download to PDF function
export async function downloadPDF() {
  const report = document.querySelector("#reportToPdf");
  prepareForPdf();

  const clone = report.cloneNode(true);

  clone.classList.add("pdf-mode");
  clone.style.width = "200mm";
  clone.style.maxWidth = "200mm";
  clone.style.display = "block";
  clone.style.margin = "0 auto";

  clone
    .querySelectorAll(
      ".taskAnalysisDifficultyTextArea, .studentNameArea, .scoredPointsArea, .taskDifficultyTextArea"
    )
    .forEach((e) => {
      const div = document.createElement("div");
      div.style.marginBottom = "5px";
      div.textContent = e.value;
      e.replaceWith(div);
    });

  const options = {
    margin: 0,
    filename: "raport_matura.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2,
      // width: clone.offsetWidth,
      scrollX: 0,
      scrollY: 0,
    },
    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    },
    pagebreak: {
      mode: ["auto", "css"],
    },
  };

  await html2pdf().set(options).from(clone).save();

  backToNormal(clone);
}
