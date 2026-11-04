# ECOCYCLE — AUTHENTICATION & SECURITY ARCHITECTURE SPECIFICATION
**Dokumen Spesifikasi Keamanan, Autentikasi Supabase & Isolasi Data Privat**  
**Versi:** 2.6.0 Production Release Documentation  
**Proyek:** ECOCYCLE — Turning Waste Into Worth  
**Penyelenggara:** Web Design Competition Techno Versary Vol. II 2026 (HIMA TI FKOM UNIKU)  

---

## 1. PRINSIP KEAMANAN & ARSITEKTUR AUTENTIKASI

ECOCYCLE menerapkan arsitektur keamanan tingkat enterprise berbasis **Supabase Auth** dan **PostgreSQL Row Level Security (RLS)** untuk menjamin bahwa seluruh data buku tabungan, riwayat setoran sampah, EcoPoints, dan aktivitas personal pengguna terisolasi secara privat.

### Prinsip Utama:
1. **Zero Trust Client-Side:** Frontend tidak pernah menyimpan kredensial mentah (password), token otorisasi rahasia (*service_role key*), atau data sensitif pengguna di plain localStorage tanpa otorisasi.
2. **Database-Level Authorization:** Seluruh pembatasan akses data dieksekusi di level mesin basis data PostgreSQL menggunakan kebijakan `auth.uid() = user_id`, sehingga pengguna yang jahat (*adversary*) tidak dapat memanipulasi API untuk membaca atau mengubah data pengguna lain.
3. **Pemisahan Data Sensitif (PII):** Tabel `public.profiles` dilindungi RLS ketat (`auth.uid() = id`). Untuk kebutuhan publik (misalnya leaderboard), platform menyediakan view terisolasi `public.leaderboard_view` yang menutupi nomor telepon, alamat fisik, dan alamat email.
4. **Graceful Development Fallback:** Apabila variabel lingkungan `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` belum dikonfigurasi, aplikasi tidak memalsukan (*fake*) proses login, melainkan memberikan peringatan transparan dan menjalankan mode *Local Sandbox Demo* yang terisolasi.

---

## 2. ALUR AUTENTIKASI PENGGUNA (AUTHENTICATION FLOWS)

### 2.1 Pendaftaran Akun Baru (Sign Up) — Rute: `/daftar`
1. Pengguna memasukkan Nama Lengkap, Alamat Surel, dan Kata Sandi (minimal 6 karakter).
2. Klien memanggil fungsi `supabase.auth.signUp({ email, password, options: { data: { full_name } } })`.
3. Supabase Auth membuat entri di tabel terproteksi `auth.users` dan mengirimkan email konfirmasi.
4. Trigger PostgreSQL `on_auth_user_created` otomatis menginisialisasi entri profil pada `public.profiles` dan preferensi pada `public.user_preferences`.
5. Pengguna dialihkan ke halaman **Konfirmasi Surel** (`/verifikasi-email`).

### 2.2 Masuk ke Akun (Sign In) — Rute: `/masuk` & `/login`
1. Pengguna memasukkan email dan password terdaftar.
2. Klien memanggil `supabase.auth.signInWithPassword({ email, password })`.
3. Jika valid, Supabase mengembalikan JWT (*JSON Web Token*) yang disimpan secara aman oleh SDK resmi (@supabase/supabase-js) menggunakan mekanisme rotasi refresh token otomatis.
4. Pengguna dialihkan kembali ke rute yang sebelumnya ingin diakses (misal: `/profil`).

### 2.3 Masuk dengan Google OAuth (Single Sign-On)
1. Pengguna mengklik tombol "Masuk dengan Google".
2. Klien memanggil `supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: '/auth/callback' } })`.
3. Setelah persetujuan akun Google, pengguna dialihkan ke rute `/auth/callback` untuk penyelesaian pertukaran token sesi.

### 2.4 Pemulihan Kata Sandi (Password Recovery) — Rute: `/lupa-password`
1. Pengguna memasukkan alamat email terdaftar.
2. Klien memanggil `supabase.auth.resetPasswordForEmail(email, { redirectTo: '/auth/callback?type=recovery' })`.
3. Pengguna menerima tautan aman dengan token pemulihan satu kali pakai (*one-time token*).

### 2.5 Keluar dari Akun (Sign Out)
1. Pengguna mengklik tombol "Keluar dari Akun" di dasbor profil.
2. Klien memanggil `supabase.auth.signOut()`, menghancurkan sesi aktif pada peramban, dan mengembalikan state ke default bersih.

---

## 3. IMPLEMENTASI ROW LEVEL SECURITY (RLS) & ISOLASI MULTI-USER

Skema PostgreSQL di [`supabase/migrations/20261104_ecocycle_schema.sql`](file:///home/firza-ilmi/.gemini/antigravity/scratch/ecocycle/supabase/migrations/20261104_ecocycle_schema.sql) menerapkan 17 kebijakan RLS ketat:

### 3.1 Kebijakan Tabel Profil Pengguna (`public.profiles`)
- **SELECT:** `auth.uid() = id` (Hanya pemilik akun yang dapat membaca data profil lengkapnya).
- **INSERT:** `auth.uid() = id` (Hanya dapat membuat profil untuk UUID-nya sendiri).
- **UPDATE:** `auth.uid() = id` (Hanya pemilik akun yang dapat menyunting profilnya).

### 3.2 View Publik Bersih Tanpa Bocoran PII (`public.leaderboard_view`)
```sql
CREATE OR REPLACE VIEW public.leaderboard_view AS
  SELECT 
    id, 
    full_name, 
    role, 
    points, 
    streak_days, 
    avatar_url, 
    city, 
    created_at
  FROM public.profiles
  WHERE points > 0;

GRANT SELECT ON public.leaderboard_view TO anon, authenticated;
```
*Kolom sensitif seperti `phone`, `address`, dan `email` tidak diekspos sama sekali.*

### 3.3 Kebijakan Transaksi Bank Sampah (`public.waste_deposits`)
- **SELECT:** `auth.uid() = user_id`
- **INSERT:** `auth.uid() = user_id`
- **UPDATE:** `auth.uid() = user_id`
- **DELETE:** `auth.uid() = user_id`

### 3.4 Uji Verifikasi Isolasi Data (Multi-User Isolation Test)
Pengujian otomatis pada `scripts/test-data-isolation.mjs` membuktikan secara matematis:
1. Akun Alpha (`usr-alpha-001`) tidak dapat melihat atau mengakses 1 record pun milik Akun Beta (`usr-beta-002`).
2. Akun Beta hanya dapat melihat record miliknya sendiri.
3. Kueri anonim ke leaderboard terbukti memfilter seluruh atribut kontak privat.

---

## 4. KONFIGURASI VARIABEL LINGKUNGAN (.ENV)

Contoh berkas telah disediakan di [`.env.example`](file:///home/firza-ilmi/.gemini/antigravity/scratch/ecocycle/.env.example):

```env
# Supabase Cloud Project Configuration
VITE_SUPABASE_URL=https://[YOUR_SUPABASE_PROJECT_ID].supabase.co
VITE_SUPABASE_ANON_KEY=[YOUR_SUPABASE_ANON_PUBLIC_KEY]
```

> [!CAUTION]
> **Peringatan Keamanan Kredensial:**  
> Jangan pernah memasukkan `service_role` key pada variabel berkas frontend (`VITE_*`). Frontend ECOCYCLE diaudit bebas 100% dari eksposur service_role key.
