import Navbar from "../components/Navbar";
import {
  CloudUpload,
  Box,
  Calculator,
  FileDown,
  MoveRight,
  Check,
  Zap,
  Target,
  FileText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function CaraKerja() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1">
        {/* ========== HERO SECTION ========== */}
        <section className="relative overflow-hidden border-b border-border">
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23000' stroke-width='0.5'%3E%3Cpath d='M0 0h40v40H0z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          
          {/* Right Building Sketch Background */}
          <div 
            className="absolute right-0 top-0 w-full md:w-[600px] lg:w-[800px] h-full opacity-[0.15] pointer-events-none"
            style={{
              backgroundImage: 'url(/bg-crane-right.png)',
              backgroundSize: 'contain',
              backgroundPosition: 'right bottom',
              backgroundRepeat: 'no-repeat',
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="max-w-3xl mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-50 border border-neutral-100 text-[13px] font-semibold text-neutral-500 mb-6">
                Alur Kerja AI Estimator
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] tracking-tight text-foreground mb-6">
                Cara Kerja MataMandor AI
              </h1>
              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl">
                Hanya dengan satu foto ruangan, MataMandor AI akan menganalisis struktur bangunan dan memberikan estimasi material yang terstruktur dan siap digunakan.
              </p>
            </div>

            {/* 4 Steps Flow */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Connecting line (desktop only) */}
              <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[1px] border-t-2 border-dashed border-neutral-200 -z-10 transform -translate-y-1/2" />

              {[
                {
                  step: "01",
                  icon: CloudUpload,
                  title: "Upload Foto Ruangan",
                  desc: "Unggah foto ruangan yang ingin dianalisis. Pastikan foto jelas dan mencakup seluruh area.",
                },
                {
                  step: "02",
                  icon: Box,
                  title: "AI Menganalisis Struktur",
                  desc: "AI mendeteksi elemen seperti dinding, lantai, plafon, dan bukaan untuk memahami struktur ruangan.",
                },
                {
                  step: "03",
                  icon: Calculator,
                  title: "Sistem Menghitung Kebutuhan Material",
                  desc: "Sistem menghitung kebutuhan material berdasarkan hasil analisis dan standar konstruksi yang relevan.",
                },
                {
                  step: "04",
                  icon: FileDown,
                  title: "Hasil BoM Siap Diunduh",
                  desc: "Estimasi material tersusun rapi dalam BoM dan siap Anda tinjau maupun unduh untuk digunakan.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border border-border shadow-sm flex flex-col h-full relative"
                >
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center text-[11px] font-bold text-foreground">
                    {item.step}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#fafafa] border border-border flex items-center justify-center mb-5">
                    <item.icon className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[15px] font-bold text-foreground mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-neutral-600 leading-relaxed mt-auto">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== VISUAL WORKFLOW SECTION ========== */}
        <section className="py-16 lg:py-24 bg-[#fafafa] border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[15px] font-semibold text-neutral-500 mb-8">
              Alur Kerja Secara Visual
            </h2>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
              {/* Box 1: Input */}
              <div className="bg-white rounded-2xl border border-border p-6 shadow-sm w-full max-w-[400px]">
                <h3 className="text-sm font-bold text-foreground mb-4">1. Foto Ruangan Anda</h3>
                <div className="rounded-xl overflow-hidden bg-neutral-100 aspect-[4/3] mb-4">
                  <img
                    src="/sample-room.png"
                    alt="Contoh foto ruangan"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full rounded-xl border border-dashed border-border bg-[#fafafa] py-4 flex flex-col items-center justify-center gap-2">
                  <CloudUpload className="w-5 h-5 text-neutral-400" />
                  <div className="text-center">
                    <p className="text-[13px] font-medium text-foreground">
                      Upload atau drag & drop foto di sini
                    </p>
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      JPG, JPEG, PNG • Maks. 4MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <MoveRight className="hidden lg:block w-8 h-8 text-neutral-400 shrink-0" strokeWidth={1.5} />
              <div className="lg:hidden w-px h-8 border-l-2 border-dashed border-border" />

              {/* Box 2: Processing */}
              <div className="bg-white rounded-2xl border border-border p-6 shadow-sm w-full max-w-[400px]">
                <h3 className="text-sm font-bold text-foreground mb-4 text-center">2. Proses AI</h3>
                <div className="flex flex-col items-center py-6">
                  <div className="relative w-24 h-24 flex items-center justify-center mb-8">
                    {/* Pulsing ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-neutral-300 animate-[spin_10s_linear_infinite]" />
                    <div className="absolute inset-2 rounded-full border border-neutral-200 animate-[spin_15s_linear_infinite_reverse]" />
                    {/* Core icon */}
                    <div className="w-14 h-14 bg-foreground rounded-xl flex items-center justify-center relative z-10 shadow-lg">
                      <Box className="w-6 h-6 text-white" strokeWidth={2} />
                    </div>
                    {/* Sparkles */}
                    <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-neutral-400 animate-pulse" />
                    <Sparkles className="absolute bottom-2 -left-3 w-3 h-3 text-neutral-300 animate-pulse delay-150" />
                  </div>

                  {/* Checklist */}
                  <div className="space-y-3 w-full max-w-[240px]">
                    {[
                      "Deteksi elemen struktur",
                      "Perhitungan volume",
                      "Pencocokan standar material"
                    ].map((text, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#fafafa] border border-border flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-foreground" strokeWidth={2} />
                        </div>
                        <span className="text-[13px] text-neutral-600">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <MoveRight className="hidden lg:block w-8 h-8 text-neutral-400 shrink-0" strokeWidth={1.5} />
              <div className="lg:hidden w-px h-8 border-l-2 border-dashed border-border" />

              {/* Box 3: Output */}
              <div className="bg-white rounded-2xl border border-border p-6 shadow-sm w-full max-w-[400px]">
                <h3 className="text-sm font-bold text-foreground mb-4">3. Hasil Estimasi Material (BoM)</h3>
                
                <div className="w-full text-left mb-6">
                  <div className="grid grid-cols-[2fr_1fr_1fr] border-b border-border pb-2 mb-3">
                    <span className="text-[11px] font-medium text-neutral-500">Nama Barang</span>
                    <span className="text-[11px] font-medium text-neutral-500">Estimasi Jumlah</span>
                    <span className="text-[11px] font-medium text-neutral-500">Satuan</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: "Semen Portland", qty: "24 (40kg)", unit: "Zak" },
                      { name: "Pasir Pasang", qty: "3.2", unit: "m³" },
                      { name: "Bata Merah", qty: "1.500", unit: "pcs" },
                      { name: "Cat Dinding (Putih)", qty: "18", unit: "Liter" },
                      { name: "Keramik Lantai (60x60)", qty: "45", unit: "m²" },
                    ].map((row, i) => (
                      <div key={i} className="grid grid-cols-[2fr_1fr_1fr]">
                        <span className="text-[12px] font-bold text-foreground truncate pr-2">{row.name}</span>
                        <span className="text-[12px] text-neutral-600">{row.qty}</span>
                        <span className="text-[12px] text-neutral-600">{row.unit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border bg-[#fafafa] hover:bg-neutral-100 transition-colors text-[13px] font-semibold text-foreground">
                  <FileDown className="w-4 h-4" />
                  Unduh Hasil BoM
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ========== WHY EFFECTIVE SECTION ========== */}
        <section className="relative py-16 lg:py-24 border-b border-border bg-white overflow-hidden">
          {/* Left Building Sketch Background */}
          <div 
            className="absolute left-0 bottom-0 w-full md:w-[500px] lg:w-[700px] h-[150%] opacity-[0.12] pointer-events-none"
            style={{
              backgroundImage: 'url(/bg-crane-left.png)',
              backgroundSize: 'contain',
              backgroundPosition: 'left bottom',
              backgroundRepeat: 'no-repeat',
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[16px] font-bold text-foreground mb-8">
              Kenapa Proses Ini Efektif?
            </h2>

            <div className="bg-white border border-border rounded-2xl flex flex-col md:flex-row overflow-hidden divide-y md:divide-y-0 md:divide-x divide-border shadow-sm">
              {[
                {
                  icon: Zap,
                  title: "Cepat",
                  desc: "Dari foto ke hasil hanya dalam hitungan detik, hemat waktu dan tenaga.",
                },
                {
                  icon: Target,
                  title: "Akurat",
                  desc: "Analisis berbasis AI yang terlatih dengan data konstruksi nyata.",
                },
                {
                  icon: FileText,
                  title: "Terstruktur",
                  desc: "Hasil estimasi tersusun rapi dan siap digunakan untuk berbagai keperluan.",
                },
                {
                  icon: ShieldCheck,
                  title: "Aman",
                  desc: "Data dan foto Anda aman dan tidak dibagikan ke pihak lain.",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="flex-1 flex flex-col items-center md:items-start text-center md:text-left p-6 hover:bg-neutral-50 transition-colors duration-200 group"
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

        {/* ========== CTA SECTION ========== */}
        <section className="py-12 lg:py-16 bg-[#fafafa]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border border-border rounded-2xl p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex mt-1">
                  <Sparkles className="w-8 h-8 text-neutral-300" strokeWidth={1} />
                </div>
                <div>
                  <h2 className="text-[18px] sm:text-[20px] font-bold text-foreground mb-2">
                    Siap mendapatkan estimasi material yang cepat dan akurat?
                  </h2>
                  <p className="text-[14px] text-neutral-500">
                    Coba MataMandor AI sekarang dan permudah perencanaan proyek Anda.
                  </p>
                </div>
              </div>
              <a
                href="/"
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#111111] text-white text-[14px] font-semibold hover:bg-neutral-800 transition-all duration-200 shadow-md"
              >
                Coba Sekarang
                <MoveRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* ========== FOOTER ========== */}
      <footer className="border-t border-border bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-foreground rounded-md flex items-center justify-center">
                <Box className="w-3.5 h-3.5 text-white" strokeWidth={2} />
              </div>
              <span className="text-[13px] font-bold">MataMandor AI</span>
            </div>
            <p className="text-[12px] text-neutral-500">
              © 2024 MataMandor AI. Semua hak dilindungi.
            </p>
            <div className="flex gap-6 text-[12px] text-neutral-500 font-medium">
              <a href="#" className="hover:text-foreground transition-colors">Kebijakan Privasi</a>
              <a href="#" className="hover:text-foreground transition-colors">Syarat & Ketentuan</a>
              <a href="#" className="hover:text-foreground transition-colors">Kontak</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
