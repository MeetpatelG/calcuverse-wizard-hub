
export function exportCSV(num: number, factors: number[], steps: string[]) {
  const header = ["Input", "Factors", "Step"];
  const bodyRows = steps.map((s, i) => [
    i === 0 ? num.toString() : "",
    i === 0 ? factors.join(" x ") : "",
    s
  ]);
  const csv = [header, ...bodyRows]
    .map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `prime-factorization-${num}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export async function exportPDF(num: number, factors: number[], steps: string[]) {
  // Simple PDF using browser print as "Save as PDF":
  const win = window.open("", "_blank");
  if (!win) return;
  const html = `
    <h2>Prime Factorization of ${num}</h2>
    <div><strong>Prime factors:</strong> ${factors.length ? factors.join(" × ") : "None"}</div>
    <h3>Steps:</h3>
    <ol>
      ${steps.map(step => `<li>${step}</li>`).join("")}
    </ol>
    <hr>
    <small>This file was exported from calculators.ai</small>
  `;
  win.document.write(`<html><head><title>Export PDF</title></head><body>${html}</body></html>`);
  win.document.close();
  setTimeout(() => win.print(), 600);
}
