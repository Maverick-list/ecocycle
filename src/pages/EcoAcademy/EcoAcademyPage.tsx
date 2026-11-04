import React, { useState } from 'react';
import { MYTH_FACT_ITEMS } from '../../data/articlesData';
import { Article } from '../../types';
import { AcademyService } from '../../services/academyService';
import { Icon } from '../../components/ui/Icon';
import { PageTransition } from '../../components/ui/PageTransition';

export const EcoAcademyPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [flippedMythId, setFlippedMythId] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<string[]>(() => AcademyService.getBookmarks());

  const categories = ['Semua', 'Daur Ulang', 'Zero Waste', 'Kompos', 'Regulasi', 'Tersimpan'];

  const allArticles = AcademyService.getAllArticles();

  const handleToggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = AcademyService.toggleBookmark(id);
    setBookmarks(updated);
  };

  const filteredArticles = allArticles.filter((art) => {
    if (selectedCategory === 'Tersimpan') {
      return bookmarks.includes(art.id);
    }
    const matchesCategory = selectedCategory === 'Semua' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = allArticles.find(a => a.featured) || allArticles[0];
  const relatedArticles = activeArticle ? AcademyService.getRelatedArticles(activeArticle.id) : [];

  return (
    <PageTransition>
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
              Jelajahi panduan ilmiah, mitos vs fakta seputar sampah, dan infografis sirkularitas untuk memperdalam kesadaran ekologis keluarga dan civitas akademika.
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
              <button
                type="button"
                onClick={(e) => handleToggleBookmark(featuredArticle.id, e)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-surface/80 backdrop-blur-sm text-primary flex items-center justify-center hover:bg-surface cursor-pointer shadow-sm transition-colors"
                title={bookmarks.includes(featuredArticle.id) ? 'Hapus dari simpanan' : 'Simpan artikel'}
              >
                <Icon
                  name={bookmarks.includes(featuredArticle.id) ? 'bookmark_check' : 'bookmark'}
                  size={18}
                  className={bookmarks.includes(featuredArticle.id) ? 'text-secondary' : 'text-primary'}
                />
              </button>
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

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveArticle(featuredArticle)}
                  className="h-11 px-6 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed font-title-md font-bold hover:bg-tertiary-fixed-dim transition-all shadow-md cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Baca Artikel Lengkap</span>
                  <Icon name="menu_book" size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Pills & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-space-md">
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`h-9 px-4 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    {cat === 'Tersimpan' && (
                      <Icon name="bookmark" size={14} />
                    )}
                    <span>{cat}</span>
                    {cat === 'Tersimpan' && (
                      <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-secondary-fixed text-on-secondary-fixed">
                        {bookmarks.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="w-full sm:w-72 relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                <Icon name="search" size={16} />
              </div>
              <input
                type="text"
                placeholder="Cari artikel, topik kompos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-4 rounded-lg bg-surface-container text-xs text-on-surface outline-none focus:ring-2 focus:ring-secondary border border-outline-variant/20"
              />
            </div>
          </div>

          {/* Articles Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {filteredArticles.map((art) => {
              const isBookmarked = bookmarks.includes(art.id);
              return (
                <div
                  key={art.id}
                  onClick={() => setActiveArticle(art)}
                  className="group rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm hover:shadow-md hover:border-secondary/50 transition-all cursor-pointer overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={art.image}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-primary/90 backdrop-blur-sm text-surface-bright text-[11px] font-bold uppercase">
                          {art.category}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => handleToggleBookmark(art.id, e)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface/80 backdrop-blur-sm text-primary flex items-center justify-center hover:bg-surface transition-colors"
                        title={isBookmarked ? 'Hapus bookmark' : 'Simpan artikel'}
                      >
                        <Icon
                          name={isBookmarked ? 'bookmark_check' : 'bookmark'}
                          size={16}
                          className={isBookmarked ? 'text-secondary' : 'text-primary'}
                        />
                      </button>
                    </div>

                    <div className="p-space-md space-y-2">
                      <div className="flex items-center gap-2 text-[11px] text-outline">
                        <span>{art.date}</span>
                        <span>•</span>
                        <span className="text-secondary font-semibold">{art.readTime}</span>
                      </div>
                      <h3 className="font-headline-sm text-sm font-bold text-primary group-hover:text-secondary transition-colors line-clamp-2">
                        {art.title}
                      </h3>
                      <p className="font-body-sm text-xs text-on-surface-variant line-clamp-2">
                        {art.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-space-md pt-0 border-t border-outline-variant/10 flex items-center justify-between mt-2">
                    <span className="text-[11px] text-outline">Oleh {art.author}</span>
                    <span className="font-bold text-xs text-secondary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Baca</span>
                      <Icon name="arrow_forward" size={14} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12 p-8 rounded-2xl bg-surface-container-low border border-dashed border-outline-variant">
              <div className="w-12 h-12 mx-auto rounded-full bg-surface flex items-center justify-center text-outline mb-2">
                <Icon name="description" size={24} />
              </div>
              <p className="text-sm font-bold text-primary">Tidak ada artikel ditemukan</p>
              <p className="text-xs text-on-surface-variant mt-1">
                Coba sesuaikan kata kunci pencarian atau ubah filter kategori.
              </p>
            </div>
          )}

          {/* Interactive Myth vs Fact Accordion Cards */}
          <div className="pt-space-lg space-y-space-md">
            <div className="border-b border-outline-variant/30 pb-space-sm">
              <span className="font-label-caps text-secondary font-bold uppercase tracking-wider block mb-1">
                Pemberantas Mitos Ekologis
              </span>
              <h2 className="font-headline-lg font-bold text-primary tracking-tight">
                Mitos vs Fakta Sirkularitas
              </h2>
              <p className="font-body-md text-on-surface-variant text-sm mt-1">
                Klik kartu di bawah untuk membuka kebenaran ilmiah berdasarkan riset sains daur ulang terkini.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {MYTH_FACT_ITEMS.map((item) => {
                const isRevealed = flippedMythId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setFlippedMythId(isRevealed ? null : item.id)}
                    className={`p-space-lg rounded-2xl border transition-all cursor-pointer space-y-3 ${
                      isRevealed
                        ? 'bg-secondary-fixed/20 border-secondary shadow-md'
                        : 'bg-surface-container-lowest border-outline-variant/30 hover:border-outline'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container text-[11px] font-bold uppercase">
                        Mitos #{item.id}
                      </span>
                      <div className="text-secondary">
                        <Icon name={isRevealed ? 'chevron_up' : 'touch_app'} size={18} />
                      </div>
                    </div>

                    <h3 className="font-headline-sm text-sm font-bold text-primary">
                      "{item.myth}"
                    </h3>

                    {isRevealed ? (
                      <div className="pt-2 border-t border-secondary/30 space-y-1.5 animate-fadeIn">
                        <div className="flex items-center gap-1.5 text-secondary font-bold text-xs">
                          <Icon name="verified" size={14} />
                          <span>Fakta Sebenarnya:</span>
                        </div>
                        <p className="font-body-sm text-xs text-on-surface leading-relaxed">
                          {item.fact}
                        </p>
                        <p className="text-[11px] text-on-surface-variant leading-relaxed">
                          {item.explanation}
                        </p>
                        <span className="text-[10px] text-outline block pt-1 italic">
                          Kategori Analisis: {item.category}
                        </span>
                      </div>
                    ) : (
                      <p className="text-[11px] text-outline italic">
                        Klik untuk melihat fakta ilmiah...
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Visual Photographic Section */}
          <div className="pt-space-lg space-y-space-md">
            <div className="border-b border-outline-variant/30 pb-space-sm">
              <span className="font-label-caps text-secondary font-bold uppercase tracking-wider block mb-1">
                Dokumentasi Lapangan
              </span>
              <h2 className="font-headline-lg font-bold text-primary tracking-tight">
                Galeri Infrastruktur & Ekosistem Sirkular
              </h2>
              <p className="font-body-md text-on-surface-variant text-sm mt-1">
                Potret aktivitas pemilahan dan fasilitas rantai pasok material daur ulang mandiri.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
              <div className="rounded-xl overflow-hidden bg-surface-container-lowest border border-outline-variant/20 shadow-sm">
                <img
                  src="/assets/images/recycling_bins.jpg"
                  alt="Tempat Sampah Terpilah Kampus"
                  className="w-full h-44 object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="p-3">
                  <h4 className="font-title-md font-bold text-xs text-primary">Standarisasi Tempat Sampah</h4>
                  <p className="text-[11px] text-outline mt-0.5">Penempatan bin terpilah 3 warna di koridor kampus.</p>
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

        {/* ARTICLE READING MODAL WITH RELATED ARTICLES */}
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/70 backdrop-blur-md animate-fadeIn">
            <div className="bg-surface-container-lowest rounded-2xl max-w-2xl w-full max-h-[88vh] overflow-y-auto p-space-lg sm:p-space-xl border border-outline-variant/30 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold uppercase">
                    {activeArticle.category}
                  </span>
                  <span className="text-xs text-outline">{activeArticle.readTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleBookmark(activeArticle.id)}
                    className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-secondary-fixed cursor-pointer transition-colors"
                    title={bookmarks.includes(activeArticle.id) ? 'Hapus bookmark' : 'Simpan artikel'}
                  >
                    <Icon
                      name={bookmarks.includes(activeArticle.id) ? 'bookmark_check' : 'bookmark'}
                      size={16}
                      className={bookmarks.includes(activeArticle.id) ? 'text-secondary' : 'text-primary'}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveArticle(null)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-outline hover:text-primary hover:bg-surface-container cursor-pointer"
                  >
                    <Icon name="close" size={18} />
                  </button>
                </div>
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

              {/* Related Articles Section */}
              {relatedArticles.length > 0 && (
                <div className="pt-4 border-t border-outline-variant/20 space-y-3">
                  <span className="font-label-caps text-secondary font-bold uppercase tracking-wider block text-xs">
                    Artikel Terkait & Bacaan Lanjutan
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {relatedArticles.map((rel) => (
                      <div
                        key={rel.id}
                        onClick={() => setActiveArticle(rel)}
                        className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container border border-outline-variant/20 hover:border-secondary transition-all cursor-pointer flex gap-3 items-center"
                      >
                        <img
                          src={rel.image}
                          alt={rel.title}
                          className="w-14 h-14 rounded-lg object-cover shrink-0"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div className="min-w-0">
                          <span className="text-[10px] text-secondary font-bold uppercase block">{rel.category}</span>
                          <h4 className="text-xs font-bold text-primary truncate">{rel.title}</h4>
                          <span className="text-[10px] text-outline block">{rel.readTime}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
    </PageTransition>
  );
};
