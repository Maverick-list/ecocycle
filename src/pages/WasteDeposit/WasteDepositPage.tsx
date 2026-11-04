import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWasteBank } from '../../context/WasteBankContext';
import { WASTE_CATEGORIES } from '../../data/wasteData';
import { DROP_POINTS } from '../../data/locationsData';
import { WasteStreamType } from '../../types';
import { Icon } from '../../components/ui/Icon';
import { PageTransition } from '../../components/ui/PageTransition';

export const WasteDepositPage: React.FC = () => {
  const navigate = useNavigate();
  const { addTransaction } = useWasteBank();

  const [selectedCategory, setSelectedCategory] = useState<WasteStreamType>('Plastik PET');
  const [weightKg, setWeightKg] = useState<number>(3.5);
  const [date, setDate] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [dropPoint, setDropPoint] = useState<string>(DROP_POINTS[0].name);
  const [notes, setNotes] = useState<string>('');
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const currentCategoryConfig = WASTE_CATEGORIES.find(c => c.name === selectedCategory) || WASTE_CATEGORIES[0];
  const estimatedPoints = Math.round(weightKg * currentCategoryConfig.pointsPerKg);
  const estimatedIdr = Math.round(weightKg * currentCategoryConfig.pricePerKg);
  const estimatedCo2 = parseFloat((weightKg * currentCategoryConfig.co2Factor).toFixed(2));
  const estimatedWater = Math.round(weightKg * currentCategoryConfig.waterFactor);

  const handleAdjustWeight = (delta: number) => {
    setWeightKg(prev => {
      const updated = parseFloat((prev + delta).toFixed(1));
      return updated >= 0.1 ? updated : 0.1;
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (weightKg <= 0) return;

    addTransaction({
      wasteType: selectedCategory,
      weightKg,
      dropPoint,
      date,
      photoUrl,
      notes: notes || 'Setoran via formulir mandiri'
    });

    setSubmitted(true);
  };

  return (
    <PageTransition className="w-full bg-surface dark:bg-[#03140d] text-on-surface dark:text-white pt-10 sm:pt-14 pb-48 lg:pb-60 transition-colors duration-300">
      <div className="max-w-[1080px] mx-auto px-6 sm:px-10 lg:px-12 space-y-12 sm:space-y-16">
        
        {/* Breadcrumb & Header with Soft Gradient Divider */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-pill text-xs font-extrabold uppercase tracking-wider text-secondary">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_#10b981]" />
            <span>Formulir Penyerahan Mandiri</span>
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-primary dark:text-white tracking-tight leading-tight">
            Pencatatan Setoran Sampah Terpilah
          </h1>

          <p className="font-sans text-sm sm:text-base text-on-surface-variant dark:text-emerald-100/75 max-w-2xl leading-relaxed">
            Catat estimasi bobot sampah Anda untuk mendapatkan nomor registrasi setoran, dokumentasi foto bukti terverifikasi, dan perolehan EcoPoints instan.
          </p>

          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-secondary/10 border border-secondary/25 text-xs text-secondary font-semibold">
            <Icon name="info" size={16} />
            <span>Simulasi data tersimpan pada LocalStorage peramban untuk keperluan evaluasi kompetisi.</span>
          </div>

          {/* Soft Organic Fading Gradient Divider (no hard straight border line) */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent pt-4" />
        </div>

        {submitted ? (
          <div className="p-8 sm:p-14 rounded-3xl glass-panel-elevated border border-secondary/40 shadow-2xl text-center space-y-6 animate-fadeIn">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-secondary/20 text-secondary flex items-center justify-center text-4xl font-bold shadow-inner">
              <Icon name="check_circle" size={42} />
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-primary dark:text-white">
              Setoran Berhasil Didaftarkan!
            </h2>
            <p className="font-sans text-sm sm:text-base text-on-surface-variant dark:text-emerald-100/80 max-w-lg mx-auto leading-relaxed">
              Material <strong className="text-secondary font-extrabold">{selectedCategory} ({weightKg} kg)</strong> telah dicatat ke buku tabungan digital Anda dengan perolehan <strong className="text-secondary font-extrabold">+{estimatedPoints} EcoPoints</strong> (≈ Rp {estimatedIdr.toLocaleString('id-ID')}).
            </p>

            {photoUrl && (
              <div className="w-36 h-36 mx-auto rounded-2xl overflow-hidden border border-secondary/30 shadow-md mt-4">
                <img src={photoUrl} alt="Bukti Foto Setoran" className="w-full h-full object-cover" />
              </div>
            )}

            <div className="pt-6 flex flex-wrap justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setPhotoUrl(undefined);
                }}
                className="h-12 px-6 rounded-xl glass-pill hover:bg-surface-container font-bold text-xs sm:text-sm cursor-pointer transition-all active:scale-95 text-on-surface"
              >
                Catat Setoran Lainnya
              </button>
              <button
                type="button"
                onClick={() => navigate('/bank-sampah')}
                className="h-12 px-7 rounded-xl bg-gradient-to-r from-emerald-500 to-[#10b981] text-white font-bold text-xs sm:text-sm hover:from-emerald-400 hover:to-emerald-500 cursor-pointer flex items-center gap-2 shadow-lg transition-all active:scale-95"
              >
                <span>Buka Buku Tabungan</span>
                <Icon name="arrow_forward" size={16} />
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 sm:p-12 lg:p-16 rounded-3xl glass-panel border border-outline-variant/30 dark:border-emerald-500/20 shadow-2xl space-y-10 sm:space-y-12">
            
            {/* Step 1: Select Category */}
            <div className="space-y-4">
              <label className="block font-label-caps text-xs sm:text-sm font-extrabold text-secondary uppercase tracking-wider">
                1. Pilih Kategori Material
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {WASTE_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.name;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`p-4 rounded-2xl text-left font-sans text-xs sm:text-sm font-semibold transition-all cursor-pointer flex flex-col justify-between h-28 border ${
                        isSelected
                          ? 'bg-secondary text-white border-secondary ring-2 ring-emerald-300/50 shadow-lg scale-[1.02]'
                          : 'glass-panel border-outline-variant/20 text-on-surface hover:border-secondary/40 hover:bg-surface-container/60'
                      }`}
                    >
                      <Icon name={cat.icon} size={26} className={isSelected ? 'text-white' : 'text-secondary'} />
                      <div className="space-y-0.5">
                        <span className="block font-extrabold">{cat.name}</span>
                        <span className={`text-[11px] block ${isSelected ? 'text-emerald-100' : 'text-outline'}`}>
                          Rp {cat.pricePerKg.toLocaleString('id-ID')}/kg
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Weight Stepper */}
            <div className="space-y-4">
              <label className="block font-label-caps text-xs sm:text-sm font-extrabold text-secondary uppercase tracking-wider">
                2. Estimasi Bobot Timbangan (kg)
              </label>
              <div className="flex items-center gap-4 bg-surface-container/80 dark:bg-[#062417] border border-outline-variant/25 rounded-2xl p-4 max-w-md shadow-inner">
                <button
                  type="button"
                  onClick={() => handleAdjustWeight(-0.5)}
                  className="w-14 h-14 rounded-xl bg-white dark:bg-[#0d3b26] text-on-surface dark:text-white font-extrabold text-2xl flex items-center justify-center hover:bg-secondary hover:text-white shadow-md active:scale-95 transition-all cursor-pointer"
                  title="Kurang 0.5 kg"
                >
                  -
                </button>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={weightKg}
                  onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0.1)}
                  className="w-full text-center bg-transparent font-metric-display text-4xl font-black text-on-surface dark:text-white outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleAdjustWeight(0.5)}
                  className="w-14 h-14 rounded-xl bg-white dark:bg-[#0d3b26] text-on-surface dark:text-white font-extrabold text-2xl flex items-center justify-center hover:bg-secondary hover:text-white shadow-md active:scale-95 transition-all cursor-pointer"
                  title="Tambah 0.5 kg"
                >
                  +
                </button>
                <span className="font-extrabold text-xl text-on-surface-variant pr-3">kg</span>
              </div>
            </div>

            {/* Step 3 & 4: Date & Drop Point */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-extrabold text-secondary uppercase tracking-wider">
                  3. Tanggal Rencana Penyerahan
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full h-13 px-4 rounded-xl bg-surface-container/80 dark:bg-[#062417] text-xs sm:text-sm text-on-surface dark:text-white outline-none focus:ring-2 focus:ring-secondary border border-outline-variant/30 transition-all shadow-inner"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-extrabold text-secondary uppercase tracking-wider">
                  4. Titik Drop-Point Tujuan
                </label>
                <select
                  value={dropPoint}
                  onChange={(e) => setDropPoint(e.target.value)}
                  className="w-full h-13 px-4 rounded-xl bg-surface-container/80 dark:bg-[#062417] text-xs sm:text-sm text-on-surface dark:text-white outline-none focus:ring-2 focus:ring-secondary border border-outline-variant/30 transition-all shadow-inner"
                >
                  {DROP_POINTS.map((dp) => (
                    <option key={dp.id} value={dp.name} className="dark:bg-[#062417]">
                      {dp.name} ({dp.city})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 5: Photo Evidence */}
            <div className="space-y-3">
              <label className="block text-xs sm:text-sm font-extrabold text-secondary uppercase tracking-wider">
                5. Bukti Foto Material (Opsional)
              </label>
              <div className="p-6 rounded-2xl border-2 border-dashed border-outline-variant/40 dark:border-emerald-500/30 bg-surface-container/40 dark:bg-[#051f14] flex flex-col sm:flex-row items-center gap-6">
                {photoUrl ? (
                  <div className="relative w-28 h-28 rounded-2xl overflow-hidden border border-secondary shadow-md shrink-0">
                    <img src={photoUrl} alt="Preview Bukti Setoran" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setPhotoUrl(undefined)}
                      className="absolute top-1.5 right-1.5 w-6 h-6 bg-error text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md cursor-pointer"
                      title="Hapus foto"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="w-28 h-28 rounded-2xl bg-surface-container dark:bg-[#0b3321] flex flex-col items-center justify-center text-secondary shrink-0 shadow-inner">
                    <Icon name="camera" size={32} />
                    <span className="text-[11px] font-bold mt-1.5">Unggah Foto</span>
                  </div>
                )}
                <div className="flex-1 text-center sm:text-left space-y-2.5">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    id="page-file-upload"
                    className="hidden"
                  />
                  <label
                    htmlFor="page-file-upload"
                    className="inline-block px-5 py-2.5 rounded-xl bg-secondary text-white hover:bg-secondary/90 text-xs sm:text-sm font-extrabold cursor-pointer transition-all shadow-md active:scale-95"
                  >
                    {photoUrl ? 'Ganti Foto Bukti' : 'Pilih Foto dari Galeri / Kamera'}
                  </label>
                  <p className="text-xs text-on-surface-variant dark:text-emerald-100/60">
                    Format JPG, PNG, atau WebP (Disimpan lokal sebagai manifest verifikasi drop-point).
                  </p>
                </div>
              </div>
            </div>

            {/* Step 6: Optional Notes */}
            <div className="space-y-3">
              <label className="block text-xs sm:text-sm font-extrabold text-secondary uppercase tracking-wider">
                6. Keterangan Wadah / Catatan Pemilahan
              </label>
              <input
                type="text"
                placeholder="Contoh: 1 karung botol bersih siap giling..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full h-13 px-4 rounded-xl bg-surface-container/80 dark:bg-[#062417] text-xs sm:text-sm text-on-surface dark:text-white outline-none focus:ring-2 focus:ring-secondary border border-outline-variant/30 transition-all shadow-inner"
              />
            </div>

            {/* Conversion Summary Banner */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-secondary/15 via-secondary/5 to-transparent border border-secondary/30 grid grid-cols-1 sm:grid-cols-3 gap-6 shadow-lg">
              <div className="space-y-1">
                <span className="text-xs text-secondary uppercase font-extrabold block tracking-wider">
                  Estimasi Perolehan
                </span>
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-3xl font-black font-metric-display text-secondary">
                    +{estimatedPoints} Poin
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-on-surface-variant dark:text-emerald-100/70">
                    (Rp {estimatedIdr.toLocaleString('id-ID')})
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-secondary uppercase font-extrabold block tracking-wider">
                  Reduksi Emisi Karbon
                </span>
                <span className="text-2xl font-black text-primary dark:text-white block pt-1">
                  ~{estimatedCo2} kg CO₂e
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-secondary uppercase font-extrabold block tracking-wider">
                  Konservasi Air Bersih
                </span>
                <span className="text-2xl font-black text-primary dark:text-white block pt-1">
                  ~{estimatedWater} Liter
                </span>
              </div>
            </div>

            {/* Action Buttons (Spacious, Clear & Protected from Footer Collisions) */}
            <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row justify-end items-center gap-4">
              <button
                type="button"
                onClick={() => navigate('/bank-sampah')}
                className="w-full sm:w-auto h-13 px-6 rounded-xl glass-pill hover:bg-surface-container text-xs sm:text-sm font-bold transition-all cursor-pointer active:scale-95 text-on-surface"
              >
                Kembali ke Bank Sampah
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto h-13 px-8 rounded-xl bg-gradient-to-r from-emerald-500 to-[#10b981] text-white font-title-md text-sm font-extrabold hover:from-emerald-400 hover:to-emerald-500 transition-all shadow-xl hover:shadow-2xl cursor-pointer flex items-center justify-center gap-2.5 active:scale-95"
              >
                <Icon name="check_circle" size={20} />
                <span>Konfirmasi & Simpan Setoran</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </PageTransition>
  );
};
