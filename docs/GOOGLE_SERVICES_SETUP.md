# ECOCYCLE — Panduan Integrasi Layanan Google & Firebase
**Versi:** 3.0.0 (Google Ecosystem Production Ready)  
**Platform:** Google Firebase, Google Cloud Platform, Google Analytics 4, Google Search Console  
**Tanggal:** 4 November 2026  

---

## 1. Ikhtisar Arsitektur Google Ecosystem

ECOCYCLE mengadopsi tumpukan infrastruktur komputasi awan Google yang terkelola secara penuh (*fully managed serverless*):
- **Firebase Authentication:** Autentikasi berbasis token JWT standar OAuth 2.0 (Surel/Kata Sandi & Google Identity Provider resmi).
- **Cloud Firestore:** Basis data dokumen terdistribusi NoSQL dengan aturan keamanan *Zero-Trust* (`firestore.rules`) dan pengindeksan multi-bidang (`firestore.indexes.json`).
- **Cloud Storage for Firebase:** Penyimpanan objek blob terisolasi untuk foto bukti setoran sampah dan avatar pengguna (`storage.rules`).
- **Cloud Functions for Firebase (v2 / Node.js 20):** Logika bisnis sisi server tepercaya untuk verifikasi setoran limbah, pembukuan ledger transaksi keuangan otomatis, dan akreditasi EcoPoints anti-manipulasi.
- **Firebase App Check:** Perlindungan endpoint API dari *botnet*, *credential stuffing*, dan *replay attacks* menggunakan reCAPTCHA Enterprise / App Attest.
- **Google Analytics 4 (GA4):** Telemetri privasi tinggi (*privacy-preserving telemetry*) tanpa kebocoran PII (*Personally Identifiable Information*).
- **Google Search Console & Technical SEO:** Prerendering HTML statis, *structured data schema* JSON-LD, sitemap terverifikasi, dan kepatuhan robots.txt.
- **Firebase Hosting:** Distribusi konten statis global tepi jaringan (*edge CDN*) dengan *security headers* (CSP, HSTS, X-Frame-Options) dan *SPA URL rewrites*.

---

## 2. Langkah Demi Langkah Penyiapan di Firebase Console

