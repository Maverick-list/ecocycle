import React, { useState, useEffect } from 'react';
import { useWasteBank } from '../../context/WasteBankContext';
import { WASTE_CATEGORIES } from '../../data/wasteData';
import { DROP_POINTS } from '../../data/locationsData';
import { WasteStreamType } from '../../types';

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/70 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeDepositModal();
      }}
    >
      <div 
        className="bg-surface-container-lowest rounded-2xl max-w-2xl w-full border border-outline-variant/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="deposit-modal-title"
      >
        {/* Modal Header */}
        <div className="bg-primary p-space-md sm:p-space-lg flex items-center justify-between text-on-primary">
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">post_add</span>
            </div>
            <div>
              <h3 id="deposit-modal-title" className="font-headline-sm text-headline-sm font-bold text-surface-bright">
                Pencatatan Setoran Baru
              </h3>
              <p className="font-body-sm text-xs text-primary-fixed-dim">
                Infrastruktur Sirkular Presisi • Formulir Mandiri Warga
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeDepositModal}
            className="w-9 h-9 rounded-full flex items-center justify-center text-surface-variant hover:bg-primary-container transition-colors cursor-pointer"
            aria-label="Tutup modal"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-space-md sm:p-space-lg overflow-y-auto space-y-space-md flex-1">
          {/* Step 1: Select Category */}
          <div>
            <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider mb-space-xs font-bold">
              1. Pilih Kategori Material Terpilah
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {WASTE_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.name;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`flex items-center gap-2 p-2.5 rounded-lg text-left font-body-sm text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-primary text-on-primary shadow-sm ring-2 ring-tertiary-fixed'
                        : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-base ${isSelected ? 'text-tertiary-fixed' : 'text-outline'}`}>
                      {cat.icon}
                    </span>
                    <span className="truncate">{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Weight Stepper */}
          <div>
            <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider mb-space-xs font-bold">
              2. Bobot Estimasi (kg)
            </label>
            <div className="flex items-center gap-space-sm bg-surface-container rounded-lg p-2 max-w-xs">
              <button
                type="button"
                onClick={() => handleAdjustWeight(-0.5)}
                className="w-10 h-10 rounded-md bg-surface-container-lowest text-on-surface font-bold text-xl flex items-center justify-center hover:bg-surface-variant shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                -
              </button>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={weightKg}
                onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0.1)}
                className="w-full text-center bg-transparent font-metric-display text-headline-sm font-bold text-on-surface outline-none"
              />
              <button
                type="button"
                onClick={() => handleAdjustWeight(0.5)}
                className="w-10 h-10 rounded-md bg-surface-container-lowest text-on-surface font-bold text-xl flex items-center justify-center hover:bg-surface-variant shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                +
              </button>
              <span className="font-bold text-body-md text-on-surface-variant pr-2">kg</span>
            </div>
          </div>

          {/* Step 3: Location Drop Point */}
          <div>
            <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider mb-space-xs font-bold">
              3. Lokasi Drop-Point Tujuan
            </label>
            <select
              value={dropPoint}
              onChange={(e) => setDropPoint(e.target.value)}
              className="w-full h-11 px-3 rounded-lg bg-surface-container text-body-sm text-on-surface outline-none focus:ring-2 focus:ring-secondary"
            >
              {DROP_POINTS.map((dp) => (
                <option key={dp.id} value={dp.name}>
                  {dp.name} ({dp.city})
                </option>
              ))}
            </select>
          </div>

          {/* Step 4: Photo Evidence (Optional) */}
          <div>
            <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider mb-space-xs font-bold">
              4. Foto Bukti Sampah (Opsional)
            </label>
            {photoUrl ? (
              <div className="flex items-center gap-3 p-2 rounded-xl bg-surface-container border border-outline-variant/30">
                <img src={photoUrl} alt="Preview" className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1 text-xs">
                  <span className="font-bold text-primary block">Foto Terlampir</span>
                  <span className="text-outline text-[11px]">Siap diverifikasi di drop-point</span>
                </div>
                <button
                  type="button"
                  onClick={() => setPhotoUrl(undefined)}
                  className="px-3 h-8 rounded bg-error/10 text-error text-xs font-bold hover:bg-error/20 cursor-pointer"
                >
                  Hapus
                </button>
              </div>
            ) : (
              <label className="border-2 border-dashed border-outline-variant/40 rounded-xl p-3 flex items-center justify-center gap-2 cursor-pointer hover:bg-surface-container/50 transition-colors text-xs text-outline">
                <span className="material-symbols-outlined text-lg">add_a_photo</span>
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
            <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider mb-space-xs font-bold">
              5. Catatan Tambahan (Opsional)
            </label>
            <input
              type="text"
              placeholder="Contoh: Botol telah dicuci bersih dan dipipihkan..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-11 px-3 rounded-lg bg-surface-container text-body-sm text-on-surface outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          {/* Live Valuation Summary Card */}
          <div className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between">
            <div>
              <span className="font-label-caps text-label-caps text-on-surface-variant block uppercase font-bold">
                Estimasi Perolehan Poin & Nilai
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-headline-md text-headline-md font-bold text-secondary">
                  +{estimatedPoints} Poin
                </span>
                <span className="font-body-sm text-outline">
                  (≈ Rp {estimatedIdr.toLocaleString('id-ID')})
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-label-caps text-label-caps text-outline block uppercase font-bold">
                Reduksi CO₂e
              </span>
              <span className="font-title-md font-bold text-primary">
                ~{estimatedCo2} kg
              </span>
            </div>
          </div>

          <div className="text-[10px] text-outline italic text-center">
            * Nilai konversi merupakan estimasi simulasi kompetisi, bukan transaksi tunai perbankan riil.
          </div>

          {/* Submit Actions */}
          <div className="pt-space-xs flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={closeDepositModal}
              className="px-5 h-11 rounded-lg text-on-surface font-title-md text-sm hover:bg-surface-container transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 h-11 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed font-title-md text-sm font-bold hover:bg-tertiary-fixed-dim transition-all shadow-md cursor-pointer flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>Simpan & Konfirmasi Setoran</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
