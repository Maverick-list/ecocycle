# ECOCYCLE — PRODUCT ARCHITECTURE & DESIGN SYSTEM SPECIFICATION
**Dokumen Arsitektur Teknis & Panduan Desain Sistem**  
**Versi:** 2.0.0 Production Master  
**Proyek:** ECOCYCLE — Turning Waste Into Worth  
**Penyelenggara:** HIMA TI FKOM Universitas Kuningan (Techno Versary Vol. II 2026)  

---

## 1. IKHTISAR SISTEM & PRINSIP DESAIN

ECOCYCLE adalah platform teknologi sirkular komprehensif yang dirancang untuk menjembatani kesenjangan antara kesadaran masyarakat awam dan tindakan nyata dalam pengelolaan sampah rumah tangga serta kampus. 

### Prinsip Utama Produk:
1. **Editorial Ecological Technology Identity:** Menggabungkan estetika editorial majalah ilmiah dengan kehangatan warna bumi (*deep forest green*, *warm ivory*, *lime accent*), menghindari kesan website generik atau template dashboard korporat biasa.
2. **Deterministic Data Integrity:** Seluruh data transaksi, statistik emisi gas rumah kaca, dan poin gamifikasi dihitung secara deterministik menggunakan layanan modul teruji, dengan persistensi lokal persisten (*LocalStorage*).
3. **Radical Transparency (Anti-Greenwashing):** Tidak membuat klaim kemitraan atau sertifikasi ISO palsu. Semua angka estimasi diberi label yang jujur dan didukung oleh drawer metodologi perhitungan ilmiah terbuka berbasis EPA WARM v15.
4. **Resilient Offline-Ready UI:** Menggunakan komponen inline SVG teroptimasi penuh (`Icon.tsx`), menghilangkan ketergantungan pada CDN font eksternal yang rentan terhadap keterlambatan muat atau teks pecah saat evaluasi juri offline.
5. **Universal Accessibility (WCAG 2.1 AA):** Menyediakan kontras warna teks dan latar belakang yang memenuhi standar minimum 4.5:1, kontur fokus visual (*focus ring*) yang jelas untuk navigasi keyboard, serta penghormatan terhadap preferensi sistem peramban (*prefers-reduced-motion*).

---

## 2. DESAIN TOKENS & IDENTITAS VISUAL

### 2.1 Palet Warna Utama
| Token Warna | Nilai HEX | Peran & Penggunaan |
| :--- | :--- | :--- |
| `primary` | `#123B2A` | Deep Forest Green — latar belakang hero, navbar aktif, kartu editorial utama |
| `primary-container` | `#002517` | Darkest Pine Forest — kedalaman kontras untuk kartu metrik dan kontur |
| `secondary` | `#006C48` | Vibrant Emerald — tombol aksi primer, ikon aktif, grafik pertumbuhan |
| `tertiary-fixed` | `#CBF075` | Luminous Lime Accent — badge lencana prestasi, chip sorotan, tombol konversi |
| `surface` | `#FAFAF3` | Warm Ivory Canvas — latar belakang halaman yang ramah mata tanpa radiasi putih silau |
| `surface-container` | `#F0F1EA` | Soft Warm Gray Container — kartu sekunder, field input, bilah pencarian |
| `surface-container-lowest` | `#FFFFFF` | Pure White Surface — kartu bento utama, modal bacaan, kartu transaksi |
| `outline` | `#717A73` | Muted Sage Slate — teks label sekunder, border pemisah lembut |
| `error` | `#BA1A1A` | Crimson Red — peringatan bahaya B3, penolakan kontaminasi material |

### 2.2 Tipografi Editorial
- **Display Serif Heading:** Digunakan untuk judul hero dan judul artikel editorial (`font-display-hero`, `font-headline-xl`), memancarkan wibawa dan kredibilitas majalah sains.
- **Inter Sans-Serif:** Digunakan untuk body text, label formulir, tabel data, dan elemen UI mikro (`font-body-md`, `font-body-sm`, `font-label-caps`), menjamin keterbacaan tinggi pada berbagai resolusi layar.

