# ECOCYCLE — USER & JUDGE COMPREHENSIVE WALKTHROUGH GUIDE
**Panduan Pengguna & Evaluasi Dewan Juri Kompetisi**  
**Proyek:** ECOCYCLE — Turning Waste Into Worth  
**Acara:** Web Design Competition Techno Versary Vol. II 2026 (HIMA TI FKOM Universitas Kuningan)  

---

## 🎯 PANDUAN CEPAT EVALUASI JURI (QUICK START)

Aplikasi ECOCYCLE telah siap dievaluasi secara lokal tanpa memerlukan instalasi database eksternal:
- **URL Server Lokal:** `http://localhost:3000/`
- **Arsitektur:** Single Page Application (React 19 + TypeScript + Tailwind CSS + Framer Motion)
- **Persistensi Data:** HTML5 LocalStorage (data demo awal telah tersedia dan data baru akan tersimpan otomatis saat halaman di-refresh)

Berikut adalah panduan eksplorasi fitur langkah-demi-langkah pada seluruh 10 modul aplikasi.

---

## 1. BERANDA (HOMEPAGE) — Rute: `/`
### Apa yang Perlu Dievaluasi:
- **Hero Section:** Judul editorial bertema *Turning Waste Into Worth* dengan perpaduan tipografi editorial Serif dan Sans-serif.
- **Dual Call to Action (CTA):** Tombol "Mulai Pilah Sekarang" (mengarahkan ke `/pemilahan-pintar`) dan "Buka Bank Sampah" (mengarahkan ke `/bank-sampah`).
- **Alur 4 Langkah Sirkular:** Visualisasi alur mudah dipahami: *1. Pilah di Rumah*, *2. Bawa ke Hub*, *3. Timbang & Verifikasi*, *4. Dapatkan Manfaat*.
- **Live Counter Metrik:** Metrik sampah teralihkan, reduksi emisi CO₂e, pohon tertanam, dan transaksi terverifikasi bergerak mulus (*AnimatedCounter*).
- **Pratinjau Fitur Unggulan:** Kartu preview interaktif yang mengarahkan ke modul-modul utama platform.

---

## 2. BANK SAMPAH DIGITAL — Rute: `/bank-sampah`
### Skenario Pengujian:
1. **Pemeriksaan Saldo:** Lihat 3 kartu saldo di bagian atas (Estimasi Saldo Rupiah, Total Berat Setoran, dan Akumulasi EcoPoints).
2. **Pencarian & Filter Transaksi:** 
   - Ketik kata kunci "Kardus" pada kotak pencarian untuk melihat pencarian instan.
   - Klik chip kategori "Plastik", "Kertas", "Logam", atau "Minyak" untuk menyaring tabel.
3. **Inspeksi Tanda Terima Digital:** 
   - Klik tombol **"Detail"** pada salah satu baris transaksi untuk membuka `DepositDetailModal`.
   - Perhatikan nomor manifest, rincian konversi kg ke emisi CO₂e, kode verifikasi rantai lacak, dan tombol "Cetak Tanda Terima".
4. **Ekspor Data:** Klik tombol "Ekspor CSV" di atas tabel untuk mengunduh rekap riwayat setoran.
5. **Setor Cepat:** Klik tombol **"+ Setor Sampah Baru"** untuk membuka modal formulir setoran cepat.

---

## 3. PEMILAHAN PINTAR (SMART SORTING) — Rute: `/pemilahan-pintar`
### Skenario Pengujian:
1. **Filter Stream Sampah:** Klik tombol filter `Anorganik`, `Organik`, `B3`, atau `E-Waste`.
2. **Pencarian Material:** Masukkan kata kunci "botol" atau "baterai" di kotak pencarian.
3. **Drawer Protokol Penanganan:** 
   - Klik kartu material pada sisi kiri (misal: "Botol Plastik PET").
   - Panel sisi kanan akan langsung memperbarui langkah persiapan (1. Kosongkan residu, 2. Cuci bersih, 3. Lepas label, 4. Remas/kempeskan).
   - Periksa kartu **Kaidah Benar (Do's)** dan **Hindari Hal Ini (Don'ts)**.
4. **Tautan Langsung ke Setoran:** Klik tombol "Setor Sekarang" di kartu edukasi nilai ekonomis untuk langsung menuju halaman setoran dengan material yang siap disetor.
5. **Kaidah Editorial Bawah:** Pelajari 3 pilar utama: *Kaidah Higienitas*, *Kompresi Volume*, dan *Manfaat Nyata Keluarga*.

---

