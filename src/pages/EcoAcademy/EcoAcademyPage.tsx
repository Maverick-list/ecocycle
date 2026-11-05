import React, { useState } from 'react';
import { MYTH_FACT_ITEMS } from '../../data/articlesData';
import { Article } from '../../types';
import { AcademyService } from '../../services/academyService';
import { Icon } from '../../components/ui/Icon';
import { PageTransition } from '../../components/ui/PageTransition';
import { SEOHead } from '../../components/seo/SEOHead';

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
    <PageTransition className="w-full min-h-screen bg-surface dark:bg-[#03140d] text-on-surface dark:text-white py-12 sm:py-16 transition-colors duration-300">
      <SEOHead
        title="Akademi Sirkular & Modul Edukasi Keberlanjutan"
        canonical="/akademi"
        description="Pelajari metodologi komprehensif pengelolaan limbah, komposting mandiri, regulasi lingkungan, dan prinsip ekonomi sirkular modern."
      />
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        
        {/* Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-outline-variant/20">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-semibold uppercase tracking-wider text-secondary">
              <Icon name="menu_book" size={14} />
              <span>Pusat Literasi Sirkular</span>
            </div>
            <h1 className="font-display font-extrabold text-page-title tracking-tight leading-tight">
              <span className="animate-title-flow">Akademi Ekologi</span> & Wawasan Daur Ulang
            </h1>
            <p className="font-sans text-subheading text-on-surface-variant font-normal leading-relaxed">
              Kumpulan artikel riset mendalam, penelusuran mitos vs fakta sains lingkungan, dan panduan praktis pengelolaan limbah untuk membangun gaya hidup sirkular berkelanjutan.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setSelectedCategory('Tersimpan')}
              className="h-11 px-5 rounded-xl glass-pill hover:bg-surface-container text-on-surface font-sans text-xs font-bold transition-all flex items-center gap-2"
            >
              <Icon name="bookmark" size={16} className="text-secondary" />
              <span>Koleksi Tersimpan ({bookmarks.length})</span>
            </button>
          </div>
        </div>

        {/* Featured Editorial Article Bento */}
        <div className="rounded-3xl glass-panel-elevated border border-outline-variant/25 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-6 h-72 lg:h-auto relative overflow-hidden">
            <img
              src={featuredArticle.image}
              alt={featuredArticle.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full bg-secondary text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                Sorotan Utama
              </span>
            </div>
            <button
              type="button"
              onClick={(e) => handleToggleBookmark(featuredArticle.id, e)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full glass-pill text-primary flex items-center justify-center hover:bg-surface cursor-pointer shadow-md transition-colors"
              title={bookmarks.includes(featuredArticle.id) ? 'Hapus bookmark' : 'Simpan artikel'}
            >
              <Icon
                name={bookmarks.includes(featuredArticle.id) ? 'bookmark_check' : 'bookmark'}
                size={18}
                className={bookmarks.includes(featuredArticle.id) ? 'text-secondary' : 'text-primary'}
              />
            </button>
          </div>

          <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs text-outline font-medium">
                <span>{featuredArticle.date}</span>
                <span>•</span>
                <span className="text-secondary font-semibold">{featuredArticle.readTime}</span>
                <span>•</span>
                <span>{featuredArticle.author}</span>
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-primary tracking-tight leading-snug">
                {featuredArticle.title}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                {featuredArticle.excerpt}
              </p>
            </div>

            <div className="pt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setActiveArticle(featuredArticle)}
                className="h-11 px-6 rounded-xl bg-secondary text-white font-sans text-xs font-bold hover:bg-secondary/90 transition-all shadow-md cursor-pointer inline-flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Baca Artikel Penuh</span>
                <Icon name="arrow_forward" size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Pills & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`h-10 px-5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-secondary text-white shadow-sm'
                      : 'glass-pill hover:bg-surface-container text-on-surface'
                  }`}
                >
                  {cat === 'Tersimpan' && <Icon name="bookmark" size={14} />}
                  <span>{cat}</span>
                  {cat === 'Tersimpan' && bookmarks.length > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white font-mono">
                      {bookmarks.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="w-full sm:w-80 relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline">
              <Icon name="search" size={16} />
            </div>
            <input
              type="text"
              placeholder="Cari artikel, kompos, plastik..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl glass-panel text-xs text-on-surface outline-none focus:ring-2 focus:ring-secondary/50 border border-outline-variant/30"
            />
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

        {/* Articles Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((art) => {
            const isBookmarked = bookmarks.includes(art.id);
            return (
              <div
                key={art.id}
                onClick={() => setActiveArticle(art)}
                className="group rounded-3xl glass-panel border border-outline-variant/20 hover:border-secondary/40 shadow-sm hover:shadow-lg transition-all cursor-pointer overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="h-52 overflow-hidden relative">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute top-3.5 left-3.5">
                      <span className="px-2.5 py-1 rounded-full glass-pill text-xs font-bold uppercase tracking-wider text-secondary">
                        {art.category}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => handleToggleBookmark(art.id, e)}
                      className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full glass-pill text-primary flex items-center justify-center hover:bg-surface transition-colors"
                      title={isBookmarked ? 'Hapus bookmark' : 'Simpan artikel'}
                    >
                      <Icon
                        name={isBookmarked ? 'bookmark_check' : 'bookmark'}
                        size={16}
                        className={isBookmarked ? 'text-secondary' : 'text-primary'}
                      />
                    </button>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-outline">
                      <span>{art.date}</span>
                      <span>•</span>
                      <span className="text-secondary font-semibold">{art.readTime}</span>
                    </div>
                    <h3 className="font-display font-bold text-base text-primary group-hover:text-secondary transition-colors line-clamp-2 leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-outline-variant/15 flex items-center justify-between text-xs">
                  <span className="text-outline">Oleh {art.author}</span>
                  <span className="font-bold text-secondary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Baca</span>
                    <Icon name="arrow_forward" size={13} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16 p-8 rounded-3xl glass-panel border border-outline-variant/25">
            <div className="w-12 h-12 mx-auto rounded-full bg-surface-container flex items-center justify-center text-outline mb-3">
              <Icon name="description" size={24} />
            </div>
            <p className="font-display font-bold text-primary text-base">Tidak Ada Artikel Ditemukan</p>
            <p className="text-xs text-on-surface-variant mt-1">
              Coba sesuaikan kata kunci pencarian atau ubah filter kategori.
            </p>
          </div>
        )}

        {/* Interactive Myth vs Fact Accordion Cards */}
        <div className="pt-8 space-y-6 border-t border-outline-variant/20">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-secondary block mb-1">
              Pemberantas Mitos Ekologis
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-primary tracking-tight">
              Mitos vs Fakta Sirkularitas
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
              Klik kartu di bawah untuk membuka kebenaran ilmiah berdasarkan riset sains daur ulang terkini.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MYTH_FACT_ITEMS.map((item) => {
              const isRevealed = flippedMythId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setFlippedMythId(isRevealed ? null : item.id)}
                  className={`p-6 rounded-3xl border transition-all cursor-pointer space-y-4 ${
                    isRevealed
                      ? 'glass-panel-elevated border-secondary/40 ring-1 ring-secondary/30 shadow-lg'
                      : 'glass-panel border-outline-variant/25 hover:border-outline-variant/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-error/15 text-error text-[10px] font-bold uppercase">
                      Mitos #{item.id}
                    </span>
                    <div className="text-secondary">
                      <Icon name={isRevealed ? 'chevron_up' : 'touch_app'} size={18} />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-sm sm:text-base text-primary">
                    "{item.myth}"
                  </h3>

                  {isRevealed ? (
                    <div className="pt-3 border-t border-outline-variant/15 space-y-2 animate-fadeIn">
                      <div className="flex items-center gap-1.5 text-secondary font-bold text-xs">
                        <Icon name="verified" size={14} />
                        <span>Fakta Sebenarnya:</span>
                      </div>
                      <p className="text-xs text-on-surface leading-relaxed">
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

      </div>

      {/* ARTICLE READING MODAL WITH RELATED ARTICLES */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
          <div className="glass-panel-elevated bg-surface text-on-surface rounded-3xl max-w-2xl w-full max-h-[88vh] overflow-y-auto p-6 sm:p-8 border border-outline-variant/30 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/15">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-bold uppercase">
                  {activeArticle.category}
                </span>
                <span className="text-xs text-outline">{activeArticle.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleBookmark(activeArticle.id)}
                  className="w-9 h-9 rounded-full glass-pill flex items-center justify-center text-primary hover:bg-secondary/10 cursor-pointer transition-colors"
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
                  className="w-9 h-9 rounded-full glass-pill flex items-center justify-center text-outline hover:text-primary cursor-pointer"
                >
                  <Icon name="close" size={18} />
                </button>
              </div>
            </div>

            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-primary tracking-tight leading-snug">
              {activeArticle.title}
            </h2>

            <div className="flex items-center gap-3 text-xs text-outline">
              <span>Penulis: <strong className="text-on-surface">{activeArticle.author}</strong></span>
              <span>•</span>
              <span>{activeArticle.date}</span>
            </div>

            <div className="h-64 rounded-2xl overflow-hidden glass-panel">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-on-surface leading-relaxed pt-2">
              {activeArticle.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Related Articles Section */}
            {relatedArticles.length > 0 && (
              <div className="pt-6 border-t border-outline-variant/15 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-secondary block">
                  Artikel Terkait & Bacaan Lanjutan
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {relatedArticles.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => setActiveArticle(rel)}
                      className="p-3.5 rounded-2xl glass-panel hover:border-secondary/50 border border-outline-variant/20 transition-all cursor-pointer flex gap-3 items-center"
                    >
                      <img
                        src={rel.image}
                        alt={rel.title}
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
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

            <div className="pt-4 border-t border-outline-variant/15 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="h-10 px-5 rounded-xl bg-secondary text-white text-xs font-bold hover:bg-secondary/90 cursor-pointer"
              >
                Tutup Bacaan
              </button>
            </div>
          </div>
        </div>
      )}
    </PageTransition>
  );
};
