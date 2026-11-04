import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { useWasteBank } from '../../context/WasteBankContext';
import { ImpactService } from '../../services/impactService';
import { Icon } from '../../components/ui/Icon';
import { AnimatedCounter } from '../../components/ui/AnimatedCounter';
import { PageTransition } from '../../components/ui/PageTransition';
import { SEOHead } from '../../components/seo/SEOHead';

export const EcoImpactPage: React.FC = () => {
  const { transactions } = useWasteBank();

  // Aggregate metrics computed via service
  const metrics = ImpactService.calculateAggregateMetrics(transactions);
  const monthlyTrends = ImpactService.getMonthlyTrends(transactions);
  const categoryBreakdown = ImpactService.getCategoryBreakdown(transactions);

  // Scenario Simulator sliders
  const [dailyBottles, setDailyBottles] = useState<number>(3);
  const [weeklyCompostKg, setWeeklyCompostKg] = useState<number>(2);

  // Computed scenario outcomes
  const annualBottlesCount = dailyBottles * 365;
  const annualPlasticKg = parseFloat((annualBottlesCount * 0.03).toFixed(1));
  const annualPlasticCo2 = parseFloat((annualPlasticKg * 1.5).toFixed(1));

  const annualCompostKg = weeklyCompostKg * 52;
  const annualCompostCo2 = parseFloat((annualCompostKg * 0.8).toFixed(1));

  const totalScenarioCo2 = parseFloat((annualPlasticCo2 + annualCompostCo2).toFixed(1));
  const totalScenarioTrees = parseFloat((totalScenarioCo2 / 21.77).toFixed(1));
  const totalWaterSavedLiters = Math.round(annualPlasticKg * 24 + annualCompostKg * 8);

  return (
    <PageTransition className="w-full bg-surface text-on-surface py-16 sm:py-24">
      <SEOHead
        title="Neraca Dampak Ekologis & Audit Karbon Sains"
        canonical="/dampak-ekologis"
        description="Lacak metrik dampak lingkungan terverifikasi: reduksi emisi CO2, konservasi air bersih, energi terbarukan, dan sertifikat partisipasi sirkular."
      />
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        
        {/* Editorial Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-outline-variant/20">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-semibold uppercase tracking-wider text-secondary">
              <Icon name="auto_graph" size={14} />
              <span>Metodologi Ilmiah Terbuka</span>
            </div>
            <h1 className="font-display font-extrabold text-page-title text-primary tracking-tight leading-tight">
              Neraca Dampak Ekologis & Audit Material
            </h1>
            <p className="font-sans text-subheading text-on-surface-variant font-normal leading-relaxed">
              Kalkulasi saintifik berbasis EPA WARM dan SNI 19-3983 yang mengukur reduksi gas rumah kaca, konservasi air tawar, dan pengalihan sampah dari timbunan Tempat Pemrosesan Akhir (TPA).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/analitik"
              className="px-4 h-11 rounded-xl glass-pill hover:bg-surface-container text-on-surface font-sans text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <Icon name="bar_chart" size={15} className="text-secondary" />
              <span>Analitik Tren</span>
            </Link>
            <Link
              to="/bank-sampah"
              className="h-11 px-5 rounded-xl bg-secondary text-white font-sans text-xs font-bold hover:bg-secondary/90 transition-all shadow-md flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Icon name="add_circle" size={16} />
              <span>Buka Bank Sampah</span>
            </Link>
          </div>
        </div>

        {/* 4 Macro Key Metric Bento Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-8 rounded-3xl glass-panel border border-outline-variant/25 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-outline">Limbah Terdivergen</span>
              <div className="w-10 h-10 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center">
                <Icon name="recycle" size={20} />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <AnimatedCounter value={metrics.totalWeightKg} decimals={1} className="font-display font-extrabold text-3xl sm:text-4xl text-primary" />
                <span className="text-sm font-bold text-secondary">kg</span>
              </div>
              <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                Teralihkan 100% dari TPA (User: {metrics.userWeight} kg)
              </p>
            </div>
          </div>

          <div className="p-8 rounded-3xl glass-panel border border-outline-variant/25 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-outline">Reduksi Emisi GRK</span>
              <div className="w-10 h-10 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center">
                <Icon name="cloud_done" size={20} />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <AnimatedCounter value={metrics.totalCo2Kg} decimals={1} className="font-display font-extrabold text-3xl sm:text-4xl text-primary" />
                <span className="text-sm font-bold text-secondary">kg CO₂e</span>
              </div>
              <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                Pemanasan lokal dicegah (User: {metrics.userCo2} kg)
              </p>
            </div>
          </div>

          <div className="p-8 rounded-3xl glass-panel border border-outline-variant/25 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-outline">Ekuivalensi Pohon</span>
              <div className="w-10 h-10 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center">
                <Icon name="tree" size={20} />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <AnimatedCounter value={metrics.treeEquivalents} decimals={1} className="font-display font-extrabold text-3xl sm:text-4xl text-primary" />
                <span className="text-sm font-bold text-secondary">Pohon</span>
              </div>
              <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                Standar serapan EPA ~21.77 kg CO₂/thn
              </p>
            </div>
          </div>

          <div className="p-8 rounded-3xl glass-panel border border-outline-variant/25 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-outline">Konservasi Air</span>
              <div className="w-10 h-10 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center">
                <Icon name="water" size={20} />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <AnimatedCounter value={metrics.totalWaterLiters} className="font-display font-extrabold text-3xl sm:text-4xl text-primary" />
                <span className="text-sm font-bold text-secondary">Liter</span>
              </div>
              <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                Dibanding sintesis virgin polymer baru
              </p>
            </div>
          </div>

        </div>

        {/* Visual Analytics Bento (Interactive Recharts) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Monthly Trend Area Chart (7 cols) */}
          <div className="lg:col-span-7 p-8 rounded-3xl glass-panel border border-outline-variant/25 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-secondary uppercase tracking-wider">
                  Dinamika Pemulihan Material
                </span>
                <span className="text-xs text-outline font-medium">6 Bulan Terakhir</span>
              </div>
              <h3 className="font-display font-bold text-xl text-primary">
                Volume Sampah & Reduksi CO₂e Bulanan
              </h3>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                Pertumbuhan volume material terpilah dan efisiensi pengalihan dari Tempat Pemrosesan Akhir.
              </p>
            </div>

            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#059669" stopOpacity={0.0}/>
                    </linearGradient>
                    <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
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
                    dataKey="volumeKg" 
                    name="Volume Terpilah (kg)" 
                    stroke="#059669" 
                    strokeWidth={2.5}
                    fillOpacity={1} 
                    fill="url(#colorVolume)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="co2Kg" 
                    name="Reduksi CO₂e (kg)" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    fillOpacity={1} 
                    fill="url(#colorCo2)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-center gap-6 pt-4 border-t border-outline-variant/15 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-secondary inline-block" />
                <span className="text-on-surface font-medium">Volume Sampah (kg)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                <span className="text-on-surface font-medium">Reduksi CO₂e (kg)</span>
              </div>
            </div>
          </div>

          {/* Category Distribution Bar Chart (5 cols) */}
          <div className="lg:col-span-5 p-8 rounded-3xl glass-panel border border-outline-variant/25 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-secondary uppercase tracking-wider">
                  Audit Komposisi Fraksi
                </span>
                <span className="text-xs text-outline font-medium">Distribusi Saat Ini</span>
              </div>
              <h3 className="font-display font-bold text-xl text-primary">
                Proporsi Fraksi Material Sirkular
              </h3>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                Distribusi fraksi sampah terpilah yang telah disalurkan ke rantai daur ulang.
              </p>
            </div>

            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryBreakdown} layout="vertical" margin={{ top: 5, right: 20, left: 25, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} horizontal={false} />
                  <XAxis type="number" stroke="currentColor" opacity={0.6} fontSize={11} tickLine={false} />
                  <YAxis type="category" dataKey="name" stroke="currentColor" opacity={0.7} fontSize={11} tickLine={false} width={85} />
                  <Tooltip 
                    formatter={(val) => [`${val} kg`, 'Total Terkumpul']}
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      borderRadius: '16px', 
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      fontSize: '12px',
                      color: '#0f172a',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
                    }} 
                  />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                    {categoryBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="pt-4 border-t border-outline-variant/15 text-xs text-outline text-center">
              Material dominan saat ini: <strong className="text-on-surface">Plastik PET</strong> & <strong className="text-on-surface">Kardus</strong>
            </div>
          </div>

        </div>

        {/* Interactive Scenario Impact Calculator */}
        <div className="p-8 sm:p-12 rounded-3xl glass-panel-elevated border border-secondary/30 shadow-xl space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">
              Simulasi Rumah Tangga Mandiri
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-primary tracking-tight">
              Hitung Potensi Penghematan Ekologis Keluarga Anda
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Geser parameter di bawah untuk memproyeksikan kontribusi nyata jika rumah tangga Anda memilah sampah dan mengomposkan sisa dapur secara konsisten selama setahun penuh.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Sliders (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              {/* Slider 1 */}
              <div className="p-5 rounded-2xl glass-panel border border-outline-variant/20 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-primary">Botol Plastik Kemasan / Hari</span>
                  <span className="text-secondary text-sm font-extrabold tabular-nums">
                    {dailyBottles} botol/hari
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  step="1"
                  value={dailyBottles}
                  onChange={(e) => setDailyBottles(parseInt(e.target.value, 10))}
                  className="w-full accent-secondary cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-outline">
                  <span>0 botol</span>
                  <span>7 botol</span>
                  <span>15 botol/hari</span>
                </div>
              </div>

              {/* Slider 2 */}
              <div className="p-5 rounded-2xl glass-panel border border-outline-variant/20 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-primary">Sisa Dapur Terkompos / Minggu</span>
                  <span className="text-secondary text-sm font-extrabold tabular-nums">
                    {weeklyCompostKg} kg/minggu
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={weeklyCompostKg}
                  onChange={(e) => setWeeklyCompostKg(parseFloat(e.target.value))}
                  className="w-full accent-secondary cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-outline">
                  <span>0 kg</span>
                  <span>5 kg</span>
                  <span>10 kg/minggu</span>
                </div>
              </div>
            </div>

            {/* Projected Outputs Card (6 cols) */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl glass-panel border border-outline-variant/25 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-secondary block">
                Proyeksi Kontribusi Setahun Penuh (12 Bulan)
              </span>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl glass-panel border border-outline-variant/15">
                  <span className="text-[11px] text-outline block uppercase font-semibold">Reduksi Emisi</span>
                  <span className="font-display font-extrabold text-2xl text-primary mt-1 block">
                    {totalScenarioCo2} kg
                  </span>
                  <span className="text-[10px] text-on-surface-variant block mt-0.5">CO₂e dicegah ke atmosfer</span>
                </div>

                <div className="p-4 rounded-xl glass-panel border border-outline-variant/15">
                  <span className="text-[11px] text-outline block uppercase font-semibold">Setara Tanam</span>
                  <span className="font-display font-extrabold text-2xl text-secondary mt-1 block">
                    {totalScenarioTrees} Pohon
                  </span>
                  <span className="text-[10px] text-on-surface-variant block mt-0.5">Daya serap pohon dewasa</span>
                </div>

                <div className="p-4 rounded-xl glass-panel border border-outline-variant/15">
                  <span className="text-[11px] text-outline block uppercase font-semibold">Konservasi Air</span>
                  <span className="font-display font-extrabold text-2xl text-primary mt-1 block">
                    {totalWaterSavedLiters} L
                  </span>
                  <span className="text-[10px] text-on-surface-variant block mt-0.5">Terselamatkan di alam</span>
                </div>

                <div className="p-4 rounded-xl glass-panel border border-outline-variant/15">
                  <span className="text-[11px] text-outline block uppercase font-semibold">Sampah TPA</span>
                  <span className="font-display font-extrabold text-2xl text-secondary mt-1 block">
                    {(annualPlasticKg + annualCompostKg).toFixed(0)} kg
                  </span>
                  <span className="text-[10px] text-on-surface-variant block mt-0.5">Teralihkan dari timbunan</span>
                </div>
              </div>

              <div className="text-center pt-2">
                <span className="text-[11px] text-outline italic">
                  * Dihitung mengacu pada model EPA WARM (Waste Reduction Model) & standar teknis KLHK.
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Verification & Lifecycle Flow Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 border-t border-outline-variant/20">
          
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary block">
              Integritas & Auditabilitas
            </span>
            <h3 className="font-display font-bold text-2xl text-primary tracking-tight">
              Standar Tata Kelola SNI 19-3983 & Protokol Rantai Lacak Terbuka
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Seluruh data transaksi dan konversi massa material di platform ECOCYCLE didasarkan pada rantai lacak resmi (Chain of Custody). Kami menjamin tidak ada klaim reduksi karbon fiktif atau pencatatan ganda.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3.5 p-4 rounded-2xl glass-panel border border-outline-variant/20">
                <div className="w-9 h-9 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center shrink-0">
                  <Icon name="verified" size={20} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs text-primary">Timbangan Digital Terkalibrasi Legal</h4>
                  <p className="text-[11px] text-on-surface-variant">Penerimaan di hub diverifikasi sensor timbangan berizin metrologi legal.</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-4 rounded-2xl glass-panel border border-outline-variant/20">
                <div className="w-9 h-9 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center shrink-0">
                  <Icon name="description" size={20} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs text-primary">Manifest Pengangkutan Terverifikasi</h4>
                  <p className="text-[11px] text-on-surface-variant">Perpindahan material dari bank sampah ke pabrik daur ulang dilengkapi surat jalan digital.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-3xl overflow-hidden glass-panel border border-outline-variant/25 p-4 shadow-xl">
            <img
              src="/assets/images/drop_point.jpg"
              alt="Community modern sorting facility"
              className="w-full h-80 object-cover rounded-2xl"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

        </div>

      </div>
    </PageTransition>
  );
};
