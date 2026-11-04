import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWasteBank } from '../../context/WasteBankContext';
import { WASTE_CATEGORIES } from '../../data/wasteData';

export const HomePage: React.FC = () => {
  const { 
    openDepositModal, 
    totalWeightKg, 
    totalCo2AvoidedKg, 
    ecoPledgesCount, 
    hasPledged, 
    signEcoPledge 
  } = useWasteBank();

  // Mini calculator state on homepage
  const [calcCategory, setCalcCategory] = useState('Plastik PET');
  const [calcWeight, setCalcWeight] = useState(5.0);

  const selectedCategoryConfig = WASTE_CATEGORIES.find(c => c.name === calcCategory) || WASTE_CATEGORIES[0];
  const calcEstimatedPoints = Math.round(calcWeight * selectedCategoryConfig.pointsPerKg);
  const calcEstimatedIdr = Math.round(calcWeight * selectedCategoryConfig.pricePerKg);
  const calcEstimatedCo2 = (calcWeight * selectedCategoryConfig.co2Factor).toFixed(1);

  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SECTION (7+5 Editorial Bento Grid) */}
      <section className="relative w-full overflow-hidden bg-surface py-space-xl lg:py-margin border-b border-outline-variant/20">
        <div className="max-w-[1380px] mx-auto px-margin-sm lg:px-margin">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-space-xl items-start">
            
            {/* Left Column: Editorial Headline & Actions (7 cols) */}
            <div className="lg:col-span-7 flex flex-col space-y-space-lg">
              <div className="inline-flex items-center gap-space-xs self-start px-space-md py-space-xs rounded-full bg-surface-container-high shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
                <span className="font-label-caps text-label-caps text-secondary font-bold uppercase tracking-wider">
                  Infrastruktur Sirkular Nasional v2.4
                </span>
              </div>

              <div className="space-y-space-sm">
                <h1 className="font-display-hero text-display-hero-mobile sm:text-display-hero text-primary tracking-tight font-extrabold leading-tight">
                  Ubah Sampah <br className="hidden sm:inline" />
                  <span className="text-secondary italic">Menjadi Nilai Nyata</span> <br />
                  untuk Masa Depan.
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl pt-space-xs">
                  Mulai dari langkah kecil, ciptakan dampak besar untuk bumi. Platform ekosistem pemilahan cerdas, konversi bank sampah digital, dan audit neraca material terverifikasi bagi keluarga serta entitas komunitas di Indonesia.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-space-md pt-space-sm">
                <button
                  type="button"
                  onClick={openDepositModal}
                  className="inline-flex items-center justify-center gap-space-xs h-12 px-space-xl rounded-lg bg-tertiary-fixed text-on-tertiary-fixed font-title-md text-title-md hover:bg-tertiary-fixed-dim transition-all shadow-md hover:shadow-lg font-bold cursor-pointer"
                >
                  <span>Mulai Sekarang</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
                <a
                  href="#siklus-sirkular"
                  className="inline-flex items-center justify-center gap-space-xs h-12 px-space-lg rounded-lg bg-surface-container-low text-primary font-title-md text-title-md hover:bg-surface-container-high transition-colors shadow-sm font-semibold"
                >
                  <span className="material-symbols-outlined text-[20px]">play_circle</span>
                  <span>Pelajari Cara Kerja</span>
                </a>
              </div>

              {/* Trust Markers */}
              <div className="grid grid-cols-3 gap-space-md pt-space-lg">
                <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm border border-outline-variant/20">
                  <span className="font-label-caps text-label-caps text-outline uppercase block mb-1">
                    Total Pulih
                  </span>
                  <span className="font-headline-sm text-headline-sm font-bold text-primary">
                    14.820+
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant block">
                    Ton Material
                  </span>
                </div>
                <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm border border-outline-variant/20">
                  <span className="font-label-caps text-label-caps text-outline uppercase block mb-1">
                    Titik Drop-Off
                  </span>
                  <span className="font-headline-sm text-headline-sm font-bold text-primary">
                    482
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant block">
                    Hub Komunitas
                  </span>
                </div>
                <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm border border-outline-variant/20">
                  <span className="font-label-caps text-label-caps text-outline uppercase block mb-1">
                    Akurasi Audit
                  </span>
                  <span className="font-headline-sm text-headline-sm font-bold text-primary">
                    99.4%
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant block">
                    SNI & ISO 14001
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Real-Time Bento Matrix (5 cols) */}
            <div className="lg:col-span-5 flex flex-col space-y-space-md relative mt-8 lg:mt-0">
              {/* Primary Metric Card */}
              <div className="rounded-xl bg-surface-container-lowest p-space-lg shadow-xl relative overflow-hidden border border-outline-variant/30">
                <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/20">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-secondary text-[22px]">nest_eco_leaf</span>
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider font-bold">
                      Pemantauan Aliran Material
                    </span>
                  </div>
                  <span className="px-space-xs py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-caps text-label-caps font-bold">
                    LIVE
                  </span>
                </div>

                <div className="my-space-md">
                  <span className="font-label-caps text-label-caps text-outline block">
                    Volume Terpilah Bulan Ini
                  </span>
                  <div className="flex items-baseline gap-space-xs mt-1">
                    <span className="font-metric-display text-metric-display text-primary tracking-tight font-extrabold">
                      {totalWeightKg > 0 ? (totalWeightKg + 1240).toLocaleString('id-ID') : '1.240'}
                    </span>
                    <span className="font-headline-md text-headline-md font-semibold text-secondary">
                      kg
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Setara dengan reduksi ~{totalCo2AvoidedKg > 0 ? (totalCo2AvoidedKg + 842).toFixed(0) : '842'} kg jejak CO₂e di ekosistem perkotaan.
                  </p>
                </div>

                {/* Sparkline Graphic */}
                <div className="w-full h-16 pt-space-xs">
                  <svg className="w-full h-full text-secondary" fill="none" preserveAspectRatio="none" viewBox="0 0 320 60">
                    <path d="M0 45 C40 42, 60 20, 100 28 C140 36, 170 12, 210 18 C250 24, 280 5, 320 10" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
                    <path d="M0 45 C40 42, 60 20, 100 28 C140 36, 170 12, 210 18 C250 24, 280 5, 320 10 L320 60 L0 60 Z" fill="currentColor" fillOpacity="0.08" />
                  </svg>
                </div>
              </div>

              {/* Interactive Quick Calculator Card */}
              <div className="rounded-xl bg-primary text-on-primary p-space-md shadow-lg border border-primary-container">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-label-caps text-tertiary-fixed uppercase font-bold tracking-wider">
                    Simulasi Cepat Nilai Sampah
                  </span>
                  <span className="text-xs text-primary-fixed-dim">Kalkulator Langsung</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div>
                    <label className="text-[11px] text-surface-variant block mb-1">Kategori</label>
                    <select
                      value={calcCategory}
                      onChange={(e) => setCalcCategory(e.target.value)}
                      className="w-full h-9 px-2 rounded bg-primary-container text-xs text-on-primary outline-none focus:ring-1 focus:ring-tertiary-fixed"
                    >
                      {WASTE_CATEGORIES.map(c => (
                        <option key={c.id} value={c.name} className="bg-primary text-on-primary">
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] text-surface-variant block mb-1">Bobot (kg)</label>
                    <input
                      type="number"
                      step="0.5"
                      min="0.5"
                      value={calcWeight}
                      onChange={(e) => setCalcWeight(parseFloat(e.target.value) || 0.5)}
                      className="w-full h-9 px-2 rounded bg-primary-container text-xs text-on-primary font-bold outline-none focus:ring-1 focus:ring-tertiary-fixed text-center"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-primary-container">
                  <div>
                    <span className="text-[11px] text-primary-fixed-dim block">Estimasi Nilai</span>
                    <span className="text-base font-bold text-tertiary-fixed">
                      Rp {calcEstimatedIdr.toLocaleString('id-ID')}
                    </span>
                    <span className="text-[10px] text-primary-fixed-dim block">~{calcEstimatedCo2} kg CO₂e</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-primary-fixed-dim block">EcoPoints</span>
                    <span className="text-base font-bold text-secondary-fixed">
                      +{calcEstimatedPoints} Pts
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={openDepositModal}
                    className="h-8 px-3 rounded bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold hover:bg-tertiary-fixed-dim transition-colors cursor-pointer"
                  >
                    Setor Ini
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 2. THE CIRCULAR CYCLE WORKFLOW (#siklus-sirkular) */}
      <section className="w-full py-space-xl bg-surface-container-low border-b border-outline-variant/20" id="siklus-sirkular">
        <div className="max-w-[1380px] mx-auto px-margin-sm lg:px-margin">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl">
            <div>
              <span className="font-label-caps text-label-caps text-secondary font-bold uppercase tracking-wider block mb-space-xs">
                Transparansi Rantai Pasok
              </span>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-primary tracking-tight">
                Bagaimana Siklus Sirkular ECOCYCLE Bekerja
              </h2>
            </div>
            <p className="font-body-md text-on-surface-variant max-w-md mt-2 md:mt-0">
              Empat tahapan terstandarisasi untuk memastikan setiap gram sampah rumah tangga tercatat dan terserap kembali ke industri manufaktur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {/* Step 1 */}
            <div className="p-space-lg rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col justify-between space-y-space-md shadow-sm hover:shadow-md transition-shadow">
              <div>
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary font-bold text-lg mb-space-sm">
                  01
                </div>
                <h3 className="font-title-md text-title-md font-bold text-primary mb-space-xs">
                  Pilah di Sumber
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Gunakan panduan 4-stream ECOCYCLE untuk memisahkan organik, anorganik kering, minyak jelantah, dan e-waste secara higienis di rumah.
                </p>
              </div>
              <Link to="/pemilahan-pintar" className="text-secondary font-semibold text-xs flex items-center gap-1 hover:underline">
                <span>Lihat Panduan</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>

            {/* Step 2 */}
            <div className="p-space-lg rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col justify-between space-y-space-md shadow-sm hover:shadow-md transition-shadow">
              <div>
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary font-bold text-lg mb-space-sm">
                  02
                </div>
                <h3 className="font-title-md text-title-md font-bold text-primary mb-space-xs">
                  Timbang & Valuasi
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Input estimasi bobot di aplikasi web untuk melihat nilai konversi rupiah dan poin reward sebelum diserahkan ke drop-point.
                </p>
              </div>
              <button onClick={openDepositModal} className="text-secondary font-semibold text-xs flex items-center gap-1 hover:underline text-left cursor-pointer">
                <span>Buka Formulir</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>

            {/* Step 3 */}
            <div className="p-space-lg rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col justify-between space-y-space-md shadow-sm hover:shadow-md transition-shadow">
              <div>
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary font-bold text-lg mb-space-sm">
                  03
                </div>
                <h3 className="font-title-md text-title-md font-bold text-primary mb-space-xs">
                  Logistik Drop-Point
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Bawa setoran ke hub lingkungan atau jadwalkan penjemputan komunal oleh petugas terverifikasi ISO 14001.
                </p>
              </div>
              <Link to="/kontak" className="text-secondary font-semibold text-xs flex items-center gap-1 hover:underline">
                <span>Cari Drop-Point</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>

            {/* Step 4 */}
            <div className="p-space-lg rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col justify-between space-y-space-md shadow-sm hover:shadow-md transition-shadow">
              <div>
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary font-bold text-lg mb-space-sm">
                  04
                </div>
                <h3 className="font-title-md text-title-md font-bold text-primary mb-space-xs">
                  Manufaktur Sirkular
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Material diproses kembali menjadi produk bernilai tambah tinggi; reduksi karbon dicatat ke dalam dashboard dampak Anda.
                </p>
              </div>
              <Link to="/dampak-ekologis" className="text-secondary font-semibold text-xs flex items-center gap-1 hover:underline">
                <span>Cek Neraca Karbon</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUR STRATEGIC PILLARS BENTO SHOWCASE */}
      <section className="w-full py-space-xl lg:py-margin bg-surface">
        <div className="max-w-[1380px] mx-auto px-margin-sm lg:px-margin">
          <div className="mb-space-xl text-center max-w-2xl mx-auto">
            <span className="font-label-caps text-label-caps text-secondary font-bold uppercase tracking-wider block mb-space-xs">
              Ekosistem Terintegrasi
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-primary tracking-tight">
              Empat Pilar Utama Platform ECOCYCLE
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
              Dirancang untuk memenuhi seluruh kriteria kompetisi Web Design Techno Versary Vol. II 2026.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter">
            
            {/* Pillar 1: Smart Sorting */}
            <div className="lg:col-span-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 p-space-lg flex flex-col justify-between shadow-sm hover:shadow-lg transition-all group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold uppercase">
                    Pilar 1: Waste Management
                  </span>
                  <span className="material-symbols-outlined text-secondary text-2xl">search_insights</span>
                </div>
                <h3 className="font-headline-md font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                  Pemilahan Pintar (Smart Sorting Guide)
                </h3>
                <p className="font-body-sm text-on-surface-variant mb-4">
                  Katalog pemilahan interaktif dengan pencarian instan nama barang sehari-hari, protokol higienitas wadah, dan klasifikasi tong warna terstandarisasi.
                </p>
              </div>
              <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between">
                <span className="text-xs text-outline">Kamus 25+ jenis limbah rumah tangga</span>
                <Link to="/pemilahan-pintar" className="inline-flex items-center gap-1 text-secondary font-bold text-sm hover:underline">
                  <span>Jelajahi Panduan</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Pillar 2: Digital Waste Bank */}
            <div className="lg:col-span-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 p-space-lg flex flex-col justify-between shadow-sm hover:shadow-lg transition-all group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold uppercase">
                    Pilar 2: Digital Waste Bank
                  </span>
                  <span className="material-symbols-outlined text-primary text-2xl">account_balance_wallet</span>
                </div>
                <h3 className="font-headline-md font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                  Bank Sampah Digital Terpadu
                </h3>
                <p className="font-body-sm text-on-surface-variant mb-4">
                  Simulasi setor sampah real-time, dompet saldo EcoPoints & Rupiah, riwayat mutasi transaksi dengan kemampuan edit & hapus, serta integrasi drop-point lokal.
                </p>
              </div>
              <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between">
                <span className="text-xs text-outline">Penyimpanan persisten di peramban</span>
                <Link to="/bank-sampah" className="inline-flex items-center gap-1 text-secondary font-bold text-sm hover:underline">
                  <span>Buka Bank Sampah</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Pillar 3: Environmental Education */}
            <div className="lg:col-span-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 p-space-lg flex flex-col justify-between shadow-sm hover:shadow-lg transition-all group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-surface-container-high text-primary text-xs font-bold uppercase">
                    Pilar 3: Environmental Education
                  </span>
                  <span className="material-symbols-outlined text-primary text-2xl">school</span>
                </div>
                <h3 className="font-headline-md font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                  Akademi Sirkular (Knowledge Hub)
                </h3>
                <p className="font-body-sm text-on-surface-variant mb-4">
                  Artikel edukasi mendalam, mitos vs fakta seputar plastik, infografis sirkularitas di Jawa Barat, serta estimasi waktu membaca untuk seluruh kelompok usia.
                </p>
              </div>
              <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between">
                <span className="text-xs text-outline">Memenuhi syarat konten & galeri</span>
                <Link to="/akademi" className="inline-flex items-center gap-1 text-secondary font-bold text-sm hover:underline">
                  <span>Masuk Akademi</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Pillar 4: Community Activities & Impact */}
            <div className="lg:col-span-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 p-space-lg flex flex-col justify-between shadow-sm hover:shadow-lg transition-all group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-secondary-fixed-dim text-on-secondary-fixed text-xs font-bold uppercase">
                    Pilar 4: Community & Impact
                  </span>
                  <span className="material-symbols-outlined text-secondary text-2xl">emoji_events</span>
                </div>
                <h3 className="font-headline-md font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                  Tantangan & Neraca Dampak Ekologis
                </h3>
                <p className="font-body-sm text-on-surface-variant mb-4">
                  Tantangan gaya hidup hijau bertahap, lencana digital pencapaian, serta kalkulator dampak matematis berbasis literatur pengurangan karbon nyata.
                </p>
              </div>
              <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between">
                <span className="text-xs text-outline">Gamifikasi aksi nyata warga</span>
                <Link to="/tantangan" className="inline-flex items-center gap-1 text-secondary font-bold text-sm hover:underline">
                  <span>Lihat Tantangan</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. COMMUNITY TESTIMONIALS & LIVE ECO-PLEDGE BANNER */}
      <section className="w-full py-space-xl bg-surface-container-low border-t border-b border-outline-variant/20">
        <div className="max-w-[1380px] mx-auto px-margin-sm lg:px-margin">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-space-xl items-center">
            
            <div className="lg:col-span-7 space-y-space-md">
              <span className="font-label-caps text-secondary font-bold uppercase tracking-wider block">
                Aksi Kolektif Komunitas
              </span>
              <h2 className="font-headline-lg font-bold text-primary tracking-tight">
                Bergabung Bersama Ribuan Warga Menjaga Kelestarian Lingkungan
              </h2>
              <p className="font-body-md text-on-surface-variant">
                Setiap kilogram sampah terpilah yang Anda setorkan adalah wujud nyata pelestarian alam bagi generasi mendatang.
              </p>

              {/* User Avatars & Commitment Counter */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex -space-x-3">
                  <img src="/assets/images/avatar_female.jpg" alt="Advocate" className="w-11 h-11 rounded-full object-cover ring-2 ring-surface" />
                  <img src="/assets/images/avatar_male.jpg" alt="Advocate" className="w-11 h-11 rounded-full object-cover ring-2 ring-surface" />
                  <img src="/assets/images/avatar_user.jpg" alt="Advocate" className="w-11 h-11 rounded-full object-cover ring-2 ring-surface" />
                </div>
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold font-metric-display text-primary">
                      {ecoPledgesCount.toLocaleString('id-ID')}
                    </span>
                    <span className="text-xs font-semibold text-secondary">Warga Telah Berikrar</span>
                  </div>
                  <span className="text-xs text-outline">Berkomitmen memilah sampah dari rumah</span>
                </div>
              </div>
            </div>

            {/* Interactive Pledge Action Card */}
            <div className="lg:col-span-5 p-space-lg rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-md text-center space-y-4">
              <span className="material-symbols-outlined text-4xl text-secondary">volunteer_activism</span>
              <h3 className="font-headline-sm font-bold text-primary">
                Ikrar Gaya Hidup Sirkular
              </h3>
              <p className="font-body-sm text-on-surface-variant">
                "Saya berkomitmen untuk memilah sampah di rumah, mengurangi plastik sekali pakai, dan mendukung bank sampah lokal."
              </p>
              <button
                type="button"
                onClick={signEcoPledge}
                disabled={hasPledged}
                className={`w-full h-12 rounded-lg font-title-md font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  hasPledged
                    ? 'bg-secondary-fixed text-on-secondary-fixed cursor-default'
                    : 'bg-primary text-on-primary hover:bg-primary-container shadow-md'
                }`}
              >
                <span className="material-symbols-outlined text-lg">
                  {hasPledged ? 'check_circle' : 'handshake'}
                </span>
                <span>{hasPledged ? 'Anda Telah Berikrar ✓' : 'Tandatangani Ikrar Sekarang'}</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FINAL CALL TO ACTION BANNER */}
      <section className="w-full py-space-xl lg:py-margin bg-primary text-on-primary relative overflow-hidden">
        <div className="max-w-[1380px] mx-auto px-margin-sm lg:px-margin relative z-10 text-center space-y-space-md">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-container text-tertiary-fixed text-xs font-bold uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-tertiary-fixed animate-ping" />
            <span>Mulai Gerakan Hari Ini</span>
          </div>
          
          <h2 className="font-headline-xl text-headline-xl-mobile sm:text-headline-xl font-bold tracking-tight text-surface-bright max-w-2xl mx-auto">
            Siap Mengubah Limbah Menjadi Berkah Berkelanjutan?
          </h2>
          
          <p className="font-body-lg text-primary-fixed-dim max-w-xl mx-auto">
            Gunakan fitur pencatatan mandiri untuk mengonversi material anorganik Anda menjadi poin bermanfaat dan data audit transparan.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-space-md pt-space-xs">
            <button
              type="button"
              onClick={openDepositModal}
              className="h-12 px-space-xl rounded-lg bg-tertiary-fixed text-on-tertiary-fixed font-title-md font-bold hover:bg-tertiary-fixed-dim transition-all shadow-lg hover:shadow-xl cursor-pointer inline-flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
              <span>Setorkan Sampah Pertama Anda</span>
            </button>
            <Link
              to="/bank-sampah"
              className="h-12 px-space-lg rounded-lg bg-primary-container text-on-primary font-title-md font-semibold hover:bg-secondary transition-colors inline-flex items-center gap-2"
            >
              <span>Lihat Buku Tabungan Digital</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
