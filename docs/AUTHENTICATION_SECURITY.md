# ECOCYCLE — AUTHENTICATION & SECURITY ARCHITECTURE SPECIFICATION
**Dokumen Spesifikasi Keamanan, Autentikasi Supabase & Isolasi Data Privat**  
**Versi:** 2.5.0 Production Enterprise  
**Proyek:** ECOCYCLE — Turning Waste Into Worth  
**Penyelenggara:** Web Design Competition Techno Versary Vol. II 2026 (HIMA TI FKOM UNIKU)  

---

## 1. PRINSIP KEAMANAN & ARSITEKTUR AUTENTIKASI

ECOCYCLE menerapkan arsitektur keamanan tingkat enterprise berbasis **Supabase Auth** dan **PostgreSQL Row Level Security (RLS)** untuk menjamin bahwa seluruh data buku tabungan, riwayat setoran sampah, EcoPoints, dan aktivitas personal pengguna terisolasi secara privat.

### Prinsip Utama:
1. **Zero Trust Client-Side:** Frontend tidak pernah menyimpan kredensial mentah (password), token otorisasi rahasia (*service_role key*), atau data sensitif pengguna di tempat yang rentan (seperti plain localStorage tanpa enkripsi).
2. **Database-Level Authorization:** Seluruh pembatasan akses data dieksekusi di level mesin basis data PostgreSQL menggunakan kebijakan `auth.uid() = user_id`, sehingga pengguna yang jahat (*adversary*) tidak dapat memanipulasi API untuk membaca atau mengubah data pengguna lain.
3. **Graceful Development Fallback:** Apabila variabel lingkungan `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` belum dikonfigurasi oleh penilai atau pengembang, aplikasi tidak memalsukan (*fake*) proses login, melainkan memberikan peringatan transparan dan menjalankan mode *Local Sandbox Demo* yang terisolasi.

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
1. Pengguna mengklik tombol "Keluar dari Akun" di tab Pengaturan dasbor profil.
2. Klien memanggil `supabase.auth.signOut()`, menghancurkan sesi aktif pada peramban, dan menghapus cache identitas lokal.

---

## 3. PROTECTED ROUTES ARCHITECTURE (`ProtectedRoute.tsx`)

Rute privat seperti **Dasbor Profil** (`/profil`) dilindungi oleh wrapper [`ProtectedRoute`](file:///home/firza-ilmi/.gemini/antigravity/scratch/ecocycle/src/components/auth/ProtectedRoute.tsx):

```tsx
// Cuplikan Logika Otorisasi:
if (isConfigured && !user) {
  return <Navigate to="/masuk" state={{ from: location }} replace />;
}
```

- Jika pengguna belum terautentikasi dan kredensial Supabase aktif, permintaan otomatis dialihkan ke halaman `/masuk` dengan menyimpan state lokasi asal untuk redirect balik setelah login berhasil.
- Jika Supabase belum dikonfigurasi (`isConfigured === false`), aplikasi menampilkan *Info Banner* bahwa sistem sedang berjalan dalam mode peraga pengembang (*Local Sandbox*), menjunjung prinsip kejujuran data.

---

## 4. KONFIGURASI VARIABEL LINGKUNGAN (.ENV)

Untuk mengaktifkan autentikasi cloud dan basis data PostgreSQL secara langsung, buat berkas `.env` di akar direktori proyek dengan format:

```env
# Supabase Cloud Project Configuration
VITE_SUPABASE_URL=https://[YOUR_SUPABASE_PROJECT_ID].supabase.co
VITE_SUPABASE_ANON_KEY=[YOUR_SUPABASE_ANON_PUBLIC_KEY]
```

> [!CAUTION]
> **Peringatan Keamanan Kredensial:**  
> Jangan pernah memasukkan `service_role` key pada variabel berkas frontend (`VITE_*`). Hanya gunakan kunci publik anonim (`anon key`), karena seluruh izin data dikendalikan secara mutlak oleh Row Level Security (RLS) di sisi server database.
