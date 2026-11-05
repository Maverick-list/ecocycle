import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useWasteBank } from '../../context/WasteBankContext';
import { WASTE_CATEGORIES } from '../../data/wasteData';
import { Icon } from '../../components/ui/Icon';
import { AnimatedCounter } from '../../components/ui/AnimatedCounter';
import { PageTransition } from '../../components/ui/PageTransition';
import { CinematicEcoHeroVideo } from '../../components/features/CinematicEcoHeroVideo';
import { HeroOrganicEcosystem } from '../../components/features/HeroOrganicEcosystem';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { SEOHead } from '../../components/seo/SEOHead';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    totalWeightKg, 
    totalCo2AvoidedKg, 
    ecoPledgesCount, 
    hasPledged, 
    signEcoPledge 
  } = useWasteBank();

  // Interactive Circular Cycle Active Step
  const [activeCycleStep, setActiveCycleStep] = useState<number>(0);

  // Interactive Accordion State for Curated FAQs (first one open by default)
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  // Quick Simulator Widget
  const [simCategory, setSimCategory] = useState<string>('Plastik PET');
  const [simWeight, setSimWeight] = useState<number>(5.0);

  const selectedCategoryConfig = WASTE_CATEGORIES.find(c => c.name === simCategory) || WASTE_CATEGORIES[0];
  const simValueIdr = Math.round(simWeight * selectedCategoryConfig.pricePerKg);
  const simPoints = Math.round(simWeight * selectedCategoryConfig.pointsPerKg);
  const simCo2 = (simWeight * selectedCategoryConfig.co2Factor).toFixed(1);

  const FAQ_ITEMS = [
    {
      id: 1,
      category: 'Pencatatan Mandiri',
      icon: 'edit_document',
      question: 'Bagaimana cara mencatat setoran sampah secara mandiri?',
      answer: 'Buka formulir "Setor Sampah", pilih jenis material (seperti Plastik PET), masukkan berat timbangan, pilih hub terdekat, dan sertakan foto bukti. Sistem langsung menerbitkan nomor manifest registrasi yang valid dan terenkripsi.',
      badge: 'Alur Cepat'
    },
    {
      id: 2,
      category: 'Metodologi Karbon',
      icon: 'eco',
      question: 'Bagaimana angka reduksi emisi karbon (CO2e) dihitung?',
      answer: 'Kami menerapkan faktor emisi model ilmiah US EPA WARM v15. Setiap kilogram material daur ulang yang berhasil dialihkan dari TPA dikalikan koefisien emisi terhindar yang terverifikasi secara saintifik.',
      badge: 'Sains Emisi'
    },
    {
      id: 3,
      category: 'Keamanan Data & Privasi',
      icon: 'security',
      question: 'Apakah data pribadi kontak dan alamat saya aman?',
      answer: 'Ya. Database kami menerapkan Row Level Security (RLS) mutlak di mana hanya Anda yang dapat mengakses data kontak privat Anda. Papan peringkat publik hanya menampilkan nama publik dan lencana kehormatan.',
      badge: 'Privasi & RLS'
    }
  ];

  const CIRCULAR_STEPS = [
    {
      step: '01',
      title: 'Pemilahan Presisi dari Sumber',
      subtitle: 'Standar Dekontaminasi Material',
      description: 'Pemisahan 6 aliran anorganik bernilai tinggi di rumah atau kantor. Membilas dan memipihkan botol meningkatkan efisiensi daur ulang industri hingga 85%.',
      icon: 'recycle',
      route: '/pemilahan-pintar',
      routeLabel: 'Pelajari Panduan Pemilahan',
      statLabel: 'Efisiensi Daur Ulang',
      statValue: '85%',
    },
    {
      step: '02',
      title: 'Pencatatan Mandiri & Penimbangan',
      subtitle: 'Rantai Lacak Transparan',
      description: 'Catat bobot estimasi timbangan melalui formulir digital, dapatkan kode manifest registrasi, dan serahkan material ke hub terdekat.',
      icon: 'scale',
      route: '/setor-sampah',
      routeLabel: 'Buka Formulir Setor',
      statLabel: 'Verifikasi Akurat',
      statValue: '100%',
    },
    {
      step: '03',
      title: 'Konversi Nilai Tabungan Sirkular',
      subtitle: 'Ekonomi Bernilai Nyata',
      description: 'Setiap kilogram sampah terpilah langsung dikonversi menjadi saldo rupiah transparan dan EcoPoints yang dapat ditukarkan dengan insentif hijau.',
      icon: 'payments',
      route: '/bank-sampah',
      routeLabel: 'Buka Buku Tabungan',
      statLabel: 'Tarif Komoditas',
      statValue: 'Pasar Terbuka',
    },
    {
      step: '04',
      title: 'Audit Emisi & Regenerasi Sumber Daya',
      subtitle: 'Sains Karbon Terverifikasi',
      description: 'Perhitungan otomatis emisi gas rumah kaca terhindar menggunakan model US EPA WARM v15 dan visualisasi tren alur material temporal.',
      icon: 'analytics',
      route: '/dampak-ekologis',
      routeLabel: 'Eksplorasi Sains Dampak',
      statLabel: 'Standar Emisi',
      statValue: 'EPA WARM v15',
    },
  ];

  return (
    <PageTransition className="flex flex-col w-full bg-surface dark:bg-[#03140d] text-on-surface dark:text-white transition-colors duration-300">
      <SEOHead
        title="A Living Circular Economy Experience"
        canonical="/"
        description="Infrastruktur teknologi tata kelola daur ulang dan ekonomi sirkular cerdas. Mengubah aliran material menjadi neraca sumber daya terverifikasi dan bernilai nyata."
      />
      
      {/* 1. CINEMATIC HERO SECTION — PURE GREEN GRADIENT & VISIONOS ECOSYSTEM */}
      <section
        className="relative w-full min-h-screen flex items-center justify-center overflow-hidden text-white pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28"
        style={{
          background: 'linear-gradient(180deg, #C8F0A5 0%, #A8E48D 10%, #8CCF75 22%, #64BC69 36%, #45A65B 50%, #2A9053 64%, #167A45 76%, #0B482D 88%, #062B1D 100%)'
        }}
      >
        {/* Layer A: Atmospheric Radial Highlights */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_45%_at_50%_0%,rgba(255,255,255,0.45),transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_55%,rgba(38,142,80,0.35),transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_45%_at_50%_100%,rgba(6,43,29,0.95),transparent_80%)] pointer-events-none" />

        {/* Layer B: Videotron Moving Backdrop (User Video at 30% Opacity) */}
        <CinematicEcoHeroVideo videoSrc="/media/ecocycle-hero-videotron.mp4" />

        {/* Layer C: visionOS Animated Organic Ecosystem (Floating Leaves, Glass Orbs, Circular Loop) */}
        <HeroOrganicEcosystem />

        {/* Layer D: Hero Content Stage */}
        <div className="relative z-10 max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-12 w-full text-center space-y-8 lg:space-y-10">
          
          {/* Eyebrow Label: A Smarter Way to Live Sustainably */}
          <ScrollReveal direction="down" delay={0.1}>
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/75 backdrop-blur-md border border-[#0B482D]/20 shadow-sm text-xs font-extrabold uppercase tracking-widest text-[#062B1D]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#167A45] animate-pulse shadow-[0_0_8px_#167A45]" />
              <span>A Smarter Way to Live Sustainably</span>
            </div>
          </ScrollReveal>

          {/* Hero Headline & Supporting Description */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="space-y-6 max-w-5xl mx-auto">
              <h1 className="font-display font-extrabold text-[clamp(2.75rem,7vw,5.75rem)] leading-[1.05] tracking-[-0.035em] text-white">
                Turn Waste Into <br />
                <span className="animate-hero-title-flow drop-shadow-[0_4px_30px_rgba(6,43,29,0.65)]">
                  Something Worth.
                </span>
              </h1>
              
              <p className="font-sans text-[clamp(1.125rem,1.4vw,1.3rem)] text-[#F4FDF0] font-medium leading-[1.65] max-w-2xl mx-auto drop-shadow-[0_2px_12px_rgba(6,43,29,0.5)]">
                Discover a smarter way to understand waste, embrace circular living, and create meaningful environmental impact.
              </p>
            </div>
          </ScrollReveal>

          {/* Two Prominent Action Triggers */}
          <ScrollReveal direction="up" delay={0.35}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <motion.button
                type="button"
                onClick={() => navigate('/masuk')}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="w-full sm:w-auto h-15 px-10 rounded-2xl bg-[#C8F0A5] text-[#062B1D] font-display font-extrabold text-lg hover:bg-[#D6F5B8] transition-all shadow-[0_12px_36px_rgba(200,240,165,0.4)] flex items-center justify-center gap-3 cursor-pointer"
              >
                <Icon name="login" size={22} />
                <span>Explore ECOCYCLE</span>
              </motion.button>

              <motion.a
                href="#circular-lifecycle"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="w-full sm:w-auto h-15 px-10 rounded-2xl bg-white/18 backdrop-blur-md border border-white/40 text-white font-display font-extrabold text-lg hover:bg-white/28 hover:border-white/60 transition-all flex items-center justify-center gap-3 cursor-pointer shadow-lg"
              >
                <span>Discover Our Mission</span>
                <Icon name="arrow_downward" size={18} />
              </motion.a>
            </div>
          </ScrollReveal>

          {/* Live Verified Telemetry Strip */}
          <ScrollReveal direction="up" delay={0.45}>
            <div className="pt-6 sm:pt-8 max-w-4xl mx-auto w-full">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 p-6 sm:p-7 rounded-3xl bg-[#062B1D]/80 backdrop-blur-2xl border border-[#C8F0A5]/30 shadow-[0_25px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.25)] text-left">
                <div className="p-3 sm:p-4 space-y-1.5 sm:border-r border-[#C8F0A5]/20">
                  <span className="text-xs uppercase tracking-wider text-[#EBF9E2] block font-extrabold">
                    Bobot Material Terpulihkan
                  </span>
                  <div className="flex items-baseline gap-2">
                    <AnimatedCounter
                      value={totalWeightKg}
                      className="font-display font-extrabold text-3xl sm:text-5xl text-[#C8F0A5]"
                    />
                    <span className="text-base text-white font-extrabold">kg</span>
                  </div>
                </div>

                <div className="p-3 sm:p-4 space-y-1.5 sm:border-r border-[#C8F0A5]/20">
                  <span className="text-xs uppercase tracking-wider text-[#EBF9E2] block font-extrabold">
                    Emisi Karbon Terhindar
                  </span>
                  <div className="flex items-baseline gap-2">
                    <AnimatedCounter
                      value={totalCo2AvoidedKg}
                      className="font-display font-extrabold text-3xl sm:text-5xl text-[#8CCF75]"
                    />
                    <span className="text-base text-white font-extrabold">kg CO₂e</span>
                  </div>
                </div>

                <div className="p-3 sm:p-4 space-y-1.5">
                  <span className="text-xs uppercase tracking-wider text-[#EBF9E2] block font-extrabold">
                    Warga Berkomitmen
                  </span>
                  <div className="flex items-baseline gap-2">
                    <AnimatedCounter
                      value={ecoPledgesCount}
                      className="font-display font-extrabold text-3xl sm:text-5xl text-white"
                    />
                    <span className="text-base text-[#C8F0A5] font-extrabold">Mitra</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* Soft Organic Vignette & Edge Blend to Section Below */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--bg-surface)] to-transparent pointer-events-none" />
      </section>

      {/* 2. INTERACTIVE LIVING CIRCULAR ECONOMY LIFECYCLE */}
      <section id="circular-lifecycle" className="w-full py-28 sm:py-36 transition-colors duration-300 relative">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
          
          <ScrollReveal direction="up">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-sm font-extrabold uppercase tracking-widest text-secondary dark:text-emerald-400 block">
                Alur Tata Kelola
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-on-surface dark:text-white tracking-tight">
                Empat Langkah Mentransformasi Sampah
              </h2>
              <p className="font-sans text-xl sm:text-2xl text-on-surface-variant dark:text-emerald-100 font-normal leading-relaxed">
                Dari wadah pemilahan di rumah hingga pengolahan ulang industri terstandarisasi, setiap gram material tercatat dengan akuntabilitas terbuka.
              </p>
            </div>
          </ScrollReveal>

          {/* Interactive Step Navigator */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {CIRCULAR_STEPS.map((s, idx) => (
              <motion.button
                key={s.step}
                type="button"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveCycleStep(idx)}
                className={`p-5 rounded-2xl text-left transition-all duration-300 cursor-pointer border ${
                  activeCycleStep === idx
                    ? 'bg-surface-bright dark:bg-[#0c2a1c] border-secondary dark:border-emerald-400 shadow-xl ring-2 ring-secondary/20'
                    : 'glass-panel border-outline-variant/20 hover:border-outline-variant/50 hover:bg-surface-bright/80'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display font-extrabold text-xs sm:text-sm text-secondary dark:text-emerald-400 uppercase tracking-wider">
                    Fase {s.step}
                  </span>
                  <div className={`w-3 h-3 rounded-full transition-all ${activeCycleStep === idx ? 'bg-secondary dark:bg-emerald-400 animate-pulse' : 'bg-outline-variant/40'}`} />
                </div>
                <div className="font-display font-bold text-base sm:text-lg text-on-surface dark:text-white line-clamp-1">
                  {s.title}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Active Step Showcase Card with AnimatePresence */}
          <div className="max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              {CIRCULAR_STEPS.map((s, idx) => {
                if (idx !== activeCycleStep) return null;
                return (
                  <motion.div
                    key={s.step}
                    initial={{ opacity: 0, y: 24, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -4 }}
                    className="rounded-3xl bg-surface-bright/95 dark:bg-[#0a271a]/95 p-8 sm:p-14 border border-outline-variant/30 dark:border-emerald-400/30 shadow-2xl space-y-8"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-outline-variant/15">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-secondary/15 dark:bg-emerald-900/40 text-secondary dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform">
                          <Icon name={s.icon} size={32} />
                        </div>
                        <div>
                          <span className="text-sm font-extrabold uppercase tracking-wider text-secondary dark:text-emerald-400 block">
                            {s.subtitle}
                          </span>
                          <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-on-surface dark:text-white tracking-tight">
                            {s.title}
                          </h3>
                        </div>
                      </div>

                      <div className="p-5 rounded-2xl bg-surface-container dark:bg-[#061e13] border border-outline-variant/30 shrink-0 text-right">
                        <span className="text-xs sm:text-sm text-outline dark:text-emerald-300 block font-bold uppercase tracking-wider">
                          {s.statLabel}
                        </span>
                        <span className="font-display font-extrabold text-3xl sm:text-4xl text-secondary dark:text-emerald-400">
                          {s.statValue}
                        </span>
                      </div>
                    </div>

                    <p className="font-sans text-xl sm:text-2xl text-on-surface-variant dark:text-emerald-100 font-normal leading-relaxed">
                      {s.description}
                    </p>

                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}>
                        <Link
                          to={s.route}
                          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary dark:bg-emerald-500 text-on-primary dark:text-[#002113] font-display font-extrabold text-base hover:bg-primary-container dark:hover:bg-emerald-400 transition-all shadow-xl"
                        >
                          <span>{s.routeLabel}</span>
                          <Icon name="arrow_forward" size={18} />
                        </Link>
                      </motion.div>

                      <span className="text-sm sm:text-base text-outline dark:text-emerald-300/80 font-bold">
                        Langkah {idx + 1} dari 4
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        </div>

        {/* Apple-style Soft Gradient Section Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500/25 dark:via-emerald-400/20 to-transparent pointer-events-none mt-28" />
      </section>

      {/* 3. CORE PLATFORM PORTALS SHOWCASE (BENTO HEROES) */}
      <section className="w-full py-28 sm:py-36 bg-surface-container-low/40 transition-colors duration-300">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
          
          <ScrollReveal direction="up">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-sm font-extrabold uppercase tracking-widest text-secondary dark:text-emerald-400 block">
                Pilar Layanan Digital
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-on-surface dark:text-white tracking-tight">
                Infrastruktur Lengkap untuk Warga dan Komunitas
              </h2>
              <p className="font-sans text-xl sm:text-2xl text-on-surface-variant dark:text-emerald-100 font-normal leading-relaxed">
                Setiap modul dirancang khusus dengan fitur independen, aman, dan dapat diakses melalui portal terdedikasi.
              </p>
            </div>
          </ScrollReveal>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* 1. Smart Waste Sorting Portal (7 cols) */}
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ y: -8, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 flex flex-col justify-between rounded-3xl bg-surface-bright/95 dark:bg-[#0a271a]/95 p-8 sm:p-12 border border-outline-variant/30 dark:border-emerald-400/30 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer"
            >
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-secondary/15 dark:bg-emerald-900/40 text-secondary dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  <Icon name="recycle" size={28} />
                </div>
                <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-on-surface dark:text-white tracking-tight">
                  Katalog Pemilahan Pintar
                </h3>
                <p className="font-sans text-lg sm:text-xl text-on-surface-variant dark:text-emerald-100 font-normal leading-relaxed">
                  Panduan interaktif 6 jenis material dengan instruksi dekontaminasi praktis: cara membersihkan wadah PET, melipat karton HVS, hingga mengumpulkan minyak jelantah bekas.
                </p>

                {/* 6 Category Badges Preview */}
                <div className="flex flex-wrap gap-2.5 pt-3">
                  {WASTE_CATEGORIES.slice(0, 5).map(c => (
                    <span 
                      key={c.id} 
                      className="px-4 py-2 rounded-full text-sm font-extrabold bg-surface-container dark:bg-emerald-950/70 text-on-surface dark:text-emerald-200 border border-outline-variant/25 hover:border-secondary hover:scale-105 active:scale-95 transition-all shadow-sm"
                    >
                      {c.name}
                    </span>
                  ))}
                  <span className="px-4 py-2 rounded-full text-sm font-extrabold bg-secondary/15 dark:bg-emerald-900/50 text-secondary dark:text-emerald-300 border border-secondary/30">
                    + E-Waste & Minyak
                  </span>
                </div>
              </div>

              <div className="pt-8">
                <Link
                  to="/pemilahan-pintar"
                  className="inline-flex items-center gap-2.5 text-base sm:text-lg font-bold text-secondary dark:text-emerald-400 hover:underline group-hover:translate-x-1.5 transition-transform"
                >
                  <span>Buka Direktori Material Lengkap</span>
                  <Icon name="arrow_forward" size={18} />
                </Link>
              </div>
            </motion.div>

            {/* 2. Interactive Calculator Mini-Widget (5 cols) */}
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ y: -8, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 rounded-3xl bg-surface-bright/95 dark:bg-[#0a271a]/95 p-8 sm:p-12 border border-outline-variant/30 dark:border-emerald-400/30 shadow-xl flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-secondary dark:text-emerald-400 block">
                  Simulasi Nilai Tukar
                </span>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-on-surface dark:text-white tracking-tight">
                  Estimasi Tabungan & Karbon
                </h3>
                <p className="text-sm sm:text-base text-on-surface-variant dark:text-emerald-100 font-normal leading-relaxed">
                  Pilih material dan geser berat untuk melihat perkiraan perolehan rupiah dan reduksi emisi.
                </p>
              </div>

              {/* Controls */}
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-extrabold text-outline dark:text-emerald-300 block mb-2 uppercase tracking-wider">
                    Kategori Sampah
                  </label>
                  <select
                    value={simCategory}
                    onChange={(e) => setSimCategory(e.target.value)}
                    className="w-full h-13 px-4 rounded-2xl bg-surface-container dark:bg-[#061e13] border border-outline-variant/30 text-base font-bold text-on-surface dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all cursor-pointer shadow-sm"
                  >
                    {WASTE_CATEGORIES.map(c => (
                      <option key={c.id} value={c.name} className="bg-surface text-on-surface">
                        {c.name} (Rp{c.pricePerKg.toLocaleString('id-ID')}/kg)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex justify-between text-sm sm:text-base font-extrabold mb-1.5">
                    <span className="text-outline dark:text-emerald-300">Estimasi Bobot:</span>
                    <span className="text-secondary dark:text-emerald-400">{simWeight.toFixed(1)} kg</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="50"
                    step="0.5"
                    value={simWeight}
                    onChange={(e) => setSimWeight(parseFloat(e.target.value))}
                    className="w-full accent-secondary cursor-pointer h-2.5 rounded-lg bg-surface-container"
                  />
                </div>

                {/* Result Card */}
                <div className="p-5 rounded-2xl bg-surface-container/90 dark:bg-[#061e13] border border-outline-variant/30 grid grid-cols-3 gap-3 text-center shadow-inner">
                  <div className="text-left">
                    <span className="text-xs text-outline dark:text-emerald-300 uppercase font-extrabold block">Estimasi Saldo</span>
                    <span className="font-display font-extrabold text-lg sm:text-2xl text-on-surface dark:text-white">
                      Rp{simValueIdr.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-outline dark:text-emerald-300 uppercase font-extrabold block">EcoPoints</span>
                    <span className="font-display font-extrabold text-lg sm:text-2xl text-secondary dark:text-emerald-400">
                      +{simPoints}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-outline dark:text-emerald-300 uppercase font-extrabold block">Reduksi Emisi</span>
                    <span className="font-display font-extrabold text-lg sm:text-2xl text-secondary dark:text-emerald-400">
                      ~{simCo2} kg
                    </span>
                  </div>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }}>
                <Link
                  to="/bank-sampah"
                  className="w-full h-14 rounded-2xl bg-primary dark:bg-emerald-500 text-on-primary dark:text-[#002113] text-base font-extrabold flex items-center justify-center gap-2 hover:bg-primary-container dark:hover:bg-emerald-400 transition-all shadow-md cursor-pointer"
                >
                  <span>Buka Bank Sampah Digital</span>
                  <Icon name="arrow_forward" size={18} />
                </Link>
              </motion.div>
            </motion.div>

            {/* 3. Analytics & Climate Science Portal (6 cols) */}
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ y: -8, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 rounded-3xl bg-surface-bright/95 dark:bg-[#0a271a]/95 p-8 sm:p-12 border border-outline-variant/30 dark:border-emerald-400/30 shadow-xl flex flex-col justify-between space-y-6 group cursor-pointer"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-secondary/15 dark:bg-emerald-900/40 text-secondary dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  <Icon name="analytics" size={28} />
                </div>
                <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-on-surface dark:text-white tracking-tight">
                  Pusat Analitik & Sains Emisi
                </h3>
                <p className="font-sans text-lg sm:text-xl text-on-surface-variant dark:text-emerald-100 font-normal leading-relaxed">
                  Laporan kuantitatif berkala berbasis metodologi EPA WARM v15. Analisis komposisi material terpilah, metrik pengalihan TPA, dan unduh dataset dalam format CSV atau JSON.
                </p>
              </div>

              <Link
                to="/analitik"
                className="inline-flex items-center gap-2.5 text-base sm:text-lg font-bold text-secondary dark:text-emerald-400 hover:underline group-hover:translate-x-1.5 transition-transform"
              >
                <span>Eksplorasi Dasbor Analitik & Ekspor Data</span>
                <Icon name="arrow_forward" size={18} />
              </Link>
            </motion.div>

            {/* 4. Eco Academy & Challenges Portal (6 cols) */}
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ y: -8, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 rounded-3xl bg-surface-bright/95 dark:bg-[#0a271a]/95 p-8 sm:p-12 border border-outline-variant/30 dark:border-emerald-400/30 shadow-xl flex flex-col justify-between space-y-6 group cursor-pointer"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-secondary/15 dark:bg-emerald-900/40 text-secondary dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  <Icon name="trophy" size={28} />
                </div>
                <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-on-surface dark:text-white tracking-tight">
                  Akademi Sirkular & Tantangan
                </h3>
                <p className="font-sans text-lg sm:text-xl text-on-surface-variant dark:text-emerald-100 font-normal leading-relaxed">
                  Tingkatkan literasi gaya hidup minim sampah, klarifikasi mitos vs fakta daur ulang, dan ikuti misi keberlanjutan mingguan untuk membuka lencana penghargaan komunitas.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-5">
                <Link
                  to="/akademi"
                  className="text-base sm:text-lg font-bold text-secondary dark:text-emerald-400 hover:underline"
                >
                  Buka Modul Akademi →
                </Link>
                <span className="text-outline dark:text-emerald-400/50 font-bold">•</span>
                <Link
                  to="/tantangan"
                  className="text-base sm:text-lg font-bold text-secondary dark:text-emerald-400 hover:underline"
                >
                  Lihat Tantangan Komunitas →
                </Link>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 4. COMMUNITY COMMITMENT & ECO PLEDGE */}
      <section className="w-full py-28 sm:py-36 transition-colors duration-300 relative">
        <div className="max-w-[1080px] mx-auto px-6 sm:px-8 text-center space-y-10">
          
          <motion.div 
            whileInView={{ scale: [0.9, 1.05, 1], opacity: [0, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 mx-auto rounded-3xl bg-secondary/15 dark:bg-emerald-900/40 text-secondary dark:text-emerald-400 flex items-center justify-center shadow-inner"
          >
            <Icon name="sparkles" size={38} />
          </motion.div>

          <div className="space-y-5 max-w-3xl mx-auto">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-on-surface dark:text-white tracking-tight">
              Ikrar Gaya Hidup Minim Sampah
            </h2>
            <p className="font-sans text-xl sm:text-3xl text-on-surface-variant dark:text-emerald-100 font-normal italic leading-relaxed">
              "Saya berkomitmen untuk memilah material bernilai di rumah, mengurangi plastik sekali pakai, dan berkontribusi nyata pada ekonomi sirkular lokal."
            </p>
          </div>

          <div className="pt-3">
            <motion.button
              type="button"
              onClick={signEcoPledge}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className={`h-16 px-10 rounded-2xl font-display font-extrabold text-base sm:text-lg transition-all shadow-xl cursor-pointer ${
                hasPledged
                  ? 'bg-secondary/20 dark:bg-emerald-900/50 text-secondary dark:text-emerald-300 border-2 border-secondary/40'
                  : 'bg-secondary text-white hover:bg-secondary/90 shadow-[0_12px_32px_rgba(0,122,82,0.35)]'
              }`}
            >
              {hasPledged ? '✓ Anda Telah Menandatangani Ikrar' : 'Tandatangani Ikrar Sekarang'}
            </motion.button>
          </div>

          <p className="text-sm sm:text-base text-outline dark:text-emerald-300 font-semibold">
            Bergabung bersama <strong className="text-secondary dark:text-emerald-400 font-extrabold">{ecoPledgesCount}</strong> warga yang telah mengambil langkah nyata.
          </p>

        </div>

        {/* Apple-style Soft Gradient Section Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500/25 dark:via-emerald-400/20 to-transparent pointer-events-none mt-28" />
      </section>

      {/* 5. FAQ CURATED PREVIEW — INTERACTIVE ACCORDION & HIGH CONTRAST */}
      <section className="w-full py-28 sm:py-36 bg-surface-container-low/40 transition-colors duration-300">
        <div className="max-w-[1080px] mx-auto px-6 sm:px-8 space-y-12">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 relative">
            <div>
              <span className="text-sm font-extrabold uppercase tracking-widest text-secondary dark:text-emerald-400 block">
                Pusat Jawaban
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-on-surface dark:text-white tracking-tight mt-1">
                Pertanyaan Umum
              </h2>
            </div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}>
              <Link
                to="/faq"
                className="px-5 py-2.5 rounded-2xl bg-secondary/10 dark:bg-emerald-900/40 text-sm sm:text-base font-extrabold text-secondary dark:text-emerald-300 hover:bg-secondary/20 flex items-center gap-2 shrink-0 transition-all"
              >
                <span>Lihat Seluruh 16 Pertanyaan di FAQ</span>
                <Icon name="arrow_forward" size={16} />
              </Link>
            </motion.div>
          </div>

          {/* Apple-style Soft Gradient Section Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500/25 dark:via-emerald-400/20 to-transparent pointer-events-none" />

          {/* 3 Interactive Accordion FAQs with High Contrast */}
          <div className="space-y-5">
            {FAQ_ITEMS.map((faq, idx) => {
              const isOpen = expandedFaqIndex === idx;

              return (
                <motion.div
                  key={faq.id}
                  whileHover={{ y: -4, scale: 1.006 }}
                  whileTap={{ scale: 0.985 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setExpandedFaqIndex(isOpen ? null : idx)}
                  className={`p-6 sm:p-8 rounded-3xl transition-all duration-300 border cursor-pointer ${
                    isOpen
                      ? 'bg-surface-bright dark:bg-[#0a271a] border-secondary/50 dark:border-emerald-400/50 shadow-2xl ring-2 ring-secondary/20'
                      : 'bg-surface-bright/80 dark:bg-[#071d13]/80 border-outline-variant/30 dark:border-emerald-400/20 hover:border-secondary/40 hover:bg-surface-bright shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-secondary/15 dark:bg-emerald-900/50 text-secondary dark:text-emerald-300 border border-secondary/25">
                          {faq.category}
                        </span>
                        <span className="text-xs text-outline dark:text-emerald-300/80 font-bold">
                          {faq.badge}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-xl sm:text-2xl text-on-surface dark:text-white tracking-tight leading-snug">
                        {faq.question}
                      </h3>
                    </div>

                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-colors shadow-sm ${
                        isOpen 
                          ? 'bg-secondary text-white' 
                          : 'bg-surface-container dark:bg-emerald-950/60 text-secondary dark:text-emerald-300'
                      }`}
                    >
                      <Icon name="arrow_drop_down" size={24} />
                    </motion.div>
                  </div>

                  {/* Open/Close Animated Transition */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-base sm:text-lg text-on-surface-variant dark:text-emerald-100 font-normal leading-relaxed pt-4 border-t border-outline-variant/20 dark:border-emerald-400/20">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. APPLE-STYLE CLOSING CALL TO ACTION */}
      <section className="w-full py-32 sm:py-40 bg-[#02140d] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,122,82,0.35),transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 space-y-10">
          <span className="text-sm font-extrabold uppercase tracking-[0.25em] text-[#cbf075] block">
            Langkah Nyata Hari Ini
          </span>

          <h2 className="font-display font-extrabold text-4xl sm:text-6xl tracking-tight leading-tight">
            Mulai Perjalanan Sirkular Anda Bersama ECOCYCLE
          </h2>

          <p className="font-sans text-xl sm:text-2xl text-white/90 font-normal leading-relaxed max-w-2xl mx-auto">
            Daftarkan diri Anda untuk mulai mencatat setoran material, memantau dampak lingkungan, dan membangun masa depan bebas residu.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5">
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
              <Link
                to="/daftar"
                className="w-full sm:w-auto h-16 px-10 rounded-2xl bg-[#cbf075] text-[#052115] font-display font-extrabold text-base uppercase tracking-wider hover:bg-[#bce462] transition-all flex items-center justify-center shadow-2xl cursor-pointer"
              >
                Daftar Akun Baru
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
              <Link
                to="/panduan"
                className="w-full sm:w-auto h-16 px-10 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 text-white font-display font-bold text-base uppercase tracking-wider hover:bg-white/25 transition-all flex items-center justify-center cursor-pointer shadow-lg"
              >
                Tonton Panduan Penggunaan
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

    </PageTransition>
  );
};
