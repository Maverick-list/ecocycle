import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '../../components/ui/Icon';
import { PageTransition } from '../../components/ui/PageTransition';
import { SEOHead } from '../../components/seo/SEOHead';

interface FAQItem {
  id: string;
  category: 'memulai' | 'pemilahan' | 'bank-sampah' | 'poin' | 'dampak' | 'akun' | 'keamanan';
  question: string;
  answer: string;
  tag: string;
}

const FAQ_DATA: FAQItem[] = [
  // 1. Memulai
  {
    id: 'faq-1',
    category: 'memulai',
    question: 'Apa itu platform ECOCYCLE dan bagaimana cara kerjanya?',
    answer: 'ECOCYCLE adalah ekosistem teknologi ekonomi sirkular yang menghubungkan warga dengan bank sampah digital terverifikasi. Anda memilah sampah di rumah sesuai standar higienitas, mencatat setoran melalui formulir mandiri, menyerahkannya ke hub terdekat, dan mendapatkan saldo rupiah bernilai nyata serta audit reduksi emisi karbon otomatis.',
    tag: 'Dasar Platform',
  },
  {
    id: 'faq-2',
    category: 'memulai',
    question: 'Apakah layanan ECOCYCLE berbayar bagi warga?',
    answer: 'Tidak. Seluruh fitur platform ECOCYCLE—mulai dari panduan katalog pemilahan, kalkulator jejak karbon, pencatatan setoran, hingga materi Eco Academy—dapat diakses secara gratis oleh seluruh anggota masyarakat.',
    tag: 'Akses Layanan',
  },
  {
    id: 'faq-3',
    category: 'memulai',
    question: 'Di mana saya bisa menyerahkan sampah yang sudah dipilah?',
    answer: 'Sampah dapat diserahkan di jaringan Drop-Point dan Hub Sirkular terverifikasi ECOCYCLE. Anda dapat melihat daftar alamat lengkap, jam operasional, dan nomor kontak petugas di halaman Kontak dan formulir Setor Sampah.',
    tag: 'Lokasi Hub',
  },

  // 2. Pemilahan Sampah
  {
    id: 'faq-4',
    category: 'pemilahan',
    question: 'Apa saja kategori sampah yang diterima di ECOCYCLE?',
    answer: 'Kami menerima 6 aliran material anorganik bernilai daur ulang tinggi: Plastik PET (botol bening), Kardus & Kertas arsip, Kaleng Logam & Aluminium, Botol Kaca utuh, Minyak Jelantah, dan Limbah Elektronik ringan (E-Waste).',
    tag: 'Kategori Material',
  },
  {
    id: 'faq-5',
    category: 'pemilahan',
    question: 'Mengapa botol plastik harus dibilas dan diremas sebelum disetor?',
    answer: 'Membilas botol mencegah timbulnya aroma busuk, belatung, dan kontaminasi gula pada mesin pencacah industri. Memipihkan botol menghemat volume penyimpanan dan efisiensi logistik pengangkutan hingga 70%.',
    tag: 'Higienitas',
  },
  {
    id: 'faq-6',
    category: 'pemilahan',
    question: 'Bagaimana cara menangani minyak jelantah bekas dapur?',
    answer: 'Dinginkan minyak jelantah setelah memasak, saring dari remah makanan, lalu simpan dalam wadah jeriken atau botol plastik bertutup rapat. Jangan mencampurnya dengan air atau detergen.',
    tag: 'Minyak Jelantah',
  },

  // 3. Bank Sampah Digital
  {
    id: 'faq-7',
    category: 'bank-sampah',
    question: 'Bagaimana cara mencatat setoran sampah secara mandiri?',
    answer: 'Buka menu "Setor Sampah", pilih jenis material (misal Plastik PET), masukkan berat timbangan dalam kilogram (minimal 0.1 kg), pilih lokasi drop-point terdekat, dan sertakan foto bukti material bersih. Sistem langsung menerbitkan nomor manifest registrasi.',
    tag: 'Pencatatan Mandiri',
  },
  {
    id: 'faq-8',
    category: 'bank-sampah',
    question: 'Kapan saldo rupiah dan poin masuk ke akun saya?',
    answer: 'Perkiraan saldo dan estimasi EcoPoints langsung tampil seketika setelah formulir dikirim. Saat petugas hub menimbang fisik material di lokasi, status manifest akan diperbarui menjadi "Terverifikasi".',
    tag: 'Verifikasi Saldo',
  },

  // 4. Setoran & Poin
  {
    id: 'faq-9',
    category: 'poin',
    question: 'Bagaimana tarif rupiah per kilogram dihitung?',
    answer: 'Tarif dihitung secara dinamis mengikuti indeks komoditas daur ulang regional: Plastik PET Rp3.500/kg, Kardus Rp3.000/kg, Kaleng Logam Rp3.000/kg, Botol Kaca Rp2.000/kg, dan E-Waste hingga Rp7.500/kg.',
    tag: 'Tarif Komoditas',
  },
  {
    id: 'faq-10',
    category: 'poin',
    question: 'Dapatkah EcoPoints ditukarkan dengan insentif lain?',
    answer: 'Ya. EcoPoints yang terkumpul dapat ditukarkan dengan potongan belanja sembako ramah lingkungan, bibit pohon produktif, kupon transportasi bersih, atau diakumulasikan untuk kenaikan peringkat sirkular komunitas.',
    tag: 'Reward Poin',
  },

  // 5. Dampak Lingkungan
  {
    id: 'faq-11',
    category: 'dampak',
    question: 'Bagaimana ECOCYCLE menghitung angka reduksi emisi karbon (CO2e)?',
    answer: 'Kami mengadopsi metodologi faktor emisi US EPA WARM (Waste Reduction Model) v15. Setiap kilogram material daur ulang yang dialihkan dari TPA dikalikan koefisien emisi terhindar (misal: 1 kg Plastik PET menghindari 1.5 kg CO2e; 1 kg Kaleng Logam menghindari 3.2 kg CO2e).',
    tag: 'Sains EPA WARM',
  },
  {
    id: 'faq-12',
    category: 'dampak',
    question: 'Apa arti metrik ekuivalensi serapan pohon dewasa di analitik?',
    answer: 'Menurut standar kehutanan internasional, 1 pohon dewasa menyerap sekitar 21.77 kg CO2 per tahun. Total CO2e yang Anda hemat dikonversikan ke angka serapan pohon untuk memberikan pemahaman dampak nyata.',
    tag: 'Ekuivalensi Pohon',
  },

  // 6. Akun Pribadi
  {
    id: 'faq-13',
    category: 'akun',
    question: 'Bagaimana cara mengubah profil, target bulanan, dan alamat saya?',
    answer: 'Kunjungi menu "Profil Saya" di pojok kanan atas, pilih tombol "Sunting Profil", lalu perbarui nama, nomor telepon, atau domisili Anda. Anda juga dapat menentukan target bobot reduksi bulanan di tab Pengaturan.',
    tag: 'Kelola Profil',
  },
  {
    id: 'faq-14',
    category: 'akun',
    question: 'Apa perbedaan antara Mode Sesi Cloud dan Mode Sandbox?',
    answer: 'Dalam Mode Sesi Cloud (Supabase terhubung), seluruh data Anda tersimpan aman di server awan dan tersinkronisasi lintas perangkat. Dalam Mode Sandbox (demo peramban), data disimpan di basis data lokal peramban Anda untuk simulasi mandiri.',
    tag: 'Sesi Akun',
  },

  // 7. Privasi & Keamanan Data
  {
    id: 'faq-15',
    category: 'keamanan',
    question: 'Apakah nomor telepon dan alamat pribadi saya dapat dilihat orang lain?',
    answer: 'Tidak sama sekali. Database PostgreSQL kami menerapkan Row Level Security (RLS) mutlak di mana hanya Anda (auth.uid() = id) yang dapat membaca data kontak pribadi. Papan peringkat publik hanya menampilkan nama panggilan, poin, dan lencana.',
    tag: 'Row Level Security',
  },
  {
    id: 'faq-16',
    category: 'keamanan',
    question: 'Bagaimana cara mengekspor riwayat transaksi saya?',
    answer: 'Buka halaman "Analitik Data" atau "Buku Tabungan", lalu klik tombol "Ekspor CSV" atau "Ekspor JSON". Seluruh data alur material Anda akan diunduh seketika ke perangkat Anda.',
    tag: 'Ekspor Data',
  },
];

