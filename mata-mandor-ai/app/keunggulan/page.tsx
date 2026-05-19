import Navbar from "../components/Navbar";
import {
  Gauge,
  Target,
  ClipboardList,
  ShieldCheck,
  Smartphone,
  Pointer,
  Clock,
  Calculator,
  Store,
  Camera,
  Download,
  BadgeCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function KeunggulanPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa]">
      <Navbar />

      <main className="flex-1">
        {/* ========== HERO SECTION ========== */}
        <section className="relative overflow-hidden pt-12 lg:pt-20 pb-16 lg:pb-24">
          {/* Left Building Sketch Background */}
          <div 
            className="absolute left-0 top-0 w-full md:w-[500px] lg:w-[700px] h-full opacity-[0.12] pointer-events-none"
            style={{
              backgroundImage: 'url(/bg-crane-left.png)',
              backgroundSize: 'contain',
              backgroundPosition: 'left bottom',
              backgroundRepeat: 'no-repeat',
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

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-neutral-200 shadow-sm text-[13px] font-semibold text-neutral-600">
              Fitur & Manfaat AI Estimator
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-foreground">
              Keunggulan MataMandor AI
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              MataMandor AI membantu Anda menghitung kebutuhan material bangunan
              hanya dari satu foto dengan cepat, akurat, dan hasil yang
              terstruktur.
            </p>
          </div>
        </section>

        {/* ========== GRID 6 FITUR ========== */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: Gauge,
                title: "Cepat & Praktis",
                desc: "Dapatkan estimasi material hanya dari 1 foto ruangan dalam hitungan detik.",
              },
              {
                icon: Target,
                title: "Akurat dengan AI",
                desc: "Didukung AI Gemini untuk analisis visual yang akurat dan konsisten setiap saat.",
              },
              {
                icon: ClipboardList,
                title: "Hasil Terstruktur",
                desc: "Hasil estimasi tersusun rapi dalam BoM lengkap dengan jumlah dan alasan penggunaan.",
              },
              {
                icon: ShieldCheck,
                title: "Aman & Privat",
                desc: "Data foto dan hasil analisis aman dan tidak dibagikan ke pihak lain.",
              },
              {
                icon: Smartphone,
                title: "Mobile Friendly",
                desc: "Akses kapan pun dan di mana pun dari perangkat mobile maupun desktop.",
              },
              {
                icon: Pointer,
                title: "Mudah Digunakan",
                desc: "Alur sederhana dan intuitif, cocok untuk semua pengguna tanpa pelatihan khusus.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow flex items-start gap-4"
              >
                <div className="shrink-0 w-12 h-12 rounded-full bg-neutral-50 flex items-center justify-center border border-neutral-100">
                  <feature.icon className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-foreground mb-1.5">
                    {feature.title}
                  </h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========== COMPLEX CARD COMPARISON ========== */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1.5fr] gap-8 items-center">
              
              {/* Left Column: Contoh Hasil Analisis */}
              <div className="space-y-4">
                <h3 className="text-[13px] font-bold text-foreground">Contoh Hasil Analisis</h3>
                <div className="space-y-2">
                  {[
                    "Deteksi elemen struktur",
                    "Perhitungan volume",
                    "Pencocokan standar material",
                    "Estimasi kebutuhan material",
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 border border-neutral-100"
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-neutral-400" strokeWidth={2} />
                        <span className="text-[13px] text-neutral-700 font-medium">{item}</span>
                      </div>
                      <span className="text-[11px] font-medium text-neutral-400">Selesai</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Middle Column: Ringkasan Material & Arrow */}
              <div className="relative">
                {/* Visual Arrow connector for desktop */}
                <div className="hidden lg:flex absolute top-1/2 -right-8 transform -translate-y-1/2 w-8 h-8 items-center justify-center bg-white border border-neutral-200 rounded-full shadow-sm z-10">
                  <ArrowRight className="w-4 h-4 text-neutral-400" />
                </div>

                <div className="space-y-4">
                  <h3 className="text-[13px] font-bold text-foreground">Ringkasan Material</h3>
                  <div className="space-y-3">
                    {[
                      { icon: "📦", name: "Semen Portland", qty: "24 Zak (40kg)" },
                      { icon: "🧱", name: "Pasir Pasang", qty: "3.2 m³" },
                      { icon: "🧱", name: "Bata Merah", qty: "1,500 pcs" },
                      { icon: "🛢️", name: "Cat Dinding (Putih)", qty: "18 Liter" },
                      { icon: "⬜", name: "Keramik Lantai (60x60)", qty: "45 m²" },
                      { icon: "📋", name: "Plafon Gypsum", qty: "36 m²" },
                    ].map((mat, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-base opacity-70 grayscale">{mat.icon}</span>
                          <span className="text-[13px] font-medium text-neutral-700">{mat.name}</span>
                        </div>
                        <span className="text-[12px] text-neutral-500">{mat.qty}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Key Benefits Stacked */}
              <div className="space-y-4 pl-0 lg:pl-6 border-t lg:border-t-0 lg:border-l border-neutral-100 pt-6 lg:pt-0">
                {[
                  {
                    icon: Clock,
                    title: "Menghemat Waktu",
                    desc: "Hilangkan proses ukur ulang dan hitung manual yang memakan waktu. Dapatkan estimasi cepat dalam hitungan detik.",
                  },
                  {
                    icon: Calculator,
                    title: "Mengurangi Perkiraan Manual",
                    desc: "Kurangi risiko salah hitung dan estimasi berlebihan dengan bantuan AI yang lebih akurat dan konsisten.",
                  },
                  {
                    icon: Store,
                    title: "Siap Digunakan untuk Toko / Proyek",
                    desc: "BoM siap digunakan untuk perencanaan, penawaran ke pelanggan, hingga pembelian material.",
                  },
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl hover:bg-neutral-50 transition-colors">
                    <div className="shrink-0 w-10 h-10 rounded-full border border-neutral-200 bg-white flex items-center justify-center">
                      <benefit.icon className="w-4 h-4 text-foreground" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-foreground mb-1">{benefit.title}</h4>
                      <p className="text-[12px] text-muted-foreground leading-relaxed">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ========== BOTTOM 3 INFO CARDS ========== */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: Camera,
                title: "1 foto untuk estimasi awal",
                desc: "Cukup unggah 1 foto ruangan. AI akan menganalisis dan memahami struktur secara otomatis.",
              },
              {
                icon: Download,
                title: "BoM siap diunduh",
                desc: "Hasil estimasi dalam format rapi. Unduh mudah dalam hitungan detik.",
              },
              {
                icon: BadgeCheck,
                title: "Analisis lebih konsisten",
                desc: "AI menerapkan standar perhitungan yang konsisten untuk setiap analisis.",
              },
            ].map((info, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm flex items-center gap-4">
                <div className="shrink-0 w-12 h-12 rounded-full border border-neutral-100 flex items-center justify-center">
                  <info.icon className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-foreground mb-1">{info.title}</h4>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">{info.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========== CTA BANNER ========== */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="relative bg-white border border-neutral-200 rounded-2xl p-8 lg:p-12 overflow-hidden shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Sparkles Decoration */}
            <div className="absolute top-6 left-6 opacity-20">
              <Sparkles className="w-16 h-16 text-neutral-300" strokeWidth={1} />
            </div>
            <div className="absolute bottom-6 right-6 opacity-20">
              <Sparkles className="w-12 h-12 text-neutral-300" strokeWidth={1} />
            </div>

            <div className="relative z-10 max-w-xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                Siap membuat estimasi material lebih cepat?
              </h2>
              <p className="text-[15px] text-muted-foreground">
                Bergabung dengan ribuan pengguna yang sudah merasakan kemudahan
                MataMandor AI.
              </p>
            </div>

            <div className="relative z-10 shrink-0">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#111111] text-white text-[14px] font-semibold hover:bg-neutral-800 transition-colors shadow-md">
                Coba Sekarang
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ========== FOOTER ========== */}
      <footer className="border-t border-border bg-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 opacity-80">
            <img
              src="/logo-mata-mandor-transparent.png"
              alt="MataMandor AI"
              width={24}
              height={24}
            />
            <div className="leading-tight">
              <span className="text-[13px] font-bold tracking-tight text-foreground block">
                MataMandor AI
              </span>
              <span className="text-[10px] text-muted-foreground block -mt-0.5">
                Visual BoM Estimator
              </span>
            </div>
          </div>

          <p className="text-[12px] text-muted-foreground text-center">
            © 2024 MataMandor AI. Semua hak dilindungi.
          </p>

          <div className="flex items-center gap-6">
            <a href="#" className="text-[12px] font-medium text-muted-foreground hover:text-foreground transition-colors">Kebijakan Privasi</a>
            <a href="#" className="text-[12px] font-medium text-muted-foreground hover:text-foreground transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="text-[12px] font-medium text-muted-foreground hover:text-foreground transition-colors">Kontak</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
