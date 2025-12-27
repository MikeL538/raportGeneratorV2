// Download to PDF function
export async function downloadPDF() {
  const report = document.querySelector("#reportToPdf");
  const clone = report.cloneNode(true);

  clone.classList.add("pdf-mode");
  clone.style.width = "210mm";
  clone.style.maxWidth = "210mm";
  clone.style.display = "block";
  clone.style.margin = "0 auto";

  let bodyZoom = parseFloat(getComputedStyle(document.body).zoom) || 1;
  const currentZoom = bodyZoom;
  bodyZoom = 1;
  document.body.style.zoom = bodyZoom;
  btnDownload.style.display = "none";

  clone
    .querySelectorAll(
      ".taskAnalysisDifficultyTextArea, .studentNameArea, .scoredPointsArea, .taskDifficultyTextArea"
    )
    .forEach((e) => {
      const div = document.createElement("div");
      div.style.whiteSpace = "normal";
      div.style.wordBreak = "break-word";
      div.style.overflowWrap = "anywhere";
      div.style.fontSize = "10px";
      div.style.textAlign = "center";
      div.style.marginBottom = "5px";
      // div.style.maxWidth = "300px";
      div.textContent = e.value;

      e.replaceWith(div);
    });

  clone
    .querySelectorAll(".scoredPercentageArea, .maxPointsTarget")
    .forEach((e) => {
      e.style.fontSize = "10px";
    });

  clone.style.color = "#000";
  clone.style.margin = "0";

  document.body.appendChild(clone);

  const options = {
    margin: 0,
    filename: "raport_matura.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2,
      width: clone.offsetWidth,
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
  clone.remove();
  document.body.style.zoom = currentZoom;
  btnDownload.style.display = "block";
}
