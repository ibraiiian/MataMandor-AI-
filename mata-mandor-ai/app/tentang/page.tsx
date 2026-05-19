import Navbar from "../components/Navbar";
import {
  Target,
  Flag,
  Heart,
  Users,
  FileText,
  Crosshair,
  Timer,
  Home,
  HardHat,
  Store,
  PenTool,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

export default function TentangPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa]">
      <Navbar />

      <main className="flex-1">
        {/* ========== HERO SECTION ========== */}
        <section className="relative overflow-hidden pt-12 lg:pt-24 pb-16 lg:pb-24 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              {/* Left Content */}
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-neutral-200 shadow-sm text-[13px] font-semibold text-neutral-600">
                  Tentang MataMandor AI
                </div>

                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-foreground">
                    Membangun Masa Depan Konstruksi dengan AI.
                  </h1>
                  <p className="text-base sm:text-lg text-muted-foreground max-w-lg leading-relaxed">
                    MataMandor AI hadir untuk membantu siapa saja menghitung
                    kebutuhan material bangunan secara cepat, akurat, dan mudah
                    hanya dari satu foto ruangan.
                  </p>
                </div>

                {/* Values 3 items */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                      <h3 className="text-[14px] font-bold text-foreground">Visi Kami</h3>
                    </div>
                    <p className="text-[12px] text-muted-foreground leading-relaxed pr-2">
                      Menjadi platform estimasi material bangunan paling andal di Indonesia.
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Flag className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                      <h3 className="text-[14px] font-bold text-foreground">Misi Kami</h3>
                    </div>
                    <p className="text-[12px] text-muted-foreground leading-relaxed pr-2">
                      Mempermudah perencanaan bangunan dengan teknologi AI yang cerdas dan mudah diakses semua orang.
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                      <h3 className="text-[14px] font-bold text-foreground">Nilai Kami</h3>
                    </div>
                    <p className="text-[12px] text-muted-foreground leading-relaxed">
                      Akurat, Sederhana, Cepat, Transparan, dan Berorientasi pada pengguna.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Image */}
              <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-[600px] flex items-center justify-center">
                <img
                  src="/hero-tentang.png"
                  alt="Ilustrasi bangunan pensil AI"
                  className="w-full h-full object-contain mix-blend-multiply opacity-90 scale-125 lg:scale-[1.3]"
                />
              </div>

            </div>
          </div>
        </section>

        {/* ========== STATS SECTION ========== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-2xl border border-border shadow-sm p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-border">
              
              <div className="flex items-center gap-4 lg:px-8 first:lg:pl-0">
                <div className="shrink-0 w-14 h-14 bg-[#111111] rounded-[14px] flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-[18px] font-extrabold text-foreground leading-tight">10K+</h3>
                  <p className="text-[13px] font-bold text-foreground mb-0.5">Pengguna Aktif</p>
                  <p className="text-[11px] text-muted-foreground">Sudah mempercayai<br/>MataMandor AI</p>
                </div>
              </div>

              <div className="flex items-center gap-4 lg:px-8">
                <div className="shrink-0 w-14 h-14 bg-[#111111] rounded-[14px] flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-[18px] font-extrabold text-foreground leading-tight">50K+</h3>
                  <p className="text-[13px] font-bold text-foreground mb-0.5">Analisis Berhasil</p>
                  <p className="text-[11px] text-muted-foreground">Estimasi material berhasil<br/>dihasilkan</p>
                </div>
              </div>

              <div className="flex items-center gap-4 lg:px-8">
                <div className="shrink-0 w-14 h-14 bg-[#111111] rounded-[14px] flex items-center justify-center">
                  <Crosshair className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-[18px] font-extrabold text-foreground leading-tight">98%</h3>
                  <p className="text-[13px] font-bold text-foreground mb-0.5">Tingkat Akurasi</p>
                  <p className="text-[11px] text-muted-foreground">Hasil estimasi yang akurat<br/>dan relevan</p>
                </div>
              </div>

              <div className="flex items-center gap-4 lg:px-8 last:lg:pr-0">
                <div className="shrink-0 w-14 h-14 bg-[#111111] rounded-[14px] flex items-center justify-center">
                  <Timer className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[14px] font-bold text-foreground mb-0.5">Hemat Waktu</p>
                  <p className="text-[12px] text-muted-foreground">Hitungan menit, bukan<br/>berjam-jam</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========== TARGET AUDIENCE SECTION ========== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center">
          <div className="mb-10">
            <h2 className="text-[20px] font-extrabold text-foreground mb-2">Dibangun untuk Semua Kebutuhan</h2>
            <p className="text-[14px] text-muted-foreground">
              MataMandor AI dirancang untuk membantu berbagai pihak dalam perencanaan dan pembangunan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {[
              {
                icon: Home,
                title: "Pemilik Rumah",
                desc: "Hitung kebutuhan material untuk renovasi atau bangun rumah dengan mudah."
              },
              {
                icon: HardHat,
                title: "Kontraktor",
                desc: "Siapkan RAB lebih cepat dan akurat untuk setiap proyek konstruksi."
              },
              {
                icon: Store,
                title: "Toko Material",
                desc: "Berikan estimasi cepat ke pelanggan dan tingkatkan pelayanan toko Anda."
              },
              {
                icon: PenTool,
                title: "Arsitek & Desainer",
                desc: "Dukung proses desain dengan perkiraan material yang lebih akurat sejak awal."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-border shadow-sm flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-foreground" strokeWidth={1} />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-foreground mb-1.5">{item.title}</h3>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========== CONTACT CTA ========== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="bg-white rounded-2xl border border-border p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="shrink-0 w-12 h-12 bg-[#111111] rounded-2xl flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-foreground mb-0.5">Punya pertanyaan atau masukan?</h3>
                <p className="text-[13px] text-muted-foreground">Kami selalu terbuka untuk berdiskusi dan berkolaborasi.</p>
              </div>
            </div>
            
            <button className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-white text-[13px] font-semibold text-foreground hover:bg-neutral-50 transition-colors">
              Hubungi Kami
              <ArrowRight className="w-4 h-4" />
            </button>
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
