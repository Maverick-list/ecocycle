import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../ui/Icon';

export interface TourChapter {
  id: number;
  title: string;
  category: string;
  targetRoute: string;
  description: string;
  keyActions: string[];
  tips: string;
}

export const TOUR_CHAPTERS: TourChapter[] = [
  {
    id: 1,
    title: 'Memahami Beranda ECOCYCLE',
    category: 'Orientasi Platform',
    targetRoute: '/',
    description: 'Pelajari visi sirkularitas, alur 4 langkah pengelolaan sampah, dan pantau neraca emisi karbon secara langsung.',
    keyActions: [
      'Amati live counter metrik reduksi karbon dan sampah terpilah di hero section.',
      'Pelajari diagram alur sirkular: Pilah → Bawa ke Hub → Timbang → Dapatkan Manfaat.',
      'Gunakan tombol aksi cepat untuk beralih ke Pemilahan Pintar atau Bank Sampah.',
    ],
    tips: 'Angka emisi diperbarui otomatis setiap kali ada transaksi baru di buku tabungan Anda.',
  },
  {
    id: 2,
    title: 'Menggunakan Pemilahan Pintar (Smart Sorting)',
    category: 'Panduan Material',
    targetRoute: '/pemilahan-pintar',
    description: 'Kenali 4 stream material (Anorganik, Organik, B3, E-Waste) dan teknik persiapan higienis agar bernilai daur ulang tinggi.',
    keyActions: [
      'Gunakan bilah pencarian instan (contoh: cari botol, kardus, atau minyak).',
      'Klik salah satu material untuk membuka protokol penanganan terperinci.',
      'Perhatikan checklist persiapan (kosongkan residu, bilas, lepas label, kempeskan).',
      'Pelajari microcards Do’s & Don’ts untuk mencegah penolakan oleh industri daur ulang.',
    ],
    tips: 'Material bersih diterima tanpa potongan timbangan kotor di drop-point.',
  },
  {
    id: 3,
    title: 'Mencatat Setoran Sampah Mandiri',
    category: 'Transaksi Setoran',
    targetRoute: '/setor-sampah',
    description: 'Catat berat material yang Anda pilah, pilih titik hub terdekat di Kuningan, dan dapatkan estimasi rupiah seketika.',
    keyActions: [
      'Pilih kategori material (Plastik, Kertas, Logam, Minyak Jelantah, atau Organik).',
      'Masukkan berat timbangan fisik (contoh: 3.5 kg).',
      'Pilih lokasi hub penerima resmi (contoh: Hub Sirkular Sentral Terpadu).',
      'Unggah foto bukti material bersih yang sudah dipersiapkan.',
      'Konfirmasi setoran untuk langsung menambah saldo rupiah dan EcoPoints.',
    ],
    tips: 'Tarif rupiah dihitung secara transparan berbasis estimasi harga pasar terbuka.',
  },
  {
    id: 4,
    title: 'Memahami Bank Sampah Digital',
    category: 'Buku Tabungan',
    targetRoute: '/bank-sampah',
    description: 'Kelola buku tabungan digital, periksa riwayat transaksi, cetak tanda terima resmi, dan ekspor data ke CSV.',
    keyActions: [
      'Pantau tiga kartu saldo utama: Estimasi Rupiah, Total Kilogram, dan EcoPoints.',
      'Gunakan filter pencarian transaksi untuk meninjau setoran masa lalu.',
      'Klik tombol "Detail" pada baris transaksi untuk melihat nomor manifest dan hash rantai lacak.',
      'Unduh rekap tabungan kapan saja menggunakan tombol "Ekspor CSV".',
    ],
    tips: 'Data transaksi tersimpan secara persisten pada akun dan peramban Anda.',
  },
  {
    id: 5,
    title: 'Melihat Neraca Dampak Ekologis',
    category: 'Analisis Emisi',
    targetRoute: '/dampak-ekologis',
    description: 'Eksplorasi neraca sains reduksi emisi gas rumah kaca, ekuivalensi pohon dewasa, dan simulator rumah tangga mandiri.',
    keyActions: [
      'Periksa 4 metrik makro: Limbah Terdivergen, Reduksi CO₂e, Pohon Setara, dan Air Bersih.',
      'Arahkan kursor pada diagram tren bulanan untuk melihat performa pemilahan.',
      'Geser slider interaktif pada Kalkulator Simulasi untuk memproyeksikan dampak 1 tahun.',
      'Pelajari jaminan integritas data berbasis standar tata kelola SNI 19-3983-1995.',
    ],
    tips: 'Faktor konversi karbon merujuk pada standar ilmiah EPA WARM v15.',
  },
  {
    id: 6,
    title: 'Mengikuti Tantangan Komunitas',
    category: 'Gamifikasi & Aksi',
    targetRoute: '/tantangan',
    description: 'Bangun kebiasaan sirkular melalui misi mingguan, buka lencana prestasi digital, dan bersaing sehat di leaderboard.',
    keyActions: [
      'Pilih tantangan yang sesuai lalu klik "Ikuti Tantangan Ini".',
      'Centang tindakan nyata yang telah Anda lakukan di rumah atau kampus.',
      'Raih 100% penyelesaian untuk memicu perayaan lencana dan bonus EcoPoints.',
      'Buka tab "Papan Peringkat Komunitas" untuk melihat posisi akun Anda di wilayah Kuningan.',
    ],
    tips: 'Poin tantangan langsung diakumulasikan ke profil dan buku tabungan Anda.',
  },
  {
    id: 7,
    title: 'Mengelola Dasbor Profil Pengguna',
    category: 'Pusat Kendali Personal',
    targetRoute: '/profil',
    description: 'Kelola identitas, pantau streak pemilahan berturut-turut, tinjau progres target bulanan, dan atur preferensi akun.',
    keyActions: [
      'Tinjau kartu profil utama yang memuat nama, peran, dan status lencana peringkat.',
      'Periksa progress bar target reduksi karbon bulanan Anda.',
      'Jelajahi 4 tab informasi: Transaksi, Lencana, Garis Waktu Aktivitas, dan Pengaturan.',
      'Klik "Edit Profil" untuk memperbarui bio, target emisi, atau mengatur ulang profil demo.',
    ],
    tips: 'Jika Anda masuk dengan akun Supabase terautentikasi, data bersifat privat.',
  },
  {
    id: 8,
    title: 'Mengeksplorasi Analitik Lanjutan & Metodologi',
    category: 'Sains & Intelijen',
    targetRoute: '/analitik',
    description: 'Audit analitik data sirkularitas multi-periode, komposisi fraksi donut chart, ritme harian, dan drawer sains terbuka.',
    keyActions: [
      'Ganti rentang waktu antara 30 Hari, 90 Hari, 6 Bulan, hingga 1 Tahun.',
      'Gunakan toggle switcher untuk membandingkan Volume Sampah (kg) vs Reduksi Emisi (kg CO₂e).',
      'Amati diagram lingkaran interaktif proporsi material daur ulang.',
      'Buka tombol "Buka Metodologi & Faktor Emisi" untuk menginspeksi tabel rujukan sains resmi.',
    ],
    tips: 'Drawer metodologi menjamin transparansi tanpa klaim greenwashing.',
  },
];

