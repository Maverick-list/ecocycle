import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWasteBank } from '../../context/WasteBankContext';
import { WASTE_CATEGORIES } from '../../data/wasteData';
import { Icon } from '../../components/ui/Icon';
import { AnimatedCounter } from '../../components/ui/AnimatedCounter';
import { PageTransition } from '../../components/ui/PageTransition';
import { CinematicEcoHeroVideo } from '../../components/features/CinematicEcoHeroVideo';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { MagneticButton } from '../../components/ui/MagneticButton';
import { SocialLinks } from '../../components/ui/SocialLinks';

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
    <PageTransition className="flex flex-col w-full">
      
      {/* 1. CINEMATIC HERO SECTION WITH APPLE-INSPIRED GLASS & MOVING GRADIENT */}
      <section className="relative w-full min-h-[92vh] flex items-center overflow-hidden bg-[#00170E] py-20 lg:py-28 border-b border-primary-container">
        
        {/* Background Cinematic Environmental Visual Layer */}
        <CinematicEcoHeroVideo />

        {/* Foreground Content */}
        <div className="relative z-10 max-w-[1380px] mx-auto px-margin-sm lg:px-margin w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-space-xl items-center">
            
            {/* Left Column: Headline with Moving Gradient & Dual Magnetic CTAs */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              
              {/* Glass pill badge */}
              <ScrollReveal direction="down" delay={0.1}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill-dark border border-tertiary-fixed/30 text-tertiary-fixed self-start shadow-lg backdrop-blur-md">
                  <span className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed animate-pulse" />
                  <span className="font-label-caps text-xs font-bold uppercase tracking-widest">
                    Platform Teknologi Sirkular Indonesia
                  </span>
                </div>
              </ScrollReveal>

              {/* Animated Gradient Headline */}
              <ScrollReveal direction="up" delay={0.2}>
                <div className="space-y-3">
                  <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                    <span className="text-surface-bright">Ubah Sampah Menjadi</span> <br />
                    <span className="animated-eco-gradient drop-shadow-sm">
                      Nilai Bernilai Berkelanjutan
                    </span> <br />
                    <span className="text-surface-bright">untuk Ekosistem Kita.</span>
                  </h1>
                  <p className="font-body-lg text-primary-fixed-dim/90 max-w-xl text-sm sm:text-base leading-relaxed pt-1">
                    Ekosistem pemilahan presisi berstandar SNI 19-3983, konversi tabungan rupiah transparan, dan neraca audit karbon saintifik berbasis EPA WARM bagi keluarga dan kampus di Kuningan.
                  </p>
                </div>
              </ScrollReveal>

              {/* Dual Magnetic Action Buttons + Video Tutorial Link */}
              <ScrollReveal direction="up" delay={0.3}>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <MagneticButton
                    variant="accent"
                    onClick={openDepositModal}
                    className="h-12 px-6 rounded-2xl shadow-xl hover:shadow-2xl flex items-center gap-2 text-xs sm:text-sm font-extrabold"
                  >
                    <Icon name="add_circle" size={18} />
                    <span>Mulai Setor Sampah</span>
                  </MagneticButton>

                  <Link to="/pemilahan-pintar">
                    <MagneticButton
                      variant="glass"
                      className="h-12 px-5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 text-surface-bright bg-white/10 hover:bg-white/20 border-white/20 backdrop-blur-md"
                    >
                      <Icon name="recycle" size={18} className="text-tertiary-fixed" />
                      <span>Panduan Pemilahan</span>
                    </MagneticButton>
                  </Link>

                  <Link
                    to="/panduan"
                    className="inline-flex items-center gap-2 h-12 px-4 rounded-2xl text-xs font-bold text-tertiary-fixed hover:text-white transition-colors cursor-pointer"
                  >
                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-tertiary-fixed">
                      <Icon name="play" size={14} />
                    </span>
                    <span>Tonton Video Panduan</span>
                  </Link>
                </div>
              </ScrollReveal>

              {/* Key Trust Markers (Glass Minimalist) */}
              <ScrollReveal direction="up" delay={0.4}>
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-primary-container/80 max-w-lg">
                  <div className="p-3 rounded-2xl glass-card-dark border border-white/10">
                    <span className="font-label-caps text-[10px] text-primary-fixed-dim uppercase block font-bold">
                      Total Divergen
                    </span>
                    <span className="text-base sm:text-lg font-bold text-surface-bright font-metric-display">
                      14.820+ kg
                    </span>
                    <span className="text-[10px] text-tertiary-fixed block">Teralihkan TPA</span>
                  </div>

                  <div className="p-3 rounded-2xl glass-card-dark border border-white/10">
                    <span className="font-label-caps text-[10px] text-primary-fixed-dim uppercase block font-bold">
                      Jejaring Hub
                    </span>
                    <span className="text-base sm:text-lg font-bold text-surface-bright font-metric-display">
                      12 Titik
                    </span>
                    <span className="text-[10px] text-tertiary-fixed block">Wilayah Kuningan</span>
                  </div>

                  <div className="p-3 rounded-2xl glass-card-dark border border-white/10">
                    <span className="font-label-caps text-[10px] text-primary-fixed-dim uppercase block font-bold">
                      Kepatuhan
                    </span>
                    <span className="text-base sm:text-lg font-bold text-surface-bright font-metric-display">
                      SNI 19-3983
                    </span>
                    <span className="text-[10px] text-tertiary-fixed block">Rantai Lacak</span>
                  </div>
                </div>
              </ScrollReveal>

            </div>

            {/* Right Column: Apple-Inspired Glass Bento Live Counters (5 cols) */}
            <div className="lg:col-span-5 flex flex-col space-y-4 relative mt-10 lg:mt-0">
              
              {/* Primary Live Environmental Metric Card */}
              <ScrollReveal direction="left" delay={0.3}>
                <div className="glass-card-dark p-6 sm:p-7 rounded-3xl relative overflow-hidden space-y-4 shadow-2xl border border-tertiary-fixed/20 backdrop-blur-2xl">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Icon name="leaf" size={18} className="text-tertiary-fixed" />
                      <span className="font-label-caps text-[11px] text-surface-bright uppercase tracking-wider font-bold">
                        Pemantauan Aliran Material Real-Time
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-caps text-[10px] font-bold">
                      AKTIF
                    </span>
                  </div>

                  <div>
                    <span className="font-label-caps text-[10px] text-primary-fixed-dim block font-bold uppercase tracking-wider">
                      Massa Limbah Terkelola di Sistem
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <AnimatedCounter
                        value={totalWeightKg > 0 ? totalWeightKg + 1240 : 1240}
                        className="font-metric-display text-4xl sm:text-5xl text-surface-bright tracking-tight font-extrabold"
                      />
                      <span className="text-lg font-bold text-tertiary-fixed font-mono">
                        kg
                      </span>
                    </div>
                    <p className="text-xs text-primary-fixed-dim mt-1.5 flex items-center gap-1.5">
                      <Icon name="cloud" size={14} className="text-secondary-fixed shrink-0" />
                      <span>
                        Mencegah estimasi ~{totalCo2AvoidedKg > 0 ? (totalCo2AvoidedKg + 842).toFixed(0) : '842'} kg CO₂e terlepas ke atmosfer.
                      </span>
                    </p>
                  </div>

                  {/* Dynamic Graphic Line */}
                  <div className="w-full h-12 pt-1 opacity-80">
                    <svg className="w-full h-full text-tertiary-fixed" fill="none" preserveAspectRatio="none" viewBox="0 0 320 60">
                      <path d="M0 45 C40 42, 60 20, 100 28 C140 36, 170 12, 210 18 C250 24, 280 5, 320 10" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" />
                      <path d="M0 45 C40 42, 60 20, 100 28 C140 36, 170 12, 210 18 C250 24, 280 5, 320 10 L320 60 L0 60 Z" fill="currentColor" fillOpacity="0.08" />
                    </svg>
                  </div>
                </div>
              </ScrollReveal>

              {/* Interactive Rapid Simulator Card */}
              <ScrollReveal direction="left" delay={0.4}>
                <div className="glass-panel p-5 sm:p-6 rounded-3xl shadow-xl border border-white/60 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="font-label-caps text-secondary uppercase font-bold tracking-wider text-[11px] flex items-center gap-1.5">
                      <Icon name="savings" size={14} />
                      <span>Kalkulator Simulasi Konversi Cepat</span>
                    </span>
                    <span className="text-[10px] text-outline">Estimasi Instan</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[10px] text-on-surface-variant font-bold block mb-1 uppercase">Kategori</label>
                      <select
                        value={calcCategory}
                        onChange={(e) => setCalcCategory(e.target.value)}
                        className="w-full h-9 px-2.5 rounded-xl bg-surface-container text-xs text-primary font-bold outline-none focus:ring-2 focus:ring-secondary border border-outline-variant/30 cursor-pointer"
                      >
                        {WASTE_CATEGORIES.map(c => (
                          <option key={c.id} value={c.name} className="bg-surface text-primary">
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] text-on-surface-variant font-bold block mb-1 uppercase">Bobot (kg)</label>
                      <input
                        type="number"
                        step="0.5"
                        min="0.5"
                        value={calcWeight}
                        onChange={(e) => setCalcWeight(parseFloat(e.target.value) || 0.5)}
                        className="w-full h-9 px-2.5 rounded-xl bg-surface-container text-xs text-primary font-extrabold outline-none focus:ring-2 focus:ring-secondary border border-outline-variant/30 text-center"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20">
                    <div>
                      <span className="text-[10px] text-outline block">Estimasi Saldo</span>
                      <span className="text-base font-extrabold text-primary">
                        Rp {calcEstimatedIdr.toLocaleString('id-ID')}
                      </span>
                      <span className="text-[10px] text-secondary font-semibold block">
                        ~{calcEstimatedCo2} kg CO₂e
                      </span>
                    </div>

                    <div className="text-center">
                      <span className="text-[10px] text-outline block">EcoPoints</span>
                      <span className="text-sm font-extrabold text-secondary">
                        +{calcEstimatedPoints} Pts
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={openDepositModal}
                      className="h-8 px-4 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-container transition-all cursor-pointer shadow-sm"
                    >
                      Setor Ini
                    </button>
                  </div>
                </div>
              </ScrollReveal>

            </div>

          </div>
        </div>
      </section>

      {/* 2. THE 4-STEP CIRCULAR WORKFLOW WITH SCROLL REVEALS */}
      <section className="w-full py-space-xl bg-surface border-b border-outline-variant/20" id="siklus-sirkular">
        <div className="max-w-[1380px] mx-auto px-margin-sm lg:px-margin">
          
          <ScrollReveal direction="up" delay={0.1}>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl">
              <div>
                <span className="font-label-caps text-secondary font-bold uppercase tracking-wider block mb-1 text-xs">
                  Transparansi Rantai Pasok Sirkular
                </span>
                <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-primary tracking-tight">
                  Empat Tahap Aliran Material Terverifikasi
                </h2>
              </div>
              <p className="font-body-md text-on-surface-variant max-w-md mt-2 md:mt-0 text-xs sm:text-sm">
                Protokol terstandarisasi untuk menjamin setiap gram sampah rumah tangga tercatat dan terserap kembali ke rantai daur ulang industri.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {/* Step 1 */}
            <ScrollReveal direction="up" delay={0.15}>
              <div className="p-space-lg rounded-3xl glass-panel border border-outline-variant/30 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold text-base mb-3 shadow-inner">
                    01
                  </div>
                  <h3 className="font-title-md text-base font-bold text-primary mb-1 group-hover:text-secondary transition-colors">
                    Pilah di Rumah
                  </h3>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    Gunakan panduan 4-stream ECOCYCLE untuk memisahkan anorganik, organik, jelantah, dan e-waste secara higienis di dapur Anda.
                  </p>
                </div>
                <Link to="/pemilahan-pintar" className="text-secondary font-bold text-xs flex items-center gap-1 hover:underline pt-2">
                  <span>Lihat Panduan Sortasi</span>
                  <Icon name="arrow_forward" size={13} />
                </Link>
              </div>
            </ScrollReveal>

            {/* Step 2 */}
            <ScrollReveal direction="up" delay={0.25}>
              <div className="p-space-lg rounded-3xl glass-panel border border-outline-variant/30 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-bold text-base mb-3 shadow-inner">
                    02
                  </div>
                  <h3 className="font-title-md text-base font-bold text-primary mb-1 group-hover:text-secondary transition-colors">
                    Timbang & Valuasi
                  </h3>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    Input bobot di aplikasi web untuk melihat nilai konversi rupiah dan perolehan EcoPoints sebelum disetor ke drop-point terdekat.
                  </p>
                </div>
                <button onClick={openDepositModal} className="text-secondary font-bold text-xs flex items-center gap-1 hover:underline text-left cursor-pointer pt-2">
                  <span>Catat Setoran Cepat</span>
                  <Icon name="arrow_forward" size={13} />
                </button>
              </div>
            </ScrollReveal>

            {/* Step 3 */}
            <ScrollReveal direction="up" delay={0.35}>
              <div className="p-space-lg rounded-3xl glass-panel border border-outline-variant/30 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-surface-container-high text-primary flex items-center justify-center font-bold text-base mb-3 shadow-inner">
                    03
                  </div>
                  <h3 className="font-title-md text-base font-bold text-primary mb-1 group-hover:text-secondary transition-colors">
                    Drop-Point Terverifikasi
                  </h3>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    Serahkan ke hub lingkungan FKOM UNIKU atau jadwal penjemputan berkala terkoordinasi dengan tanda terima resmi berizin.
                  </p>
                </div>
                <Link to="/kontak" className="text-secondary font-bold text-xs flex items-center gap-1 hover:underline pt-2">
                  <span>Direktori Drop-Point</span>
                  <Icon name="arrow_forward" size={13} />
                </Link>
              </div>
            </ScrollReveal>

            {/* Step 4 */}
            <ScrollReveal direction="up" delay={0.45}>
              <div className="p-space-lg rounded-3xl glass-panel border border-outline-variant/30 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-primary text-on-primary flex items-center justify-center font-bold text-base mb-3 shadow-inner">
                    04
                  </div>
                  <h3 className="font-title-md text-base font-bold text-primary mb-1 group-hover:text-secondary transition-colors">
                    Manufaktur & Dampak
                  </h3>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    Material diolah kembali menjadi produk baru; audit reduksi emisi karbon otomatis terekam di neraca akun Anda.
                  </p>
                </div>
                <Link to="/analitik" className="text-secondary font-bold text-xs flex items-center gap-1 hover:underline pt-2">
                  <span>Lihat Analitik Emisi</span>
                  <Icon name="arrow_forward" size={13} />
                </Link>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* 3. FOUR STRATEGIC PILLARS BENTO SHOWCASE */}
      <section className="w-full py-space-xl bg-surface-container-low/50">
        <div className="max-w-[1380px] mx-auto px-margin-sm lg:px-margin">
          
          <ScrollReveal direction="up">
            <div className="mb-space-xl text-center max-w-2xl mx-auto space-y-2">
              <span className="font-label-caps text-secondary font-bold uppercase tracking-wider block text-xs">
                Ekosistem Terintegrasi
              </span>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-primary tracking-tight">
                Empat Pilar Utama Platform ECOCYCLE
              </h2>
              <p className="font-body-md text-on-surface-variant text-xs sm:text-sm">
                Dirancang untuk menghadirkan pengalaman circular technology kelas dunia bagi kompetisi Web Design Techno Versary Vol. II 2026.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter">
            
            {/* Pillar 1: Smart Sorting */}
            <div className="lg:col-span-6">
              <ScrollReveal direction="right" delay={0.1}>
                <div className="rounded-3xl glass-panel p-space-lg flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 border border-outline-variant/30 group">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold uppercase">
                        Pilar 1: Waste Management
                      </span>
                      <Icon name="recycle" size={24} className="text-secondary" />
                    </div>
                    <h3 className="font-headline-md font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                      Pemilahan Pintar (Smart Sorting Guide)
                    </h3>
                    <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant mb-4 leading-relaxed">
                      Katalog pemilahan interaktif dengan pencarian instan nama barang, protokol higienitas wadah, dan klasifikasi tong warna terstandarisasi.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between">
                    <span className="text-xs text-outline">Kamus 25+ jenis limbah rumah tangga</span>
                    <Link to="/pemilahan-pintar" className="inline-flex items-center gap-1 text-secondary font-bold text-xs sm:text-sm hover:underline">
                      <span>Jelajahi Panduan</span>
                      <Icon name="arrow_forward" size={14} />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Pillar 2: Digital Waste Bank */}
            <div className="lg:col-span-6">
              <ScrollReveal direction="left" delay={0.2}>
                <div className="rounded-3xl glass-panel p-space-lg flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 border border-outline-variant/30 group">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold uppercase">
                        Pilar 2: Digital Waste Bank
                      </span>
                      <Icon name="wallet" size={24} className="text-primary" />
                    </div>
                    <h3 className="font-headline-md font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                      Bank Sampah Digital Terpadu
                    </h3>
                    <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant mb-4 leading-relaxed">
                      Simulasi setor sampah real-time, dompet saldo EcoPoints & Rupiah, riwayat transaksi dengan lembar manifest resmi, serta ekspor CSV.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between">
                    <span className="text-xs text-outline">Penyimpanan persisten di peramban</span>
                    <Link to="/bank-sampah" className="inline-flex items-center gap-1 text-secondary font-bold text-xs sm:text-sm hover:underline">
                      <span>Buka Bank Sampah</span>
                      <Icon name="arrow_forward" size={14} />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Pillar 3: Environmental Education */}
            <div className="lg:col-span-6">
              <ScrollReveal direction="right" delay={0.3}>
                <div className="rounded-3xl glass-panel p-space-lg flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 border border-outline-variant/30 group">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full bg-surface-container-high text-primary text-xs font-bold uppercase">
                        Pilar 3: Environmental Education
                      </span>
                      <Icon name="book_open" size={24} className="text-primary" />
                    </div>
                    <h3 className="font-headline-md font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                      Akademi Sirkular (Knowledge Hub)
                    </h3>
                    <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant mb-4 leading-relaxed">
                      Artikel edukasi ilmiah, kartu pembongkar mitos vs fakta seputar plastik, infografis sirkularitas, dan sistem penanda buku lokal.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between">
                    <span className="text-xs text-outline">Konten edukasi mendalam & galeri</span>
                    <Link to="/akademi" className="inline-flex items-center gap-1 text-secondary font-bold text-xs sm:text-sm hover:underline">
                      <span>Masuk Akademi</span>
                      <Icon name="arrow_forward" size={14} />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Pillar 4: Community Activities & Impact */}
            <div className="lg:col-span-6">
              <ScrollReveal direction="left" delay={0.4}>
                <div className="rounded-3xl glass-panel p-space-lg flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 border border-outline-variant/30 group">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full bg-secondary-fixed-dim text-on-secondary-fixed text-xs font-bold uppercase">
                        Pilar 4: Community & Impact
                      </span>
                      <Icon name="leaderboard" size={24} className="text-secondary" />
                    </div>
                    <h3 className="font-headline-md font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                      Tantangan & Papan Peringkat Komunitas
                    </h3>
                    <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant mb-4 leading-relaxed">
                      Aksi mingguan terstruktur, lencana digital pencapaian, papan peringkat kompetisi yang adil, serta kalkulator dampak reduksi emisi.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between">
                    <span className="text-xs text-outline">Gamifikasi aksi nyata warga</span>
                    <Link to="/tantangan" className="inline-flex items-center gap-1 text-secondary font-bold text-xs sm:text-sm hover:underline">
                      <span>Lihat Tantangan</span>
                      <Icon name="arrow_forward" size={14} />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* 4. COMMUNITY TESTIMONIALS & CREATOR SPOTLIGHT */}
      <section className="w-full py-space-xl bg-surface border-t border-b border-outline-variant/20">
        <div className="max-w-[1380px] mx-auto px-margin-sm lg:px-margin">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-space-xl items-center">
            
            <div className="lg:col-span-7 space-y-space-md">
              <span className="font-label-caps text-secondary font-bold uppercase tracking-wider block text-xs">
                Aksi Kolektif Komunitas
              </span>
              <h2 className="font-headline-lg font-bold text-primary tracking-tight">
                Bergabung Bersama Ribuan Warga Menjaga Kelestarian Lingkungan
              </h2>
              <p className="font-body-md text-on-surface-variant text-xs sm:text-sm leading-relaxed">
                Setiap kilogram sampah terpilah yang Anda setorkan adalah wujud nyata pelestarian alam dan pengurangan timbunan di TPA Kuningan.
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
                    <AnimatedCounter
                      value={ecoPledgesCount}
                      className="text-2xl font-bold font-metric-display text-primary"
                    />
                    <span className="text-xs font-semibold text-secondary">Warga Telah Berikrar</span>
                  </div>
                  <span className="text-xs text-outline">Berkomitmen memilah sampah dari rumah</span>
                </div>
              </div>

              {/* Official Project Creator Profile Attribution */}
              <div className="pt-4 border-t border-outline-variant/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-bold text-primary block">
                    Kreator & Pengembang: Firza Ilmi (@Maverick-list)
                  </span>
                  <span className="text-[10px] text-outline">
                    HIMA TI FKOM Universitas Kuningan • Techno Versary 2026
                  </span>
                </div>
                <SocialLinks variant="light" showLabels={true} />
              </div>
            </div>

            {/* Interactive Pledge Action Card */}
            <div className="lg:col-span-5 p-space-lg rounded-3xl glass-panel-elevated border border-outline-variant/30 shadow-lg text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shadow-inner">
                <Icon name="sparkles" size={24} />
              </div>
              <h3 className="font-headline-sm font-bold text-primary">
                Ikrar Gaya Hidup Sirkular
              </h3>
              <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                "Saya berkomitmen untuk memilah sampah di rumah, mengurangi plastik sekali pakai, dan mendukung bank sampah lokal."
              </p>
              <button
                type="button"
                onClick={signEcoPledge}
                disabled={hasPledged}
                className={`w-full h-12 rounded-xl font-title-md font-bold transition-all flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm ${
                  hasPledged
                    ? 'bg-secondary-fixed text-on-secondary-fixed cursor-default shadow-sm'
                    : 'bg-primary text-on-primary hover:bg-primary-container shadow-md'
                }`}
              >
                <Icon name={hasPledged ? 'check_circle' : 'check'} size={18} />
                <span>{hasPledged ? 'Anda Telah Berikrar ✓' : 'Tandatangani Ikrar Sekarang'}</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FINAL CALL TO ACTION BANNER */}
      <section className="w-full py-space-xl lg:py-margin bg-gradient-to-br from-[#002517] via-[#123B2A] to-[#00170E] text-on-primary relative overflow-hidden">
        <div className="max-w-[1380px] mx-auto px-margin-sm lg:px-margin relative z-10 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-tertiary-fixed text-xs font-bold uppercase tracking-widest backdrop-blur-md border border-white/15">
            <span className="w-2 h-2 rounded-full bg-tertiary-fixed animate-ping" />
            <span>Mulai Gerakan Sirkular Hari Ini</span>
          </div>
          
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-surface-bright max-w-2xl mx-auto leading-tight">
            Siap Mengubah Limbah Menjadi Berkah Berkelanjutan?
          </h2>
          
          <p className="font-body-lg text-primary-fixed-dim max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
            Gunakan fitur pencatatan mandiri untuk mengonversi material anorganik Anda menjadi poin bermanfaat dan data audit transparan.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <MagneticButton
              variant="accent"
              onClick={openDepositModal}
              className="h-12 px-7 rounded-2xl shadow-xl hover:shadow-2xl flex items-center gap-2 text-xs sm:text-sm font-extrabold"
            >
              <Icon name="add_circle" size={18} />
              <span>Setorkan Sampah Pertama Anda</span>
            </MagneticButton>

            <Link to="/bank-sampah">
              <MagneticButton
                variant="glass"
                className="h-12 px-6 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 text-surface-bright bg-white/10 hover:bg-white/20 border-white/20"
              >
                <span>Buka Buku Tabungan Digital</span>
                <Icon name="arrow_forward" size={16} />
              </MagneticButton>
            </Link>
          </div>
        </div>
      </section>

    </PageTransition>
  );
};
