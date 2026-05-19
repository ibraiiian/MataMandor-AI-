import { Package, Cuboid, Layers, Droplet, Square, CircleDashed } from "lucide-react";

interface MaterialItem {
  nama_barang: string;
  jumlah_estimasi: number;
  satuan: string;
  alasan: string;
}

interface BoMTableProps {
  data?: MaterialItem[];
}

const defaultData: MaterialItem[] = [
  {
    nama_barang: "Semen Portland",
    jumlah_estimasi: 24,
    satuan: "Zak (40kg)",
    alasan: "Untuk plesteran dinding dan acian",
  },
  {
    nama_barang: "Pasir Pasang",
    jumlah_estimasi: 3.2,
    satuan: "m³",
    alasan: "Untuk adukan plester dan acian",
  },
  {
    nama_barang: "Bata Merah",
    jumlah_estimasi: 1500,
    satuan: "pcs",
    alasan: "Perkiraan kebutuhan pasangan",
  },
  {
    nama_barang: "Cat Dinding (Putih)",
    jumlah_estimasi: 18,
    satuan: "Liter",
    alasan: "Untuk finishing dinding interior",
  },
  {
    nama_barang: "Keramik Lantai (60x60)",
    jumlah_estimasi: 45,
    satuan: "m²",
    alasan: "Untuk area lantai utama",
  },
  {
    nama_barang: "Plafon Gypsum",
    jumlah_estimasi: 36,
    satuan: "m²",
    alasan: "Untuk area plafon interior",
  },
];

function getMaterialIcon(name: string) {
  const n = name.toLowerCase();
  let Icon = Package;
  if (n.includes("semen")) Icon = Package;
  else if (n.includes("pasir")) Icon = Cuboid;
  else if (n.includes("bata")) Icon = Layers;
  else if (n.includes("cat")) Icon = Droplet;
  else if (n.includes("keramik")) Icon = Square;
  else if (n.includes("plafon") || n.includes("gypsum")) Icon = CircleDashed;

  return (
    <div className="w-8 h-8 rounded bg-neutral-100 flex items-center justify-center shrink-0">
      <Icon className="w-4 h-4 text-neutral-500" />
    </div>
  );
}

export default function BoMTable({ data }: BoMTableProps) {
  const materials = data || defaultData;

  return (
    <div className="w-full">
      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60">
              <th className="text-left py-3 px-4 font-medium text-neutral-500 text-[13px]">
                Nama Barang
              </th>
              <th className="text-left py-3 px-4 font-medium text-neutral-500 text-[13px]">
                Estimasi Jumlah
              </th>
              <th className="text-left py-3 px-4 font-medium text-neutral-500 text-[13px]">
                Satuan
              </th>
              <th className="text-left py-3 px-4 font-medium text-neutral-500 text-[13px]">
                Alasan
              </th>
            </tr>
          </thead>
          <tbody className="stagger-children">
            {materials.map((item, index) => (
              <tr
                key={index}
                className="border-b border-border/60 last:border-0 hover:bg-neutral-50/50 transition-colors duration-150"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    {getMaterialIcon(item.nama_barang)}
                    <span className="font-semibold text-[13px] text-foreground">
                      {item.nama_barang}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 font-semibold text-[13px] text-foreground tabular-nums">
                  {item.jumlah_estimasi.toLocaleString("id-ID")}
                </td>
                <td className="py-4 px-4 text-[13px] text-neutral-600">
                  {item.satuan}
                </td>
                <td className="py-4 px-4 text-[13px] text-neutral-600">
                  {item.alasan}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-3 stagger-children">
        {materials.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-border p-4 hover:shadow-sm transition-shadow duration-200"
          >
            <div className="flex items-center gap-2.5 mb-3">
              {getMaterialIcon(item.nama_barang)}
              <span className="font-semibold text-foreground text-[13px]">
                {item.nama_barang}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-xs text-muted-foreground block">Jumlah</span>
                <span className="font-semibold text-foreground tabular-nums">
                  {item.jumlah_estimasi.toLocaleString("id-ID")}
                </span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground block">Satuan</span>
                <span className="text-foreground">{item.satuan}</span>
              </div>
            </div>
            <div className="mt-2 text-sm">
              <span className="text-xs text-muted-foreground block">Alasan</span>
              <span className="text-muted-foreground">{item.alasan}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
