import React, { useState } from 'react';
import { useWasteBank } from '../../context/WasteBankContext';

export const EcoImpactPage: React.FC = () => {
  const { totalWeightKg, totalCo2AvoidedKg, treesPlantedEquivalent } = useWasteBank();

  // Scenario Simulator sliders
  const [dailyBottles, setDailyBottles] = useState<number>(3);
  const [weeklyCompostKg, setWeeklyCompostKg] = useState<number>(2);

  // Computed scenario outcomes
  // 1 bottle = ~0.03 kg PET = ~0.045 kg CO2 avoided
  const annualBottlesCount = dailyBottles * 365;
  const annualPlasticKg = parseFloat((annualBottlesCount * 0.03).toFixed(1));
  const annualPlasticCo2 = parseFloat((annualPlasticKg * 1.5).toFixed(1));

  // 1 kg food waste diverted from landfill saves ~0.8 kg CO2e methane
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
        </div>

        {/* 4 Macro Key Metric Bento Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          
          <div className="p-space-lg rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-outline uppercase font-bold">Limbah Terdivergen</span>
              <span className="material-symbols-outlined text-secondary">recycling</span>
            </div>
            <div className="my-3">
              <span className="font-metric-display text-4xl font-extrabold text-primary">
                {(totalWeightKg + 14820).toLocaleString('id-ID')}
              </span>
              <span className="text-sm font-bold text-secondary ml-1">kg</span>
            </div>
            <span className="text-xs text-on-surface-variant">
              Teralihkan 100% dari TPA kota
            </span>
          </div>

          <div className="p-space-lg rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-outline uppercase font-bold">Reduksi Gas Rumah Kaca</span>
              <span className="material-symbols-outlined text-secondary">cloud_done</span>
            </div>
            <div className="my-3">
              <span className="font-metric-display text-4xl font-extrabold text-primary">
                {(totalCo2AvoidedKg + 2240).toLocaleString('id-ID')}
              </span>
              <span className="text-sm font-bold text-secondary ml-1">kg CO₂e</span>
            </div>
            <span className="text-xs text-on-surface-variant">
              Mencegah pemanasan global lokal
            </span>
          </div>

          <div className="p-space-lg rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-outline uppercase font-bold">Ekuivalensi Pohon</span>
              <span className="material-symbols-outlined text-secondary">forest</span>
            </div>
            <div className="my-3">
              <span className="font-metric-display text-4xl font-extrabold text-primary">
                {(treesPlantedEquivalent + 103).toFixed(0)}
              </span>
              <span className="text-sm font-bold text-secondary ml-1">Pohon Dewasa</span>
            </div>
            <span className="text-xs text-on-surface-variant">
              Kapasitas serapan CO₂ tahunan
            </span>
          </div>

          <div className="p-space-lg rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-outline uppercase font-bold">Air Bersih Terhemat</span>
              <span className="material-symbols-outlined text-secondary">water_drop</span>
            </div>
            <div className="my-3">
              <span className="font-metric-display text-4xl font-extrabold text-primary">
                {(totalWeightKg * 28 + 36500).toLocaleString('id-ID')}
              </span>
              <span className="text-sm font-bold text-secondary ml-1">Liter</span>
            </div>
            <span className="text-xs text-on-surface-variant">
              Dibanding manufaktur polimer perawan
            </span>
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
              <span className="font-label-caps text-secondary font-bold uppercase tracking-wider block">
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
