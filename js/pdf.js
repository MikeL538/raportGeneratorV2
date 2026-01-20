let bodyZoom = parseFloat(getComputedStyle(document.body).zoom) || 1;
let currentZoom = bodyZoom;

function prepareForPdf() {
  const spans = document.querySelectorAll(".report__highlight");
  const tdButton = document.querySelectorAll(".students-table__btn");

  bodyZoom = parseFloat(getComputedStyle(document.body).zoom) || 1;
  currentZoom = bodyZoom;

  // Remove underline in PDF
  spans.forEach((e) => {
    e.style.textDecoration = "none";
  });

  // Hide table buttons + their cells
  tdButton.forEach((e) => {
    e.style.display = "none";

    const thCell = e.closest("th");
    if (thCell) thCell.style.display = "none";

    const tdCell = e.closest("td");
    if (tdCell) tdCell.style.display = "none";
  });

  bodyZoom = 1;
  document.body.style.zoom = bodyZoom;
}

function backToNormal() {
  const spans = document.querySelectorAll(".report__highlight");
  const tdButton = document.querySelectorAll(".students-table__btn");

  // Restore underline
  spans.forEach((e) => {
    e.style.textDecoration = "underline";
  });

  // Restore table buttons + cells
  tdButton.forEach((e) => {
    e.style.display = "inline-block";

    const thCell = e.closest("th");
    if (thCell) thCell.style.display = "table-cell";

    const tdCell = e.closest("td");
    if (tdCell) tdCell.style.display = "table-cell";
  });

  document.body.style.zoom = currentZoom;
}

// Download to PDF function
export async function downloadPDF() {
  const report = document.querySelector(".report");
  prepareForPdf();

  const clone = report.cloneNode(true);

  clone.classList.add("pdf-mode");
  clone.style.width = "200mm";
  clone.style.maxWidth = "200mm";
  clone.style.display = "block";
  clone.style.margin = "0 auto";

  // Tables edit
  clone
    .querySelectorAll(
      " .students-table__name, .students-table__points-input, .tasks__input",
    )
    .forEach((e) => {
      const div = document.createElement("div");
      div.textContent = e.value;

      e.replaceWith(div);

      if (div.textContent === "") {
        div.textContent = "0";
      }
    });

  // Analysis area
  clone.querySelectorAll(".analysis__textarea").forEach((e) => {
    const div = document.createElement("div");
    div.textContent = e.value;
    div.style.minHeight = "150px";

    e.replaceWith(div);
  });

  const options = {
    margin: 0,
    filename: "raport_matura.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2,
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

  backToNormal();
}
