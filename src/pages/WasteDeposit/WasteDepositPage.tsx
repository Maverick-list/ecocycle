import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useWasteBank } from '../../context/WasteBankContext';
import { WASTE_CATEGORIES } from '../../data/wasteData';
import { DROP_POINTS } from '../../data/locationsData';
import { ACADEMY_ARTICLES } from '../../data/articlesData';
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
      <div className="max-w-[1420px] mx-auto px-4 sm:px-8 lg:px-12 space-y-10 sm:space-y-14">
        
        {/* Breadcrumb & Header with Soft Gradient Divider */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-pill text-xs font-extrabold uppercase tracking-wider text-secondary">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_#10b981]" />
            <span>Formulir Penyerahan Mandiri</span>
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
            <span className="animate-title-flow">Pencatatan Setoran Sampah</span> Terpilah
          </h1>

          <p className="font-sans text-base sm:text-lg text-on-surface-variant dark:text-emerald-100/80 max-w-3xl leading-relaxed">
            Catat estimasi bobot sampah Anda untuk mendapatkan nomor registrasi setoran, dokumentasi foto bukti terverifikasi, dan perolehan EcoPoints instan.
          </p>

          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-secondary/10 border border-secondary/25 text-xs sm:text-sm text-secondary font-semibold">
            <Icon name="verified_user" size={18} />
            <span>Penyimpanan aman aktif — data transaksi Anda tersimpan terverifikasi pada sesi peramban ini.</span>
          </div>

          {/* Soft Organic Fading Gradient Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500/35 to-transparent pt-3" />
        </div>

        {submitted ? (
          <div className="max-w-3xl mx-auto p-10 sm:p-16 rounded-4xl glass-panel-elevated border border-secondary/40 shadow-2xl text-center space-y-8 animate-fadeIn">
            <div className="w-24 h-24 mx-auto rounded-3xl bg-secondary/20 text-secondary flex items-center justify-center text-5xl font-bold shadow-inner">
              <Icon name="check_circle" size={52} />
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary dark:text-white">
              Setoran Berhasil Didaftarkan!
            </h2>
            <p className="font-sans text-base sm:text-lg text-on-surface-variant dark:text-emerald-100/85 max-w-xl mx-auto leading-relaxed">
              Material <strong className="text-secondary font-black">{selectedCategory} ({weightKg} kg)</strong> telah dicatat ke buku tabungan digital Anda dengan perolehan <strong className="text-secondary font-black">+{estimatedPoints} EcoPoints</strong> (≈ Rp {estimatedIdr.toLocaleString('id-ID')}).
            </p>

            {photoUrl && (
              <div className="w-44 h-44 mx-auto rounded-3xl overflow-hidden border border-secondary/35 shadow-lg mt-4">
                <img src={photoUrl} alt="Bukti Foto Setoran" className="w-full h-full object-cover" />
              </div>
            )}

            <div className="pt-6 flex flex-wrap justify-center gap-5">
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setPhotoUrl(undefined);
                }}
                className="h-14 px-8 rounded-2xl glass-pill hover:bg-surface-container font-extrabold text-sm sm:text-base cursor-pointer transition-all active:scale-95 text-on-surface"
              >
                Catat Setoran Lainnya
              </button>
              <button
                type="button"
                onClick={() => navigate('/bank-sampah')}
                className="h-14 px-9 rounded-2xl bg-gradient-to-r from-emerald-500 to-[#10b981] text-white font-extrabold text-sm sm:text-base hover:from-emerald-400 hover:to-emerald-500 cursor-pointer flex items-center gap-2.5 shadow-xl transition-all active:scale-95"
              >
                <span>Buka Buku Tabungan</span>
                <Icon name="arrow_forward" size={18} />
              </button>
            </div>
          </div>
        ) : (
          /* Main 2-Column Spacious Layout: Form (Col 8) + Dedicated Article Column (Col 4) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* COLUMN 1: FORMULIR SETOR SAMPAH (SPACIOUS & EXPANDED) */}
            <div className="lg:col-span-8">
              <form onSubmit={handleSubmit} className="p-8 sm:p-12 lg:p-14 rounded-4xl glass-panel-elevated border border-outline-variant/30 dark:border-emerald-500/25 shadow-2xl space-y-10 sm:space-y-12">
                
                {/* Step 1: Select Category */}
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <label className="block font-label-caps text-sm sm:text-base font-extrabold text-secondary uppercase tracking-wider">
                      1. Pilih Kategori Material
                    </label>
                    <span className="text-xs text-on-surface-variant dark:text-emerald-300/70">
                      Tersedia 8 kategori terstandar
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
                    {WASTE_CATEGORIES.map((cat) => {
                      const isSelected = selectedCategory === cat.name;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setSelectedCategory(cat.name)}
                          className={`p-5 rounded-2xl text-left font-sans transition-all cursor-pointer flex flex-col justify-between min-h-[125px] border ${
                            isSelected
                              ? 'bg-secondary text-white border-secondary ring-2 ring-emerald-300/50 shadow-xl scale-[1.02]'
                              : 'glass-panel border-outline-variant/25 text-on-surface hover:border-secondary/45 hover:bg-surface-container/70'
                          }`}
                        >
                          <Icon name={cat.icon} size={28} className={isSelected ? 'text-white' : 'text-secondary'} />
                          <div className="space-y-1">
                            <span className="block font-extrabold text-sm sm:text-base leading-tight">{cat.name}</span>
                            <span className={`text-xs block font-semibold ${isSelected ? 'text-emerald-100' : 'text-outline'}`}>
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
                  <label className="block font-label-caps text-sm sm:text-base font-extrabold text-secondary uppercase tracking-wider">
                    2. Estimasi Bobot Timbangan (kg)
                  </label>
                  <div className="flex items-center gap-5 bg-surface-container/80 dark:bg-[#062417] border border-outline-variant/25 rounded-2xl p-4 sm:p-5 max-w-lg shadow-inner">
                    <button
                      type="button"
                      onClick={() => handleAdjustWeight(-0.5)}
                      className="w-16 h-16 rounded-2xl bg-white dark:bg-[#0d3b26] text-on-surface dark:text-white font-black text-3xl flex items-center justify-center hover:bg-secondary hover:text-white shadow-md active:scale-95 transition-all cursor-pointer shrink-0"
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
                      className="w-full text-center bg-transparent font-metric-display text-4xl sm:text-5xl font-black text-on-surface dark:text-white outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleAdjustWeight(0.5)}
                      className="w-16 h-16 rounded-2xl bg-white dark:bg-[#0d3b26] text-on-surface dark:text-white font-black text-3xl flex items-center justify-center hover:bg-secondary hover:text-white shadow-md active:scale-95 transition-all cursor-pointer shrink-0"
                      title="Tambah 0.5 kg"
                    >
                      +
                    </button>
                    <span className="font-extrabold text-2xl text-on-surface-variant pr-3">kg</span>
                  </div>
                </div>

                {/* Step 3 & 4: Date & Drop Point */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-2.5">
                    <label className="block text-sm font-extrabold text-secondary uppercase tracking-wider">
                      3. Tanggal Rencana Penyerahan
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full h-14 sm:h-15 px-5 rounded-2xl bg-surface-container/80 dark:bg-[#062417] text-sm sm:text-base text-on-surface dark:text-white outline-none focus:ring-2 focus:ring-secondary border border-outline-variant/30 transition-all shadow-inner"
                    />
                  </div>

                  <div className="space-y-2.5">
                    <label className="block text-sm font-extrabold text-secondary uppercase tracking-wider">
                      4. Titik Drop-Point Tujuan
                    </label>
                    <select
                      value={dropPoint}
                      onChange={(e) => setDropPoint(e.target.value)}
                      className="w-full h-14 sm:h-15 px-5 rounded-2xl bg-surface-container/80 dark:bg-[#062417] text-sm sm:text-base text-on-surface dark:text-white outline-none focus:ring-2 focus:ring-secondary border border-outline-variant/30 transition-all shadow-inner"
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
                <div className="space-y-3.5">
                  <label className="block text-sm font-extrabold text-secondary uppercase tracking-wider">
                    5. Bukti Foto Material (Opsional)
                  </label>
                  <div className="p-7 rounded-3xl border-2 border-dashed border-outline-variant/40 dark:border-emerald-500/35 bg-surface-container/40 dark:bg-[#051f14] flex flex-col sm:flex-row items-center gap-6">
                    {photoUrl ? (
                      <div className="relative w-32 h-32 rounded-2xl overflow-hidden border border-secondary shadow-lg shrink-0">
                        <img src={photoUrl} alt="Preview Bukti Setoran" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setPhotoUrl(undefined)}
                          className="absolute top-2 right-2 w-7 h-7 bg-error text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md cursor-pointer hover:scale-110 active:scale-95 transition-all"
                          title="Hapus foto"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <div className="w-32 h-32 rounded-2xl bg-surface-container dark:bg-[#0b3321] flex flex-col items-center justify-center text-secondary shrink-0 shadow-inner">
                        <Icon name="camera" size={36} />
                        <span className="text-xs font-bold mt-2">Unggah Foto</span>
                      </div>
                    )}
                    <div className="flex-1 text-center sm:text-left space-y-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        id="page-file-upload"
                        className="hidden"
                      />
                      <label
                        htmlFor="page-file-upload"
                        className="inline-block px-6 py-3 rounded-xl bg-secondary text-white hover:bg-secondary/90 text-sm font-extrabold cursor-pointer transition-all shadow-md active:scale-95"
                      >
                        {photoUrl ? 'Ganti Foto Bukti' : 'Pilih Foto dari Galeri / Kamera'}
                      </label>
                      <p className="text-xs sm:text-sm text-on-surface-variant dark:text-emerald-100/70">
                        Format JPG, PNG, atau WebP (Disimpan lokal sebagai manifest verifikasi drop-point).
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 6: Optional Notes */}
                <div className="space-y-3">
                  <label className="block text-sm font-extrabold text-secondary uppercase tracking-wider">
                    6. Keterangan Wadah / Catatan Pemilahan
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: 1 karung botol bersih siap giling..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full h-14 sm:h-15 px-5 rounded-2xl bg-surface-container/80 dark:bg-[#062417] text-sm sm:text-base text-on-surface dark:text-white outline-none focus:ring-2 focus:ring-secondary border border-outline-variant/30 transition-all shadow-inner"
                  />
                </div>

                {/* Conversion Summary Banner (Roomy & High Contrast) */}
                <div className="p-7 sm:p-9 rounded-3xl bg-gradient-to-br from-secondary/15 via-secondary/5 to-transparent border border-secondary/35 grid grid-cols-1 sm:grid-cols-3 gap-6 shadow-xl">
                  <div className="space-y-1.5">
                    <span className="text-xs sm:text-sm text-secondary uppercase font-black block tracking-wider">
                      Estimasi Perolehan
                    </span>
                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="text-3xl sm:text-4xl font-black font-metric-display text-secondary">
                        +{estimatedPoints} Poin
                      </span>
                      <span className="text-sm font-bold text-on-surface-variant dark:text-emerald-100/80">
                        (Rp {estimatedIdr.toLocaleString('id-ID')})
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-xs sm:text-sm text-secondary uppercase font-black block tracking-wider">
                      Reduksi Emisi Karbon
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-primary dark:text-white block pt-1">
                      ~{estimatedCo2} kg CO₂e
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-xs sm:text-sm text-secondary uppercase font-black block tracking-wider">
                      Konservasi Air Bersih
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-primary dark:text-white block pt-1">
                      ~{estimatedWater} Liter
                    </span>
                  </div>
                </div>

                {/* Action Buttons (Spacious, Clear & Protected from Footer Collisions) */}
                <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row justify-end items-center gap-5">
                  <button
                    type="button"
                    onClick={() => navigate('/bank-sampah')}
                    className="w-full sm:w-auto h-14 px-7 rounded-2xl glass-pill hover:bg-surface-container text-sm font-bold transition-all cursor-pointer active:scale-95 text-on-surface"
                  >
                    Kembali ke Bank Sampah
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto h-14 px-9 rounded-2xl bg-gradient-to-r from-emerald-500 to-[#10b981] text-white font-title-md text-base font-extrabold hover:from-emerald-400 hover:to-emerald-500 transition-all shadow-xl hover:shadow-2xl cursor-pointer flex items-center justify-center gap-3 active:scale-95"
                  >
                    <Icon name="check_circle" size={22} />
                    <span>Konfirmasi & Simpan Setoran</span>
                  </button>
                </div>

              </form>
            </div>

            {/* COLUMN 2: KOLOM ARTIKEL PANDUAN PEMILAHAN (LEBAR, BESAR & MUDAH DIBACA) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Card Header Kolom Artikel */}
              <div className="p-7 rounded-3xl glass-panel-elevated border border-outline-variant/25 dark:border-emerald-500/25 shadow-xl space-y-5">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/20 text-secondary flex items-center justify-center font-black shadow-inner">
                    <Icon name="menu_book" size={26} />
                  </div>
                  <div>
                    <h2 className="font-display font-extrabold text-xl sm:text-2xl text-primary dark:text-white tracking-tight">
                      Kolom Panduan
                    </h2>
                    <p className="text-xs font-semibold text-secondary uppercase tracking-wider">
                      Standar SNI 19-3983-1995
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-on-surface-variant dark:text-emerald-100/75 leading-relaxed">
                  Pelajari protokol pemilahan agar material yang Anda setorkan memenuhi standar industri daur ulang sekunder dan memperoleh nilai tukar maksimal.
                </p>

                {/* 3 Golden Rules Quick Checklist */}
                <div className="p-4 rounded-2xl bg-surface-container/60 dark:bg-[#062417] border border-outline-variant/15 space-y-3">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-secondary block">
                    3 Kaidah Higienitas Drop-Point:
                  </span>
                  
                  <div className="flex items-start gap-2.5 text-xs text-on-surface dark:text-emerald-100/85">
                    <Icon name="check" size={16} className="text-secondary shrink-0 mt-0.5" />
                    <span><strong>Bilas Bersih</strong> dari residu minyak, kuah, atau gula.</span>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs text-on-surface dark:text-emerald-100/85">
                    <Icon name="check" size={16} className="text-secondary shrink-0 mt-0.5" />
                    <span><strong>Pipihkan / Kompres</strong> untuk efisiensi ruang angkut 75%.</span>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs text-on-surface dark:text-emerald-100/85">
                    <Icon name="check" size={16} className="text-secondary shrink-0 mt-0.5" />
                    <span><strong>Pisahkan Material</strong> sesuai klasifikasi resin/kertas.</span>
                  </div>
                </div>
              </div>

              {/* Curated High-Value Articles */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <h3 className="font-display font-bold text-base text-primary dark:text-white">
                    Artikel Edukasi Pilihan
                  </h3>
                  <Link
                    to="/edukasi"
                    className="text-xs font-extrabold text-secondary hover:underline flex items-center gap-1"
                  >
                    <span>Lihat Semua</span>
                    <Icon name="arrow_forward" size={13} />
                  </Link>
                </div>

                {ACADEMY_ARTICLES.slice(0, 3).map((article) => (
                  <div
                    key={article.id}
                    className="p-5 rounded-2xl glass-panel border border-outline-variant/20 dark:border-emerald-500/20 hover:border-secondary/40 transition-all space-y-3 group"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="px-2.5 py-1 rounded-full bg-secondary/15 text-secondary font-bold">
                        {article.category}
                      </span>
                      <span className="text-on-surface-variant dark:text-emerald-300/60 font-medium">
                        {article.readTime}
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-sm sm:text-base text-primary dark:text-white group-hover:text-secondary transition-colors line-clamp-2">
                      {article.title}
                    </h4>

                    <p className="text-xs text-on-surface-variant dark:text-emerald-100/70 line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </p>

                    <Link
                      to="/edukasi"
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-secondary pt-1 hover:gap-2 transition-all"
                    >
                      <span>Pelajari Selengkapnya</span>
                      <Icon name="arrow_forward" size={14} />
                    </Link>
                  </div>
                ))}
              </div>

              {/* Call to Action Help Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-secondary/20 via-surface-container to-surface border border-secondary/30 text-center space-y-3.5 shadow-md">
                <Icon name="help" size={28} className="text-secondary mx-auto" />
                <h4 className="font-display font-bold text-base text-primary dark:text-white">
                  Bingung Klasifikasi Sampah?
                </h4>
                <p className="text-xs text-on-surface-variant dark:text-emerald-100/75 leading-relaxed">
                  Konsultasikan langsung pada Asisten Sirkular kami atau telusuri standar taksonomi material di Panduan Pemilahan.
                </p>
                <Link
                  to="/pemilahan"
                  className="inline-block w-full py-3 rounded-xl bg-secondary text-white font-extrabold text-xs shadow-md hover:bg-secondary/90 transition-all"
                >
                  Buka Taksonomi Material
                </Link>
              </div>

            </div>

          </div>
        )}

      </div>
    </PageTransition>
  );
};
