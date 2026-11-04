import React, { useState } from 'react';
import { ACADEMY_ARTICLES, MYTH_FACT_ITEMS } from '../../data/articlesData';
import { Article } from '../../types';

export const EcoAcademyPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [flippedMythId, setFlippedMythId] = useState<string | null>(null);

  const categories = ['Semua', 'Daur Ulang', 'Zero Waste', 'Kompos', 'Regulasi'];

  const filteredArticles = ACADEMY_ARTICLES.filter((art) => {
    const matchesCategory = selectedCategory === 'Semua' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = ACADEMY_ARTICLES.find(a => a.featured) || ACADEMY_ARTICLES[0];

  return (
    <div className="w-full bg-surface py-space-xl">
      <div className="max-w-[1380px] mx-auto px-margin-sm lg:px-margin space-y-space-xl">
        
        {/* Header */}
        <div className="border-b border-outline-variant/30 pb-space-lg">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
            <span className="font-label-caps text-secondary font-bold uppercase tracking-wider">
              Akademi Sirkular & Pusat Pengetahuan
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl font-bold text-primary tracking-tight">
            Edukasi Lingkungan & Literasi Daur Ulang
          </h1>
          <p className="font-body-md text-on-surface-variant max-w-2xl mt-1">
            Jelajahi panduan ilmiah, mitos vs fakta seputar plastik, dan infografis sirkularitas untuk memperdalam kesadaran ekologis keluarga dan kampus.
          </p>
        </div>

        {/* Featured Editorial Article Bento */}
        <div className="rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-6 h-64 lg:h-auto relative overflow-hidden">
            <img
              src={featuredArticle.image}
              alt={featuredArticle.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full bg-primary text-on-primary text-xs font-bold uppercase tracking-wider">
                Sorotan Utama
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 p-space-lg sm:p-space-xl flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-xs text-outline">
                <span>{featuredArticle.date}</span>
                <span>•</span>
                <span className="text-secondary font-semibold">{featuredArticle.readTime}</span>
                <span>•</span>
                <span>{featuredArticle.author}</span>
              </div>
              <h2 className="font-headline-lg font-bold text-primary tracking-tight leading-snug">
                {featuredArticle.title}
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                {featuredArticle.excerpt}
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setActiveArticle(featuredArticle)}
                className="h-11 px-6 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed font-title-md font-bold hover:bg-tertiary-fixed-dim transition-all shadow-md cursor-pointer inline-flex items-center gap-2"
              >
                <span>Baca Artikel Lengkap</span>
                <span className="material-symbols-outlined text-[18px]">menu_book</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Pills & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-space-md">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`h-9 px-4 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Cari artikel edukasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-surface-container text-xs text-on-surface outline-none focus:ring-2 focus:ring-secondary border border-outline-variant/20"
            />
            <span className="material-symbols-outlined text-[20px] text-outline absolute left-3 top-2.5">
              search
            </span>
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => setActiveArticle(art)}
              className="rounded-2xl bg-surface-container-lowest border border-outline-variant/30 overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="h-44 w-full relative overflow-hidden bg-surface-container">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-primary/80 backdrop-blur-sm text-on-primary text-[10px] font-bold uppercase">
                    {art.category}
                  </span>
                </div>

                <div className="p-space-md space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-outline">
                    <span>{art.date}</span>
                    <span>•</span>
                    <span className="text-secondary font-semibold">{art.readTime}</span>
                  </div>
                  <h3 className="font-title-md font-bold text-sm text-primary group-hover:text-secondary transition-colors line-clamp-2">
                    {art.title}
                  </h3>
                  <p className="font-body-sm text-xs text-on-surface-variant line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-space-md pt-0 flex items-center justify-between text-xs text-secondary font-bold">
                <span>Baca Selengkapnya</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* SECTION: INTERACTIVE MYTH VS FACT REVEAL CARDS */}
        <div className="pt-space-lg space-y-space-md">
          <div className="flex flex-col md:flex-row md:items-end justify-between">
            <div>
              <span className="font-label-caps text-secondary font-bold uppercase tracking-wider block mb-1">
                Klarifikasi Ilmiah
              </span>
              <h2 className="font-headline-lg font-bold text-primary tracking-tight">
                Mitos vs Fakta Daur Ulang Lingkungan
              </h2>
            </div>
            <p className="font-body-sm text-xs text-outline max-w-sm mt-1 md:mt-0">
              Klik kartu di bawah untuk membuka kebenaran ilmiah di balik salah kaprah umum persampahan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {MYTH_FACT_ITEMS.map((item) => {
              const isRevealed = flippedMythId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setFlippedMythId(isRevealed ? null : item.id)}
                  className={`p-space-lg rounded-2xl border transition-all cursor-pointer space-y-3 ${
                    isRevealed
                      ? 'bg-surface-container-high border-secondary shadow-md'
                      : 'bg-surface-container-lowest border-outline-variant/30 hover:border-secondary/50 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container text-[11px] font-bold uppercase">
                      Mitos Umum
                    </span>
                    <span className="text-xs text-secondary font-semibold flex items-center gap-1">
                      <span>{isRevealed ? 'Tutup Penjelasan' : 'Buka Fakta Ilmiah'}</span>
                      <span className="material-symbols-outlined text-sm">
                        {isRevealed ? 'expand_less' : 'expand_more'}
                      </span>
                    </span>
                  </div>

                  <h3 className="font-title-md font-bold text-sm text-primary">
                    "{item.myth}"
                  </h3>

                  {isRevealed && (
                    <div className="pt-3 border-t border-outline-variant/30 space-y-2 animate-fadeIn">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold uppercase">
                          Fakta Terverifikasi ✓
                        </span>
                      </div>
                      <p className="font-title-md font-bold text-xs text-secondary">
                        {item.fact}
                      </p>
                      <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                        {item.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION: INFOGRAPHIC GALLERY */}
        <div className="p-space-lg rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-label-caps text-secondary font-bold uppercase tracking-wider block">
                Galeri Visual Edukasi
              </span>
              <h3 className="font-headline-sm font-bold text-primary">
                Alur Sirkular Material & Pelestarian Alam
              </h3>
            </div>
            <span className="text-xs text-outline">SNI 19-3983-1995 Compliant</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl overflow-hidden bg-surface-container-lowest border border-outline-variant/20 shadow-sm">
              <img
                src="/assets/images/workshop.jpg"
                alt="Pelatihan Kompos Komunal"
                className="w-full h-44 object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="p-3">
                <h4 className="font-title-md font-bold text-xs text-primary">Workshop Kompos Komunal</h4>
                <p className="text-[11px] text-outline mt-0.5">Edukasi pembuatan pupuk organik aerobik bagi warga.</p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden bg-surface-container-lowest border border-outline-variant/20 shadow-sm">
              <img
                src="/assets/images/facility_aerial.jpg"
                alt="Fasilitas Sortasi Sentral"
                className="w-full h-44 object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="p-3">
                <h4 className="font-title-md font-bold text-xs text-primary">Fasilitas Sortasi Sentral</h4>
                <p className="text-[11px] text-outline mt-0.5">Pemisahan mekanis botol rPET dan kaleng aluminium.</p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden bg-surface-container-lowest border border-outline-variant/20 shadow-sm">
              <img
                src="/assets/images/drop_point.jpg"
                alt="Drop-Point Mandiri Kampus"
                className="w-full h-44 object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="p-3">
                <h4 className="font-title-md font-bold text-xs text-primary">Drop-Point Komunitas Mandiri</h4>
                <p className="text-[11px] text-outline mt-0.5">Pusat penimbangan terdesentralisasi di wilayah Kuningan.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ARTICLE READING MODAL */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/70 backdrop-blur-md animate-fadeIn">
          <div className="bg-surface-container-lowest rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-space-lg sm:p-space-xl border border-outline-variant/30 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold uppercase">
                  {activeArticle.category}
                </span>
                <span className="text-xs text-outline">{activeArticle.readTime}</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="text-outline hover:text-primary cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <h2 className="font-headline-lg font-bold text-primary tracking-tight">
              {activeArticle.title}
            </h2>

            <div className="flex items-center gap-3 text-xs text-outline">
              <span>Penulis: <strong>{activeArticle.author}</strong></span>
              <span>•</span>
              <span>{activeArticle.date}</span>
            </div>

            <div className="h-60 rounded-xl overflow-hidden bg-surface-container">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            <div className="space-y-3 font-body-md text-sm text-on-surface leading-relaxed pt-2">
              {activeArticle.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-4 border-t border-outline-variant/20 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="h-10 px-5 rounded-lg bg-primary text-on-primary text-xs font-bold hover:bg-primary-container cursor-pointer"
              >
                Tutup Bacaan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
