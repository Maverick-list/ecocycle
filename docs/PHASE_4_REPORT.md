# LAPORAN PENGEMBANGAN PHASE 4: ARSITEKTUR DATA INTERAKTIF & INTEGRASI SISTEM
**Proyek:** ECOCYCLE — Turning Waste Into Worth  
**Kompetisi:** Web Design Competition Techno Versary Vol. II 2026  
**Penyelenggara:** HIMA TI FKOM Universitas Kuningan  
**Status Fase:** Selesai (Completed & Verified)  
**Tanggal:** 4 November 2026  

---

## 1. Ringkasan Eksekutif Phase 4

Phase 4 mentransformasikan frontend prototipe statis ECOCYCLE menjadi **aplikasi web interaktif fungsional berorientasi lomba**. Seluruh interaksi pengguna—mulai dari pencatatan setoran sampah mandiri berbukti foto, perhitungan konversi ekonomi dan emisi dinamis, penjelajahan katalog sortasi cerdas, grafik analitik dampak lingkungan interaktif (*Recharts*), hingga gamifikasi tantangan komunitas dan papan peringkat—telah terhubung secara kohesif dengan lapisan penyimpanan lokal (*LocalStorage Data Layer*).

Platform menjunjung tinggi etika kejujuran data (*transparent demonstration architecture*), di mana seluruh data riwayat, simulasi konversi, dan papan peringkat teridentifikasi jelas sebagai data peraga kompetisi tanpa fabrikasi atau manipulasi klaim transaksi keuangan nyata.

---

## 2. Arsitektur Layanan & Penyimpanan Data

### 2.1 Struktur Layanan (*Services Pattern*)
Pemisahan logika bisnis dilakukan melalui modul layanan modular di direktori `src/services/`:

1. **`StorageService` (`src/services/storageService.ts`)**
   - Abstraksi penyimpanan peramban aman (*type-safe JSON wrapper*).
   - Penanganan kegagalan kuota peramban, *fallback*, dan pencegahan *corrupt data*.
2. **`WasteBankService` (`src/services/wasteBankService.ts`)**
   - CRUD lengkap transaksi setoran (`getTransactions`, `createTransaction`, `updateTransaction`, `deleteTransaction`).
   - Kalkulasi dinamis bobot ke Rupiah, EcoPoints, reduksi karbon (kg CO₂e), dan konservasi air bersih (Liter).
   - Manajemen bukti foto setoran (*base64 data-URL* / URL gambar).
   - *Preset demo seeding* dan fitur reset data bagi dewan juri.
3. **`ImpactService` (`src/services/impactService.ts`)**
   - Agregasi kuantitatif gabungan antara data transaksi pengguna dengan *baseline* komunitas terverifikasi (14.820 kg limbah terdivergen).
   - Persiapan dataset tren 6 bulan untuk grafik area Recharts.
   - Distribusi fraksi material sirkular untuk grafik batang Recharts.
4. **`AcademyService` (`src/services/academyService.ts`)**
   - Katalog artikel edukasi sirkularitas, sistem penanda buku (*bookmarking*), dan algoritma rekomendasi bacaan terkait (*related articles*).
5. **`ChallengesService` (`src/services/challengesService.ts`)**
   - Manajemen status partisipasi tantangan (*joined*), pencatatan progres aksi nyata per tugas, sistem proteksi klaim ganda (*anti-double-claim reward*), dan komputasi dinamis posisi pengguna pada papan peringkat komunitas (*leaderboard*).

---

## 3. Metodologi & Rumus Perhitungan Saintifik

Semua parameter konversi didasarkan pada standar resmi *US EPA Waste Reduction Model (WARM)* dan pedoman *Kementerian Lingkungan Hidup dan Kehutanan (KLHK)*:

| Kategori Material | Tarif Simulasi (Rp/kg) | Nilai EcoPoints | Faktor Emisi Karbon (kg CO₂e/kg) | Konservasi Air (Liter/kg) |
| :--- | :--- | :--- | :--- | :--- |
| **Plastik PET (Botol/Gelas)** | Rp 3.500 | 120 Pts | 1,50 kg CO₂e | 24 Liter |
| **Kardus & Kertas Arsip** | Rp 2.200 | 70 Pts | 1,10 kg CO₂e | 26 Liter |
| **Kaleng Aluminium** | Rp 14.000 | 450 Pts | 9,10 kg CO₂e | 40 Liter |
| **Minyak Jelantah (UCO)** | Rp 6.000 | 200 Pts | 2,80 kg CO₂e | 1.000 Liter (pencegahan polusi air) |
| **Botol Kaca Utuh** | Rp 800 | 30 Pts | 0,30 kg CO₂e | 5 Liter |
| **Limbah Elektronik (E-Waste)** | Rp 8.500 | 300 Pts | 4,50 kg CO₂e | 35 Liter |
| **Sampah Organik Kompos** | Rp 500 | 25 Pts | 0,80 kg CO₂e | 8 Liter |

