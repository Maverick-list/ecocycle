import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DROP_POINTS, FAQ_ITEMS } from '../../data/locationsData';
import { useWasteBank } from '../../context/WasteBankContext';
import { StorageService } from '../../services/storageService';
import { Icon } from '../../components/ui/Icon';
import { PageTransition } from '../../components/ui/PageTransition';
import { SEOHead } from '../../components/seo/SEOHead';
import { SocialLinks } from '../../components/ui/SocialLinks';

export const ContactPage: React.FC = () => {
  const { showToast } = useWasteBank();

  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Pertanyaan Umum');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // FAQ open/close state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Harap lengkapi semua bidang formulir kontak.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      // Store in local demonstration storage
      const existing = StorageService.get<Array<{ name: string; email: string; category: string; message: string; date: string }>>('ecocycle_contact_messages_v2', []);
      const newEntry = {
        name,
        email,
        category,
        message,
        date: new Date().toLocaleString('id-ID')
      };
      StorageService.set('ecocycle_contact_messages_v2', [newEntry, ...existing]);

      setIsSubmitting(false);
      showToast(`Pesan terkirim & tercatat! Tim ECOCYCLE akan menghubungi ${email}.`, 'success');
      setName('');
      setEmail('');
      setMessage('');
    }, 600);
  };

  return (
    <PageTransition className="w-full min-h-screen bg-surface dark:bg-[#03140d] text-on-surface dark:text-white py-12 sm:py-16 transition-colors duration-300">
      <SEOHead
        title="Hub Jaringan & Drop-Point Terdekat"
        canonical="/kontak"
        description="Temukan titik drop-point penyerahan sampah terpilah di sekitar Anda, jam operasional, panduan rute, dan layanan narahubung ECOCYCLE."
      />
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        
        {/* Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-outline-variant/20">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-semibold uppercase tracking-wider text-secondary">
              <Icon name="mail" size={14} />
              <span>Narahubung & Manifesto Layanan</span>
            </div>
            <h1 className="font-display font-extrabold text-page-title tracking-tight leading-tight">
              <span className="animate-title-flow">Pusat Komunikasi</span> & Hub Kolaborasi
            </h1>
            <p className="font-sans text-subheading text-on-surface-variant font-normal leading-relaxed">
              Hubungi tim pengembang operasional platform ECOCYCLE untuk kemitraan bank sampah baru, integrasi korporasi rantai pasok daur ulang, atau pertanyaan umum.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/faq"
              className="h-11 px-5 rounded-xl glass-pill hover:bg-surface-container text-on-surface font-sans text-xs font-bold transition-all flex items-center gap-2"
            >
              <Icon name="info" size={16} className="text-secondary" />
              <span>Pusat Bantuan FAQ</span>
            </Link>
          </div>
        </div>

        {/* SECTION 1: ABOUT US & INSTITUTIONAL MANIFESTO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary block">
              Visi & Nilai Dasar
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-primary tracking-tight">
              Mengubah Pola Pikir: Dari Pembuangan Menjadi Nilai Sirkular
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              ECOCYCLE hadir untuk menghentikan pembuangan limbah sekali pakai ke TPA dan menggantinya dengan rantai daur ulang tertutup bernilai ekonomi. Melalui penimbangan transparan, verifikasi standar SNI, dan insentif langsung bagi warga, kami mewujudkan aksi nyata pengurangan sampah lingkungan.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-6 rounded-2xl glass-panel border border-outline-variant/20 space-y-2">
                <span className="font-display font-bold text-sm text-primary flex items-center gap-2">
                  <Icon name="flag" size={16} className="text-secondary" />
                  <span>Visi Strategis</span>
                </span>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Menciptakan ekosistem permukiman zero-waste terintegrasi melalui audit material terverifikasi dan bank sampah digital.
                </p>
              </div>
              <div className="p-6 rounded-2xl glass-panel border border-outline-variant/20 space-y-2">
                <span className="font-display font-bold text-sm text-primary flex items-center gap-2">
                  <Icon name="eco" size={16} className="text-secondary" />
                  <span>Misi Berkelanjutan</span>
                </span>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Menyediakan data saintifik terukur mengenai reduksi emisi karbon berbasis standar internasional yang dapat dipertanggungjawabkan.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-3xl overflow-hidden glass-panel border border-outline-variant/25 p-4 shadow-xl">
            <img
              src="/assets/images/workshop.jpg"
              alt="Community Eco Engagement"
              className="w-full h-80 object-cover rounded-2xl"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* SECTION 2: CONTACT FORM & OPERATIONAL HUBS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Contact Form (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl glass-panel-elevated border border-outline-variant/25 shadow-xl space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-secondary block mb-1">
                Kirim Pesan Langsung
              </span>
              <h3 className="font-display font-bold text-xl text-primary">
                Formulir Komunikasi & Saran Kemitraan
              </h3>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                Ada pertanyaan mengenai bank sampah, usulan titik drop-point baru, atau kolaborasi kelembagaan? Sampaikan kepada kami.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-1.5">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Rina Safitri"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl glass-panel text-xs text-on-surface outline-none focus:ring-2 focus:ring-secondary/50 border border-outline-variant/25"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-1.5">
                    Alamat Surel (Email) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl glass-panel text-xs text-on-surface outline-none focus:ring-2 focus:ring-secondary/50 border border-outline-variant/25"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-1.5">
                  Kategori Kepentingan
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl glass-panel text-xs text-on-surface outline-none focus:ring-2 focus:ring-secondary/50 border border-outline-variant/25 cursor-pointer"
                >
                  <option value="Pertanyaan Umum">Pertanyaan Umum Platform</option>
                  <option value="Usulan Drop-Point">Usulan Titik Drop-Point Baru</option>
                  <option value="Kemitraan Kampus">Kemitraan Lembaga & Komunitas</option>
                  <option value="Bantuan Teknis">Laporan Masalah / Kendala Teknis</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-1.5">
                  Pesan Anda *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tuliskan pertanyaan, saran, atau usulan lokasi drop-point Anda secara rinci..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-4 rounded-xl glass-panel text-xs text-on-surface outline-none focus:ring-2 focus:ring-secondary/50 border border-outline-variant/25"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="h-11 px-6 rounded-xl bg-secondary text-white font-sans text-xs font-bold hover:bg-secondary/90 transition-all shadow-md cursor-pointer flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Icon name="send" size={16} />
                <span>{isSubmitting ? 'Mengirimkan...' : 'Kirim Pesan Sekarang'}</span>
              </button>
            </form>
          </div>

          {/* Right: Operational Hubs & Contacts (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl glass-panel-elevated border border-secondary/30 shadow-xl space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-secondary block">
                Kantor Sekretariat & Hub Sentral
              </span>
              <h3 className="font-display font-bold text-xl text-primary">
                ECOCYCLE Central Resource Hub
              </h3>
              
              <div className="space-y-4 text-xs text-on-surface-variant pt-1">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary/15 text-secondary flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name="map_pin" size={16} />
                  </div>
                  <span>Jl. Siliwangi No. 104, Purwawinangun, Kuningan, Jawa Barat 45511</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary/15 text-secondary flex items-center justify-center shrink-0">
                    <Icon name="mail" size={16} />
                  </div>
                  <span>support@ecocycle.id</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary/15 text-secondary flex items-center justify-center shrink-0">
                    <Icon name="phone" size={16} />
                  </div>
                  <span>+62 (0232) 871234 • Layanan Informasi & Penjemputan</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary/15 text-secondary flex items-center justify-center shrink-0">
                    <Icon name="clock" size={16} />
                  </div>
                  <span>Senin - Sabtu: 08.00 - 17.00 WIB</span>
                </div>
              </div>

              <div className="pt-4 border-t border-outline-variant/15">
                <span className="text-xs text-outline block mb-2 font-medium">Kanal Resmi Platform:</span>
                <SocialLinks variant="light" showLabels={true} />
              </div>
            </div>

            {/* Drop Point Directory Preview */}
            <div className="p-6 rounded-3xl glass-panel border border-outline-variant/25 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                  Jaringan Drop-Point Resmi
                </span>
                <Link to="/panduan" className="text-xs text-secondary font-bold hover:underline">
                  Lihat Semua →
                </Link>
              </div>
              <div className="space-y-3">
                {DROP_POINTS.slice(0, 2).map((dp) => (
                  <div key={dp.id} className="p-3.5 rounded-2xl glass-panel border border-outline-variant/15 text-xs">
                    <span className="font-display font-bold text-primary block">{dp.name}</span>
                    <span className="text-outline text-[11px] block mt-0.5">{dp.address}</span>
                    <span className="text-secondary font-semibold text-[10px] mt-1.5 inline-block">
                      {dp.status} • {dp.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* SECTION 3: FAQ ACCORDION PREVIEW */}
        <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-outline-variant/25 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-secondary block mb-1">
                Tanya Jawab Terpopuler
              </span>
              <h2 className="font-display font-bold text-2xl text-primary tracking-tight">
                Pertanyaan yang Sering Diajukan
              </h2>
            </div>
            <Link
              to="/faq"
              className="text-xs font-bold text-secondary hover:underline flex items-center gap-1 shrink-0"
            >
              <span>Buka Seluruh 16 Pertanyaan di Pusat Bantuan FAQ</span>
              <Icon name="arrow_forward" size={13} />
            </Link>
          </div>

          <div className="space-y-3 pt-2">
            {FAQ_ITEMS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-outline-variant/20 overflow-hidden glass-panel"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-5 text-left font-display font-bold text-sm text-primary flex items-center justify-between gap-4 cursor-pointer hover:bg-surface-container/40 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <div className="text-secondary shrink-0">
                      <Icon name={isOpen ? 'chevron_up' : 'chevron_down'} size={18} />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-on-surface-variant leading-relaxed border-t border-outline-variant/10 pt-3 animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </PageTransition>
  );
};