---

## 3. ARSITEKTUR KOMPONEN & HIERARKI KODE

Arsitektur kode disusun secara modular di dalam direktori `src/`:

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx             # Bilah navigasi atas responsif, drawer mobile, & avatar poin
│   │   └── Footer.tsx             # Footer global dengan catatan kepatuhan SNI 19-3983-1995
│   ├── ui/
│   │   ├── Icon.tsx               # Universal inline SVG icon engine (50+ alias)
│   │   ├── AnimatedCounter.tsx    # Komponen animasi angka ease-out
│   │   ├── PageTransition.tsx     # Framer Motion page wrapper dengan reduced motion
│   │   └── Toast.tsx              # Notifikasi umpan balik aksi pengguna
│   └── features/
│       ├── WasteDepositModal.tsx  # Modal formulir setoran sampah cepat
│       └── DepositDetailModal.tsx # Modal inspeksi detail transaksi dan manifest cetak
├── context/
│   └── WasteBankContext.tsx       # State manajemen transaksi, poin, dan notifikasi global
├── data/
│   ├── wasteData.ts               # Katalog material, harga estimasi, & panduan pilah
│   ├── articlesData.ts            # Artikel edukasi sirkular & data mitos vs fakta
│   └── locationsData.ts           # Titik drop-point dan bank sampah lokal Kuningan
├── pages/
│   ├── Home/HomePage.tsx          # Beranda: Hero, 4-step circular flow, impact teaser
│   ├── WasteBank/WasteBankPage.tsx# Bank Sampah: Saldo, tabel riwayat, modal setoran
│   ├── SmartSorting/SmartSortingPage.tsx # Panduan pemilahan presisi & Do's/Don'ts
│   ├── EcoImpact/EcoImpactPage.tsx# Neraca dampak ekologis & simulator jejak karbon
│   ├── Analytics/AnalyticsPage.tsx# Dasbor analitik lanjutan & drawer metodologi ilmiah
│   ├── EcoAcademy/EcoAcademyPage.tsx # Akademi sirkular, bookmark, mitos vs fakta
│   ├── EcoChallenges/EcoChallengesPage.tsx # Gamifikasi, checklist aksi, & leaderboard
│   ├── Contact/ContactPage.tsx    # Narahubung, manifesto visi misi, drop-point, & FAQ
│   ├── WasteDeposit/WasteDepositPage.tsx # Formulir mandiri setoran sampah
│   └── Profile/ProfilePage.tsx    # Dasbor profil personal, target bulanan, & preferensi
├── services/
│   ├── storageService.ts          # Abstraksi LocalStorage type-safe
│   ├── impactService.ts           # Perhitungan konversi massa, CO2e, air, & pohon
│   ├── academyService.ts          # Pengelolaan artikel, bookmark, & rekomendasi
│   ├── challengesService.ts       # Logika gamifikasi, validasi tugas, & leaderboard
│   └── userService.ts             # Pengelolaan profil, streak, target, & preferensi
├── types/
│   └── index.ts                   # Kontrak tipe data TypeScript terpusat
├── styles/
│   └── index.css                  # Konfigurasi Tailwind, CSS variable, & utility classes
└── App.tsx                        # Router utama dan konfigurasi rute SPA
```

---

## 4. MANAJEMEN STATE & LAPISAN DATA LOKAL

### 4.1 Reaktivitas Global via Context API (`WasteBankContext`)
`WasteBankContext` bertindak sebagai *single source of truth* untuk seluruh state transaksional pengguna:
- `transactions`: Array transaksi setoran sampah (`WasteDepositRecord[]`).
- `totalPoints`: Akumulasi EcoPoints yang diperoleh dari setoran sampah dan penyelesaian tantangan.
- `totalWeightKg`: Total akumulasi berat material terpilah dalam kilogram.
- `addTransaction(deposit)`: Menyimpan transaksi baru, menghitung estimasi rupiah dan EcoPoints, memperbarui state, dan memicu notifikasi toast.
- `addBonusPoints(points, reason)`: Menambahkan poin penghargaan dari modul tantangan ke saldo global.

### 4.2 Kunci Persistensi LocalStorage
Data disimpan secara aman pada peramban pengguna menggunakan prefix terstruktur:
1. `ecocycle_transactions_v2`: Riwayat setoran sampah dan status verifikasi.
2. `ecocycle_challenges_v2`: Status tantangan yang diikuti, persentase kemajuan, dan tugas selesai.
3. `ecocycle_academy_bookmarks_v2`: ID artikel yang disimpan oleh pengguna.
4. `ecocycle_user_profile_v2`: Informasi profil pengguna (nama, peran, target reduksi karbon, riwayat streak).
5. `ecocycle_contact_messages_v2`: Pesan yang dikirimkan melalui formulir kontak.

---

## 5. RUTE APLIKASI & PEMBAGIAN KODE (CODE SPLITTING)

Platform memiliki 10 rute fungsional utama yang didaftarkan dalam `src/App.tsx`:

| Rute URL | Komponen Halaman | Deskripsi Fitur |
| :--- | :--- | :--- |
| `/` | `HomePage` | Beranda editorial, perkenalan platform, alur 4 langkah, impact counter |
| `/bank-sampah` | `WasteBankPage` | Buku tabungan digital, pencarian transaksi, ekspor CSV, setoran |
| `/pemilahan-pintar` | `SmartSortingPage` | Katalog material cerdas, filter 4 stream, protokol persiapan higienis |
| `/dampak-ekologis` | `EcoImpactPage` | Neraca emisi, visualisasi bulanan, kalkulator simulasi rumah tangga |
| `/analitik` | `AnalyticsPage` | Analitik tren waktu, komposisi material donut, ritme harian, drawer sains |
| `/akademi` | `EcoAcademyPage` | Perpustakaan artikel, bookmark lokal, modal bacaan, mitos vs fakta |
| `/tantangan` | `EcoChallengesPage` | Gamifikasi, checklist aksi nyata, modal perayaan lencana, leaderboard |
| `/kontak` | `ContactPage` | Narahubung resmi HIMA TI FKOM UNIKU, form saran, direktori hub, FAQ |
| `/setor-sampah` | `WasteDepositPage` | Halaman formulir setoran terdedikasi dengan kalkulator rupiah seketika |
| `/profil` | `ProfilePage` | Dasbor profil pengguna, 4 tab (transaksi, lencana, timeline, preferensi) |

### Strategi Chunking Produksi (`vite.config.ts`)
Menggunakan pemisahan chunk modular fungsional:
- `vendor-react`: React, React-DOM, React-Router.
- `vendor-charts`: Recharts (modul visualisasi data).
- `vendor-motion`: Framer Motion (modul animasi transisi).
- `vendor-core`: Lucide React dan utilitas inti.
- `index`: Kode aplikasi dan komponen halaman.

Seluruh bundel terdistribusi di bawah 450 kB, menghasilkan First Contentful Paint (FCP) yang sangat responsif.

---

## 6. KEPATUHAN ETIKA DATA & STANDAR SAINS

Platform ECOCYCLE dibangun dengan prinsip etika data yang ketat:
1. **Pembedaan Tegas Data Simulasi vs Riil:** Setiap nilai rupiah per kg pada modul bank sampah diberi catatan jelas sebagai estimasi harga pasar lokal Kuningan yang dapat disesuaikan.
2. **Kepatuhan Regulasi Nasional:** Mengacu pada pedoman teknis pengelolaan bank sampah berbasis SNI 19-3983-1995 tanpa mengklaim sertifikasi audit ISO 14001:2015 fiktif.
3. **Validitas Faktor Emisi:** Perhitungan emisi gas rumah kaca menggunakan metodologi EPA WARM v15 (Waste Reduction Model) yang diadaptasi untuk karakteristik timbunan sampah Indonesia.