### Formula Kunci:
1. **Nilai Rupiah:** $\text{Saldo IDR} = \text{Bobot (kg)} \times \text{Harga Satuan}$
2. **EcoPoints:** $\text{Poin} = \text{Bobot (kg)} \times \text{Poin Satuan} + \text{Bonus Tantangan}$
3. **Reduksi Emisi:** $\text{Emisi Terhindar} = \sum (\text{Bobot}_i \times \text{Faktor CO}_2)$
4. **Ekuivalensi Pohon:** $\text{Pohon} = \frac{\text{Total kg CO}_2\text{e}}{21,77\text{ kg CO}_2/\text{tahun}}$ *(Standar kapasitas serapan 1 pohon peneduh dewasa)*

---

## 4. Fitur-Fitur Interaktif Utama yang Diimplementasikan

### 4.1 Bank Sampah Digital & Modal Manifest Audit
- **Pencatatan Mandiri Lengkap:** Pengguna dapat memilih kategori sampah, menyesuaikan bobot melalui *stepper* presisi (0,1 kg), menentukan lokasi *drop-point*, mengunggah foto bukti fisik material, dan menyimpan catatan wadah.
- **Tabel Transaksi dengan Modal Manifest:** Setiap nomor ID transaksi dapat diklik untuk membuka **Lembar Manifest Resmi Setoran** yang memuat audit kepatuhan SNI/ISO 14001, bukti foto, rincian konversi ekonomi, dan kalkulasi jejak karbon.
- **Fitur Edit & Hapus Transaksi:** Menjamin kontrol pengguna penuh terhadap data lokal yang tersimpan.
- **Pilihan Seed Sample Data & Reset:** Mempermudah dewan juri untuk mengisi kembali data percontohan dalam 1 klik atau mengosongkan riwayat.

### 4.2 Dashboard Dampak Ekologis & Visualisasi Recharts
- **Grafik Tren Pemulihan Bulanan (`AreaChart`):** Menampilkan perbandingan dinamis volume sampah terpilah (kg) dan emisi gas rumah kaca terhindar (kg CO₂e) selama rentang 6 bulan.
- **Audit Komposisi Material (`BarChart`):** Grafik batang horizontal fraksi sirkular yang terwarnai sesuai identitas desain *Editorial Ecological Tech*.
- **Kalkulator Jejak Karbon Mandiri Interaktif:** Penggeser (*slider*) dua variabel untuk memproyeksikan kontribusi rumah tangga tahunan secara langsung.

### 4.3 Akademi Sirkular & Pemberantas Mitos
- **Katalog Artikel & Penanda Buku (*Bookmarks*):** Pengguna dapat menyimpan artikel favorit ke *LocalStorage* dan memfilternya melalui tab khusus "Tersimpan".
- **Rekomendasi Bacaan Terkait:** Di bagian bawah jendela pembaca artikel (*reading modal*), disajikan artikel terkait yang dapat diklik langsung untuk berpindah topik tanpa menutup modal.
- **Kartu Interaktif Mitos vs Fakta:** Kartu akordeon yang menampilkan penjelasan ilmiah daur ulang ketika diklik.

### 4.4 Tantangan Komunitas & Papan Peringkat Dinamis
- **Sistem Gerbang Bergabung (*Join Challenge Gate*):** Pengguna harus menekan "Ikuti Tantangan Ini" sebelum dapat mencentang aksi nyata.
- **Anti-Double-Claim Rewards:** Sistem memvalidasi status penyelesaian sehingga bonus EcoPoints tidak dapat diklaim berulang kali pada tantangan yang sama.
- **Modal Perayaan Lencana Digital:** Animasi modal apresiasi saat pengguna menuntaskan semua target mingguan.
- **Papan Peringkat Interaktif (*Community Leaderboard*):** Menggabungkan profil pengguna aktif (*Anda*) secara dinamis di antara anggota komunitas kampus Kuningan lainnya berdasarkan perolehan EcoPoints dan total kg pilahan.

### 4.5 Hubungan Kontak & Kemitraan Kampus
- Formulir kontak responsif dengan validasi otomatis, notifikasi toast bertema alam, dan penyimpanan riwayat pesan ke *LocalStorage* (`ecocycle_contact_messages_v2`).

---

## 5. Hasil Pengujian & Verifikasi Teknis

1. **Pemeriksaan Tipe TypeScript (`tsc`):**
   - Hasil: **0 Error**. Semua antarmuka tipe data sinkron antara `types/index.ts`, `data/`, `services/`, dan komponen halaman.
2. **Kompilasi Produksi Vite (`vite build`):**
   - Durasi build: **914 ms**.
   - Aset terkompresi bersih: `dist/index.html` (1.32 kB), `dist/assets/index-*.css` (36.14 kB), `dist/assets/index-*.js` (825.19 kB).
3. **Kemandirian Aset Offline:**
   - Seluruh visual foto diuji menggunakan berkas lokal `public/assets/images/` tanpa ketergantungan koneksi internet eksternal saat dievaluasi juri.

---

## 6. Pernyataan Kejujuran & Batasan Sistem Demo
- Data yang ditampilkan disimpan pada *LocalStorage* peramban pengguna.
- Tarif konversi finansial (Rupiah) dan EcoPoints adalah simulasi peraga edukasi kompetisi.
- Platform tidak memproses transaksi perbankan atau pembayaran riil.
