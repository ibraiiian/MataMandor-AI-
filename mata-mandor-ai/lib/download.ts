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
 * Generate a downloadable text file from the analysis result
 */
export function downloadBoM(result: AnalysisResult) {
  const lines: string[] = [];

  lines.push("═══════════════════════════════════════════");
  lines.push("  MATAMANDOR AI — ESTIMASI MATERIAL (BoM)");
  lines.push("═══════════════════════════════════════════");
  lines.push("");
  lines.push(`Tanggal     : ${new Date().toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}`);
  lines.push(`Waktu       : ${new Date().toLocaleTimeString("id-ID")}`);
  lines.push("");

  lines.push("───────────────────────────────────────────");
  lines.push("  RINGKASAN ANALISIS");
  lines.push("───────────────────────────────────────────");
  lines.push(`  Estimasi Ukuran   : ${result.ringkasan.estimasi_ukuran}`);
  lines.push(`  Tipe Ruangan      : ${result.ringkasan.tipe_ruangan}`);
  lines.push(`  Luas Estimasi     : ${result.ringkasan.luas_estimasi}`);
  lines.push(`  Tingkat Finishing  : ${result.ringkasan.tingkat_finishing}`);
  lines.push("");

  lines.push("───────────────────────────────────────────");
  lines.push("  ANALISIS RUANGAN");
  lines.push("───────────────────────────────────────────");
  lines.push(`  ${result.analisis_ruangan}`);
  lines.push("");

  lines.push("───────────────────────────────────────────");
  lines.push("  DAFTAR KEBUTUHAN MATERIAL");
  lines.push("───────────────────────────────────────────");
  lines.push("");

  // Table header
  const pad = (s: string, len: number) => s.padEnd(len);
  lines.push(
    `  ${pad("No.", 5)}${pad("Nama Barang", 28)}${pad("Jumlah", 12)}${pad("Satuan", 14)}Alasan`
  );
  lines.push("  " + "─".repeat(90));

  result.kebutuhan_material.forEach((item, i) => {
    lines.push(
      `  ${pad(String(i + 1) + ".", 5)}${pad(item.nama_barang, 28)}${pad(
        item.jumlah_estimasi.toLocaleString("id-ID"),
        12
      )}${pad(item.satuan, 14)}${item.alasan}`
    );
  });

  lines.push("");
  lines.push("═══════════════════════════════════════════");
  lines.push("  * Hasil estimasi bersifat sementara dan");
  lines.push("    dapat berbeda di lapangan.");
  lines.push("  * Dihasilkan oleh MataMandor AI");
  lines.push("═══════════════════════════════════════════");

  const content = lines.join("\n");
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `MataMandor_BoM_${new Date().toISOString().slice(0, 10)}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
