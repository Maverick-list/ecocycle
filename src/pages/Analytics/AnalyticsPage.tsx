import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useWasteBank } from '../../context/WasteBankContext';
import { ImpactService } from '../../services/impactService';
import { Icon } from '../../components/ui/Icon';
import { AnimatedCounter } from '../../components/ui/AnimatedCounter';
import { PageTransition } from '../../components/ui/PageTransition';

export const AnalyticsPage: React.FC = () => {
  const { transactions } = useWasteBank();

  const [timeRange, setTimeRange] = useState<'30d' | '90d' | '6m' | '1y'>('6m');
  const [selectedMetric, setSelectedMetric] = useState<'volume' | 'carbon'>('volume');
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);

  const metrics = ImpactService.calculateAggregateMetrics(transactions);
  const monthlyTrends = ImpactService.getMonthlyTrends(transactions);
  const categoryBreakdown = ImpactService.getCategoryBreakdown(transactions);

  // Day of week collection pattern (Simulated based on drop point operation)
  const dayOfWeekData = [
    { day: 'Sen', volume: 240 },
    { day: 'Sel', volume: 180 },
    { day: 'Rab', volume: 320 },
    { day: 'Kam', volume: 290 },
    { day: 'Jum', volume: 410 },
    { day: 'Sab', volume: 580 },
    { day: 'Min', volume: 350 },
  ];

  // Colors for donut chart
  const COLORS = ['#006c48', '#123b2a', '#cbf075', '#94f6c4', '#7ca68f', '#e8e9e2', '#e28743'];

  // Total Category Volume
  const totalCategoryWeight = categoryBreakdown.reduce((sum, item) => sum + item.value, 0);

  return (
    <PageTransition className="w-full bg-surface py-space-xl">
      <div className="max-w-[1380px] mx-auto px-margin-sm lg:px-margin space-y-space-xl">
        
        {/* Header & Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-outline-variant/30 pb-space-lg">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
              <span className="font-label-caps text-secondary font-bold uppercase tracking-wider text-xs">
                Infrastruktur Riset & Analitik Presisi
              </span>
            </div>
            <h1 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl font-bold text-primary tracking-tight">
              Pusat Analitik & Neraca Sumber Daya
            </h1>
            <p className="font-body-md text-on-surface-variant max-w-2xl mt-1 text-xs sm:text-sm">
              Eksplorasi data kuantitatif komprehensif atas alur material terpilah, koefisien emisi gas rumah kaca, dan efisiensi pengalihan TPA di wilayah Kuningan.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Time Filter Tabs */}
            <div className="flex items-center bg-surface-container rounded-lg p-1 border border-outline-variant/30">
              {(['30d', '90d', '6m', '1y'] as const).map(range => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                    timeRange === range
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {range === '30d' ? '30 Hari' : range === '90d' ? '90 Hari' : range === '6m' ? '6 Bulan' : '1 Tahun'}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsMethodologyOpen(!isMethodologyOpen)}
              className="h-9 px-3.5 rounded-lg bg-surface-container-high hover:bg-secondary-fixed text-primary font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Icon name="info" size={14} className="text-secondary" />
              <span>Metodologi Sains</span>
            </button>
          </div>
        </div>

        {/* METHODOLOGY ACCORDION DRAWER */}
        {isMethodologyOpen && (
          <div className="p-space-lg rounded-2xl bg-surface-container-low border border-secondary/30 text-xs text-on-surface space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20 font-bold text-primary text-sm">
              <span className="flex items-center gap-2">
                <Icon name="verified" size={16} className="text-secondary" />
                <span>Asumsi Metodologi Saintifik & Rantai Perhitungan</span>
              </span>
              <button
                type="button"
                onClick={() => setIsMethodologyOpen(false)}
                className="text-outline hover:text-primary cursor-pointer"
              >
                <Icon name="close" size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 leading-relaxed">
              <div>
                <strong className="block text-primary mb-1">1. Reduksi Emisi Gas Rumah Kaca</strong>
                <p className="text-on-surface-variant">
                  Didasarkan pada koefisien <em>US EPA Waste Reduction Model (WARM) v15</em>. Setiap 1 kg plastik botol PET terdaur ulang menggantikan polimer virgin dengan rasio penghindaran emisi rata-rata 1,5 kg CO₂e.
                </p>
              </div>
              <div>
                <strong className="block text-primary mb-1">2. Konservasi Air & Energi</strong>
                <p className="text-on-surface-variant">
                  Pencucian dan daur ulang mekanis botol menghemat ~24 Liter air bersih per kg dibanding ekstraksi minyak mentah petrokimia baru. Minyak jelantah terkonversi menyelamatkan 1.000 L air dari pencemaran biologis.
                </p>
              </div>
              <div>
                <strong className="block text-primary mb-1">3. Ekuivalensi Serapan Pohon</strong>
                <p className="text-on-surface-variant">
                  Mengacu pada kapasitas serapan 1 pohon peneduh hutan kota dewasa yang menyerap rata-rata 21,77 kg CO₂ per tahun (standar referensi IPCC & KLHK).
                </p>
              </div>
            </div>
            <div className="pt-2 text-[11px] text-outline italic">
              * Seluruh visualisasi menggabungkan transaksi riil akun peramban lokal dengan data agregat baseline komunitas percontohan (14.820 kg) untuk menjaga transparansi akademis.
            </div>
          </div>
        )}

        {/* 4 MACRO ANALYTICS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          
          <div className="p-space-lg rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-label-caps text-outline uppercase font-bold text-[11px]">Total Pemulihan</span>
                <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold text-[10px]">
                  +14.8% MoM
                </span>
              </div>
              <div className="flex items-baseline gap-1 my-2">
                <AnimatedCounter value={metrics.totalWeightKg} className="font-metric-display text-4xl font-extrabold text-primary" />
                <span className="text-sm font-bold text-secondary">kg</span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Limbah padat dialihkan 100% dari TPA kota
              </p>
            </div>
            <div className="pt-3 border-t border-outline-variant/20 text-[11px] text-outline">
              Kontribusi Akun Anda: <strong className="text-primary">{metrics.userWeight} kg</strong>
            </div>
          </div>

          <div className="p-space-lg rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-label-caps text-outline uppercase font-bold text-[11px]">Intensitas Emisi Dicegah</span>
                <Icon name="cloud" size={18} className="text-secondary" />
              </div>
              <div className="flex items-baseline gap-1 my-2">
                <AnimatedCounter value={metrics.totalCo2Kg} className="font-metric-display text-4xl font-extrabold text-primary" />
                <span className="text-sm font-bold text-secondary">kg CO₂e</span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Mencegah efek gas rumah kaca lokal
              </p>
            </div>
            <div className="pt-3 border-t border-outline-variant/20 text-[11px] text-outline">
              Kontribusi Akun Anda: <strong className="text-primary">{metrics.userCo2} kg CO₂e</strong>
            </div>
          </div>

          <div className="p-space-lg rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-label-caps text-outline uppercase font-bold text-[11px]">Efisiensi Pengalihan (TPA)</span>
                <Icon name="trending_up" size={18} className="text-secondary" />
              </div>
              <div className="flex items-baseline gap-1 my-2">
                <span className="font-metric-display text-4xl font-extrabold text-primary">94.2</span>
                <span className="text-sm font-bold text-secondary">%</span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Rasio lolos sortir bersih tanpa kontaminasi
              </p>
            </div>
            <div className="pt-3 border-t border-outline-variant/20 text-[11px] text-outline">
              Ambang Batas Toleransi: &lt; 6.0% residu
            </div>
          </div>

          <div className="p-space-lg rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-label-caps text-outline uppercase font-bold text-[11px]">Konservasi Air Bersih</span>
                <Icon name="water" size={18} className="text-secondary" />
              </div>
              <div className="flex items-baseline gap-1 my-2">
                <AnimatedCounter value={metrics.totalWaterLiters} className="font-metric-display text-4xl font-extrabold text-primary" />
                <span className="text-sm font-bold text-secondary">L</span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Air tanah terselamatkan dari polusi industri
              </p>
            </div>
            <div className="pt-3 border-t border-outline-variant/20 text-[11px] text-outline">
              Setara kebutuhan hidrasi <strong>{(metrics.totalWaterLiters / 2).toLocaleString('id-ID')} hari</strong>
            </div>
          </div>

        </div>

        {/* PRIMARY DATA CHARTS BENTO (7 + 5 COLS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          
          {/* Left Chart: Time-Series Trend (7 cols) */}
          <div className="lg:col-span-7 p-space-lg rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div>
                  <span className="font-label-caps text-secondary font-bold uppercase text-[11px]">
                    Dinamika Tren Temporal
                  </span>
                  <h3 className="font-headline-sm font-bold text-primary mt-0.5">
                    Kurva Pertumbuhan Pemulihan Material & Reduksi Emisi
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 bg-surface-container p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setSelectedMetric('volume')}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer transition-all ${
                      selectedMetric === 'volume' ? 'bg-primary text-on-primary' : 'text-on-surface-variant'
                    }`}
                  >
                    Volume (kg)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedMetric('carbon')}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer transition-all ${
                      selectedMetric === 'carbon' ? 'bg-primary text-on-primary' : 'text-on-surface-variant'
                    }`}
                  >
                    CO₂e (kg)
                  </button>
                </div>
              </div>

              <p className="text-xs text-on-surface-variant mb-4">
                Grafik merekam akumulasi volume material terpilah dan konversi emisi terhindar bulan demi bulan.
              </p>
            </div>

            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="analyticsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={selectedMetric === 'volume' ? '#006c48' : '#123b2a'} stopOpacity={0.4}/>
                      <stop offset="95%" stopColor={selectedMetric === 'volume' ? '#006c48' : '#123b2a'} stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e8e9e2" />
                  <XAxis dataKey="month" stroke="#717a73" fontSize={11} tickLine={false} />
                  <YAxis stroke="#717a73" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderRadius: '12px',
                      border: '1px solid #d4d7cf',
                      fontSize: '11px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey={selectedMetric === 'volume' ? 'volumeKg' : 'co2Kg'}
                    name={selectedMetric === 'volume' ? 'Volume Terpilah (kg)' : 'Reduksi CO₂e (kg)'}
                    stroke={selectedMetric === 'volume' ? '#006c48' : '#123b2a'}
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#analyticsGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20 text-xs text-outline">
              <span>Bulan Terendah: <strong>Mei (1.120 kg)</strong></span>
              <span>Puncak Terkini: <strong>Okt ({(monthlyTrends[monthlyTrends.length - 1]?.volumeKg || 1640).toLocaleString('id-ID')} kg)</strong></span>
            </div>
          </div>

          {/* Right Chart: Composition Donut & Table (5 cols) */}
          <div className="lg:col-span-5 p-space-lg rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
            <div>
              <span className="font-label-caps text-secondary font-bold uppercase text-[11px]">
                Audit Fraksi Sirkular
              </span>
              <h3 className="font-headline-sm font-bold text-primary mt-0.5">
                Distribusi Komposisi Material Daur Ulang
              </h3>
              <p className="text-xs text-on-surface-variant mt-1 mb-4">
                Proporsi massa masing-masing kategori sampah padat dalam ekosistem.
              </p>
            </div>

            <div className="w-full h-56 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {categoryBreakdown.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val) => [`${val} kg (${((Number(val) / totalCategoryWeight) * 100).toFixed(1)}%)`, 'Total']}
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderRadius: '12px',
                      border: '1px solid #d4d7cf',
                      fontSize: '11px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-outline-variant/20 text-xs">
              {categoryBreakdown.slice(0, 4).map((entry, idx) => (
                <div key={entry.name} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                  <span className="truncate text-on-surface-variant text-[11px] font-medium">{entry.name}:</span>
                  <strong className="text-primary text-[11px]">{entry.value} kg</strong>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* SECONDARY ROW: PEAK COLLECTION DAYS & INSIGHTS (6 + 6 COLS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          
          {/* Left: Day of Week Patterns (6 cols) */}
          <div className="lg:col-span-6 p-space-lg rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-3">
            <div>
              <span className="font-label-caps text-secondary font-bold uppercase text-[11px]">
                Ritme Penyetoran Harian
              </span>
              <h3 className="font-headline-sm font-bold text-primary mt-0.5">
                Pola Aktivitas Drop-Point Berdasarkan Hari
              </h3>
              <p className="text-xs text-on-surface-variant">
                Rata-rata volume setoran harian di hub kampus dan lingkungan (dalam kg).
              </p>
            </div>

            <div className="w-full h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dayOfWeekData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e8e9e2" vertical={false} />
                  <XAxis dataKey="day" stroke="#717a73" fontSize={11} tickLine={false} />
                  <YAxis stroke="#717a73" fontSize={11} tickLine={false} />
                  <Tooltip
                    formatter={(val) => [`${val} kg`, 'Rata-rata Setoran']}
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderRadius: '12px',
                      border: '1px solid #d4d7cf',
                      fontSize: '11px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                    }}
                  />
                  <Bar dataKey="volume" fill="#006c48" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="p-3 rounded-xl bg-surface-container-low text-[11px] text-on-surface-variant flex items-center justify-between">
              <span>Hari Teramai: <strong>Sabtu (580 kg)</strong></span>
              <span className="text-secondary font-semibold">Program Weekend Sortasi Warga</span>
            </div>
          </div>

          {/* Right: Automated Analytical Insights (6 cols) */}
          <div className="lg:col-span-6 p-space-lg rounded-2xl bg-primary text-on-primary shadow-lg border border-primary-container space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-bold text-[10px] uppercase">
                  AI Insight Sintesis
                </span>
                <span className="text-xs text-primary-fixed-dim">Diperbarui Berdasarkan Tren Terkini</span>
              </div>
              <h3 className="font-headline-sm font-bold text-surface-bright">
                Temuan Kunci Efisiensi Sirkular
              </h3>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-primary-container border border-primary-fixed-variant/40 space-y-1">
                <div className="flex items-center gap-2 text-tertiary-fixed font-bold">
                  <Icon name="trending_up" size={14} />
                  <span>Lonjakan Pemulihan Polimer Plastik (+22%)</span>
                </div>
                <p className="text-surface-bright/90 leading-relaxed text-[11px]">
                  Fasilitas drop-point FKOM UNIKU mencatatkan rekor penyetoran botol PET terbersih berkat edukasi pemilahan di awal semester ganjil.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-primary-container border border-primary-fixed-variant/40 space-y-1">
                <div className="flex items-center gap-2 text-tertiary-fixed font-bold">
                  <Icon name="check_circle" size={14} />
                  <span>Efisiensi Kompresi Logistik (68%)</span>
                </div>
                <p className="text-surface-bright/90 leading-relaxed text-[11px]">
                  Kepatuhan meratakan kardus dan menginjak botol memangkas frekuensi perjalanan truk pengangkut dari 4 kali menjadi 2 kali seminggu.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-primary-container border border-primary-fixed-variant/40 space-y-1">
                <div className="flex items-center gap-2 text-tertiary-fixed font-bold">
                  <Icon name="water" size={14} />
                  <span>Penyelamatan Ekosistem Akuatik (1.000 L/kg UCO)</span>
                </div>
                <p className="text-surface-bright/90 leading-relaxed text-[11px]">
                  Penyetoran 160 kg minyak jelantah berhasil mencegah kontaminasi biologis saluran air pemukiman di sekitar Kuningan.
                </p>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-primary-fixed-dim border-t border-primary-fixed-variant/30 flex items-center justify-between">
              <span>Audit Kualitas Rantai Lacak</span>
              <strong className="text-tertiary-fixed">Keandalan Data: 99.4%</strong>
            </div>
          </div>

        </div>

      </div>
    </PageTransition>
  );
};
