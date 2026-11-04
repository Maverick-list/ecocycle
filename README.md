# ECOCYCLE — Turning Waste Into Worth

> **Web Design Competition Techno Versary Vol. II 2026**  
> **Penyelenggara:** HIMA TI Fakultas Ilmu Komputer, Universitas Kuningan  
> **Tema:** *EcoDigital For Environment*  
> **Repository Resmi:** [github.com/Maverick-list/ecocycle](https://github.com/Maverick-list/ecocycle)  

---

## 🌿 Tentang ECOCYCLE

**ECOCYCLE** adalah platform ekodigital terpadu yang mentransformasi tata kelola sampah rumah tangga dan komunitas menjadi aset sirkular bernilai ekonomi dan ekologis nyata.

Berbeda dari situs lingkungan statis konvensional, ECOCYCLE menyediakan infrastruktur interaktif berbasis **4 Pilar Utama**:
1. **Bank Sampah Digital (*Digital Waste Bank*)**: Simulasi penimbangan mandiri, konversi nilai ke saldo Rupiah & EcoPoints, mutasi riwayat transaksi dengan fitur edit & hapus, serta katalog penukaran imbalan (e-wallet, bibit pohon, token listrik).
2. **Pemilahan Pintar (*Smart Waste Sorting*)**: Direktori pencarian instan 25+ jenis limbah rumah tangga dengan protokol higienitas wadah, kompresi volume, dan klasifikasi tong 4-stream (Organik, Anorganik, B3, E-Waste).
3. **Edukasi Lingkungan (*Eco Academy*)**: Pusat literasi sirkularitas, artikel edukatif mendalam dengan indikator waktu baca, kartu interaktif *Mitos vs Fakta*, serta galeri visual infografis alur material di Jawa Barat.
4. **Aktivitas Komunitas Berkelanjutan (*Eco Challenges & Impact*)**: Tantangan mingguan bertahap dengan pelacak kemajuan tugas, lencana digital pencapaian (*badge*), penghitung ikrar lingkungan (*Eco-Pledge*) publik, serta kalkulator dampak matematis reduksi gas rumah kaca ($CO_2e$) berbasis standar EPA WARM dan KLHK.

---

## 🎨 Sistem Desain: *Editorial Ecological Tech*

Desain antarmuka ECOCYCLE direkayasa dari spesifikasi Google Stitch dengan prinsip presisi arsitektural dan keterbacaan tinggi:
- **Deep Forest Anchor:** `#002517` / `#123B2A`
- **Active Emerald:** `#006C48`
- **Warm Ivory Canvas:** `#FAFAF3` / `#FAF7F0`
- **Kinetic Fresh Lime:** `#CBF075` / `#C8ED72`
- **Tipografi:** Plus Jakarta Sans (Display & Metrik) & Manrope (Body & UI Controls)
- **Tata Letak:** 12-Column Asymmetric Bento Grid (Mobile-First, WCAG 2.1 AA Compliant)

---

## 🚀 Teknologi yang Digunakan

- **Frontend Core:** React 19, TypeScript, Vite
- **Styling & Tokens:** Tailwind CSS v3
- **Navigasi & Routing:** React Router v7
- **Animasi & Interaksi:** Framer Motion
- **Ikonografi:** Material Symbols Outlined & Lucide React
- **Visualisasi Data:** Recharts & Dynamic SVG Sparklines
- **Persistensi State:** Custom React Hooks + Browser LocalStorage (Tahan refresh & 100% offline-ready)

---

## 📱 Daftar Halaman & Rute Aplikasi

| Rute URL | Halaman | Deskripsi Fitur |
|---|---|---|
| `/` | **Beranda Utama** | Hero editorial, live ticker volume terpilah, 4-step siklus sirkular, showcase bento pilar, mini kalkulator, dan penghitung ikrar warga. |
| `/bank-sampah` | **Bank Sampah Digital** | Dompet saldo tabungan, grafik distribusi komposisi, tabel mutasi transaksi (edit/hapus), dan tombol 1-klik muat data simulasi juri. |
| `/pemilahan-pintar` | **Pemilahan Pintar** | Filter 4-stream, pencarian instan material, laci inspeksi kaidah higienitas, dan matriks do's & don'ts. |
| `/dampak-ekologis` | **Dampak Ekologis** | Metrik akumulasi $CO_2e$, pohon terselamatkan, air bersih, serta **kalkulator simulasi jejak karbon mandiri bergeser (sliders)**. |
| `/akademi` | **Akademi Sirkular** | Artikel edukatif, kartu interaktif mitos vs fakta buka-tutup, dan galeri infografis sirkularitas. |
| `/tantangan` | **Tantangan Komunitas** | Peringkat ekologis (*Pemula Hijau* hingga *Pahlawan Sirkular*), daftar tugas aktif, dan modal selebrasi lencana prestasi. |
| `/kontak` | **Tentang & Kontak** | Visi & misi manifesto sirkular, formulir kontak tervalidasi, direktori hub FKOM UNIKU & drop-point, serta akordeon FAQ interaktif. |
| `/setor-sampah` | **Formulir Setor Penuh** | Alur pencatatan mandiri lengkap dengan pemilih bobot stepper +/- dan kalkulasi nilai konversi langsung. |

---

## 🛠️ Panduan Instalasi & Eksekusi Lokal

### Prasyarat Sistem
- **Node.js:** Versi `>= 18.0.0` (Direkomendasikan Node.js v20+ atau v26)
- **npm:** Versi `>= 9.0.0`
- **Git**

### Langkah Menjalankan

1. **Clone Repository:**
   ```bash
   git clone https://github.com/Maverick-list/ecocycle.git
   cd ecocycle
   ```

2. **Install Dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan Development Server:**
   ```bash
   npm run dev
   ```
   Akses aplikasi di browser melalui URL: `http://localhost:3000` (atau port yang ditampilkan di terminal).

4. **Kompilasi & Build Produksi:**
   ```bash
   npm run build
   ```

5. **Pratinjau Hasil Build Produksi:**
   ```bash
   npm run preview
   ```

---

## 📑 Dokumentasi Perancangan Proyek

Seluruh dokumentasi arsitektur telah terstruktur di direktori [`docs/`](./docs):
- [`docs/PROJECT_BRIEF.md`](./docs/PROJECT_BRIEF.md): Visi produk, latar belakang masalah, dan persona target.
- [`docs/COMPETITION_REQUIREMENTS.md`](./docs/COMPETITION_REQUIREMENTS.md): Matriks kesesuaian panduan lomba & kriteria penilaian (Penyisihan & Final).
- [`docs/DEVELOPMENT_ROADMAP.md`](./docs/DEVELOPMENT_ROADMAP.md): Jadwal tahapan pengembangan & milestone.
- [`docs/TECHNICAL_DECISIONS.md`](./docs/TECHNICAL_DECISIONS.md): Architectural Decision Records (ADR) dan formula konversi matematis.
- [`docs/RISK_REGISTER.md`](./docs/RISK_REGISTER.md): Matriks mitigasi risiko teknis, kepatuhan, dan demonstrasi.
- [`docs/USER_PERSONAS.md`](./docs/USER_PERSONAS.md): Penelitian persona pengguna (mahasiswa, keluarga, aktivis, ketua RT).
- [`docs/SITEMAP.md`](./docs/SITEMAP.md): Struktur arsitektur informasi 8 halaman.
- [`docs/USER_FLOW.md`](./docs/USER_FLOW.md): Pemetaan alur perjalanan pengguna (User Journey).
- [`docs/FEATURE_SPECIFICATION.md`](./docs/FEATURE_SPECIFICATION.md): Prioritas fitur MoSCoW (Essential vs Optional).
- [`docs/UX_STRATEGY.md`](./docs/UX_STRATEGY.md): Panduan strategi UX, aksesibilitas WCAG 2.1 AA, dan token sistem desain.
- [`docs/STITCH_HANDOFF_REPORT.md`](./docs/STITCH_HANDOFF_REPORT.md): Audit ekstraksi paket desain Google Stitch.
- [`docs/IMPLEMENTATION_PLAN.md`](./docs/IMPLEMENTATION_PLAN.md): Rencana transformasi mockup ke komponen React.
- [`docs/PHASE_3_REPORT.md`](./docs/PHASE_3_REPORT.md): Laporan komprehensif implementasi frontend seluruh 8 halaman.

---

## ⚖️ Integritas Akademik & Data Demonstrasi

Seluruh data transaksi contoh, lokasi titik kumpul simulasi, dan nilai imbalan yang tercantum di platform diberi label transparan sebagai data demonstrasi kompetisi (`[Mode Simulasi Kompetisi]`). Formula konversi matematis (seperti penghematan $1.5\text{ kg } CO_2$ per kilogram botol PET terdaur ulang) didasarkan pada literatur ilmiah sirkularitas terverifikasi.

---

## 👥 Pengembang & Hak Cipta

- **Pengembang:** Maverick-list
- **Lisensi:** Open-Source (MIT)
- **Kompetisi:** Web Design Competition Techno Versary Vol. II 2026 — HIMA TI FKOM Universitas Kuningan
