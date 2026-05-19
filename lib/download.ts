import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export interface MaterialItem {
  nama_barang: string;
  jumlah_estimasi: number;
  satuan: string;
  alasan: string;
}

export interface AnalysisResult {
  is_valid_image: boolean;
  error_message: string | null;
  analisis_ruangan: string;
  ringkasan: {
    estimasi_ukuran: string;
    tipe_ruangan: string;
    luas_estimasi: string;
    tingkat_finishing: string;
  };
  kebutuhan_material: MaterialItem[];
}

/**
 * Generate a downloadable PDF file from the analysis result
 */
export function downloadBoM(result: AnalysisResult) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  // ─── HEADER ───
  doc.setFillColor(17, 17, 17);
  doc.rect(0, 0, pageWidth, 40, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text("MataMandor AI", margin, 18);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(180, 180, 180);
  doc.text("Visual BoM Estimator — Laporan Estimasi Material", margin, 26);

  // Date & Time on the right
  const tanggal = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const waktu = new Date().toLocaleTimeString("id-ID");
  doc.setFontSize(9);
  doc.setTextColor(160, 160, 160);
  doc.text(`${tanggal}  •  ${waktu}`, pageWidth - margin, 18, {
    align: "right",
  });

  y = 52;

  // ─── RINGKASAN ANALISIS ───
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(17, 17, 17);
  doc.text("Ringkasan Analisis", margin, y);
  y += 2;

  // Underline
  doc.setDrawColor(17, 17, 17);
  doc.setLineWidth(0.5);
  doc.line(margin, y, margin + 45, y);
  y += 8;

  // Summary cards in a 2x2 grid
  const cardWidth = (contentWidth - 6) / 2;
  const cardHeight = 18;
  const summaryItems = [
    { label: "Estimasi Ukuran", value: result.ringkasan.estimasi_ukuran },
    { label: "Tipe Ruangan", value: result.ringkasan.tipe_ruangan },
    { label: "Luas Estimasi", value: result.ringkasan.luas_estimasi },
    { label: "Tingkat Finishing", value: result.ringkasan.tingkat_finishing },
  ];

  summaryItems.forEach((item, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = margin + col * (cardWidth + 6);
    const cardY = y + row * (cardHeight + 4);

    // Card background
    doc.setFillColor(248, 248, 248);
    doc.roundedRect(x, cardY, cardWidth, cardHeight, 2, 2, "F");

    // Label
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text(item.label, x + 5, cardY + 7);

    // Value
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(17, 17, 17);
    doc.text(item.value, x + 5, cardY + 14);
  });

  y += 2 * (cardHeight + 4) + 6;

  // ─── ANALISIS RUANGAN ───
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(17, 17, 17);
  doc.text("Analisis Ruangan", margin, y);
  y += 2;
  doc.setLineWidth(0.5);
  doc.line(margin, y, margin + 42, y);
  y += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(60, 60, 60);
  const analysisLines = doc.splitTextToSize(
    result.analisis_ruangan,
    contentWidth
  );
  doc.text(analysisLines, margin, y);
  y += analysisLines.length * 4.5 + 8;

  // ─── TABEL KEBUTUHAN MATERIAL ───
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(17, 17, 17);
  doc.text("Daftar Kebutuhan Material", margin, y);
  y += 2;
  doc.setLineWidth(0.5);
  doc.line(margin, y, margin + 58, y);
  y += 4;

  const tableBody = result.kebutuhan_material.map((item, i) => [
    String(i + 1),
    item.nama_barang,
    item.jumlah_estimasi.toLocaleString("id-ID"),
    item.satuan,
    item.alasan,
  ]);

  autoTable(doc, {
    startY: y,
    margin: { left: margin, right: margin },
    head: [["No", "Nama Barang", "Jumlah", "Satuan", "Alasan"]],
    body: tableBody,
    theme: "grid",
    headStyles: {
      fillColor: [17, 17, 17],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 9,
      halign: "left",
    },
    bodyStyles: {
      fontSize: 8.5,
      textColor: [40, 40, 40],
      cellPadding: 3,
    },
    alternateRowStyles: {
      fillColor: [248, 248, 248],
    },
    columnStyles: {
      0: { cellWidth: 10, halign: "center" },
      1: { cellWidth: 35 },
      2: { cellWidth: 18, halign: "center" },
      3: { cellWidth: 25 },
      4: { cellWidth: "auto" },
    },
  });

  // Get final Y after table
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const finalY = (doc as any).lastAutoTable?.finalY || y + 40;

  // ─── FOOTER NOTE ───
  const footerY = finalY + 10;
  doc.setFillColor(248, 248, 248);
  doc.roundedRect(margin, footerY, contentWidth, 16, 2, 2, "F");

  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text(
    "* Hasil estimasi bersifat sementara dan dapat berbeda di lapangan.",
    margin + 4,
    footerY + 6
  );
  doc.text(
    "* Dihasilkan oleh MataMandor AI — Visual BoM Estimator",
    margin + 4,
    footerY + 11
  );

  // ─── PAGE FOOTER ───
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.3);
  doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(160, 160, 160);
  doc.text(
    `© ${new Date().getFullYear()} MataMandor AI. Semua hak dilindungi.`,
    margin,
    pageHeight - 7
  );
  doc.text(`Halaman 1`, pageWidth - margin, pageHeight - 7, {
    align: "right",
  });

  // ─── SAVE ───
  doc.save(`MataMandor_BoM_${new Date().toISOString().slice(0, 10)}.pdf`);
}
