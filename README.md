# ECOCYCLE — Living Circular Economy & Autonomous Agentic Platform
### *"Turning Waste Into Worth"*

[![React 19 & TypeScript](https://img.shields.io/badge/Frontend-React%2019%20%2B%20TypeScript-0284c7?style=for-the-badge&logo=react)](https://react.dev)
[![AI Architecture: Gemini 2.5 Flash](https://img.shields.io/badge/AI%20Model-Gemini%202.5%20Flash%20(Maven%20JARVIS)-10b981?style=for-the-badge&logo=google)](https://ai.google.dev)
[![Agentic Tools Engine](https://img.shields.io/badge/AI%20Engine-Autonomous%20EcoAgent%20ReAct-8b5cf6?style=for-the-badge&logo=openai)](https://github.com/Maverick-list/ecocycle)
[![EPA WARM v15 & SNI 19-3983-1995](https://img.shields.io/badge/Standard-US%20EPA%20WARM%20v15%20%2B%20SNI-059669?style=for-the-badge&logo=leaf)](https://www.epa.gov/warm)
[![Multi-Provider Auth](https://img.shields.io/badge/Auth-Google%20%7C%20Facebook%20%7C%20Phone%20OTP%20%7C%20Email-2563eb?style=for-the-badge&logo=firebase)](https://firebase.google.com)
[![Deployment: Vercel](https://img.shields.io/badge/Deploy-EcoCycle.vercel.app-000000?style=for-the-badge&logo=vercel)](https://ecocycle.vercel.app)

> **ECOCYCLE** adalah platform ekonomi sirkular digital tingkat industri yang mengubah alur material terbuang (*waste stream*) menjadi neraca sumber daya terverifikasi (*verified resource ledger*) dan bernilai ekonomi riil. 
> Menggabungkan arsitektur kecerdasan buatan otonom **Gemini 2.5 Flash (standar Maven JARVIS)** dengan mesin eksekusi alat mandiri (**EcoAgent ReAct Engine**), standar penimbangan nasional **SNI 19-3983-1995**, audit gas rumah kaca saintifik **US EPA WARM v15**, serta autentikasi empat saluran (*Google, Facebook, SMS Telepon OTP, dan Email*).

---

## 📸 Galeri Tangkapan Layar Platform (Live Showcase)

Dokumentasi visual langsung dari antarmuka produksi ECOCYCLE dengan bahasa desain *visionOS Apple Glassmorphism*, tipografi presisi *Outfit*, serta animasi organik:

| 1. Autentikasi Multi-Saluran (Google, Facebook, Email, No. Telepon) | 2. Pendaftaran Akun Terverifikasi (Social Connect) |
| :---: | :---: |
| ![Autentikasi Multi-Saluran](public/screenshots/01_auth_signin_facebook.png) | ![Pendaftaran Akun](public/screenshots/02_auth_signup_providers.png) |

| 3. Beranda: Judul Gradasi Mengalir & Videotron Transparan 30% | 4. EcoAgent Desk: Gemini 2.5 Flash & Draf Setoran 1-Klik |
| :---: | :---: |
| ![Beranda Videotron](public/screenshots/03_hero_videotron_gradient.png) | ![EcoAgent Otonom](public/screenshots/04_ecoagent_autonomous_action.png) |

| 5. Formulir Setor Sampah Lapang & Kolom Panduan SNI | 6. Buku Tabungan Digital Bank Sampah & Mutasi Saldo |
| :---: | :---: |
| ![Setor Sampah Lapang](public/screenshots/05_setor_sampah_spacious.png) | ![Buku Tabungan Digital](public/screenshots/06_bank_sampah_ledger.png) |

| 7. Neraca Karbon & Sains Reduksi Emisi US EPA WARM v15 |
| :---: |
| ![Neraca Karbon Sains](public/screenshots/07_neraca_karbon_science.png) |

---

## 🧠 Algoritma & Cara Kerja Sistem (Core Algorithms)

### 1. Algoritma Kalkulasi Emisi US EPA WARM v15 & Valuasi Ekonomi SNI
Perhitungan reduksi emisi karbon gas rumah kaca di ECOCYCLE tidak menggunakan angka perkiraan acak, melainkan menerapkan koefisien ilmiah resmi dari **US Environmental Protection Agency (EPA) Waste Reduction Model (WARM) versi 15** yang dikorelasikan dengan standar tata kelola bank sampah **SNI 19-3983-1995**:

```mermaid
flowchart TD
    A["Input Material & Bobot Timbangan (kg)"] --> B{"Klasifikasi Kategori Material"}
    
    B -->|"Plastik PET"| C1["Faktor Emisi: 1.50 kg CO2e/kg<br/>Konservasi Air: 24 L/kg<br/>Tarif: Rp 3.500/kg (+35 Poin)"]
    B -->|"Kardus & Kertas"| C2["Faktor Emisi: 1.10 kg CO2e/kg<br/>Konservasi Air: 28 L/kg<br/>Tarif: Rp 3.000/kg (+30 Poin)"]
    B -->|"Kaleng Logam"| C3["Faktor Emisi: 3.20 kg CO2e/kg<br/>Konservasi Air: 40 L/kg<br/>Tarif: Rp 3.000/kg (+30 Poin)"]
    B -->|"Botol Kaca"| C4["Faktor Emisi: 0.50 kg CO2e/kg<br/>Konservasi Air: 12 L/kg<br/>Tarif: Rp 2.000/kg (+20 Poin)"]
    B -->|"Minyak Jelantah"| C5["Faktor Emisi: 2.60 kg CO2e/kg<br/>Konservasi Air: 35 L/kg<br/>Tarif: Rp 8.000/kg (+80 Poin)"]
    B -->|"Limbah Elektronik"| C6["Faktor Emisi: 4.50 kg CO2e/kg<br/>Konservasi Air: 50 L/kg<br/>Tarif: Rp 10.000/kg (+100 Poin)"]

    C1 & C2 & C3 & C4 & C5 & C6 --> D["Kalkulator Mesin Reduksi Karbon"]
    
    D --> E["Total Emisi Terhindar = Σ (Bobot_i × Faktor_CO2e_i)"]
    D --> F["Total Nilai Rupiah = Σ (Bobot_i × Harga_Kg_i)"]
    D --> G["Total EcoPoints = Σ (Bobot_i × Poin_Kg_i)"]
    D --> H["Ekuivalensi Serapan Pohon = Total CO2e / 22 kg pertahun"]
    
    E & F & G & H --> I["Pencatatan Buku Tabungan Digital & Terbitan Sertifikat SNI"]
```

$$\text{Total Emisi Terhindar } (kg\text{ CO}_2e) = \sum_{i=1}^{n} \left( W_i \times \kappa_i \right)$$

$$\text{Valuasi Ekonomi Riil } (\text{IDR}) = \sum_{i=1}^{n} \left( W_i \times \mathcal{P}_i \right)$$

$$\text{Ekuivalensi Serapan Pohon} = \frac{\text{Total CO}_2e\text{ (kg)}}{22\text{ kg CO}_2e/\text{pohon/tahun}}$$

---

### 2. Algoritma Siklus Autonomous AI Agent (`EcoAgent` ReAct Architecture)
Chatbot ECOCYCLE bukan sekadar mesin penjawab teks, melainkan **Autonomous AI Agent** terintegrasi yang mampu menalar intensi pengguna, memanggil *platform tools* internal secara otonom, dan menerbitkan tindakan interaktif (*action cards*) langsung ke dalam antarmuka obrolan:

```mermaid
sequenceDiagram
    autonumber
    actor User as Pengguna / Mitra Warga
    participant UI as ECOCYCLE Desk (Apple Glass UI)
    participant Agent as EcoAgent ReAct Controller
    participant Gemini as Gemini 2.5 Flash LLM
    participant Tools as Platform Tools Registry
    participant Ledger as Bank Sampah Ledger Service

    User->>UI: "Buatkan draf setoran 4 kg plastik di Menteng"
    UI->>Agent: Parse Request & Entity Extraction
    Agent->>Tools: execute("calculateCarbonAndValuation", {material: "Plastik PET", weightKg: 4})
    Tools-->>Agent: Output: Rp 14.000, 140 Poin, 6.0 kg CO2e
    Agent->>Tools: execute("findNearestDropPoint", {query: "Menteng"})
    Tools-->>Agent: Output: Bale RW 04 Menteng
    Agent->>Tools: execute("createDepositDraft", {manifest: "ECO-SNI-4324"})
    Tools-->>Agent: Output: Draft Payload & Action Token
    Agent->>Gemini: Reasoning Synthesis with Tool Context (Model: gemini-2.5-flash)
    Gemini-->>Agent: Natural Language Explanation & Insights
    Agent->>UI: Render Message + Tool Calling Badges + Interactive Action Card
    UI->>User: Audio Spasial (Google TTS) + Kartu "✨ Simpan & Konfirmasi ke Bank Sampah"
    User->>UI: Klik "Konfirmasi Setoran"
    UI->>Ledger: submitDeposit(draftPayload)
    Ledger-->>UI: Mutasi Tersimpan & Saldo Bertambah
    UI->>User: Feedback: "✅ Berhasil dicatat ke Bank Sampah Digital!"
```

#### Platform Tools yang Dijalankan oleh EcoAgent:
1. `calculateCarbonAndValuation(material, weightKg)`: Mengkalkulasi reduksi karbon US EPA WARM v15, valuasi rupiah SNI, EcoPoints, konservasi air, dan pohon setara.
2. `checkMaterialClassification(query)`: Mendiagnosis resin code polimer, klasifikasi aliran sampah (*Anorganik/Organik/B3/E-Waste*), dan langkah dekontaminasi wajib.
3. `findNearestDropPoint(location)`: Menelusuri direktori drop-point terverifikasi, jam buka aktif, kontak koordinator, dan jenis sampah yang diterima.
4. `createDepositDraft(material, weightKg, dropPoint)`: Menerbitkan nomor manifest resmi (*ECO-SNI-xxxx*) dan kartu tindakan 1-klik.
5. `auditSortingQuality(description)`: Menilai tingkat kemurnian pemilahan (Grade A 100%, Grade B 90%, Grade C perlu bilas ulang).

---

### 3. Algoritma Autentikasi Empat Saluran & Keamanan Row-Level Security (RLS)
Platform mengamankan privasi data kontak dan riwayat setoran warga melalui arsitektur terdesentralisasi dengan *Row Level Security (RLS)* mutlak:

```mermaid
flowchart LR
    A["Pengguna Masuk / Daftar"] --> B{"Pilih Saluran"}
    
    B -->|"Google OAuth"| C1["Google Sign-In Popup & Token"]
    B -->|"Facebook Login"| C2["Facebook Graph OAuth & User ID"]
    B -->|"Nomor Telepon"| C3["OTP 6-Digit SMS / WhatsApp Handshake"]
    B -->|"Email & Password"| C4["Kredensial Terenkripsi PBKDF2 / Bcrypt"]

    C1 & C2 & C3 & C4 --> D["Firebase Auth & Cloud Bridge"]
    D --> E["Dekripsi Token & Validasi Sesi JWT"]
    
    E --> F["Postgres Supabase RLS / Firestore Security Rules"]
    
    F -->|"auth.uid() == user_id"| G["Akses Penuh Buku Tabungan Pribadi & Saldo"]
    F -->|"Publik / Anonim"| H["Hanya Baca Papan Peringkat & Ringkasan Agregat (Tanpa PII)"]
```

---

## 🎯 Case & Solusi (Studi Kasus Lingkungan)

### 1. Masalah Riil Pengelolaan Sampah (*The Problem*)
- **69% Sampah Menumpuk di TPA:** Kebiasaan mencampur sampah organik busuk dengan material anorganik bersih menurunkan harga jual daur ulang hingga 80%.
- **Manipulasi Timbangan & Ketiadaan Transparansi:** Bank sampah tradisional kerap menggunakan pencatatan kertas manual tanpa standardisasi alat ukur.
- **Dampak Karbon yang "Abstrak":** Warga tidak pernah mengetahui dampak ekologis nyata dari tindakan memilah sampah yang mereka lakukan.

### 2. Solusi Komprehensif ECOCYCLE (*The EcoDigital Solution*)
- **Pencatatan Mandiri Tervalidasi SNI:** Sistem mencatat estimasi sebelum warga tiba di hub, mempercepat antrean penimbangan, dan menerbitkan nomor registrasi digital terenkripsi.
- **Incentive Dual-Ledger:** Setiap kilogram menghasilkan **Saldo Tunai Rupiah** (dapat dicairkan ke GoPay, OVO, DANA, BCA/Mandiri) plus **EcoPoints** yang dapat ditukar hadiah hijau.
- **Audit Karbon Terbuka:** Sertifikat partisipasi resmi berbasis US EPA WARM v15 dapat dicetak langsung sebagai bukti portofolio keberlanjutan.

---

## 🌟 Keunggulan Unik & Diferensiasi (De-AI & Human-Crafted)

1. **Model Standar Maven JARVIS (`gemini-2.5-flash`):** Menggunakan mesin generasi mutakhir Google Gemini 2.5 Flash yang berkolaborasi dengan mesin *Agentic Tools* lokal.
2. **Apple visionOS Frosted Glassmorphism:** Tanpa batas garis kaku; menggunakan gradasi pudar lembut, kedalaman bayangan berlapis, dan palet warna botani obsidian (`#03140d`).
3. **Efek Bergerak Gradasi Hijau Dinamis:** Semua judul utama halaman dan wordmark logo memiliki animasi *flow gradient* horizontal dari hijau muda ke hijau tua secara terus menerus.
4. **Hero Videotron 30% Transparan:** Menempatkan video sinematik gerak sirkular di balik tipografi headline tanpa merusak kontras keterbacaan.
5. **Transisi Layar Daun Sinematik:** Perpindahan antar halaman disapu tirai organik lembut dengan siluet daun berotasi.
6. **Autentikasi Empat Saluran Lengkap:** Google, Facebook, Email, dan SMS OTP Telepon 6-digit.

---

## 🚀 Panduan Instalasi & Menjalankan Aplikasi

### Kebutuhan Sistem
- **Node.js:** Versi 20.x atau lebih baru
- **NPM:** Versi 10.x atau lebih baru
- Peramban modern (Chrome, Edge, Safari, Firefox)

### Langkah Pemasangan Lokal:
```bash
# 1. Kloning repository GitHub resmi
git clone https://github.com/Maverick-list/ecocycle.git
cd ecocycle

# 2. Pasang semua dependensi modul
npm install

# 3. Siapkan file konfigurasi environment
cp .env.example .env

# 4. Jalankan server pengembangan Vite
npm run dev
```
Aplikasi akan aktif dan dapat diakses pada: `http://localhost:3000/`.

---

## ☁️ Konfigurasi & Panduan Deployment Vercel

Platform ECOCYCLE telah dikonfigurasi secara optimal untuk deployment ke Vercel dengan berkas [`vercel.json`](file:///home/firza-ilmi/.gemini/antigravity/scratch/ecocycle/vercel.json):
- Target domain: **`ecocycle.vercel.app`**
- Single Page Application (SPA) Routing & Fallback Rewrite ke `index.html`.
- Cache-Control header presisi untuk aset statis (`max-age=31536000, immutable`).

### Langkah Deploy ke Vercel:
1. Hubungkan repository GitHub [`Maverick-list/ecocycle`](https://github.com/Maverick-list/ecocycle) ke akun Vercel Anda di [vercel.com/new](https://vercel.com/new).
2. Set **Project Name** menjadi `ecocycle` (akan mengalokasikan URL `ecocycle.vercel.app`).
3. Konfigurasi build otomatis:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Masukkan *Environment Variables* (opsional, sistem memiliki *fallback intelligence* mandiri):
   - `VITE_GEMINI_API_KEY`: Kunci Google Gemini API Anda.
5. Klik **Deploy**. Setiap *commit push* ke branch `main` akan dideploy secara otomatis oleh Vercel CI/CD!

---

## 👥 Tim & Pengembang
- **Organisasi:** ECOCYCLE Foundation & Universitas Kuningan (Techno Versary Vol. II 2026)
- **Tema:** EcoDigital For Environment
- **Lisensi:** MIT License — Bebas digunakan untuk pengembangan keberlanjutan lingkungan hidup.
