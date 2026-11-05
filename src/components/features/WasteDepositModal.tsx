import React, { useState, useEffect } from 'react';
import { useWasteBank } from '../../context/WasteBankContext';
import { WASTE_CATEGORIES } from '../../data/wasteData';
import { DROP_POINTS } from '../../data/locationsData';
import { WasteStreamType } from '../../types';
import { Icon } from '../ui/Icon';

export const WasteDepositModal: React.FC = () => {
  const { isDepositModalOpen, closeDepositModal, addTransaction } = useWasteBank();

  const [selectedCategory, setSelectedCategory] = useState<WasteStreamType>('Plastik PET');
  const [weightKg, setWeightKg] = useState<number>(2.5);
  const [dropPoint, setDropPoint] = useState<string>(DROP_POINTS[0].name);
  const [notes, setNotes] = useState<string>('');
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDepositModal();
      }
    };
    if (isDepositModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDepositModalOpen, closeDepositModal]);

  if (!isDepositModalOpen) return null;

  const currentCategoryConfig = WASTE_CATEGORIES.find(c => c.name === selectedCategory) || WASTE_CATEGORIES[0];

  const estimatedPoints = Math.round(weightKg * currentCategoryConfig.pointsPerKg);
  const estimatedIdr = Math.round(weightKg * currentCategoryConfig.pricePerKg);
  const estimatedCo2 = parseFloat((weightKg * currentCategoryConfig.co2Factor).toFixed(2));

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
      photoUrl,
      notes: notes || undefined
    });

    setPhotoUrl(undefined);
    closeDepositModal();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeDepositModal();
      }}
    >
      <div 
        className="relative w-full max-w-4xl rounded-4xl bg-[#062418]/95 dark:bg-[#031910]/95 border border-emerald-500/35 shadow-[0_25px_60px_-15px_rgba(0,35,18,0.7)] backdrop-blur-3xl overflow-hidden flex flex-col max-h-[92vh] text-white"
        role="dialog"
        aria-modal="true"
        aria-labelledby="deposit-modal-title"
      >
        {/* Apple visionOS Frosted Header */}
        <div className="relative px-8 py-5 flex items-center justify-between bg-white/5 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 flex items-center justify-center font-bold shadow-sm">
              <Icon name="post_add" size={26} />
            </div>
            <div>
              <h3 id="deposit-modal-title" className="font-display font-extrabold text-2xl text-white tracking-tight">
                Pencatatan Setoran Baru
              </h3>
              <p className="text-xs sm:text-sm text-emerald-300/80 font-medium">
                Infrastruktur Sirkular Presisi • Formulir Mandiri Warga
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeDepositModal}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Tutup modal"
          >
            <Icon name="close" size={22} />
          </button>
        </div>

        {/* Soft Organic Gradient Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500/35 to-transparent shrink-0" />

        {/* Form Body - Spacious & Comfortable */}
        <form id="deposit-form" onSubmit={handleSubmit} className="p-8 pb-10 overflow-y-auto space-y-6 sm:space-y-8 flex-1" style={{ scrollbarWidth: 'thin' }}>
          
          {/* Step 1: Select Category (4-column responsive grid) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs sm:text-sm font-black uppercase tracking-wider text-emerald-300">
                1. Pilih Kategori Material Terpilah
              </label>
              <span className="text-xs text-emerald-400/70 font-semibold">
                8 Kategori SNI
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {WASTE_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.name;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`flex flex-col justify-between p-4 rounded-2xl text-left transition-all cursor-pointer min-h-[92px] ${
                      isSelected
                        ? 'bg-gradient-to-tr from-emerald-600/50 to-emerald-400/30 border-2 border-emerald-400 text-white ring-2 ring-emerald-400/50 shadow-[0_0_18px_rgba(16,185,129,0.35)] scale-[1.02]'
                        : 'bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:border-emerald-500/40 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <Icon name={cat.icon} size={22} className={isSelected ? 'text-emerald-300' : 'text-emerald-400/70'} />
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/10 text-emerald-300">
                        Rp {cat.pricePerKg.toLocaleString('id-ID')}/kg
                      </span>
                    </div>
                    <span className="font-extrabold text-sm truncate mt-2">{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Weight Stepper */}
          <div className="space-y-3">
            <label className="block text-xs sm:text-sm font-black uppercase tracking-wider text-emerald-300">
              2. Bobot Estimasi (kg)
            </label>
            <div className="flex items-center gap-4 bg-white/5 border border-white/15 rounded-2xl p-3 max-w-sm">
              <button
                type="button"
                onClick={() => handleAdjustWeight(-0.5)}
                className="w-13 h-13 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/35 border border-emerald-500/30 text-emerald-300 font-black text-2xl flex items-center justify-center active:scale-95 transition-all cursor-pointer shrink-0"
              >
                -
              </button>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={weightKg}
                onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0.1)}
                className="w-full text-center bg-transparent font-display text-3xl font-black text-emerald-300 outline-none"
              />
              <button
                type="button"
                onClick={() => handleAdjustWeight(0.5)}
                className="w-13 h-13 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/35 border border-emerald-500/30 text-emerald-300 font-black text-2xl flex items-center justify-center active:scale-95 transition-all cursor-pointer shrink-0"
              >
                +
              </button>
              <span className="font-extrabold text-base text-emerald-300/80 pr-2">kg</span>
            </div>
          </div>

          {/* Step 3: Location Drop Point */}
          <div className="space-y-3">
            <label className="block text-xs sm:text-sm font-black uppercase tracking-wider text-emerald-300">
              3. Lokasi Drop-Point Tujuan
            </label>
            <select
              value={dropPoint}
              onChange={(e) => setDropPoint(e.target.value)}
              className="w-full h-13 px-4 rounded-2xl bg-white/5 border border-white/15 text-sm sm:text-base text-white outline-none focus:border-emerald-400 transition-all cursor-pointer"
            >
              {DROP_POINTS.map((dp) => (
                <option key={dp.id} value={dp.name} className="bg-[#062418] text-white">
                  {dp.name} ({dp.city})
                </option>
              ))}
            </select>
          </div>

          {/* Step 4: Photo Evidence (Optional) */}
          <div className="space-y-3">
            <label className="block text-xs sm:text-sm font-black uppercase tracking-wider text-emerald-300">
              4. Foto Bukti Sampah (Opsional)
            </label>
            {photoUrl ? (
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-emerald-500/35">
                <img src={photoUrl} alt="Preview" className="w-20 h-20 rounded-xl object-cover border border-white/20 shrink-0" />
                <div className="flex-1 text-xs">
                  <span className="font-bold text-emerald-400 block text-base">Foto Terlampir</span>
                  <span className="text-white/70 text-xs">Siap diverifikasi di drop-point</span>
                </div>
                <button
                  type="button"
                  onClick={() => setPhotoUrl(undefined)}
                  className="px-4 py-2 rounded-xl bg-rose-500/20 text-rose-300 text-xs font-bold hover:bg-rose-500/30 cursor-pointer transition-all"
                >
                  Hapus
                </button>
              </div>
            ) : (
              <label className="border-2 border-dashed border-emerald-500/30 hover:border-emerald-400/60 rounded-2xl p-5 flex items-center justify-center gap-3 cursor-pointer bg-emerald-950/25 hover:bg-emerald-950/35 transition-all text-sm text-emerald-200/90">
                <Icon name="camera" size={24} className="text-emerald-400" />
                <span>Unggah Foto Bukti Material (Klik Di Sini)</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Step 5: Optional Notes */}
          <div className="space-y-3">
            <label className="block text-xs sm:text-sm font-black uppercase tracking-wider text-emerald-300">
              5. Catatan Tambahan (Opsional)
            </label>
            <input
              type="text"
              placeholder="Contoh: Botol telah dicuci bersih dan dipipihkan..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-13 px-5 rounded-2xl bg-white/5 border border-white/15 text-sm sm:text-base text-white placeholder:text-white/40 outline-none focus:border-emerald-400 transition-all"
            />
          </div>

          {/* Live Valuation Summary Card */}
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-tr from-emerald-950/80 to-[#063321]/70 border border-emerald-500/35 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-300/80 block">
                Estimasi Perolehan Poin & Nilai
              </span>
              <div className="flex items-baseline gap-2.5 mt-1">
                <span className="font-display font-black text-3xl sm:text-4xl text-emerald-300">
                  +{estimatedPoints} Poin
                </span>
                <span className="text-sm text-emerald-200/80 font-bold">
                  (≈ Rp {estimatedIdr.toLocaleString('id-ID')})
                </span>
              </div>
            </div>
            <div className="sm:text-right">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-300/80 block">
                Reduksi CO₂e
              </span>
              <span className="font-display font-black text-2xl sm:text-3xl text-[#86efac]">
                ~{estimatedCo2} kg CO₂e
              </span>
            </div>
          </div>

          <div className="text-xs text-white/50 italic text-center">
            * Nilai konversi merupakan estimasi simulasi kompetisi, bukan transaksi tunai perbankan riil.
          </div>
        </form>

        {/* Apple visionOS Sticky Footer Action Bar */}
        <div className="p-5 px-8 border-t border-white/10 bg-black/35 backdrop-blur-md flex items-center justify-end gap-4 shrink-0">
          <button
            type="button"
            onClick={closeDepositModal}
            className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white/80 font-bold text-sm transition-all cursor-pointer"
          >
            Batal
          </button>
          <button
            type="submit"
            form="deposit-form"
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-sm sm:text-base shadow-[0_4px_20px_rgba(16,185,129,0.4)] flex items-center gap-2.5 transition-all active:scale-95 cursor-pointer"
          >
            <Icon name="check_circle" size={20} />
            <span>Simpan & Konfirmasi Setoran</span>
          </button>
        </div>
      </div>
    </div>
  );
};
