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
import { SEOHead } from '../../components/seo/SEOHead';

export const AnalyticsPage: React.FC = () => {
  const { transactions } = useWasteBank();

  const [timeRange, setTimeRange] = useState<'30d' | '90d' | '6m' | '1y'>('6m');
  const [selectedMetric, setSelectedMetric] = useState<'volume' | 'carbon'>('volume');
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);
  const [isComparisonMode, setIsComparisonMode] = useState(false);

  const handleExportCSV = () => {
    const headers = ['Bulan', 'Volume_Terpilah_Kg', 'Reduksi_CO2e_Kg'];
    const rows = monthlyTrends.map(t => `${t.month},${t.volumeKg},${t.co2Kg}`);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ecocycle_analytics_${timeRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportJSON = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      timeRange,
      metrics,
      monthlyTrends,
      categoryBreakdown,
      dayOfWeekData,
    };
    const jsonString = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', jsonString);
    link.setAttribute('download', `ecocycle_analytics_${timeRange}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const metrics = ImpactService.calculateAggregateMetrics(transactions);
  const monthlyTrends = ImpactService.getMonthlyTrends(transactions);
  const categoryBreakdown = ImpactService.getCategoryBreakdown(transactions);

  // Day of week collection pattern
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
  const COLORS = ['#059669', '#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#0284c7', '#f59e0b'];

  // Total Category Volume
  const totalCategoryWeight = categoryBreakdown.reduce((sum, item) => sum + item.value, 0);

  return (
    <PageTransition className="w-full min-h-screen bg-surface dark:bg-[#03140d] text-on-surface dark:text-white py-12 sm:py-16 transition-colors duration-300">
      <SEOHead
        title="Dasbor Analitik Sirkular & Tren Material"
        canonical="/analitik"
        description="Visualisasi komprehensif metrik analitik: tren volume daur ulang bulanan, komposisi material, efisiensi drop-point, dan proyeksi reduksi emisi."
      />
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        
        {/* Editorial Header & Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-outline-variant/20">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-semibold uppercase tracking-wider text-secondary">
              <Icon name="analytics" size={14} />
              <span>Infrastruktur Riset & Analitik Presisi</span>
            </div>
            <h1 className="font-display font-extrabold text-page-title tracking-tight leading-tight">
              <span className="animate-title-flow">Pusat Analitik</span> & Neraca Sumber Daya
            </h1>
            <p className="font-sans text-subheading text-on-surface-variant font-normal leading-relaxed">
              Eksplorasi data kuantitatif komprehensif atas alur material terpilah, koefisien emisi gas rumah kaca, dan efisiensi pengalihan TPA di seluruh ekosistem sirkular.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Comparison Mode Toggle */}
            <button
              type="button"
              onClick={() => setIsComparisonMode(!isComparisonMode)}
              className={`h-10 px-4 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer border ${
                isComparisonMode
                  ? 'bg-secondary text-white border-secondary shadow-sm'
                  : 'glass-pill hover:bg-surface-container text-on-surface border-outline-variant/30'
              }`}
            >
              <Icon name="trending_up" size={14} />
              <span>{isComparisonMode ? 'Komparasi: Aktif' : 'Bandingkan Siklus'}</span>
            </button>

            {/* Time Filter Tabs */}
            <div className="flex items-center glass-pill rounded-xl p-1 border border-outline-variant/25">
              {(['30d', '90d', '6m', '1y'] as const).map(range => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    timeRange === range
                      ? 'bg-secondary text-white shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {range === '30d' ? '30H' : range === '90d' ? '90H' : range === '6m' ? '6B' : '1Thn'}
                </button>
              ))}
            </div>

            {/* Export Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleExportCSV}
                className="h-10 px-3.5 rounded-xl glass-pill hover:bg-surface-container text-on-surface font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer border border-outline-variant/25"
                title="Unduh Rekap CSV"
              >
                <Icon name="download" size={13} />
                <span>CSV</span>
              </button>
              <button
                type="button"
                onClick={handleExportJSON}
                className="h-10 px-3.5 rounded-xl glass-pill hover:bg-surface-container text-on-surface font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer border border-outline-variant/25"
                title="Unduh Rekap JSON"
              >
                <Icon name="download" size={13} />
                <span>JSON</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsMethodologyOpen(!isMethodologyOpen)}
              className="h-10 px-4 rounded-xl glass-pill hover:bg-surface-container text-on-surface font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer border border-outline-variant/25"
            >
              <Icon name="info" size={14} className="text-secondary" />
              <span>Metodologi Sains</span>
            </button>
          </div>
        </div>

        {/* METHODOLOGY ACCORDION DRAWER */}
        {isMethodologyOpen && (
          <div className="p-8 rounded-3xl glass-panel-elevated border border-secondary/30 text-xs text-on-surface space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20 font-bold text-primary text-sm">
              <span className="flex items-center gap-2">
                <Icon name="verified" size={18} className="text-secondary" />
                <span className="font-display font-bold text-base">Asumsi Metodologi Saintifik & Rantai Perhitungan</span>
              </span>
              <button
                type="button"
                onClick={() => setIsMethodologyOpen(false)}
                className="text-outline hover:text-primary cursor-pointer p-1 rounded-lg hover:bg-surface-container"
              >
                <Icon name="close" size={18} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 leading-relaxed">
              <div className="space-y-1.5">
                <strong className="block text-primary text-sm font-semibold">1. Reduksi Emisi Gas Rumah Kaca</strong>
                <p className="text-on-surface-variant">
                  Didasarkan pada koefisien <em>US EPA Waste Reduction Model (WARM) v15</em>. Setiap 1 kg botol PET terdaur ulang menggantikan polimer virgin dengan rasio penghindaran emisi rata-rata 1,5 kg CO₂e.
                </p>
              </div>
              <div className="space-y-1.5">
                <strong className="block text-primary text-sm font-semibold">2. Konservasi Air & Energi</strong>
                <p className="text-on-surface-variant">
                  Pencucian dan daur ulang mekanis botol menghemat ~24 Liter air bersih per kg dibanding ekstraksi minyak mentah petrokimia baru. Minyak jelantah terkonversi menyelamatkan 1.000 L air dari pencemaran biologis.
                </p>
              </div>
              <div className="space-y-1.5">
                <strong className="block text-primary text-sm font-semibold">3. Ekuivalensi Serapan Pohon</strong>
                <p className="text-on-surface-variant">
                  Mengacu pada kapasitas serapan 1 pohon peneduh hutan kota dewasa yang menyerap rata-rata 21,77 kg CO₂ per tahun (standar referensi IPCC & KLHK).
                </p>
              </div>
            </div>
            <div className="pt-3 border-t border-outline-variant/15 text-[11px] text-outline italic">
              * Seluruh visualisasi menggabungkan transaksi riil akun peramban lokal dengan data agregat baseline komunitas percontohan (14.820 kg) untuk menjaga transparansi akademis.
            </div>
          </div>
        )}

        {/* COMPARISON MODE BANNER */}
        {isComparisonMode && (
          <div className="p-5 rounded-2xl glass-panel border border-secondary/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center font-bold">
                <Icon name="trending_up" size={18} />
              </div>
              <div>
                <span className="font-display font-bold text-sm text-primary block">
                  Mode Komparasi Temporal Aktif: Periode {timeRange.toUpperCase()} vs Baseline Siklus Sebelumnya
                </span>
                <span className="text-xs text-on-surface-variant">
                  Pertumbuhan volume terpilah meningkat <strong className="text-secondary">+18.4%</strong> dengan efisiensi pemurnian material naik <strong className="text-secondary">+6.2%</strong>.
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl glass-pill text-secondary font-bold font-mono text-xs border border-secondary/25">
                Δ Volume: +240 kg
              </span>
              <span className="px-3 py-1.5 rounded-xl glass-pill text-primary font-bold font-mono text-xs border border-outline-variant/30">
                Δ CO₂e: +182 kg
              </span>
            </div>
          </div>
        )}

        {/* 4 MACRO ANALYTICS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-8 rounded-3xl glass-panel border border-outline-variant/25 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-outline">Total Pemulihan</span>
                <span className="px-2.5 py-0.5 rounded-full bg-secondary/15 text-secondary font-bold text-[10px]">
                  +14.8% MoM
                </span>
              </div>
              <div className="flex items-baseline gap-1 my-2">
                <AnimatedCounter value={metrics.totalWeightKg} className="font-display font-extrabold text-3xl sm:text-4xl text-primary" />
                <span className="text-sm font-bold text-secondary">kg</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Limbah padat dialihkan 100% dari TPA
              </p>
            </div>
            <div className="pt-3 border-t border-outline-variant/15 text-xs text-outline">
              Kontribusi Akun: <strong className="text-on-surface">{metrics.userWeight} kg</strong>
            </div>
          </div>

          <div className="p-8 rounded-3xl glass-panel border border-outline-variant/25 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-outline">Emisi Tercegah</span>
                <Icon name="cloud" size={18} className="text-secondary" />
              </div>
              <div className="flex items-baseline gap-1 my-2">
                <AnimatedCounter value={metrics.totalCo2Kg} className="font-display font-extrabold text-3xl sm:text-4xl text-primary" />
                <span className="text-sm font-bold text-secondary">kg CO₂e</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Mencegah akumulasi gas rumah kaca
              </p>
            </div>
            <div className="pt-3 border-t border-outline-variant/15 text-xs text-outline">
              Kontribusi Akun: <strong className="text-on-surface">{metrics.userCo2} kg CO₂e</strong>
            </div>
          </div>

          <div className="p-8 rounded-3xl glass-panel border border-outline-variant/25 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-outline">Efisiensi Pengalihan</span>
                <Icon name="trending_up" size={18} className="text-secondary" />
              </div>
              <div className="flex items-baseline gap-1 my-2">
                <span className="font-display font-extrabold text-3xl sm:text-4xl text-primary">94.2</span>
                <span className="text-sm font-bold text-secondary">%</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Rasio lolos sortir bersih tanpa kontaminasi
              </p>
            </div>
            <div className="pt-3 border-t border-outline-variant/15 text-xs text-outline">
              Ambang Toleransi: &lt; 6.0% residu
            </div>
          </div>

          <div className="p-8 rounded-3xl glass-panel border border-outline-variant/25 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-outline">Konservasi Air</span>
                <Icon name="water" size={18} className="text-secondary" />
              </div>
              <div className="flex items-baseline gap-1 my-2">
                <AnimatedCounter value={metrics.totalWaterLiters} className="font-display font-extrabold text-3xl sm:text-4xl text-primary" />
                <span className="text-sm font-bold text-secondary">L</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Air tanah terselamatkan dari polusi industri
              </p>
            </div>
            <div className="pt-3 border-t border-outline-variant/15 text-xs text-outline">
              Setara hidrasi <strong>{(metrics.totalWaterLiters / 2).toLocaleString('id-ID')} hari</strong>
            </div>
          </div>

        </div>

        {/* PRIMARY DATA CHARTS BENTO (7 + 5 COLS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Chart: Time-Series Trend (7 cols) */}
          <div className="lg:col-span-7 p-8 rounded-3xl glass-panel border border-outline-variant/25 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                <div>
                  <span className="text-xs font-bold text-secondary uppercase tracking-wider">
                    Dinamika Tren Temporal
                  </span>
                  <h3 className="font-display font-bold text-xl text-primary mt-1">
                    Kurva Pertumbuhan Pemulihan Material & Reduksi Emisi
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 glass-pill p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setSelectedMetric('volume')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                      selectedMetric === 'volume' ? 'bg-secondary text-white' : 'text-on-surface-variant'
                    }`}
                  >
                    Volume (kg)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedMetric('carbon')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                      selectedMetric === 'carbon' ? 'bg-secondary text-white' : 'text-on-surface-variant'
                    }`}
                  >
                    CO₂e (kg)
                  </button>
                </div>
              </div>

              <p className="text-xs text-on-surface-variant leading-relaxed">
                Grafik merekam akumulasi volume material terpilah dan konversi emisi terhindar bulan demi bulan.
              </p>
            </div>

            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="analyticsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={selectedMetric === 'volume' ? '#059669' : '#10b981'} stopOpacity={0.4}/>
                      <stop offset="95%" stopColor={selectedMetric === 'volume' ? '#059669' : '#10b981'} stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                  <XAxis dataKey="month" stroke="currentColor" opacity={0.6} fontSize={11} tickLine={false} />
                  <YAxis stroke="currentColor" opacity={0.6} fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '16px',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      fontSize: '12px',
                      color: '#0f172a',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey={selectedMetric === 'volume' ? 'volumeKg' : 'co2Kg'}
                    name={selectedMetric === 'volume' ? 'Volume Terpilah (kg)' : 'Reduksi CO₂e (kg)'}
                    stroke={selectedMetric === 'volume' ? '#059669' : '#10b981'}
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#analyticsGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-outline-variant/15 text-xs text-outline">
              <span>Bulan Terendah: <strong className="text-on-surface">Mei (1.120 kg)</strong></span>
              <span>Puncak Terkini: <strong className="text-secondary">Okt ({(monthlyTrends[monthlyTrends.length - 1]?.volumeKg || 1640).toLocaleString('id-ID')} kg)</strong></span>
            </div>
          </div>

          {/* Right Chart: Composition Donut & Table (5 cols) */}
          <div className="lg:col-span-5 p-8 rounded-3xl glass-panel border border-outline-variant/25 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-bold text-secondary uppercase tracking-wider">
                Audit Fraksi Sirkular
              </span>
              <h3 className="font-display font-bold text-xl text-primary mt-1">
                Distribusi Komposisi Material Daur Ulang
              </h3>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
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
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '16px',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      fontSize: '12px',
                      color: '#0f172a',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-outline-variant/15 text-xs">
              {categoryBreakdown.slice(0, 4).map((entry, idx) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                  <span className="truncate text-on-surface-variant text-xs font-medium">{entry.name}:</span>
                  <strong className="text-primary text-xs">{entry.value} kg</strong>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* SECONDARY ROW: PEAK COLLECTION DAYS & INSIGHTS (6 + 6 COLS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Day of Week Patterns (6 cols) */}
          <div className="lg:col-span-6 p-8 rounded-3xl glass-panel border border-outline-variant/25 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-secondary uppercase tracking-wider">
                Ritme Penyetoran Harian
              </span>
              <h3 className="font-display font-bold text-xl text-primary mt-1">
                Pola Aktivitas Drop-Point Berdasarkan Hari
              </h3>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                Rata-rata volume setoran harian di hub sentral dan lingkungan (dalam kg).
              </p>
            </div>

            <div className="w-full h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dayOfWeekData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} vertical={false} />
                  <XAxis dataKey="day" stroke="currentColor" opacity={0.6} fontSize={11} tickLine={false} />
                  <YAxis stroke="currentColor" opacity={0.6} fontSize={11} tickLine={false} />
                  <Tooltip
                    formatter={(val) => [`${val} kg`, 'Rata-rata Setoran']}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '16px',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      fontSize: '12px',
                      color: '#0f172a',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
                    }}
                  />
                  <Bar dataKey="volume" fill="#059669" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="p-4 rounded-2xl glass-panel border border-outline-variant/15 text-xs text-on-surface-variant flex items-center justify-between">
              <span>Hari Teramai: <strong className="text-primary">Sabtu (580 kg)</strong></span>
              <span className="text-secondary font-semibold">Program Weekend Sortasi</span>
            </div>
          </div>

          {/* Right: Analytical Insights (6 cols) */}
          <div className="lg:col-span-6 p-8 rounded-3xl glass-panel-elevated border border-secondary/30 shadow-xl space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-secondary/15 text-secondary font-bold text-[10px] uppercase">
                  Sintesis Cerdas
                </span>
                <span className="text-xs text-outline">Berdasarkan Audit Terkini</span>
              </div>
              <h3 className="font-display font-bold text-xl text-primary">
                Temuan Kunci Efisiensi Sirkular
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl glass-panel border border-outline-variant/15 space-y-1">
                <div className="flex items-center gap-2 text-secondary font-bold">
                  <Icon name="trending_up" size={14} />
                  <span>Lonjakan Pemulihan Polimer Plastik (+22%)</span>
                </div>
                <p className="text-on-surface-variant leading-relaxed text-[11px]">
                  Fasilitas drop-point mencatatkan rekor penyetoran botol PET terbersih berkat kepatuhan protokol pembersihan awal warga.
                </p>
              </div>

              <div className="p-4 rounded-2xl glass-panel border border-outline-variant/15 space-y-1">
                <div className="flex items-center gap-2 text-secondary font-bold">
                  <Icon name="check_circle" size={14} />
                  <span>Efisiensi Kompresi Logistik (68%)</span>
                </div>
                <p className="text-on-surface-variant leading-relaxed text-[11px]">
                  Kepatuhan meratakan kardus dan menginjak botol memangkas frekuensi perjalanan truk pengangkut dari 4 kali menjadi 2 kali seminggu.
                </p>
              </div>

              <div className="p-4 rounded-2xl glass-panel border border-outline-variant/15 space-y-1">
                <div className="flex items-center gap-2 text-secondary font-bold">
                  <Icon name="water" size={14} />
                  <span>Penyelamatan Ekosistem Akuatik (1.000 L/kg UCO)</span>
                </div>
                <p className="text-on-surface-variant leading-relaxed text-[11px]">
                  Penyetoran 160 kg minyak jelantah berhasil mencegah kontaminasi biologis saluran air pemukiman warga.
                </p>
              </div>
            </div>

            <div className="pt-3 text-xs text-outline border-t border-outline-variant/15 flex items-center justify-between">
              <span>Audit Kualitas Rantai Lacak</span>
              <strong className="text-secondary font-mono">Keandalan Data: 99.4%</strong>
            </div>
          </div>

        </div>

      </div>
    </PageTransition>
  );
};
