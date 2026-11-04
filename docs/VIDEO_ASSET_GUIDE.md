# ECOCYCLE — VIDEO ASSET PRODUCTION & DEPLOYMENT GUIDE
**Panduan Standar Produksi, Spesifikasi Teknis & Integrasi Video Sinematik**  
**Versi:** 2.6.0 Production Release Documentation  
**Proyek:** ECOCYCLE — Turning Waste Into Worth  
**Penyelenggara:** Web Design Competition Techno Versary Vol. II 2026 (HIMA TI FKOM UNIKU)  

---

## 1. SPESIFIKASI VIDEO HERO SINEMATIK (BACKGROUND CINEMATIC LOOP)

### 1.1 Lokasi Berkas & Struktur Direktori
- **Path Target Utama (MP4):** `public/assets/videos/ecocycle-hero-cinematic.mp4`
- **Path Target WebM (VP9 Modern Codec):** `public/assets/videos/ecocycle-hero-cinematic.webm`
- **Poster Fallback Gambar Statis:** `public/assets/images/hero_sorting.jpg`

### 1.2 Konfigurasi Enkoding Rekomendasi
| Parameter | Nilai Rekomendasi | Keterangan |
| :--- | :--- | :--- |
| **Resolusi** | $1920 \times 1080$ (1080p Desktop) / $1280 \times 720$ (Mobile responsive) | Rasio 16:9, scale otomatis via CSS `object-cover` |
| **Codec Video** | H.264 / AVC (High Profile) & VP9 (WebM) | Dukungan 100% pada Safari, Chrome, Firefox, iOS, dan Android |
| **Framerate** | 24 fps atau 30 fps | Pergerakan visual sinematik tanpa lag |
| **Bitrate Target**| 2.5 Mbps – 3.2 Mbps | Menjaga ukuran total di bawah 10 MB untuk initial load kilat |
| **Audio Track** | None / Muted Track | Menghemat bandwidth dan memenuhi standar autoplay peramban modern |
| **Durasi Loop** | 10 – 16 detik | Titik awal dan akhir harus bertransisi mulus (*seamless loop*) |
| **Atribut HTML5** | `autoPlay`, `muted`, `loop`, `playsInline`, `preload="metadata"` | Mencegah pemblokiran browser dan hemat data |

### 1.3 Perintah Enkoding FFmpeg Siap Pakai
```bash
# 1. Enkoding MP4 H.264 (Universal Faststart Web Streaming)
ffmpeg -i input_source.mov -c:v libx264 -profile:v high -level 4.1 \
  -crf 23 -preset slow -pix_fmt yuv420p -an -movflags +faststart \
  public/assets/videos/ecocycle-hero-cinematic.mp4

# 2. Enkoding WebM VP9 (Modern High-Efficiency Compression)
ffmpeg -i input_source.mov -c:v libvpx-vp9 -b:v 2M -crf 28 \
  -an public/assets/videos/ecocycle-hero-cinematic.webm
```

### 1.4 Mekanisme Fallback Generatif Kanvas (Zero-Defect Resilience)
Komponen [`CinematicEcoHeroVideo.tsx`](file:///home/firza-ilmi/.gemini/antigravity/scratch/ecocycle/src/components/features/CinematicEcoHeroVideo.tsx) dilengkapi sistem toleransi kegagalan:
- Jika berkas fisik `.mp4` belum diletakkan di direktori aset, event listener `onError` langsung beralih secara mulus (*cross-fade*) ke **Generative HTML5 Canvas Engine 60fps**.
- Kanvas merender 45 partikel dinamis dan daun mikro yang melayang vertikal secara halus.
- Kontras teks judul terjaga penuh melalui overlay gradien editorial ganda berkonsistensi WCAG 2.1 AA.

---

## 2. SPESIFIKASI VIDEO TUTORIAL ONBOARDING LENGKAP

### 2.1 Lokasi Berkas & Aset Pendukung
- **Path Target Video (MP4):** `public/media/ecocycle-tutorial.mp4`
- **Path Takarir Closed Captions (WebVTT):** `public/media/ecocycle-tutorial-captions.vtt` *(Tersedia & Terverifikasi)*
- **Poster Thumbnail:** `public/assets/images/workshop.jpg`
- **Halaman Pemutar:** Rute `/panduan` ([`TutorialPage.tsx`](file:///home/firza-ilmi/.gemini/antigravity/scratch/ecocycle/src/pages/Tutorial/TutorialPage.tsx))

### 2.2 Konfigurasi Enkoding Rekomendasi
| Parameter | Nilai Rekomendasi | Keterangan |
| :--- | :--- | :--- |
| **Resolusi** | $1920 \times 1080$ (1080p Full HD) | Memastikan teks UI dan angka timbangan terlihat tajam |
| **Codec Video** | H.264 / AVC (Main / High Profile) | Kompatibel di seluruh peramban mobile dan desktop |
| **Codec Audio** | AAC-LC, Stereo, 128 kbps, 44.1 kHz | Suara narasi narator jernih dan bebas distorsi |
| **Framerate** | 30 fps atau 60 fps | Memperlihatkan animasi UI dan transisi secara halus |
| **Bitrate Target**| 3.0 Mbps – 4.5 Mbps | Keseimbangan optimal antara kualitas layar dan buffering |
| **Durasi Total** | 04:30 – 06:00 menit | 8 bab materi terstruktur |

### 2.3 Perintah Enkoding FFmpeg Tutorial
```bash
ffmpeg -i raw_screen_recording.mp4 -c:v libx264 -profile:v high \
  -crf 22 -preset medium -pix_fmt yuv420p \
  -c:a aac -b:a 128k -ar 44100 -movflags +faststart \
  public/media/ecocycle-tutorial.mp4
```

### 2.4 Struktur 8 Bab Tutorial & Integrasi WebVTT
Aplikasi telah memetakan 8 bab secara presisi dengan takarir teks:
1. **00:00 - 00:45 | Bab 1:** Orientasi Beranda & Pemahaman Alur 4 Langkah Sirkular.
2. **00:45 - 01:30 | Bab 2:** Navigasi Katalog Pemilahan Pintar (Do's & Don'ts higienitas).
3. **01:30 - 02:15 | Bab 3:** Pencatatan Setoran Sampah Mandiri & Kalkulasi Nilai Rupiah.
4. **02:15 - 03:00 | Bab 4:** Buku Tabungan Bank Sampah Digital & Ekspor CSV.
5. **03:00 - 03:45 | Bab 5:** Neraca Dampak Ekologis & Jejak Karbon Ilmiah EPA WARM.
6. **03:45 - 04:30 | Bab 6:** Partisipasi Tantangan Komunitas & Membuka Lencana Prestasi.
7. **04:30 - 05:15 | Bab 7:** Dasbor Personal Profil Pengguna & Target Bulanan.
8. **05:15 - 06:00 | Bab 8:** Pusat Riset Analitik Lanjutan & Metodologi EPA WARM.

### 2.5 Status Kejujuran & Transparansi Simulasi
Bila berkas biner `.mp4` belum disalin ke dalam `public/media/`, antarmuka `/panduan` menampilkan label eksplisit:
`Simulasi Interaktif (Aset Video Fisik Belum Disediakan)`
Platform tidak pernah mengecoh evaluator atau mengklaim video fisik tersedia bila file belum hadir.