interface InteractiveGuidedTourProps {
  isOpen: boolean;
  onClose: () => void;
  initialChapterIndex?: number;
}

export const InteractiveGuidedTour: React.FC<InteractiveGuidedTourProps> = ({
  isOpen,
  onClose,
  initialChapterIndex = 0,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(initialChapterIndex);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const currentChapter = TOUR_CHAPTERS[currentStep] || TOUR_CHAPTERS[0];
  const progressPercent = Math.round(((currentStep + 1) / TOUR_CHAPTERS.length) * 100);

  const handleNext = () => {
    if (currentStep < TOUR_CHAPTERS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleJumpToPage = (route: string) => {
    navigate(route);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-primary/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-2xl w-full bg-surface-container-lowest rounded-3xl border border-outline-variant/40 shadow-2xl p-6 sm:p-8 space-y-6 overflow-hidden"
        >
          {/* Top Header & Chapter Indicator */}
          <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-bold text-xs shadow-inner">
                {currentStep + 1}
              </span>
              <div>
                <span className="font-label-caps text-secondary font-bold uppercase text-[10px] tracking-wider block">
                  Bab {currentStep + 1} dari {TOUR_CHAPTERS.length} • {currentChapter.category}
                </span>
                <h3 className="font-headline-sm font-bold text-primary text-base sm:text-lg">
                  {currentChapter.title}
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-outline hover:text-primary hover:bg-surface-container cursor-pointer transition-colors"
              title="Tutup Panduan"
            >
              <Icon name="close" size={18} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-bold text-outline">
              <span>Kemajuan Tur Panduan</span>
              <span className="text-secondary font-semibold">{progressPercent}% Selesai</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
              <div
                className="h-full bg-secondary transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Chapter Content Details */}
          <div className="space-y-4">
            <p className="font-body-md text-sm text-on-surface leading-relaxed">
              {currentChapter.description}
            </p>

            <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 space-y-2.5">
              <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                Aksi & Langkah Kunci:
              </span>
              <ul className="space-y-2 text-xs text-on-surface-variant">
                {currentChapter.keyActions.map((action, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro Tip Box */}
            <div className="p-3 rounded-xl bg-secondary-fixed/25 border border-secondary/20 flex items-start gap-2.5 text-xs text-on-surface">
              <div className="text-secondary mt-0.5 shrink-0">
                <Icon name="sparkles" size={16} />
              </div>
              <div>
                <span className="font-bold text-secondary block">Kiat Praktis:</span>
                <span className="text-on-surface-variant text-[11px]">{currentChapter.tips}</span>
              </div>
            </div>
          </div>

          {/* Action Navigation Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-outline-variant/20">
            <button
              type="button"
              onClick={() => handleJumpToPage(currentChapter.targetRoute)}
              className="text-xs font-bold text-secondary hover:underline cursor-pointer flex items-center gap-1.5 order-2 sm:order-1"
            >
              <span>Buka Halaman Langsung ({currentChapter.targetRoute})</span>
              <Icon name="arrow_forward" size={14} />
            </button>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end order-1 sm:order-2">
              <button
                type="button"
                disabled={currentStep === 0}
                onClick={handlePrev}
                className={`h-9 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  currentStep === 0
                    ? 'opacity-40 cursor-not-allowed bg-surface-container text-outline'
                    : 'bg-surface-container text-primary hover:bg-surface-container-high'
                }`}
              >
                <Icon name="arrow_back" size={14} />
                <span>Sebelumnya</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="h-9 px-5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-container transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
              >
                <span>{currentStep === TOUR_CHAPTERS.length - 1 ? 'Selesai & Tutup' : 'Langkah Selanjutnya'}</span>
                <Icon name="arrow_forward" size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
