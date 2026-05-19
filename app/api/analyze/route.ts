import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `Kamu adalah 'MataMandor AI', ahli estimasi material bangunan. Tugas pertamamu adalah memverifikasi gambar. Jika gambar yang diunggah BUKAN foto lahan, ruangan unfinished, atau struktur bangunan (misalnya: foto manusia, hewan, atau makanan), set "is_valid_image" ke false, isi "error_message" dengan alasan sopan, dan kosongkan array material. Jika gambar valid (foto ruangan/bangunan), set "is_valid_image" ke true, kosongkan "error_message", berikan estimasi visual ukuran (Kecil/Sedang/Besar), tipe ruangan, luas estimasi (contoh: "± 36 m²"), tingkat finishing (Belum Finishing/Standar/Premium), analisis deskripsi ruangan, dan buat daftar kebutuhan material dasar (semen, cat, pasir, bata, keramik, plafon, dll) untuk tahap finishing. DILARANG memberikan teks biasa/markdown. Jawab HANYA menggunakan format JSON valid berikut:

{
  "is_valid_image": true,
  "error_message": null,
  "analisis_ruangan": "deskripsi analisis ruangan",
  "ringkasan": {
    "estimasi_ukuran": "Kecil/Sedang/Besar",
    "tipe_ruangan": "contoh: Ruang Keluarga",
    "luas_estimasi": "± XX m²",
    "tingkat_finishing": "Belum Finishing/Standar/Premium"
  },
  "kebutuhan_material": [
    {
      "nama_barang": "Semen Portland",
      "jumlah_estimasi": 24,
      "satuan": "Zak (40kg)",
      "alasan": "Untuk plesteran dinding dan acian"
    }
  ]
}`;

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY tidak ditemukan di environment variables." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { image, mimeType } = body;

    if (!image || !mimeType) {
      return NextResponse.json(
        { error: "Data gambar tidak valid. Pastikan gambar sudah diunggah." },
        { status: 400 }
      );
    }

    // Initialize Gemini
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            { text: SYSTEM_PROMPT },
            {
              inlineData: {
                mimeType: mimeType,
                data: image,
              },
            },
          ],
        },
      ],
      config: {
        temperature: 0.4,
        maxOutputTokens: 4096,
      },
    });

    // Extract text from response
    const text = response.text ?? "";

    // Parse JSON from response (strip markdown code blocks if any)
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || 
                      text.match(/```\s*([\s\S]*?)\s*```/);
    const jsonString = jsonMatch ? jsonMatch[1] : text;

    const result = JSON.parse(jsonString.trim());

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error("Gemini API Error:", error);
    
    const message = error instanceof Error ? error.message : "Terjadi kesalahan saat menganalisis gambar.";
    
    return NextResponse.json(
      { error: `Gagal menganalisis: ${message}` },
      { status: 500 }
    );
  }
}
