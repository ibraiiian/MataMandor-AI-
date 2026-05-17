
# Product Requirements Document (PRD)
**Project Name:** MataMandor AI (Visual BoM Estimator)
**Target Platform:** Web Application (Mobile-Responsive)
**Deployment Target:** Google Cloud Run
**Event Context:** Google #JuaraVibeCoding

## 1. Project Overview
MataMandor AI adalah aplikasi *Visual Bill of Materials* (BoM) Estimator. Aplikasi ini memecahkan masalah kalkulasi material bangunan bagi pemilik rumah dan efisiensi pelayanan bagi toko perangkat keras/bangunan. Pengguna mengunggah foto ruangan yang belum selesai (*unfinished*/bata merah), dan sistem akan menggunakan Gemini Vision AI untuk menganalisis foto tersebut, memvalidasi input, lalu mengembalikan daftar kebutuhan material bangunan yang terstruktur.

## 2. Tech Stack & Architecture
- **Frontend & Backend (Monolith):** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **AI Integration:** Google Generative AI SDK (`@google/generative-ai` atau REST API standar)
- **Model:** `gemini-1.5-flash` atau `gemini-1.5-pro` (mendukung Multimodal/Vision)
- **Containerization:** Docker (wajib dipersiapkan untuk *deploy* ke Google Cloud Run)

## 3. Design System & UI/UX Guidelines (STRICT RULES)
AI Agent WAJIB mematuhi panduan desain ini:
- **Theme:** Monochrome mutlak (Hitam, Putih, dan skala Abu-abu / Grayscale).
- **Vibe:** Modern SaaS, minimalis, *clean*, profesional, dan bernuansa teknikal.
- **Borders & Shadows:** Gunakan border tipis (`border-gray-200` atau `border-gray-300`) dan *shadow* yang sangat halus (`shadow-sm` atau `shadow-md`). Hindari *shadow* tebal.
- **Typography:** Gunakan *font* Sans-Serif modern (Inter atau Geist).
- **Mobile-First & Responsive Layout:** Antarmuka harus dioptimalkan untuk layar ponsel. Untuk komponen `BoMTable` (tabel material), wajib menggunakan `overflow-x-auto` di layar kecil, atau ubah menjadi *stacking cards* pada *breakpoint* `sm` (mobile) agar UI tidak pecah/terpotong.
- **Prohibited:** DILARANG KERAS menggunakan warna-warna cerah atau *gradient* (seperti merah, biru, hijau) kecuali untuk *state* khusus (misalnya merah pastel untuk *error message*).

## 4. Core Features, Validation & User Flow
1. **Landing / Input Area:** Pengguna melihat UI *drag-and-drop* yang bersih untuk mengunggah 1 buah foto ruangan.
2. **Client-Side Validation (SANGAT PENTING):**
   - **Format diizinkan:** `.jpg`, `.jpeg`, `.png`, `.webp`.
   - **Batas Ukuran:** Maksimal 4MB per foto.
   - **Error Handling:** Jika validasi gagal, tampilkan *toast notification* bergaya minimalis monokrom. Jangan teruskan *request* ke *server*.
3. **Loading State:** Saat foto tervalidasi dan dikirim, tampilkan animasi *spinner* monokrom dengan teks indikator "Sedang menganalisis struktur ruangan...".
4. **AI Processing:** *Frontend* mengirim foto ke Next.js API Route (`/api/analyze`), yang meneruskannya ke Gemini Vision API.
5. **Data Rendering:** AI mengembalikan data JSON. *Frontend* menangkap JSON ini dan merendernya.

## 5. Security & API Architecture Guidelines
- **Environment Variables:** API Key WAJIB diletakkan di `.env.local` sebagai `GEMINI_API_KEY`.
- **Server-Side Only:** Pemanggilan ke Google Generative AI SDK HARUS dilakukan murni di *Server Component* atau Next.js API Routes (`/api/analyze/route.ts`). DILARANG KERAS melakukan inisialisasi Gemini di *Client Component* untuk mencegah kebocoran *billing key*.

## 6. AI System Prompt & Expected JSON Schema
AI Agent harus memasukkan *prompt* ini saat mengonfigurasi panggilan API ke Gemini. Ini mengandung perlindungan (*Anti-Halu*) untuk foto yang tidak relevan.

**System Prompt untuk Gemini:**
"Kamu adalah 'MataMandor AI', ahli estimasi material bangunan. Tugas pertamamu adalah memverifikasi gambar. Jika gambar yang diunggah BUKAN foto lahan, ruangan *unfinished*, atau struktur bangunan (misalnya: foto manusia, hewan, atau makanan), set `is_valid_image` ke `false`, isi `error_message` dengan alasan sopan, dan kosongkan array material. Jika gambar valid (foto ruangan/bangunan), set `is_valid_image` ke `true`, kosongkan `error_message`, berikan estimasi visual ukuran (Kecil/Sedang/Besar), dan buat daftar kebutuhan material dasar (semen, cat, dll) untuk tahap *finishing*. DILARANG memberikan teks biasa/markdown. Jawab HANYA menggunakan format JSON valid."

**Target JSON Schema dari Gemini:**
```json
{
  "is_valid_image": true,
  "error_message": null,
  "analisis_ruangan": "string",
  "estimasi_ukuran": "string",
  "kebutuhan_material": [
    {
      "nama_barang": "string",
      "jumlah_estimasi": 0,
      "alasan": "string"
    }
  ]
}

```

## 7. Development Phases (AI Agent Execution Steps)

AI Agent, jalankan tugas ini secara bertahap. Jangan melompat ke fase berikutnya sebelum fase saat ini selesai dan diverifikasi oleh *user*.

### Phase 1: Setup, Validation & Static UI

* Inisialisasi halaman utama (`app/page.tsx`).
* Buat komponen `ImageUploader` dengan area *drag-and-drop*.
* Implementasikan logika validasi *client-side* (maks 4MB, format spesifik) dan *toast error notification*.
* Buat komponen `BoMTable` dan `SummaryCard` menggunakan *mock data* JSON untuk memastikan desain monokrom, responsivitas (*mobile-friendly*), dan *layout* tabel sudah sempurna.

### Phase 2: API Route & Gemini Integration

* Buat *route handler* di `app/api/analyze/route.ts`.
* Implementasikan SDK Google Generative AI dan letakkan logika di sisi *server*.
* Buat fungsi utilitas untuk mengonversi gambar (*File* ke format *Generative Part* / Base64) agar bisa dibaca oleh Gemini API.
* Terapkan validasi `try-catch` dan paksa kembalian `Response.json()`.

### Phase 3: State Management & Wiring

* Hubungkan komponen `ImageUploader` di *frontend* untuk melakukan *fetch* (POST) ke `/api/analyze`.
* Tangani `isLoading` *state*, *error state* dari validasi AI (`is_valid_image: false`), dan *success state*.
* Ganti *mock data* di UI dengan *real data* yang dikembalikan dari API secara dinamis.

### Phase 4: Production & Cloud Run Readiness

* Buat `Dockerfile` standar yang dioptimalkan untuk Next.js App.
* Buat `.dockerignore`.
* Pastikan aplikasi berjalan sempurna dan *error-free* saat di-*build* secara lokal (`npm run build`).

