# ECOCYCLE — VIDEO ASSET PRODUCTION & DEPLOYMENT GUIDE
**Panduan Standar Produksi, Spesifikasi Teknis & Integrasi Video Sinematik**  
**Versi:** 2.5.0 Production Documentation  
**Proyek:** ECOCYCLE — Turning Waste Into Worth  
**Penyelenggara:** Web Design Competition Techno Versary Vol. II 2026 (HIMA TI FKOM UNIKU)  

---

## 1. SPESIFIKASI VIDEO HERO SINEMATIK (BACKGROUND CINEMATIC LOOP)

### 1.1 Lokasi File & Penamaan
- **Path Target:** `public/assets/videos/ecocycle-hero-cinematic.mp4`
- **Poster Fallback:** `public/assets/images/hero_sorting.jpg`

### 1.2 Konfigurasi Enkoding Rekomendasi
| Parameter | Nilai Rekomendasi | Keterangan |
| :--- | :--- | :--- |
| **Resolusi** | $1920 \times 1080$ (1080p) | Rasio 16:9, responsive scale via CSS `object-cover` |
| **Codec Video** | H.264 / AVC (High Profile) | Kompatibilitas 100% pada Safari, Chrome, Firefox, & Edge |
| **Framerate** | 24 fps atau 30 fps | Pergerakan organik halus menyerupai sinema alam |
| **Bitrate Target**| 2.5 Mbps – 3.5 Mbps | Menjaga ukuran berkas di bawah 12 MB untuk muat kilat |
| **Audio** | None / Muted Track | Menghemat bandwidth dan mencegah pemblokiran autoplay peramban |
| **Durasi Loop** | 10 – 18 detik | Titik awal dan akhir harus bertransisi mulus (*seamless loop*) |

### 1.3 Arah Kreatif & Konsep Visual
- **Visual Utama:** Daun hijau yang tertiup angin sejuk, air jernih mengalir, visualisasi partikel daur ulang polimer botol plastik rPET, dan lanskap kota berkelanjutan (*smart eco-city*).
- **Nuansa Warna:** Deep emerald, luminous lime, warm golden light, dan organic forest green.
- **Blending Layar:** Video dirender pada opasitas ~30% di bawah lapisan gradien editorial kaca (*glassmorphism overlay*) sehingga seluruh teks judul tetap memiliki kontras tinggi sesuai standar WCAG 2.1 AA.

### 1.4 Mekanisme Fallback Generatif (Zero Broken Experience)
Apabila berkas video MP4 belum disematkan atau jaringan peramban mengalami kendala, komponen [`CinematicEcoHeroVideo.tsx`](file:///home/firza-ilmi/.gemini/antigravity/scratch/ecocycle/src/components/features/CinematicEcoHeroVideo.tsx) secara otomatis menjalankan **Generative HTML5 Canvas Engine**:
- Menghasilkan simulasi fisika 45 partikel sirkular dan helai daun mikro yang melayang vertikal secara halus pada 60 fps.
- Menggambar cincin orbit melingkar yang melambangkan ekonomi sirkular tanpa membebani daya komputasi CPU/GPU.

---

## 2. SPESIFIKASI VIDEO TUTORIAL ONBOARDING LENGKAP

### 2.1 Lokasi File & Penamaan
- **Path Target:** `public/media/ecocycle-tutorial.mp4`
- **Halaman Pemutar:** Rute `/panduan` ([`TutorialPage.tsx`](file:///home/firza-ilmi/.gemini/antigravity/scratch/ecocycle/src/pages/Tutorial/TutorialPage.tsx))

### 2.2 Struktur 8 Bab Tutorial
Video tutorial dirancang mencakup 8 bab operasional platform:
1. **Bab 1:** Orientasi Beranda & Pemahaman Alur 4 Langkah Sirkular.
2. **Bab 2:** Navigasi Katalog Pemilahan Pintar (Do's & Don'ts higienitas).
3. **Bab 3:** Cara Mengisi Formulir Setoran Sampah Mandiri & Kalkulasi Nilai Rupiah.
4. **Bab 4:** Pengelolaan Buku Tabungan Bank Sampah Digital & Ekspor CSV.
5. **Bab 5:** Membaca Neraca Dampak Ekologis & Simulator Jejak Karbon Keluarga.
6. **Bab 6:** Partisipasi Tantangan Komunitas & Membuka Lencana Prestasi.
7. **Bab 7:** Eksplorasi Dasbor Personal Profil Pengguna & Target Bulanan.
8. **Bab 8:** Audit Analitik Lanjutan, Filter Waktu, & Metodologi Sains EPA WARM.

### 2.3 Kontrol Pemutar Interaktif & Transkrip
Halaman `/panduan` dilengkapi fitur kelas dunia:
- Kontrol kecepatan putar variabel ($1\times$, $1.5\times$, $2\times$).
- Toggle transkrip dan teks takarir (*Closed Captions / CC*) Bahasa Indonesia lengkap per bab.
- Tombol peluncur **Tur Panduan Interaktif Langsung di Layar** ([`InteractiveGuidedTour.tsx`](file:///home/firza-ilmi/.gemini/antigravity/scratch/ecocycle/src/components/features/InteractiveGuidedTour.tsx)).
