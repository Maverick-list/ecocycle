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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeDepositModal();
      }}
    >
      <div 
        className="relative w-full max-w-2xl rounded-3xl bg-[#062418]/95 dark:bg-[#031910]/95 border border-emerald-500/35 shadow-[0_25px_60px_-15px_rgba(0,35,18,0.7)] backdrop-blur-3xl overflow-hidden flex flex-col max-h-[90vh] text-white"
        role="dialog"
        aria-modal="true"
        aria-labelledby="deposit-modal-title"
      >
        {/* Apple visionOS Frosted Header */}
        <div className="relative px-6 py-4.5 flex items-center justify-between bg-white/5 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 flex items-center justify-center font-bold shadow-sm">
              <Icon name="post_add" size={22} />
            </div>
            <div>
              <h3 id="deposit-modal-title" className="font-display font-extrabold text-xl text-white tracking-tight">
                Pencatatan Setoran Baru
              </h3>
              <p className="text-xs text-emerald-300/80 font-medium">
                Infrastruktur Sirkular Presisi • Formulir Mandiri Warga
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeDepositModal}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Tutup modal"
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        {/* Soft Organic Gradient Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent shrink-0" />

        {/* Form Body - Scrollable */}
        <form id="deposit-form" onSubmit={handleSubmit} className="p-6 pb-8 overflow-y-auto space-y-5 flex-1" style={{ scrollbarWidth: 'thin' }}>
          {/* Step 1: Select Category */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-emerald-300/90 mb-2.5">
              1. Pilih Kategori Material Terpilah
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {WASTE_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.name;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`flex items-center gap-2.5 p-3 rounded-2xl text-left text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-tr from-emerald-600/40 to-emerald-400/20 border border-emerald-400 text-white ring-2 ring-emerald-400/50 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                        : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:border-emerald-500/30 hover:text-white'
                    }`}
                  >
                    <Icon name={cat.icon} size={18} className={isSelected ? 'text-emerald-300' : 'text-emerald-400/60'} />
                    <span className="truncate">{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Weight Stepper */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-emerald-300/90 mb-2.5">
              2. Bobot Estimasi (kg)
            </label>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-2.5 max-w-xs">
              <button
                type="button"
                onClick={() => handleAdjustWeight(-0.5)}
                className="w-11 h-11 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-300 font-black text-2xl flex items-center justify-center active:scale-95 transition-all cursor-pointer"
              >
                -
              </button>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={weightKg}
                onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0.1)}
                className="w-full text-center bg-transparent font-display text-2xl font-black text-emerald-300 outline-none"
              />
              <button
                type="button"
                onClick={() => handleAdjustWeight(0.5)}
                className="w-11 h-11 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-300 font-black text-2xl flex items-center justify-center active:scale-95 transition-all cursor-pointer"
              >
                +
              </button>
              <span className="font-bold text-sm text-emerald-300/80 pr-2">kg</span>
            </div>
          </div>

          {/* Step 3: Location Drop Point */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-emerald-300/90 mb-2.5">
              3. Lokasi Drop-Point Tujuan
            </label>
            <select
              value={dropPoint}
              onChange={(e) => setDropPoint(e.target.value)}
              className="w-full h-12 px-4 rounded-2xl bg-white/5 border border-white/15 text-sm text-white outline-none focus:border-emerald-400 transition-all cursor-pointer"
            >
              {DROP_POINTS.map((dp) => (
                <option key={dp.id} value={dp.name} className="bg-[#062418] text-white">
                  {dp.name} ({dp.city})
                </option>
              ))}
            </select>
          </div>

          {/* Step 4: Photo Evidence (Optional) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-emerald-300/90 mb-2.5">
              4. Foto Bukti Sampah (Opsional)
            </label>
            {photoUrl ? (
              <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 border border-emerald-500/30">
                <img src={photoUrl} alt="Preview" className="w-16 h-16 rounded-xl object-cover border border-white/20" />
                <div className="flex-1 text-xs">
                  <span className="font-bold text-emerald-400 block text-sm">Foto Terlampir</span>
                  <span className="text-white/60 text-[11px]">Siap diverifikasi di drop-point</span>
                </div>
                <button
                  type="button"
                  onClick={() => setPhotoUrl(undefined)}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 text-xs font-bold hover:bg-rose-500/30 cursor-pointer transition-all"
                >
                  Hapus
                </button>
              </div>
            ) : (
              <label className="border-2 border-dashed border-emerald-500/30 hover:border-emerald-400/60 rounded-2xl p-4 flex items-center justify-center gap-2.5 cursor-pointer bg-emerald-950/20 hover:bg-emerald-950/30 transition-all text-xs text-emerald-200/80">
                <Icon name="camera" size={20} className="text-emerald-400" />
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
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-emerald-300/90 mb-2.5">
              5. Catatan Tambahan (Opsional)
            </label>
            <input
              type="text"
              placeholder="Contoh: Botol telah dicuci bersih dan dipipihkan..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-12 px-4 rounded-2xl bg-white/5 border border-white/15 text-sm text-white placeholder:text-white/40 outline-none focus:border-emerald-400 transition-all"
            />
          </div>

          {/* Live Valuation Summary Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-tr from-emerald-950/70 to-[#063321]/60 border border-emerald-500/30 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300/80 block">
                Estimasi Perolehan Poin & Nilai
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display font-black text-2xl text-emerald-300">
                  +{estimatedPoints} Poin
                </span>
                <span className="text-xs text-emerald-200/70 font-semibold">
                  (≈ Rp {estimatedIdr.toLocaleString('id-ID')})
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300/80 block">
                Reduksi CO₂e
              </span>
              <span className="font-display font-black text-xl text-[#86efac]">
                ~{estimatedCo2} kg
              </span>
            </div>
          </div>

          <div className="text-[11px] text-white/50 italic text-center pb-1">
            * Nilai konversi merupakan estimasi simulasi kompetisi, bukan transaksi tunai perbankan riil.
          </div>
        </form>

        {/* Apple visionOS Sticky Footer Action Bar */}
        <div className="p-4.5 px-6 border-t border-white/10 bg-black/25 backdrop-blur-md flex items-center justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={closeDepositModal}
            className="px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white/80 font-bold text-sm transition-all cursor-pointer"
          >
            Batal
          </button>
          <button
            type="submit"
            form="deposit-form"
            className="px-7 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-sm shadow-[0_4px_20px_rgba(16,185,129,0.4)] flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <Icon name="check_circle" size={18} />
            <span>Simpan & Konfirmasi Setoran</span>
          </button>
        </div>
      </div>
    </div>
  );
};