### A. Pembuatan Project Firebase
1. Buka [Firebase Console](https://console.firebase.google.com/).
2. Klik **Add Project** (Tambahkan Proyek), beri nama `ecocycle-production`.
3. Aktifkan **Google Analytics for this project** (pilih akun GA4 yang relevan).
4. Klik **Create Project** dan tunggu provisi selesai.

### B. Mendaftarkan Web Application
1. Pada menu dasbor utama proyek, klik ikon **Web (`</>`)** untuk mendaftarkan aplikasi.
2. Beri nama aplikasi: `ECOCYCLE Web Client`.
3. Centang opsi **Also set up Firebase Hosting for this app**.
4. Salin konfigurasi objek `firebaseConfig` yang tampil di layar. Nilai-nilai ini dimasukkan ke dalam berkas `.env`:
   ```bash
   VITE_FIREBASE_API_KEY="AIzaSy..."
   VITE_FIREBASE_AUTH_DOMAIN="ecocycle-production.firebaseapp.com"
   VITE_FIREBASE_PROJECT_ID="ecocycle-production"
   VITE_FIREBASE_STORAGE_BUCKET="ecocycle-production.appspot.com"
   VITE_FIREBASE_MESSAGING_SENDER_ID="123456789012"
   VITE_FIREBASE_APP_ID="1:123456789012:web:abcdef123456"
   VITE_FIREBASE_MEASUREMENT_ID="G-XXXXXXXXXX"
   ```

### C. Konfigurasi Firebase Authentication
1. Pada bilah navigasi kiri, pilih **Build > Authentication**, lalu klik **Get Started**.
2. Di tab **Sign-in method**:
   - **Email/Password:** Klik untuk mengaktifkan. Aktifkan *Email link (passwordless sign-in)* jika diperlukan atau biarkan standar email/sandi.
   - **Google:** Klik opsi Google, aktifkan tombol *Enable*, pilih surel dukungan proyek (*Project support email*), lalu klik **Save**.
3. Di tab **Settings > Authorized domains**:
   - Tambahkan domain produksi Anda: `ecocycle.id`.
   - Pastikan `localhost` tetap terdaftar untuk pengujian lingkungan pengembangan lokal.

### D. Konfigurasi Cloud Firestore
1. Pilih **Build > Firestore Database**, klik **Create Database**.
2. Pilih lokasi basis data terdekat dengan pengguna Indonesia: `asia-southeast2` (Jakarta) atau `asia-southeast1` (Singapura).
3. Pilih **Start in production mode** (Aturan keamanan awal menolak akses liar secara default).
4. Terapkan aturan keamanan resmi dan indeks komposit proyek ECOCYCLE:
   ```bash
   firebase deploy --only firestore:rules,firestore:indexes
   ```

### E. Konfigurasi Cloud Storage
1. Pilih **Build > Storage**, klik **Get Started**.
2. Pilih lokasi penyimpanan yang sama dengan Firestore (`asia-southeast2` atau `asia-southeast1`).
3. Terapkan aturan keamanan storage:
   ```bash
   firebase deploy --only storage
   ```

### F. Konfigurasi Firebase App Check
1. Buka **Build > App Check**.
2. Daftarkan aplikasi web Anda menggunakan penyedia **reCAPTCHA Enterprise** atau **reCAPTCHA v3**.
3. Salin Site Key ke dalam `.env` sebagai `VITE_FIREBASE_APP_CHECK_KEY`.

---

## 3. Penerapan Cloud Functions (Server-Side Logic)

ECOCYCLE menyertakan Cloud Functions tepercaya di direktori `functions/`:
- `processWasteDeposit`: Memvalidasi kalkulasi bobot limbah, menghitung nilai komoditas berdasarkan kurs resmi, mencatat ledger transaksi `/transactions/`, dan mengkreditkan poin ke `/ecoPoints/`.
- `onUserSignUp`: Memicu provisi otomatis profil pengguna di `/users/{uid}` dan neraca saldo awal di `/ecoPoints/{uid}`.

### Perintah Pembangunan dan Penerapan:
```bash
cd functions
npm install
npm run build
firebase deploy --only functions
```

---

## 4. Konfigurasi Google Analytics 4 (GA4)

1. Buka [Google Analytics Console](https://analytics.google.com/).
2. Pada **Admin > Data Streams**, pilih aliran web `ECOCYCLE Web Client`.
3. Salin **Measurement ID** (berawalan `G-`) dan masukkan ke variabel `VITE_FIREBASE_MEASUREMENT_ID`.
4. Event analitik yang ditransmisikan secara otomatis dan aman (tanpa PII):
   - `page_view`: Navigasi rute halaman.
   - `sign_up`: Pendaftaran akun baru warga sirkular.
   - `login`: Sesi masuk akun pengguna.
   - `google_sign_in`: Masuk melalui penyedia identitas resmi Google.
   - `deposit_submitted`: Pengajuan setoran sampah terpilah.
   - `challenge_joined`: Partisipasi tantangan keberlanjutan.
   - `challenge_completed`: Penyelesaian seluruh misi tantangan sirkular.

---

## 5. Google Search Console & Verifikasi Domain

1. Buka [Google Search Console](https://search.google.com/search-console).
2. Pilih metode **Domain Verification** untuk `ecocycle.id`.
3. Tambahkan rekaman DNS TXT yang disediakan Google ke penyedia registrar domain Anda.
4. Setelah terverifikasi:
   - Masukkan URL sitemap resmi di menu **Sitemaps**: `https://ecocycle.id/sitemap.xml`.
   - Uji berkas `robots.txt` pada **Robots.txt Tester** untuk memastikan rute publik (`/bank-sampah`, `/pemilahan-pintar`, dsb.) dapat diindeks dan rute privat (`/profil`, `/auth/*`) diblokir dengan benar.

---

## 6. Penerapan ke Firebase Hosting (Production Deploy)

Sebelum menerapkan ke Firebase Hosting, pastikan berkas statis dan prerender telah dibangun:
```bash
# 1. Bangun aset frontend dan jalankan prerender generator
npm run build

# 2. Login ke akun Google Anda melalui Firebase CLI (bila CLI tersedia)
firebase login

# 3. Hubungkan alias proyek
firebase use ecocycle-production

# 4. Terapkan seluruh konfigurasi hosting
firebase deploy --only hosting
```

Aplikasi ECOCYCLE Anda sekarang aktif secara global dengan keamanan penuh Google Cloud!
