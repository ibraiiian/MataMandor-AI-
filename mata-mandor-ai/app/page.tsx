"use client";

import { useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import ImageUploader from "./components/ImageUploader";
import SummaryCard from "./components/SummaryCard";
import BoMTable from "./components/BoMTable";
import AnalysisLoading from "./components/AnalysisLoading";
import AnalysisResultPanel from "./components/AnalysisResult";
import Toast from "./components/Toast";
import { AnalysisResult } from "@/lib/download";
import {
  Sparkles,
  Download,
  Camera,
  Target,
  FileText,
  ShieldCheck,
  X,
} from "lucide-react";

export default function Home() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [toast, setToast] = useState({ visible: false, message: "" });

  const handleAnalyze = useCallback(
    async (base64: string, mimeType: string, preview: string) => {
      setIsAnalyzing(true);
      setPreviewUrl(preview);
      setResult(null);

      try {
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64, mimeType }),
        });

        const data = await response.json();

        if (!response.ok) {
          setToast({ visible: true, message: data.error || "Gagal menganalisis gambar." });
          setIsAnalyzing(false);
          return;
        }

        // Check if image is valid according to Gemini
        if (data.is_valid_image === false) {
          setToast({
            visible: true,
            message: data.error_message || "Gambar tidak valid. Silakan unggah foto ruangan/bangunan.",
          });
          setIsAnalyzing(false);
          return;
        }

        setResult(data as AnalysisResult);
      } catch {
        setToast({
          visible: true,
          message: "Terjadi kesalahan jaringan. Silakan coba lagi.",
        });
      } finally {
        setIsAnalyzing(false);
      }
    },
    []
  );

  const handleReset = useCallback(() => {
    setResult(null);
    setPreviewUrl(null);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background" id="beranda">
      <Navbar />

      <main className="flex-1">
        {/* ========== HERO SECTION ========== */}
        <section className="relative overflow-hidden">
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23000' stroke-width='0.5'%3E%3Cpath d='M0 0h40v40H0z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left Column: Hero Text + Uploader */}
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-50 border border-neutral-100 text-[13px] font-semibold text-neutral-500">
                  AI Estimator Material Bangunan
                </div>

                {/* Heading */}
                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] tracking-tight text-foreground">
                    Foto Ruangan.
                    <br />
                    Dapatkan Estimasi
                    <br />
                    <span className="text-[#888888]">Material Instan.</span>
                  </h1>
                  <p className="text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed">
                    MataMandor AI membantu Anda menghitung kebutuhan material
                    bangunan hanya dengan satu foto.
                  </p>
                </div>

                {/* Image Uploader */}
                <ImageUploader
                  onAnalyze={handleAnalyze}
                  isAnalyzing={isAnalyzing}
                />

                {/* Gemini Branding */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Sparkles className="w-4 h-4" strokeWidth={1.5} />
                    <span className="text-sm font-semibold">
                      Didukung oleh AI Gemini
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
                    Analisis visual cerdas untuk hasil yang akurat dan cepat.
                  </p>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-[#fafafa] text-xs font-medium text-muted-foreground">
                    <Sparkles className="w-3.5 h-3.5 text-foreground" />
                    Powered by Gemini
                  </div>
                </div>
              </div>

              {/* Right Column: Result or Example */}
              <div className="lg:sticky lg:top-24">
                {isAnalyzing ? (
                  /* Loading State */
                  <AnalysisLoading />
                ) : result && previewUrl ? (
                  /* Real Result */
                  <AnalysisResultPanel
                    result={result}
                    previewUrl={previewUrl}
                    onReset={handleReset}
                  />
                ) : (
                  /* Static Example */
                  <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                      <h2 className="text-[14px] font-bold text-foreground">
                        Contoh Hasil Analisis
                      </h2>
                      <X
                        className="w-4 h-4 text-neutral-300"
                        strokeWidth={2}
                      />
                    </div>

                    <div className="p-5 md:p-6 space-y-8">
                      {/* Sample Room Image + Summary */}
                      <div className="flex flex-col sm:flex-row gap-5">
                        {/* Room Image */}
                        <div className="flex-1 rounded-xl overflow-hidden bg-neutral-100 min-h-[220px]">
                          <img
                            src="/sample-room.png"
                            alt="Contoh foto ruangan unfinished"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {/* Summary Card */}
                        <div className="shrink-0">
                          <SummaryCard />
                        </div>
                      </div>

                      {/* Analysis Description */}
                      <div>
                        <h3 className="text-[14px] font-bold text-foreground mb-2">
                          Analisis Ruangan
                        </h3>
                        <p className="text-[14px] text-neutral-600 leading-relaxed">
                          Ruangan dengan kondisi unfinished, dinding bata merah,
                          struktur beton terlihat. Diperlukan pekerjaan finishing
                          dinding, lantai, dan plafon.
                        </p>
                      </div>

                      {/* BoM Table */}
                      <div>
                        <h3 className="text-[14px] font-bold text-foreground mb-4">
                          Kebutuhan Material
                        </h3>
                        <BoMTable />
                      </div>

                      {/* Disclaimer & Download */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border/60">
                        <p className="text-[12px] text-neutral-500 italic">
                          * Hasil estimasi bersifat sementara dan dapat berbeda
                          di lapangan.
                        </p>
                        <button className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#111111] text-white text-[13px] font-semibold hover:bg-neutral-800 transition-colors duration-200 shrink-0 shadow-md">
                          <Download className="w-4 h-4" />
                          Unduh Hasil
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ========== FEATURES SECTION ========== */}
        <section
          className="border-t border-border bg-muted/30"
          id="keunggulan"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="bg-white border border-border rounded-2xl flex flex-col md:flex-row overflow-hidden divide-y md:divide-y-0 md:divide-x divide-border shadow-sm">
              {[
                {
                  icon: Camera,
                  title: "Cepat & Praktis",
                  desc: "Hanya butuh 1 foto untuk dapatkan estimasi instan.",
                },
                {
                  icon: Target,
                  title: "Akurat dengan AI",
                  desc: "Ditengahi teknologi AI Gemini untuk analisis visual cerdas.",
                },
                {
                  icon: FileText,
                  title: "Rincian Material",
                  desc: "Daftar material lengkap dengan jumlah dan alasan penggunaan.",
                },
                {
                  icon: ShieldCheck,
                  title: "Aman & Terpercaya",
                  desc: "Data Anda aman dan tidak dibagikan ke pihak lain.",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="flex-1 flex flex-col items-center text-center p-8 hover:bg-neutral-50 transition-colors duration-200 group"
                >
                  <div className="w-12 h-12 rounded-[14px] bg-[#fafafa] border border-border flex items-center justify-center mb-5 group-hover:border-neutral-300 transition-all duration-200">
                    <feature.icon
                      className="w-5 h-5 text-foreground"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-[14px] font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ========== FOOTER ========== */}
      <footer className="border-t border-border bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © 2026 MataMandor AI. Visual BoM Estimator.
            </p>
            <p className="text-xs text-muted-foreground">
              Dibuat untuk Google #JuaraVibeCoding
            </p>
          </div>
        </div>
      </footer>

      {/* Global Toast */}
      <Toast
        message={toast.message}
        visible={toast.visible}
        onClose={() => setToast({ visible: false, message: "" })}
      />
    </div>
  );
}
