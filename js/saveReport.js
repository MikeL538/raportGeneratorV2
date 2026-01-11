// const modal = document.querySelector("[data-modal-saveReport]");

// export function toggleReportModal() {
//   if (!modal) return;
//   modal.classList.toggle("is-hidden");
// }

// ========

import { supabase } from "./supabaseClient.js";
import { getCurrentUser } from "./auth.js";

export async function saveReport(reportName, studentsData) {
  const user = await getCurrentUser();
  if (!user) {
    console.log("You must be logged");
    return;
  }

  // Konwertujemy dane z tabeli do JSON
  const studentsJson = studentsData.map((row) => ({
    name: row.querySelector(".students-table__name").value,
    maxPoints: Number(
      row.querySelector(".students-table__max-points").textContent
    ),
    points: Number(row.querySelector(".students-table__points-input").value),
  }));

  const { data, error } = await supabase
    .from("reports")
    .insert([{ user_id: user.id, name: reportName, students: studentsJson }]);

  if (error) {
    console.error(error);
    alert("Błąd przy zapisywaniu raportu");
    return;
  }

  alert("Raport zapisany!");
}
