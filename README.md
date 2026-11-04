# ECOCYCLE — Turning Waste Into Worth

> **Web Design Competition Techno Versary Vol. II 2026**  
> **Penyelenggara:** HIMA TI Fakultas Ilmu Komputer, Universitas Kuningan  
> **Tema:** *EcoDigital For Environment*  
> **Repository Resmi:** [github.com/Maverick-list/ecocycle](https://github.com/Maverick-list/ecocycle)  

---

## 🌿 1. Deskripsi Proyek & Latar Belakang

### Masalah Lingkungan (*Problem Statement*)
Di Indonesia, lebih dari **69% timbunan sampah perkotaan berakhir di Tempat Pemrosesan Akhir (TPA)** tanpa pemilahan awal di sumber. Rendahnya tingkat pemilahan rumah tangga disebabkan oleh tiga kendala utama:
1. Kurangnya pemahaman praktis mengenai cara membersihkan dan memilah material secara benar (*lack of sorting literacy*).
2. Ketiadaan transparansi dan insentif nyata yang menghubungkan aksi pemilahan warga dengan manfaat ekonomi (*unclear value incentive*).
3. Sulitnya melacak dampak ekologis nyata dari kebiasaan memilah yang telah dilakukan (*invisible ecological impact*).

### Solusi ECOCYCLE (*Solution Overview*)
**ECOCYCLE** hadir sebagai ekosistem digital terpadu yang memadukan **Bank Sampah Digital**, **Panduan Pemilahan Presisi**, **Edukasi Sirkularitas**, dan **Gamifikasi Komunitas Berkelanjutan**. Dengan menghubungkan rumah tangga dan civitas akademika ke rantai pasok daur ulang resmi, ECOCYCLE mengubah persepsi sampah dari sekadar limbah tak bernilai menjadi aset sirkular berdaya guna tinggi.

---

## 🚀 2. Fitur-Fitur Utama Platform

### 1. Bank Sampah Digital (*Digital Waste Bank*)
- **Pencatatan Mandiri Setoran:** Pemilihan kategori material, penyesuaian bobot dengan *stepper* presisi (0,1 kg), pemilihan *drop-point*, dan dokumentasi foto bukti fisik material (*photo evidence*).
- **Kalkulasi Nilai Dinamis:** Konversi bobot ke estimasi Rupiah, EcoPoints, reduksi karbon (kg CO₂e), dan konservasi air bersih (Liter).
- **Lembar Manifest Resmi Setoran:** Modal rincian manifest dengan verifikasi audit standar ISO 14001, bukti foto, dan rincian konversi.
- **Manajemen Mutasi Transaksi:** Fitur edit, hapus, filter kategori, pencarian ID, serta tombol *1-Click Seed Sample Data* dan *Reset* untuk kemudahan pengujian juri.

### 2. Panduan Pemilahan Pintar (*Smart Waste Sorting*)
- **Katalog 25+ Jenis Material:** Klasifikasi 4-stream (Organik, Anorganik, B3, E-Waste) dengan pencarian kata kunci instan.
- **Laci Inspeksi Protokol:** Petunjuk langkah persiapan, kaidah higienitas, kompresi volume fisik, dan matriks *Do's & Don'ts*.

### 3. Neraca Dampak Ekologis & Audit (*Ecological Impact*)
- **Visualisasi Grafik Interaktif Recharts:** Grafik area tren pemulihan bulanan (*AreaChart*) dan distribusi komposisi fraksi daur ulang (*BarChart*).
- **Kalkulator Simulasi Jejak Karbon Mandiri:** Penggeser interaktif 2 variabel untuk memproyeksikan penghematan emisi, air, dan pohon tahunan keluarga.
- **Integritas Metodologis:** Perhitungan berbasis *US EPA WARM (Waste Reduction Model)* dan pedoman KLHK.

### 4. Akademi Sirkular (*Eco Academy*)
- **Pusat Literasi Lingkungan:** Artikel ilmiah mendalam dengan estimasi waktu baca, navigasi "Artikel Terkait" di dalam modal pembaca, dan sistem simpan artikel (*Bookmarks*).
- **Pemberantas Mitos vs Fakta:** Kartu akordeon interaktif yang mengklarifikasi kesalahpahaman umum seputar plastik dan pengelolaan sampah.
- **Dokumentasi Infrastruktur:** Galeri potret fasilitas daur ulang dan tempat sampah terpilah kampus.

### 5. Tantangan Komunitas & Gamifikasi (*Eco Challenges*)
- **Tantangan Bertahap:** Sistem gerbang partisipasi (*Join Gate*), pelacak kemajuan tugas, dan proteksi klaim reward anti-ganda.
- **Papan Peringkat Komunitas (*Leaderboard*):** Menampilkan peringkat dinamis akun pengguna di antara aktivis dan komunitas kampus se-Kuningan.
- **Lencana Prestasi Digital:** Galeri apresiasi pencapaian sirkular.

### 6. Narahubung & Manifesto (*Contact & About*)
- Formulir pesan kontak dengan validasi langsung dan penyimpanan lokal.
- Direktori titik drop-point di Kuningan, FAQ interaktif, dan komitmen perlindungan data.

---

## 🎨 3. Sistem Desain: *Editorial Ecological Tech*

- **Deep Forest:** `#002517` / `#123B2A`
- **Active Emerald:** `#006C48`
- **Warm Ivory Surface:** `#FAFAF3` / `#FAF7F0`
- **Fresh Lime Accent:** `#CBF075`
- **Tipografi:** Plus Jakarta Sans (Judul & Metrik) & Manrope (Body Text & Kontrol UI)
- **Tata Letak:** 12-Column Responsive Bento Grid (Mobile-First, WCAG 2.1 AA Compliant)

---

## 🛠️ 4. Arsitektur Teknologi & Dependensi

| Kategori | Teknologi | Deskripsi |
| :--- | :--- | :--- |
| **Framework & Runtime** | React 19, TypeScript, Vite | Fondasi frontend performa tinggi dengan kompilasi instan |
| **Styling** | Tailwind CSS v3, PostCSS, Autoprefixer | Sistem token desain presisi berbasis Google Stitch |
| **Routing** | React Router v7 | Navigasi SPA dengan scroll-to-top otomatis |
| **Visualisasi Data** | Recharts v3 | Grafik area tren bulanan dan grafik batang komposisi |
| **Animasi & Interaksi** | Framer Motion | Transisi mikro antarmuka dengan dukungan *prefers-reduced-motion* |
| **Ikonografi** | Material Symbols Outlined & Lucide React | Ikon sistem terstandarisasi |
| **Persistensi State** | Custom Services + Browser LocalStorage | Penyimpanan data lokal mandiri tanpa ketergantungan server eksternal |

---

## 📁 5. Struktur Direktori Proyek

```text
ecocycle/
├── docs/                               # Dokumentasi Teknis, Arsitektur, & Laporan QA
│   ├── PROJECT_BRIEF.md
│   ├── COMPETITION_REQUIREMENTS.md
│   ├── UX_STRATEGY.md
│   ├── PHASE_3_REPORT.md
│   ├── PHASE_4_REPORT.md
│   └── FINAL_QA_REPORT.md              # Laporan QA & Hasil Pengujian Komprehensif
├── public/                             # Aset Publik Statis & Offline
│   ├── assets/images/                  # Foto fasilitas & avatar beresolusi tinggi lokal
│   └── favicon.svg                     # Identitas ikon situs
├── src/
│   ├── components/
│   │   ├── layout/                     # Navbar, Footer
│   │   ├── features/                   # WasteDepositModal, DepositDetailModal
│   │   └── ui/                         # Toast notification
│   ├── context/                        # WasteBankContext (Global state)
│   ├── data/                           # Dataset statis awal (kategori, lokasi, artikel)
│   ├── pages/                          # 8 Halaman Utama Rute Aplikasi
│   │   ├── Home/
│   │   ├── WasteBank/
│   │   ├── SmartSorting/
│   │   ├── EcoImpact/
│   │   ├── EcoAcademy/
│   │   ├── EcoChallenges/
│   │   ├── Contact/
│   │   └── WasteDeposit/
│   ├── services/                       # Lapisan Layanan Data & Logika Bisnis
│   │   ├── storageService.ts
│   │   ├── wasteBankService.ts
│   │   ├── impactService.ts
│   │   ├── academyService.ts
│   │   └── challengesService.ts
│   ├── styles/                         # Tailwind & custom CSS accessibility rules
│   ├── types/                          # Definisi TypeScript Interfaces
│   ├── App.tsx                         # Router root & modal orchestration
│   └── main.tsx                        # React DOM mounting
├── package.json                        # Definisi dependensi & skrip eksekusi
├── tailwind.config.js                  # Konfigurasi token warna & tipografi
├── tsconfig.json                       # Konfigurasi kompilasi TypeScript
├── vite.config.ts                      # Konfigurasi bundler Vite & manual chunk splitting
└── vercel.json                         # Konfigurasi SPA routing fallback & caching Vercel
```

---

## 💻 6. Panduan Instalasi & Eksekusi Lokal

### Prasyarat Sistem
- **Node.js:** Versi `>= 18.0.0` (Direkomendasikan Node.js v20+)
- **npm:** Versi `>= 9.0.0`
- **Git**

### Perintah Eksekusi
```bash
# 1. Clone repositori dari GitHub
git clone https://github.com/Maverick-list/ecocycle.git
cd ecocycle

# 2. Pasang dependensi
npm install

# 3. Jalankan server pengembangan (Development)
npm run dev
# Buka peramban di http://localhost:3000

# 4. Kompilasi build produksi teroptimasi
npm run build

# 5. Pratinjau hasil build lokal
npm run preview
```

---

## ☁️ 7. Panduan Deployment ke Vercel

Proyek ini telah dikonfigurasi secara lengkap untuk deployment instan di platform **Vercel** melalui berkas [`vercel.json`](./vercel.json) yang menangani SPA routing rewrite (`/(.*) -> /index.html`) dan caching aset statis:

### Langkah Deploy:
1. Hubungkan akun GitHub `Maverick-list` dengan Vercel Dashboard ([vercel.com](https://vercel.com)).
2. Pilih repository `ecocycle`.
3. Gunakan konfigurasi default:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. Tekan **Deploy**. Aplikasi akan aktif dengan HTTPS otomatis.

---

## ⚖️ 8. Kejujuran Data Demonstrasi & Batasan Sistem (*Ethical Disclaimer*)

1. **Penyimpanan Berbasis LocalStorage:** Seluruh penambahan data setoran, aksi tantangan, dan pesan kontak disimpan di *LocalStorage* peramban pengguna untuk keperluan peragaan interaktif kompetisi.
2. **Simulasi Nilai Finansial:** Tarif Rupiah dan EcoPoints merupakan proyeksi peraga edukatif. Platform tidak terhubung ke gateway perbankan atau sistem dompet digital nyata.
3. **Faktor Emisi Saintifik:** Rumus reduksi karbon ($CO_2e$) dan konservasi air dihitung secara matematis menggunakan koefisien resmi *US EPA WARM* dan standar KLHK.
4. **Kemandirian Offline:** Seluruh aset gambar tersimpan di direktori lokal `public/assets/images/`, menjamin kelancaran evaluasi juri tanpa risiko kegagalan unduhan CDN eksternal.

---

## 👥 Pengembang & Hak Cipta

- **Pengembang:** Maverick-list
- **Lisensi:** Open-Source (MIT)
- **Kompetisi:** Web Design Competition Techno Versary Vol. II 2026 — HIMA TI FKOM Universitas Kuningan