const CATEGORIES = [
  { id: 'semua', label: 'Semua Pertanyaan', icon: 'help' },
  { id: 'memulai', label: 'Memulai Langkah', icon: 'sparkles' },
  { id: 'pemilahan', label: 'Pemilahan Sampah', icon: 'recycle' },
  { id: 'bank-sampah', label: 'Bank Sampah Digital', icon: 'account_balance' },
  { id: 'poin', label: 'Setoran & Poin', icon: 'payments' },
  { id: 'dampak', label: 'Sains & Dampak Lingkungan', icon: 'eco' },
  { id: 'akun', label: 'Akun & Profil', icon: 'user' },
  { id: 'keamanan', label: 'Privasi & Keamanan', icon: 'verified' },
] as const;

export const FAQPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openAccordionId, setOpenAccordionId] = useState<string | null>('faq-1');

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory = selectedCategory === 'semua' || item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tag.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    setOpenAccordionId((prev) => (prev === id ? null : id));
  };

  return (
    <PageTransition className="w-full min-h-screen bg-surface dark:bg-[#03140d] text-on-surface dark:text-white pt-10 sm:pt-14 pb-48 lg:pb-60 transition-colors duration-300">
      <SEOHead
        title="Pertanyaan yang Sering Diajukan (FAQ)"
        canonical="/faq"
        description="Jawaban resmi dan komprehensif seputar tata kelola bank sampah digital, standar pemilahan material, konversi saldo rupiah, dan audit reduksi karbon."
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQ_DATA.slice(0, 10).map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.answer,
            },
          })),
        }}
      />
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-12 space-y-16 sm:space-y-20">
        
        {/* Editorial Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-semibold uppercase tracking-wider text-secondary">
            <Icon name="help" size={14} />
            <span>Pusat Bantuan & Tanya Jawab</span>
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
            <span className="animate-title-flow">Pertanyaan yang Sering Diajukan</span>
          </h1>

          <p className="font-sans text-sm sm:text-base text-on-surface-variant dark:text-emerald-100/75 font-normal leading-relaxed">
            Temukan jawaban komprehensif seputar alur operasional, sains reduksi karbon, transparansi bank sampah, hingga keamanan data Anda.
          </p>

          {/* Search Bar with Glass Surface */}
          <div className="relative max-w-xl mx-auto pt-4">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
              <Icon name="search" size={18} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kata kunci (contoh: PET, RLS, poin, verifikasi)..."
              className="w-full h-13 pl-11 pr-10 rounded-2xl glass-panel text-sm text-on-surface dark:text-white placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-outline hover:text-on-surface cursor-pointer"
              >
                <Icon name="close" size={16} />
              </button>
            )}
          </div>

          {/* Soft Organic Fading Gradient Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent pt-6" />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm active:scale-95 ${
                selectedCategory === cat.id
                  ? 'bg-secondary text-white shadow-md scale-105'
                  : 'glass-pill text-on-surface-variant dark:text-emerald-100/75 hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              <Icon name={cat.icon} size={15} />
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* FAQ Accordions List (Spacious & Clean Layout) */}
        <div className="max-w-3xl mx-auto space-y-6 sm:space-y-7">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-20 glass-panel rounded-3xl p-10 space-y-4">
              <Icon name="search" size={36} className="mx-auto text-outline" />
              <h3 className="font-bold text-lg text-primary dark:text-white">Tidak Ada Jawaban Ditemukan</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant dark:text-emerald-100/70">
                Coba gunakan kata kunci lain atau pilih kategori "Semua Pertanyaan".
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openAccordionId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl glass-panel transition-all duration-300 overflow-hidden border ${
                    isOpen
                      ? 'border-secondary/40 shadow-xl ring-1 ring-secondary/20'
                      : 'border-outline-variant/20 dark:border-emerald-500/15 hover:border-outline-variant/40 hover:shadow-md'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-6 sm:p-7 text-left flex items-start justify-between gap-5 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="space-y-2 pr-2">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-secondary px-3 py-1 rounded-full bg-secondary/10 inline-block">
                        {faq.tag}
                      </span>
                      <h3 className="font-display font-bold text-base sm:text-lg text-primary dark:text-white leading-snug">
                        {faq.question}
                      </h3>
                    </div>

                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-secondary text-white' : 'glass-pill text-outline'
                      }`}
                    >
                      <Icon name="arrow_drop_down" size={20} />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-2 text-xs sm:text-sm text-on-surface-variant dark:text-emerald-100/80 leading-relaxed border-t border-outline-variant/10 dark:border-emerald-500/10">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* Helpdesk Callout */}
        <div className="max-w-2xl mx-auto rounded-3xl glass-panel-elevated p-8 sm:p-10 text-center space-y-5 border border-outline-variant/30 dark:border-emerald-500/25 shadow-xl mt-16">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center shadow-inner">
            <Icon name="support_agent" size={28} />
          </div>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-primary dark:text-white">
            Masih Memiliki Pertanyaan Lain?
          </h3>
          <p className="text-xs sm:text-sm text-on-surface-variant dark:text-emerald-100/75 leading-relaxed max-w-md mx-auto">
            Tim dukungan dan kurator materi sirkular kami siap membantu Anda memahami seluruh aspek pengelolaan sampah.
          </p>
          <div className="pt-3">
            <a
              href="/kontak"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-[#10b981] text-white text-xs sm:text-sm font-extrabold hover:from-emerald-400 hover:to-emerald-500 shadow-lg hover:shadow-xl transition-all cursor-pointer active:scale-95"
            >
              <Icon name="mail" size={16} />
              <span>Hubungi Narahubung Resmi</span>
              <Icon name="arrow_forward" size={14} />
            </a>
          </div>
        </div>

      </div>
    </PageTransition>
  );
};
