"use client";

import { Download, RotateCcw, X } from "lucide-react";
import SummaryCard from "./SummaryCard";
import BoMTable from "./BoMTable";
import { AnalysisResult, downloadBoM } from "@/lib/download";

interface AnalysisResultProps {
  result: AnalysisResult;
  previewUrl: string;
  onReset: () => void;
}

export default function AnalysisResultPanel({
  result,
  previewUrl,
  onReset,
}: AnalysisResultProps) {
  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <h2 className="text-[14px] font-bold text-foreground">
          Hasil Analisis
        </h2>
        <X className="w-4 h-4 text-neutral-300" strokeWidth={2} />
      </div>

      <div className="p-5 md:p-6 space-y-8">
        {/* Image + Summary */}
        <div className="flex flex-col sm:flex-row gap-5">
          {/* Room Image */}
          <div className="flex-1 rounded-xl overflow-hidden bg-neutral-100 min-h-[220px]">
            <img
              src={previewUrl}
              alt="Foto ruangan yang dianalisis"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Summary Card */}
          <div className="shrink-0">
            <SummaryCard
              data={{
                estimasi_ukuran: result.ringkasan.estimasi_ukuran,
                tipe_ruangan: result.ringkasan.tipe_ruangan,
                luas_estimasi: result.ringkasan.luas_estimasi,
                tingkat_finishing: result.ringkasan.tingkat_finishing,
              }}
            />
          </div>
        </div>

        {/* Analysis Description */}
        <div>
          <h3 className="text-[14px] font-bold text-foreground mb-2">
            Analisis Ruangan
          </h3>
          <p className="text-[14px] text-neutral-600 leading-relaxed">
            {result.analisis_ruangan}
          </p>
        </div>

        {/* BoM Table */}
        <div>
          <h3 className="text-[14px] font-bold text-foreground mb-4">
            Kebutuhan Material
          </h3>
          <BoMTable data={result.kebutuhan_material} />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border/60">
          <p className="text-[12px] text-neutral-500 italic">
            * Hasil estimasi bersifat sementara dan dapat berbeda di lapangan.
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onReset}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-white text-[13px] font-semibold text-foreground hover:bg-muted transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Analisis Baru
            </button>
            <button
              onClick={() => downloadBoM(result)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#111111] text-white text-[13px] font-semibold hover:bg-neutral-800 transition-colors shadow-md"
            >
              <Download className="w-4 h-4" />
              Unduh Hasil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