## 4. NERACA DAMPAK EKOLOGIS — Rute: `/dampak-ekologis`
### Skenario Pengujian:
1. **Metrik Agregat Otomatis:** Periksa 4 kartu bento makro yang mengalkulasi total massa (kg), emisi karbon (kg CO₂e), pohon dewasa setara, dan liter air terhemat.
2. **Grafik Tren Pemulihan Bulanan:** Arahkan kursor (*hover*) pada grafik area untuk melihat tooltip rincian volume dan reduksi emisi.
3. **Proporsi Fraksi Material:** Amati diagram batang horizontal komposisi sampah terpilah.
4. **Kalkulator Simulasi Rumah Tangga (Interactive Sliders):**
   - Geser slider **"Botol Plastik Kemasan / Hari"** (contoh: ubah dari 3 ke 8 botol).
   - Geser slider **"Sisa Sampah Dapur Dikompos / Minggu"** (contoh: ubah ke 5 kg).
   - Perhatikan bagaimana angka proyeksi reduksi emisi, pohon tertanam, dan air bersih terhemat langsung terhitung seketika!
5. **Standar Kepatuhan Terbuka:** Baca kartu kepatuhan yang menegaskan penerapan pedoman SNI 19-3983-1995 dan verifikasi timbangan metrologi resmi.

---

## 5. ANALITIK LANJUTAN & METODOLOGI ILMIAH — Rute: `/analitik`
### Skenario Pengujian:
1. **Filter Rentang Waktu Dinamis:** Klik tombol periode `30 Hari`, `90 Hari`, `6 Bulan`, atau `1 Tahun`. Perhatikan perubahan data grafik secara reaktif.
2. **Toggle Metrik Utama:** Beralih antara tombol **"Volume Sampah (kg)"** dan **"Reduksi Emisi (kg CO₂e)"**.
3. **Grafik Donut Interaktif:** Arahkan kursor pada diagram lingkaran untuk melihat proporsi persentase fraksi sampah.
4. **Ritme Penjemputan Harian:** Amati diagram batang aktivitas hari Senin hingga Minggu.
5. **Drawer Metodologi Ilmiah:** 
   - Klik tombol **"Buka Metodologi & Faktor Emisi"** di sudut kanan atas.
   - Drawer transparansi sains akan terbuka dari sisi kanan, menampilkan tabel faktor emisi EPA WARM v15 (contoh: Plastik PET = 1.50 kg CO₂e/kg, Kaleng Aluminium = 8.90 kg CO₂e/kg).

---

## 6. AKADEMI SIRKULAR & MITOS VS FAKTA — Rute: `/akademi`
### Skenario Pengujian:
1. **Membaca Artikel Lengkap:** 
   - Klik tombol "Baca Artikel Lengkap" pada artikel sorotan utama atau klik salah satu kartu artikel di grid.
   - Modal membaca artikel akan terbuka, lengkap dengan teks artikel yang kaya, nama penulis, durasi baca, dan rekomendasi artikel terkait di bagian bawah.
2. **Sistem Bookmark Lokal:** 
   - Klik ikon bookmark pada artikel mana saja.
   - Klik filter kategori **"Tersimpan"** di atas untuk melihat artikel yang telah Anda bookmark.
3. **Pemberantas Mitos Ekologis:**
   - Gulir ke bagian "Mitos vs Fakta Sirkularitas".
   - Klik kartu mitos (misal: *"Semua sampah plastik yang dibuang ke tong daur ulang pasti didaur ulang"*).
   - Kartu akan membuka penjelasan fakta ilmiah di baliknya.

---

## 7. TANTANGAN KOMUNITAS & GAMIFIKASI — Rute: `/tantangan`
### Skenario Pengujian:
1. **Bergabung dalam Tantangan:** 
   - Pada tantangan yang belum diikuti, klik tombol **"Ikuti Tantangan Ini"**.
2. **Centang Tindakan Nyata:** 
   - Centang salah satu kotak tugas (misal: "Bilas 5 botol plastik sebelum disetor").
   - Perhatikan kenaikan persentase kemajuan (*progress bar*).
3. **Membuka Lencana & Klaim Poin:**
   - Centang seluruh tugas pada sebuah tantangan hingga 100%.
   - Modal perayaan lencana (*Badge Celebration Modal*) akan muncul dengan animasi konfeti dan penambahan EcoPoints langsung ke saldo akun Anda!
4. **Papan Peringkat Komunitas:** 
   - Klik tab **"Papan Peringkat Komunitas"**.
   - Amati peringkat pengguna simulasi wilayah Kuningan dan temukan posisi akun Anda yang disorot dengan warna khusus.

---

## 8. NARAHUBUNG & SEKRETARIAT KAMPUS — Rute: `/kontak`
### Skenario Pengujian:
1. **Manifesto Visi & Misi:** Pelajari visi kampus zero-waste dan misi pemberdayaan warga.
2. **Pengiriman Formulir Kontak:**
   - Isi Nama, Email, Kategori Kepentingan, dan Pesan.
   - Klik tombol **"Kirim Pesan Sekarang"**.
   - Notifikasi sukses akan muncul dan pesan tersimpan di LocalStorage (`ecocycle_contact_messages_v2`).
