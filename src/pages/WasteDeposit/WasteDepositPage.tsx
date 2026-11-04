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
    <PageTransition className="w-full bg-surface py-space-xl">
      <div className="max-w-[1000px] mx-auto px-margin-sm lg:px-margin space-y-space-lg">
        
        {/* Breadcrumb & Header */}
        <div className="border-b border-outline-variant/30 pb-space-md">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
            <span className="font-label-caps text-secondary font-bold uppercase tracking-wider text-xs">
              Formulir Penyerahan Mandiri
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl font-bold text-primary tracking-tight">
            Pencatatan Setoran Sampah Terpilah
          </h1>
          <p className="font-body-md text-on-surface-variant max-w-xl mt-1 text-xs sm:text-sm leading-relaxed">
            Catat estimasi bobot sampah Anda untuk mendapatkan nomor registrasi setoran, dokumentasi foto, dan perolehan EcoPoints instan.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-md bg-secondary-fixed/30 border border-secondary/20 text-[11px] text-secondary font-semibold">
            <Icon name="info" size={14} />
            <span>Simulasi data tersimpan pada LocalStorage peramban untuk keperluan evaluasi kompetisi.</span>
          </div>
        </div>

        {submitted ? (
          <div className="p-space-xl rounded-2xl bg-surface-container-lowest border border-secondary shadow-xl text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 mx-auto rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center text-3xl font-bold">
              <Icon name="check" size={32} />
            </div>
            <h2 className="font-headline-md font-bold text-primary">
              Setoran Berhasil Didaftarkan!
            </h2>
            <p className="font-body-md text-on-surface-variant max-w-md mx-auto text-xs sm:text-sm">
              Material <strong>{selectedCategory} ({weightKg} kg)</strong> telah dicatat ke buku tabungan digital Anda dengan perolehan <strong>+{estimatedPoints} EcoPoints</strong> (≈ Rp {estimatedIdr.toLocaleString('id-ID')}).
            </p>

            {photoUrl && (
              <div className="w-32 h-32 mx-auto rounded-xl overflow-hidden border border-outline-variant/40 shadow-sm mt-2">
                <img src={photoUrl} alt="Bukti Foto Setoran" className="w-full h-full object-cover" />
              </div>
            )}

            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setPhotoUrl(undefined);
                }}
                className="h-11 px-5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-bold text-xs cursor-pointer"
              >
                Catat Setoran Lainnya
              </button>
              <button
                type="button"
                onClick={() => navigate('/bank-sampah')}
                className="h-11 px-6 rounded-lg bg-primary text-on-primary font-bold text-xs hover:bg-primary-container cursor-pointer flex items-center gap-1.5"
              >
                <span>Buka Buku Tabungan</span>
                <Icon name="arrow_forward" size={14} />
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-space-lg sm:p-space-xl rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-md space-y-space-md">
            
            {/* Step 1: Select Category */}
            <div>
              <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider mb-2 font-bold text-xs">
                1. Pilih Kategori Material
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {WASTE_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.name;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`p-3 rounded-xl text-left font-body-sm text-xs font-semibold transition-all cursor-pointer flex flex-col justify-between h-24 ${
                        isSelected
                          ? 'bg-primary text-on-primary ring-2 ring-tertiary-fixed shadow-md'
                          : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                      }`}
                    >
                      <Icon name={cat.icon} size={22} className={isSelected ? 'text-tertiary-fixed' : 'text-outline'} />
                      <div>
                        <span className="block font-bold">{cat.name}</span>
                        <span className={`text-[10px] ${isSelected ? 'text-primary-fixed-dim' : 'text-outline'}`}>
                          Rp {cat.pricePerKg.toLocaleString('id-ID')}/kg
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Weight Stepper */}
            <div>
              <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider mb-2 font-bold text-xs">
                2. Estimasi Bobot Timbangan (kg)
              </label>
              <div className="flex items-center gap-4 bg-surface-container rounded-xl p-3 max-w-sm">
                <button
                  type="button"
                  onClick={() => handleAdjustWeight(-0.5)}
                  className="w-12 h-12 rounded-lg bg-surface-container-lowest text-on-surface font-extrabold text-2xl flex items-center justify-center hover:bg-surface-variant shadow-sm active:scale-95 transition-all cursor-pointer"
                >
                  -
                </button>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={weightKg}
                  onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0.1)}
                  className="w-full text-center bg-transparent font-metric-display text-3xl font-extrabold text-on-surface outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleAdjustWeight(0.5)}
                  className="w-12 h-12 rounded-lg bg-surface-container-lowest text-on-surface font-extrabold text-2xl flex items-center justify-center hover:bg-surface-variant shadow-sm active:scale-95 transition-all cursor-pointer"
                >
                  +
                </button>
                <span className="font-bold text-lg text-on-surface-variant pr-2">kg</span>
              </div>
            </div>

            {/* Step 3 & 4: Date & Drop Point */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">
                  3. Tanggal Rencana Penyerahan
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-lg bg-surface-container text-xs text-on-surface outline-none focus:ring-2 focus:ring-secondary border border-outline-variant/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">
                  4. Titik Drop-Point Tujuan
                </label>
                <select
                  value={dropPoint}
                  onChange={(e) => setDropPoint(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-lg bg-surface-container text-xs text-on-surface outline-none focus:ring-2 focus:ring-secondary border border-outline-variant/20"
                >
                  {DROP_POINTS.map((dp) => (
                    <option key={dp.id} value={dp.name}>{dp.name} ({dp.city})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 5: Photo Evidence */}
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">
                5. Bukti Foto Material (Opsional)
              </label>
              <div className="p-4 rounded-xl border border-dashed border-outline-variant bg-surface-container-low flex flex-col sm:flex-row items-center gap-4">
                {photoUrl ? (
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-outline shrink-0">
                    <img src={photoUrl} alt="Preview Bukti Setoran" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setPhotoUrl(undefined)}
                      className="absolute top-1 right-1 w-5 h-5 bg-error text-on-error rounded-full flex items-center justify-center text-xs"
                      title="Hapus foto"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-lg bg-surface-container flex flex-col items-center justify-center text-outline shrink-0">
                    <Icon name="camera" size={28} className="text-outline" />
                    <span className="text-[10px] mt-1">Unggah Foto</span>
                  </div>
                )}
                <div className="flex-1 text-center sm:text-left space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    id="page-file-upload"
                    className="hidden"
                  />
                  <label
                    htmlFor="page-file-upload"
                    className="inline-block px-4 py-2 rounded-lg bg-surface-container-high hover:bg-secondary-container hover:text-on-secondary-container text-xs font-bold text-primary cursor-pointer transition-colors"
                  >
                    {photoUrl ? 'Ganti Foto Bukti' : 'Pilih Foto dari Galeri / Kamera'}
                  </label>
                  <p className="text-[11px] text-outline">
                    Format JPG, PNG, atau WebP (Disimpan lokal sebagai manifest verifikasi drop-point).
                  </p>
                </div>
              </div>
            </div>

            {/* Step 6: Optional Notes */}
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">
                6. Keterangan Wadah / Catatan Pemilahan
              </label>
              <input
                type="text"
                placeholder="Contoh: 1 karung botol bersih siap giling..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full h-11 px-3.5 rounded-lg bg-surface-container text-xs text-on-surface outline-none focus:ring-2 focus:ring-secondary border border-outline-variant/20"
              />
            </div>

            {/* Conversion Summary Banner */}
            <div className="p-4 rounded-xl bg-surface-container-low border border-secondary/30 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <span className="text-[11px] text-outline uppercase font-bold block">
                  Estimasi Perolehan
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl font-bold font-metric-display text-secondary">
                    +{estimatedPoints} Poin
                  </span>
                  <span className="text-xs font-bold text-primary">
                    (Rp {estimatedIdr.toLocaleString('id-ID')})
                  </span>
                </div>
              </div>
              <div>
                <span className="text-[11px] text-outline uppercase font-bold block">
                  Reduksi Emisi Karbon
                </span>
                <span className="text-xl font-bold text-primary">
                  ~{estimatedCo2} kg CO₂e
                </span>
              </div>
              <div>
                <span className="text-[11px] text-outline uppercase font-bold block">
                  Konservasi Air Bersih
                </span>
                <span className="text-xl font-bold text-primary">
                  ~{estimatedWater} Liter
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate('/bank-sampah')}
                className="h-11 px-5 rounded-lg text-xs font-bold hover:bg-surface-container transition-colors cursor-pointer"
              >
                Kembali ke Bank Sampah
              </button>
              <button
                type="submit"
                className="h-11 px-7 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed font-title-md text-sm font-bold hover:bg-tertiary-fixed-dim transition-all shadow-md cursor-pointer flex items-center gap-2"
              >
                <Icon name="check_circle" size={18} />
                <span>Konfirmasi & Simpan Setoran</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </PageTransition>
  );
};
