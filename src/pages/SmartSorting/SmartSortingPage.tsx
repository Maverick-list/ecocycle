import React, { useState } from 'react';
import { SORTING_ITEMS } from '../../data/wasteData';

export const SmartSortingPage: React.FC = () => {
  const [selectedStream, setSelectedStream] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItemId, setSelectedItemId] = useState<string>(SORTING_ITEMS[0].id);

  const streams = ['Semua', 'Anorganik', 'Organik', 'B3', 'E-Waste'];

  const filteredItems = SORTING_ITEMS.filter((item) => {
    const matchesStream = selectedStream === 'Semua' || item.stream === selectedStream;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.dos.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStream && matchesSearch;
  });

  const activeItem = SORTING_ITEMS.find((it) => it.id === selectedItemId) || filteredItems[0] || SORTING_ITEMS[0];

  return (
    <div className="w-full bg-surface py-space-xl">
      <div className="max-w-[1380px] mx-auto px-margin-sm lg:px-margin space-y-space-xl">
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-space-xl items-center pb-space-lg border-b border-outline-variant/30">
          <div className="lg:col-span-7 space-y-space-sm">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-secondary text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span>Smart Waste Sorting Guide</span>
            </div>
            <h1 className="font-display-hero text-display-hero-mobile md:text-headline-xl font-extrabold text-primary tracking-tight">
              Panduan Pemilahan Presisi & Analitik Material
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
              Memilah bukan sekadar membuang ke wadah berbeda. Pelajari kaidah higienitas, kompresi volume, dan teknik persiapan material agar bernilai daur ulang optimal.
            </p>
          </div>

          <div className="lg:col-span-5 rounded-2xl overflow-hidden shadow-lg border border-outline-variant/30 max-h-72">
            <img
              src="/assets/images/hero_sorting.jpg"
              alt="Indonesian family kitchen waste sorting"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Filter Chips & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Stream Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {streams.map((stream) => (
              <button
                key={stream}
                type="button"
                onClick={() => setSelectedStream(stream)}
                className={`h-9 px-4 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedStream === stream
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                }`}
              >
                {stream}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Cari jenis sampah (contoh: botol, kardus, baterai...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-surface-container text-xs text-on-surface outline-none focus:ring-2 focus:ring-secondary border border-outline-variant/20"
            />
            <span className="material-symbols-outlined text-[20px] text-outline absolute left-3 top-2.5">
              search
            </span>
          </div>
        </div>

        {/* Main Content Layout: Items Grid (7 cols) + Detail Drawer (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          
          {/* Left Grid: Catalog of items (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredItems.map((item) => {
              const isSelected = item.id === activeItem.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItemId(item.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-surface-container-lowest border-secondary ring-2 ring-secondary/20 shadow-md'
                      : 'bg-surface-container-lowest border-outline-variant/30 hover:border-outline-variant hover:shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-primary font-bold text-[10px] uppercase">
                        {item.stream}
                      </span>
                      <span className="text-[11px] font-semibold text-secondary">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="font-title-md font-bold text-sm text-primary mb-1">
                      {item.name}
                    </h3>
                    <p className="font-body-sm text-xs text-on-surface-variant line-clamp-2 mb-3">
                      {item.dos}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-outline-variant/10 flex items-center justify-between text-xs">
                    <span className="text-outline">Tingkat: <strong>{item.difficulty}</strong></span>
                    <span className="text-secondary font-bold flex items-center gap-0.5">
                      <span>Detail Kaidah</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </span>
                  </div>
                </div>
              );
            })}

            {filteredItems.length === 0 && (
              <div className="col-span-2 p-10 text-center rounded-xl bg-surface-container-low border border-outline-variant/20">
                <span className="material-symbols-outlined text-4xl text-outline mb-2">search_off</span>
                <p className="font-bold text-primary text-sm">Tidak Ditemukan Material Terkait</p>
                <p className="text-xs text-on-surface-variant mt-1">
                  Coba kata kunci umum seperti 'botol', 'kaleng', 'kertas', atau 'minyak'.
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Selected Item Inspection Drawer (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 p-space-lg shadow-lg space-y-space-md sticky top-28">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
              <div>
                <span className="font-label-caps text-secondary font-bold uppercase tracking-wider block">
                  Protokol Penanganan Terpilih
                </span>
                <h3 className="font-headline-sm font-bold text-primary mt-0.5">
                  {activeItem.name}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-primary text-on-primary font-bold text-xs">
                {activeItem.category}
              </span>
            </div>

            {/* Preparation Steps Checklist */}
            <div>
              <h4 className="font-title-md font-bold text-xs text-primary uppercase tracking-wider mb-2">
                Langkah Persiapan Sebelum Setor:
              </h4>
              <div className="space-y-2">
                {activeItem.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-on-surface">
                    <div className="w-5 h-5 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold shrink-0 mt-0.5 text-[10px]">
                      {idx + 1}
                    </div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Do's & Don'ts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-surface-container-low border border-secondary/30">
                <span className="text-[11px] font-bold text-secondary uppercase flex items-center gap-1 mb-1">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  <span>Kaidah Benar</span>
                </span>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {activeItem.dos}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-error-container/30 border border-error/30">
                <span className="text-[11px] font-bold text-error uppercase flex items-center gap-1 mb-1">
                  <span className="material-symbols-outlined text-sm">cancel</span>
                  <span>Hindari Hal Ini</span>
                </span>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {activeItem.donts}
                </p>
              </div>
            </div>

            {/* Educational Value Proposition Callout */}
            <div className="p-3.5 rounded-xl bg-primary text-on-primary flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-xl">savings</span>
              </div>
              <div>
                <span className="text-xs font-bold text-surface-bright block">
                  Nilai Ekonomis di Bank Sampah
                </span>
                <span className="text-[11px] text-primary-fixed-dim">
                  Material yang disiapkan sesuai protokol diterima dengan harga penuh tanpa potongan timbangan.
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Three Editorial Guidelines Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter pt-space-lg border-t border-outline-variant/30">
          
          <div className="p-space-lg rounded-2xl bg-primary text-on-primary shadow-md">
            <span className="material-symbols-outlined text-tertiary-fixed text-3xl mb-2">clean_hands</span>
            <h3 className="font-headline-sm font-bold text-surface-bright mb-1">
              1. Kaidah Higienitas
            </h3>
            <p className="font-body-sm text-xs text-primary-fixed-dim leading-relaxed">
              Bilas residu manis, minyak, dan saus menggunakan air bilasan cucian piring. Material bersih tidak memicu bau busuk di rumah dan mencegah penolakan oleh industri daur ulang.
            </p>
          </div>

          <div className="p-space-lg rounded-2xl bg-primary text-on-primary shadow-md">
            <span className="material-symbols-outlined text-tertiary-fixed text-3xl mb-2">compress</span>
            <h3 className="font-headline-sm font-bold text-surface-bright mb-1">
              2. Kompresi Volume
            </h3>
            <p className="font-body-sm text-xs text-primary-fixed-dim leading-relaxed">
              Injak botol plastik dan lipat lembaran kardus hingga pipih. Reduksi volume fisik hingga 70% menghemat kapasitas angkut logistik dan memangkas jejak emisi bahan bakar truk.
            </p>
          </div>

          <div className="p-space-lg rounded-2xl bg-primary text-on-primary shadow-md">
            <span className="material-symbols-outlined text-tertiary-fixed text-3xl mb-2">diversity_1</span>
            <h3 className="font-headline-sm font-bold text-surface-bright mb-1">
              3. Manfaat Nyata Keluarga
            </h3>
            <p className="font-body-sm text-xs text-primary-fixed-dim leading-relaxed">
              Menjaga dapur tetap steril dari kecoa dan tikus, mengedukasi anak-anak tentang sains lingkungan praktis, serta mengubah barang tak terpakai menjadi saldo tabungan rupiah.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
