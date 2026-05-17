import { Ruler, Home, Move, Layers } from "lucide-react";

interface SummaryData {
  estimasi_ukuran: string;
  tipe_ruangan: string;
  luas_estimasi: string;
  tingkat_finishing: string;
}

interface SummaryCardProps {
  data?: SummaryData;
}

const defaultData: SummaryData = {
  estimasi_ukuran: "Sedang",
  tipe_ruangan: "Ruang Keluarga",
  luas_estimasi: "± 36 m²",
  tingkat_finishing: "Standar",
};

export default function SummaryCard({ data }: SummaryCardProps) {
  const summary = data || defaultData;

  const items = [
    {
      icon: Ruler,
      label: "Estimasi Ukuran",
      value: summary.estimasi_ukuran,
    },
    {
      icon: Home,
      label: "Tipe Ruangan",
      value: summary.tipe_ruangan,
    },
    {
      icon: Move,
      label: "Luas Estimasi",
      value: summary.luas_estimasi,
    },
    {
      icon: Layers,
      label: "Tingkat Finishing",
      value: summary.tingkat_finishing,
    },
  ];

  return (
    <div className="bg-[#f5f5f5] rounded-2xl p-5 h-full">
      <h3 className="text-sm font-bold text-foreground mb-4">Ringkasan Analisis</h3>
      <div className="space-y-2 stagger-children">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between px-4 py-3 bg-white rounded-xl shadow-sm border border-transparent"
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-4 h-4 text-neutral-500 shrink-0" strokeWidth={1.5} />
              <span className="text-[13px] text-neutral-600 whitespace-nowrap">{item.label}</span>
            </div>
            <span className="text-[13px] font-bold text-foreground text-right whitespace-nowrap ml-4">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