3. **Informasi Sekretariat HIMA TI UNIKU:** Rincian alamat Fakultas Ilmu Komputer Universitas Kuningan, kontak hotline, dan jam operasional.
4. **FAQ Akordeon:** Klik pertanyaan seputar bank sampah untuk membuka dan menutup jawaban interaktif.

---

## 9. FORMULIR SETOR SAMPAH MANDIRI — Rute: `/setor-sampah`
### Skenario Pengujian:
1. **Pilih Kategori:** Klik salah satu kategori sampah (Plastik, Kertas, Logam, Minyak Jelantah, Organik, atau Kaca).
2. **Input Berat (kg):** Masukkan angka berat (misal: `4.5` kg).
3. **Kalkulasi Rupiah Otomatis:** Perhatikan kotak ringkasan di samping yang langsung menghitung estimasi rupiah berdasarkan tarif per kg material.
4. **Pilih Lokasi Hub:** Tentukan drop-point (contoh: "Hub Sentral FKOM UNIKU").
5. **Unggah Foto Bukti:** Fitur input file bukti visual material bersih.
6. **Simpan Transaksi:** Klik tombol **"Konfirmasi Setoran Sampah"**. Sistem akan menyimpan transaksi, menambahkan poin, dan mengarahkan kembali ke halaman Bank Sampah.

---

## 10. PROFIL PENGGUNA & PREFERENSI — Rute: `/profil`
### Skenario Pengujian:
1. **Kartu Hero Profil:** Menampilkan nama pengguna, peran, lencana peringkat komunitas, streak pemilahan aktif, dan akumulasi poin.
2. **Pencapaian Target Bulanan:** Batang kemajuan yang membandingkan reduksi emisi aktual dengan target bulanan yang ditetapkan pengguna.
3. **4 Tab Terorganisir:**
   - **Tab Transaksi:** Tabel ringkas setoran sampah khusus pengguna.
   - **Tab Lencana:** Galeri seluruh lencana yang telah berhasil diraih maupun yang masih terkunci.
   - **Tab Garis Waktu (Timeline):** Riwayat kronologis aktivitas pemilahan sampah.
   - **Tab Pengaturan:** Toggle notifikasi email, pengingat jadwal setor, dan privasi papan peringkat.
4. **Edit Profil Interaktif:** Klik tombol **"Edit Profil"** untuk memperbarui nama, bio singkat, peran, target reduksi karbon, atau mengatur ulang profil demo.


---

## 11. PUSAT PEMBELAJARAN & VIDEO TUTORIAL — Rute: `/panduan`
### Skenario Pengujian:
1. **Pemutar Video & Kontrol Playback:** 
   - Klik tombol Putar / Jeda untuk mengontrol pemutaran.
   - Ganti kecepatan pemutaran ($1\times$, $1.5\times$, $2\times$) pada bilah kontrol bawah.
   - Aktifkan atau nonaktifkan teks takarir (*Closed Captions / CC*).
2. **Navigasi 8 Bab Terstruktur:**
   - Klik salah satu bab dari daftar di sisi kanan (contoh: *Bab 2: Menggunakan Pemilahan Pintar* atau *Bab 8: Mengeksplorasi Analitik Lanjutan*).
   - Perhatikan pembaruan kartu transkrip narasi dan target rute.
3. **Menjalankan Tur Panduan Interaktif:**
   - Klik tombol **"Mulai Tur Panduan Interaktif"** di sudut kanan atas.
   - Modal interaktif akan terbuka dengan panduan langkah-demi-langkah, checklist tindakan, kiat praktis, serta tombol lompat langsung ke halaman terkait.

---

## 12. SISTEM AUTENTIKASI RIIL & KEAMANAN AKUN — Rute: `/masuk` & `/daftar`
### Skenario Pengujian:
1. **Pendaftaran Akun Baru (`/daftar`):**
   - Masukkan Nama Lengkap, Email, Kata Sandi, dan Konfirmasi Kata Sandi.
   - Centang persetujuan kaidah pemilahan bersih lalu klik **"Daftar Akun Baru"**.
   - Sistem akan memvalidasi data dan mengarahkan ke halaman instruksi verifikasi surel (`/verifikasi-email`).
2. **Masuk ke Akun (`/masuk`):**
   - Masukkan surel dan kata sandi untuk masuk.
   - Tersedia tombol **"Masuk dengan Google"** untuk alur Single Sign-On OAuth.
   - Terdapat tautan ke halaman **Pemulihan Kata Sandi** (`/lupa-password`).
3. **Keamanan Sesi Privat (`/profil`):**
   - Saat pengguna berhasil masuk, dasbor profil menampilkan banner status otentikasi aktif dan status keamanan Row Level Security (RLS).
   - Buka tab "Pengaturan" untuk melihat tombol keluar akun (**Sign Out**).
