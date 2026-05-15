import { exportProfileData } from "./profileApi";

function formatCsvValue(v: unknown) {
  return `"${String(v ?? "").replace(/"/g, '""')}"`;
}

export async function downloadProfileDataCsv(userId: string) {
  const data = await exportProfileData(userId);
  const headers = Object.keys(data).join(",");
  const values = Object.values(data).map(formatCsvValue).join(",");
  const blob = new Blob([`${headers}\n${values}`], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "my-good-luck-island-data.csv";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
