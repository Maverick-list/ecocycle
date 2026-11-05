import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SORTING_ITEMS } from '../../data/wasteData';
import { Icon } from '../../components/ui/Icon';
import { PageTransition } from '../../components/ui/PageTransition';
import { SEOHead } from '../../components/seo/SEOHead';

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
    <PageTransition className="w-full min-h-screen bg-surface dark:bg-[#03140d] text-on-surface dark:text-white py-12 sm:py-16 transition-colors duration-300">
      <SEOHead
        title="Panduan Pemilahan Pintar & Identifikasi Material"
        canonical="/pemilahan-pintar"
        description="Katalog standar pemilahan sampah komprehensif dengan nilai ekonomi, faktor reduksi emisi CO2, dan pedoman pemrosesan daur ulang terverifikasi."
      />
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        
        {/* Editorial Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-outline-variant/20">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-semibold uppercase tracking-wider text-secondary">
              <Icon name="search" size={14} />
              <span>Standar Dekontaminasi Industri</span>
            </div>
            <h1 className="font-display font-extrabold text-page-title tracking-tight leading-tight">
              <span className="animate-title-flow">Panduan Pemilahan Presisi</span> & Taksonomi Material
            </h1>
            <p className="font-sans text-subheading text-on-surface-variant font-normal leading-relaxed">
              Memilah bukan sekadar melempar ke wadah berbeda. Pelajari kaidah higienitas, kompresi volume, dan standardisasi pemilahan agar material memiliki nilai daur ulang industri optimal.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/bank-sampah"
              className="h-11 px-5 rounded-xl bg-secondary text-white font-sans text-xs font-bold hover:bg-secondary/90 transition-all shadow-md flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Icon name="add_circle" size={16} />
              <span>Buka Bank Sampah</span>
            </Link>
          </div>
        </div>

        {/* Filter Chips & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Stream Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {streams.map((stream) => {
              const isSelected = selectedStream === stream;
              return (
                <button
                  key={stream}
                  type="button"
                  onClick={() => setSelectedStream(stream)}
                  className={`h-10 px-5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-secondary text-white shadow-sm'
                      : 'glass-pill hover:bg-surface-container text-on-surface'
                  }`}
                >
                  {stream === 'Anorganik' && <Icon name="recycle" size={14} />}
                  {stream === 'Organik' && <Icon name="eco" size={14} />}
                  {stream === 'B3' && <Icon name="warning" size={14} />}
                  {stream === 'E-Waste' && <Icon name="bolt" size={14} />}
                  <span>{stream}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Cari material (botol, kardus, aki...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl glass-panel text-xs text-on-surface outline-none focus:ring-2 focus:ring-secondary/50 border border-outline-variant/30"
            />
            <div className="absolute left-3 top-3 text-outline">
              <Icon name="search" size={18} />
            </div>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-outline hover:text-on-surface text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Main Content Layout: Items Grid (7 cols) + Detail Drawer (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Grid: Catalog of items (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredItems.map((item) => {
              const isSelected = item.id === activeItem.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItemId(item.id)}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'glass-panel-elevated border-secondary ring-2 ring-secondary/25 shadow-lg'
                      : 'glass-panel border-outline-variant/20 hover:border-outline-variant/40 hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-1 rounded-full bg-secondary/15 text-secondary font-bold text-[10px] uppercase tracking-wider">
                        {item.stream}
                      </span>
                      <span className="text-[11px] font-semibold text-outline">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-base text-primary mb-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-on-surface-variant line-clamp-2 mb-4 leading-relaxed">
                      {item.dos}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-outline-variant/15 flex items-center justify-between text-xs">
                    <span className="text-outline">Tingkat: <strong className="text-on-surface">{item.difficulty}</strong></span>
                    <span className="text-secondary font-bold flex items-center gap-1 group">
                      <span>Protokol</span>
                      <Icon name="arrow_forward" size={13} />
                    </span>
                  </div>
                </div>
              );
            })}

            {filteredItems.length === 0 && (
              <div className="col-span-2 p-12 text-center rounded-3xl glass-panel border border-outline-variant/25">
                <div className="w-12 h-12 mx-auto rounded-full bg-surface-container flex items-center justify-center text-outline mb-3">
                  <Icon name="search_off" size={24} />
                </div>
                <p className="font-display font-bold text-primary text-base">Tidak Ditemukan Material Terkait</p>
                <p className="text-xs text-on-surface-variant mt-1">
                  Coba kata kunci umum seperti 'botol', 'kardus', 'kertas', atau 'minyak'.
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Selected Item Inspection Drawer (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl glass-panel-elevated border border-outline-variant/25 p-8 shadow-xl space-y-6 sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/15">
              <div>
                <span className="text-[11px] font-bold text-secondary uppercase tracking-wider block">
                  Protokol Dekontaminasi Aktif
                </span>
                <h3 className="font-display font-bold text-xl text-primary mt-1">
                  {activeItem.name}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-secondary/15 text-secondary font-bold text-xs">
                {activeItem.category}
              </span>
            </div>

            {/* Preparation Steps Checklist */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-primary uppercase tracking-wider">
                Langkah Persiapan Sebelum Disetor:
              </h4>
              <div className="space-y-2.5">
                {activeItem.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs text-on-surface">
                    <div className="w-5 h-5 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold shrink-0 mt-0.5 text-[10px]">
                      {idx + 1}
                    </div>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Do's & Don'ts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-secondary/10 border border-secondary/25">
                <span className="text-[11px] font-bold text-secondary uppercase flex items-center gap-1.5 mb-1.5">
                  <Icon name="check_circle" size={14} className="text-secondary" />
                  <span>Kaidah Benar</span>
                </span>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {activeItem.dos}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-error/10 border border-error/25">
                <span className="text-[11px] font-bold text-error uppercase flex items-center gap-1.5 mb-1.5">
                  <Icon name="cancel" size={14} className="text-error" />
                  <span>Hindari Hal Ini</span>
                </span>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {activeItem.donts}
                </p>
              </div>
            </div>

            {/* Value Proposition Callout */}
            <div className="p-5 rounded-2xl glass-panel border border-secondary/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center shrink-0">
                  <Icon name="savings" size={20} />
                </div>
                <div>
                  <span className="text-xs font-bold text-primary block">
                    Nilai Optimal di Bank Sampah
                  </span>
                  <span className="text-[11px] text-on-surface-variant">
                    Material bersih dihargai penuh tanpa pemotongan timbangan tara.
                  </span>
                </div>
              </div>
              <Link
                to="/bank-sampah"
                className="px-4 py-2 rounded-xl bg-secondary text-white text-xs font-bold hover:bg-secondary/90 shrink-0 transition-all"
              >
                Setor
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Three Editorial Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-outline-variant/20">
          <div className="p-8 rounded-3xl glass-panel border border-outline-variant/20 flex flex-col justify-between space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center">
              <Icon name="clean_hands" size={26} />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-primary mb-2">
                1. Kaidah Higienitas
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Bilas residu manis, minyak, dan saus menggunakan sisa air bilasan cucian piring. Material bersih tidak memicu bau busuk dan mencegah kontaminasi silang pada mesin pemrosesan pabrik.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-3xl glass-panel border border-outline-variant/20 flex flex-col justify-between space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center">
              <Icon name="compress" size={26} />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-primary mb-2">
                2. Kompresi Volume
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Injak botol plastik dan lipat rapi lembaran kardus hingga pipih. Reduksi volume fisik hingga 70% melipatgandakan daya muat kendaraan logistik dan memangkas jejak emisi bahan bakar.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-3xl glass-panel border border-outline-variant/20 flex flex-col justify-between space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center">
              <Icon name="diversity_1" size={26} />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-primary mb-2">
                3. Manfaat Nyata Sirkular
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Menjaga lingkungan rumah bebas dari hama pengganggu, menanamkan kesadaran sains ekologis pada generasi muda, serta mengalirkan kembali bahan baku berkualitas ke industri manufaktur.
              </p>
            </div>
          </div>
        </div>

      </div>
    </PageTransition>
  );
};
