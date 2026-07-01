export async function downloadResultsPdf(captureEl: HTMLElement): Promise<void> {
  const [html2canvasModule, { jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);
  const html2canvas = html2canvasModule.default;

  const canvas = await html2canvas(captureEl, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#2e8b7a",
  });

  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const margin = 10;
  const imgW = pageW - margin * 2;
  const imgH = (canvas.height * imgW) / canvas.width;

  let yPos = margin;
  let remainingH = imgH;

  while (remainingH > 0) {
    const sliceH = Math.min(remainingH, pageH - margin * 2);
    const sliceCanvas = document.createElement("canvas");
    sliceCanvas.width = canvas.width;
    sliceCanvas.height = (sliceH / imgW) * canvas.width;

    const ctx = sliceCanvas.getContext("2d");
    if (ctx) {
      const srcY = ((imgH - remainingH) / imgH) * canvas.height;
      ctx.drawImage(canvas, 0, srcY, canvas.width, sliceCanvas.height, 0, 0, canvas.width, sliceCanvas.height);
    }

    pdf.addImage(sliceCanvas.toDataURL("image/png"), "PNG", margin, yPos, imgW, sliceH);
    remainingH -= sliceH;

    if (remainingH > 0) {
      pdf.addPage();
      yPos = margin;
    }
  }

  const date = new Date().toISOString().slice(0, 10);
  pdf.save(`wayfinder-results-${date}.pdf`);
}
