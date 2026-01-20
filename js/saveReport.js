import { supabase } from "./supabaseClient.js";
import { getCurrentUser } from "./auth.js";

export async function saveReport(reportName, maxPoints, studentsData) {
  const user = await getCurrentUser();
  if (!user) {
    console.log("You must be logged");
    return;
  }

  // Konwertujemy dane z tabeli do JSON
  const studentsJson = studentsData.map((row) => ({
    name: row.querySelector(".students-table__name").value,
    // maxPoints: Number(
    //   row.querySelector(".students-table__max-points").textContent
    // ),
    points: Number(row.querySelector(".students-table__points-input").value),
  }));

  const headersJson = {
    publisher: document.querySelector("#publisherTarget")?.textContent.trim(),
    date: document.querySelector("#dateTarget")?.textContent.trim(),
    class: document.querySelector("#classTarget")?.textContent.trim(),
    subject: document.querySelector("#subjectTarget")?.textContent.trim(),
    level: document.querySelector("#levelTarget")?.textContent.trim(),
  };

  const analysisJson = {
    difficulty: {
      very_easy: document.querySelector("#taskVeryEasy").value.trim(),
      easy: document.querySelector("#taskEasy").value.trim(),
      medium: document.querySelector("#taskMedium").value.trim(),
      hard: document.querySelector("#taskHard").value.trim(),
      very_hard: document.querySelector("#taskVeryHard").value.trim(),
    },
    analysisEasy: document.querySelector("#analysisEasy").value.trim(),
    analysisHard: document.querySelector("#analysisHard").value.trim(),
    author: document.querySelector("#reportPreparedBy").value.trim(),
  };

  const { data, error } = await supabase.from("reports").insert([
    {
      user_id: user.id,
      name: reportName,
      max_points: maxPoints,
      students: studentsJson,
      headers: headersJson,
      analysis: analysisJson,
    },
  ]);

  if (error) {
    console.error(error);
    alert("Błąd przy zapisywaniu raportu");
    return;
  }

  alert("Raport zapisany!");
}
