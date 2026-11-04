import React, { useState } from 'react';
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
    <div className="w-full bg-surface py-space-xl">
      <div className="max-w-[1380px] mx-auto px-margin-sm lg:px-margin space-y-space-xl">
        
        {/* Header */}
        <div className="border-b border-outline-variant/30 pb-space-lg">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
            <span className="font-label-caps text-secondary font-bold uppercase tracking-wider">
              Ecological Impact & Audit Dashboard
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl font-bold text-primary tracking-tight">
            Neraca Dampak Ekologis & Audit Material
          </h1>
          <p className="font-body-md text-on-surface-variant max-w-2xl mt-1">
            Perhitungan kuantitatif saintifik atas reduksi emisi gas rumah kaca, konservasi air, dan pengalihan material dari Tempat Pemrosesan Akhir (TPA).
          </p>
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-md bg-secondary-fixed/30 border border-secondary/20 text-[11px] text-secondary font-semibold">
            <span className="material-symbols-outlined text-sm">auto_graph</span>
            <span>
              Diperbarui dinamis berdasarkan <strong>{transactions.length} setoran</strong> di buku tabungan Anda (Kontribusi Anda: <strong>{metrics.userWeight} kg</strong> / <strong>{metrics.userCo2} kg CO₂e</strong>).
            </span>
          </div>
        </div>

        {/* 4 Macro Key Metric Bento Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          
          <div className="p-space-lg rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-outline uppercase font-bold text-[11px]">Limbah Terdivergen</span>
              <span className="material-symbols-outlined text-secondary">recycling</span>
            </div>
            <div className="my-3">
              <span className="font-metric-display text-4xl font-extrabold text-primary">
                {metrics.totalWeightKg.toLocaleString('id-ID')}
              </span>
              <span className="text-sm font-bold text-secondary ml-1">kg</span>
            </div>
            <span className="text-xs text-on-surface-variant">
              Teralihkan 100% dari TPA (User: {metrics.userWeight} kg)
            </span>
          </div>

          <div className="p-space-lg rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-outline uppercase font-bold text-[11px]">Reduksi Gas Rumah Kaca</span>
              <span className="material-symbols-outlined text-secondary">cloud_done</span>
            </div>
            <div className="my-3">
              <span className="font-metric-display text-4xl font-extrabold text-primary">
                {metrics.totalCo2Kg.toLocaleString('id-ID')}
              </span>
              <span className="text-sm font-bold text-secondary ml-1">kg CO₂e</span>
            </div>
            <span className="text-xs text-on-surface-variant">
              Mencegah pemanasan lokal (User: {metrics.userCo2} kg)
            </span>
          </div>

          <div className="p-space-lg rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-outline uppercase font-bold text-[11px]">Ekuivalensi Pohon</span>
              <span className="material-symbols-outlined text-secondary">forest</span>
            </div>
            <div className="my-3">
              <span className="font-metric-display text-4xl font-extrabold text-primary">
                {metrics.treeEquivalents.toLocaleString('id-ID')}
              </span>
              <span className="text-sm font-bold text-secondary ml-1">Pohon Dewasa</span>
            </div>
            <span className="text-xs text-on-surface-variant">
              Standar serapan EPA ~21.77 kg CO₂/thn
            </span>
          </div>

          <div className="p-space-lg rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-outline uppercase font-bold text-[11px]">Air Bersih Terhemat</span>
              <span className="material-symbols-outlined text-secondary">water_drop</span>
            </div>
            <div className="my-3">
              <span className="font-metric-display text-4xl font-extrabold text-primary">
                {metrics.totalWaterLiters.toLocaleString('id-ID')}
              </span>
              <span className="text-sm font-bold text-secondary ml-1">Liter</span>
            </div>
            <span className="text-xs text-on-surface-variant">
              Dibanding manufaktur polimer virgin
            </span>
          </div>

        </div>

        {/* Visual Analytics Bento (Interactive Recharts) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          
          {/* Monthly Trend Area Chart (7 cols) */}
          <div className="lg:col-span-7 p-space-lg rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-label-caps text-secondary font-bold uppercase text-[11px] tracking-wider">
                  Dinamika Tren Pemulihan
                </span>
                <span className="text-[11px] text-outline font-medium">6 Bulan Terakhir</span>
              </div>
              <h3 className="font-headline-sm font-bold text-primary">
                Volume Sampah & Reduksi CO₂e Bulanan
              </h3>
              <p className="text-xs text-on-surface-variant mt-0.5 mb-4">
                Pertumbuhan partisipasi warga dan efisiensi pengalihan material dari bulan ke bulan (dalam kg).
              </p>
            </div>

            <div className="w-full h-64 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#006c48" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#006c48" stopOpacity={0.0}/>
                    </linearGradient>
                    <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#123b2a" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#123b2a" stopOpacity={0.0}/>
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
                    dataKey="volumeKg" 
                    name="Volume Terpilah (kg)" 
                    stroke="#006c48" 
                    strokeWidth={2.5}
                    fillOpacity={1} 
                    fill="url(#colorVolume)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="co2Kg" 
                    name="Reduksi CO₂e (kg)" 
                    stroke="#123b2a" 
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    fillOpacity={1} 
                    fill="url(#colorCo2)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-center gap-6 pt-3 border-t border-outline-variant/20 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-secondary inline-block" />
                <span className="text-on-surface font-medium">Volume Sampah (kg)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary inline-block" />
                <span className="text-on-surface font-medium">Reduksi CO₂e (kg)</span>
              </div>
            </div>
          </div>

          {/* Category Distribution Bar Chart (5 cols) */}
          <div className="lg:col-span-5 p-space-lg rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-label-caps text-secondary font-bold uppercase text-[11px] tracking-wider">
                  Audit Komposisi Material
                </span>
                <span className="text-[11px] text-outline font-medium">Agregat Saat Ini</span>
              </div>
              <h3 className="font-headline-sm font-bold text-primary">
                Proporsi Fraksi Material Sirkular
              </h3>
              <p className="text-xs text-on-surface-variant mt-0.5 mb-4">
                Distribusi fraksi sampah terpilah yang telah masuk ke rantai logistik daur ulang.
              </p>
            </div>

            <div className="w-full h-64 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryBreakdown} layout="vertical" margin={{ top: 5, right: 20, left: 25, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e8e9e2" horizontal={false} />
                  <XAxis type="number" stroke="#717a73" fontSize={11} tickLine={false} />
                  <YAxis type="category" dataKey="name" stroke="#717a73" fontSize={10} tickLine={false} width={85} />
                  <Tooltip 
                    formatter={(val) => [`${val} kg`, 'Total Terkumpul']}
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      borderRadius: '12px', 
                      border: '1px solid #d4d7cf',
                      fontSize: '11px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                    }} 
                  />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                    {categoryBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="pt-3 border-t border-outline-variant/20 text-[11px] text-outline text-center">
              Material terbanyak saat ini: <strong>Plastik PET</strong> & <strong>Kardus</strong>
            </div>
          </div>

        </div>

        {/* Interactive Scenario Impact Calculator */}
        <div className="p-space-lg sm:p-space-xl rounded-2xl bg-primary text-on-primary shadow-xl border border-primary-container">
          <div className="max-w-2xl mb-space-lg">
            <span className="font-label-caps text-tertiary-fixed font-bold uppercase tracking-wider block mb-1">
              Kalkulator Simulasi Jejak Karbon Mandiri
            </span>
            <h2 className="font-headline-lg font-bold text-surface-bright tracking-tight">
              Hitung Potensi Dampak Rumah Tangga Anda
            </h2>
            <p className="font-body-md text-primary-fixed-dim text-sm mt-1">
              Geser parameter di bawah untuk memproyeksikan penghematan ekologis tahunan jika keluarga Anda memilah secara konsisten.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-space-xl items-center">
            
            {/* Sliders (6 cols) */}
            <div className="lg:col-span-6 space-y-space-md">
              {/* Slider 1 */}
              <div className="bg-primary-container p-4 rounded-xl border border-primary-fixed-variant/40 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-surface-bright">Botol Plastik Kemasan / Hari</span>
                  <span className="text-tertiary-fixed text-base font-extrabold tabular-nums">
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
                  className="w-full accent-tertiary-fixed cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-primary-fixed-dim">
                  <span>0 botol</span>
                  <span>7 botol</span>
                  <span>15 botol/hari</span>
                </div>
              </div>

              {/* Slider 2 */}
              <div className="bg-primary-container p-4 rounded-xl border border-primary-fixed-variant/40 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-surface-bright">Sisa Sampah Dapur Dikompos / Minggu</span>
                  <span className="text-tertiary-fixed text-base font-extrabold tabular-nums">
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
                  className="w-full accent-tertiary-fixed cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-primary-fixed-dim">
                  <span>0 kg</span>
                  <span>5 kg</span>
                  <span>10 kg/minggu</span>
                </div>
              </div>
            </div>

            {/* Projected Outputs Card (6 cols) */}
            <div className="lg:col-span-6 bg-surface-container-lowest text-on-surface p-space-lg rounded-2xl shadow-lg border border-outline-variant/30 space-y-4">
              <span className="font-label-caps text-secondary font-bold uppercase tracking-wider block text-xs">
                Proyeksi Kontribusi Ekologis Tahunan (1 Tahun)
              </span>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-surface-container-low">
                  <span className="text-[11px] text-outline block uppercase">Reduksi Emisi</span>
                  <span className="text-2xl font-bold font-metric-display text-primary">
                    {totalScenarioCo2} kg
                  </span>
                  <span className="text-[10px] text-on-surface-variant block">CO₂e dicegah ke atmosfer</span>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low">
                  <span className="text-[11px] text-outline block uppercase">Setara Tanam</span>
                  <span className="text-2xl font-bold font-metric-display text-secondary">
                    {totalScenarioTrees} Pohon
                  </span>
                  <span className="text-[10px] text-on-surface-variant block">Serapan pohon dewasa</span>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low">
                  <span className="text-[11px] text-outline block uppercase">Air Bersih</span>
                  <span className="text-2xl font-bold font-metric-display text-primary">
                    {totalWaterSavedLiters} L
                  </span>
                  <span className="text-[10px] text-on-surface-variant block">Terselamatkan di alam</span>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low">
                  <span className="text-[11px] text-outline block uppercase">Sampah TPA</span>
                  <span className="text-2xl font-bold font-metric-display text-secondary">
                    {(annualPlasticKg + annualCompostKg).toFixed(0)} kg
                  </span>
                  <span className="text-[10px] text-on-surface-variant block">Teralihkan dari timbunan</span>
                </div>
              </div>

              <div className="text-center pt-2">
                <span className="text-[11px] text-outline italic">
                  * Dihitung berdasarkan EPA WARM (Waste Reduction Model) & KLHK Indonesia.
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Verification & Lifecycle Flow Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          
          <div className="lg:col-span-6 space-y-space-md">
            <span className="font-label-caps text-secondary font-bold uppercase tracking-wider block">
              Integritas & Auditabilitas
            </span>
            <h3 className="font-headline-md font-bold text-primary tracking-tight">
              Standar Kepatuhan SNI & ISO 14001:2015
            </h3>
            <p className="font-body-sm text-on-surface-variant leading-relaxed">
              Seluruh data transaksi dan konversi massa material di platform ECOCYCLE didasarkan pada rantai lacak resmi (Chain of Custody). Kami menjamin tidak ada klaim reduksi karbon fiktif atau pencatatan ganda.
            </p>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                <span className="material-symbols-outlined text-secondary">verified</span>
                <div>
                  <h4 className="font-title-md font-bold text-xs text-primary">Verifikasi Timbangan Digital Terkalibrasi</h4>
                  <p className="text-[11px] text-outline">Penerimaan di hub diverifikasi sensor timbangan berizin metrologi legal.</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                <span className="material-symbols-outlined text-secondary">description</span>
                <div>
                  <h4 className="font-title-md font-bold text-xs text-primary">Manifest Manifest Pengangkutan Resmi</h4>
                  <p className="text-[11px] text-outline">Perpindahan material dari bank sampah ke pabrik daur ulang dilengkapi surat jalan elektronik.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-2xl overflow-hidden shadow-lg border border-outline-variant/30">
            <img
              src="/assets/images/drop_point.jpg"
              alt="Community modern sorting facility"
              className="w-full h-80 object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

        </div>

      </div>
    </div>
  );
};
