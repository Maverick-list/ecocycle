import React, { useState } from 'react';
import { DROP_POINTS, FAQ_ITEMS } from '../../data/locationsData';
import { useWasteBank } from '../../context/WasteBankContext';
import { StorageService } from '../../services/storageService';
import { Icon } from '../../components/ui/Icon';
import { PageTransition } from '../../components/ui/PageTransition';

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
      showToast(`Pesan terkirim & tercatat secara lokal! Tim ECOCYCLE akan menghubungi ${email}.`, 'success');
      setName('');
      setEmail('');
      setMessage('');
    }, 600);
  };

  return (
    <PageTransition>
      <div className="w-full bg-surface py-space-xl">
        <div className="max-w-[1380px] mx-auto px-margin-sm lg:px-margin space-y-space-xl">
          
          {/* Header */}
          <div className="border-b border-outline-variant/30 pb-space-lg">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
              <span className="font-label-caps text-secondary font-bold uppercase tracking-wider">
                Tentang Kami & Layanan Kontak
              </span>
            </div>
            <h1 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl font-bold text-primary tracking-tight">
              Manifesto Sirkular & Narahubung Resmi
            </h1>
            <p className="font-body-md text-on-surface-variant max-w-2xl mt-1">
              Platform ECOCYCLE dikembangkan sebagai kontribusi digital untuk ekosistem pengelolaan sampah presisi bagi Web Design Competition Techno Versary Vol. II 2026.
            </p>
          </div>

          {/* SECTION 1: ABOUT US & INSTITUTIONAL MANIFESTO */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-space-xl items-center">
            <div className="lg:col-span-7 space-y-space-md">
              <span className="font-label-caps text-secondary font-bold uppercase tracking-wider block">
                Visi & Nilai Dasar
              </span>
              <h2 className="font-headline-lg font-bold text-primary tracking-tight">
                Mengubah Pola Pikir: Dari Beban Pembuangan Menjadi Nilai Kehidupan
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                ECOCYCLE lahir dari realitas bahwa 69% timbunan sampah perkotaan berakhir di TPA tanpa pemilahan awal. Kami meyakini bahwa teknologi digital harus menjadi jembatan inklusif yang mempermudah warga biasa memahami sains pemilahan, mencatat setoran dengan transparan, dan memetik manfaat nyata dari gaya hidup sirkular.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                  <span className="font-bold text-sm text-primary block mb-1">🎯 Visi Utama</span>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Menciptakan ekosistem perkotaan dan kampus zero-waste melalui integrasi bank sampah digital dan audit material terverifikasi.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                  <span className="font-bold text-sm text-primary block mb-1">🌱 Misi Berkelanjutan</span>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Memberdayakan komunitas lokal, mengedukasi generasi muda, dan menyediakan data saintifik reduksi emisi karbon yang dapat dipertanggungjawabkan.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-2xl overflow-hidden shadow-lg border border-outline-variant/30">
              <img
                src="/assets/images/workshop.jpg"
                alt="Community Eco Engagement"
                className="w-full h-80 object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          </div>

          {/* SECTION 2: CONTACT FORM & OPERATIONAL HUBS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-space-xl">
            
            {/* Left: Contact Form (7 cols) */}
            <div className="lg:col-span-7 p-space-lg sm:p-space-xl rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-md space-y-space-md">
              <div>
                <span className="font-label-caps text-secondary font-bold uppercase tracking-wider block mb-1">
                  Kirim Pesan Langsung
                </span>
                <h3 className="font-headline-sm font-bold text-primary">
                  Formulir Komunikasi & Saran Kemitraan
                </h3>
                <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                  Ada pertanyaan mengenai bank sampah, usulan titik drop-point baru, atau kolaborasi kampus? Sampaikan kepada kami.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Rina Mahasiswa UNIKU"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-lg bg-surface-container text-xs text-on-surface outline-none focus:ring-2 focus:ring-secondary border border-outline-variant/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">
                      Alamat Surel (Email) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="nama@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-lg bg-surface-container text-xs text-on-surface outline-none focus:ring-2 focus:ring-secondary border border-outline-variant/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">
                    Kategori Kepentingan
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-lg bg-surface-container text-xs text-on-surface outline-none focus:ring-2 focus:ring-secondary border border-outline-variant/20 cursor-pointer"
                  >
                    <option value="Pertanyaan Umum">Pertanyaan Umum Platform</option>
                    <option value="Usulan Drop-Point">Usulan Titik Drop-Point Baru</option>
                    <option value="Kemitraan Kampus">Kemitraan Kampus & Komunitas</option>
                    <option value="Bantuan Teknis">Laporan Masalah / Kendala Teknis</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">
                    Pesan Anda *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tuliskan pertanyaan, saran, atau usulan lokasi drop-point Anda secara rinci..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 rounded-lg bg-surface-container text-xs text-on-surface outline-none focus:ring-2 focus:ring-secondary border border-outline-variant/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-11 px-6 rounded-lg bg-primary text-on-primary font-title-md text-sm font-bold hover:bg-primary-container transition-all shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Icon name="send" size={16} />
                  <span>{isSubmitting ? 'Mengirimkan...' : 'Kirim Pesan Sekarang'}</span>
                </button>
              </form>
            </div>

            {/* Right: Operational Hubs & Contacts (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-space-lg rounded-2xl bg-primary text-on-primary shadow-lg border border-primary-container space-y-4">
                <span className="font-label-caps text-tertiary-fixed font-bold uppercase tracking-wider block">
                  Sekretariat & Hub Kampus
                </span>
                <h3 className="font-headline-sm font-bold text-surface-bright">
                  Fakultas Ilmu Komputer, Universitas Kuningan
                </h3>
                
                <div className="space-y-3 text-xs text-primary-fixed-dim pt-1">
                  <div className="flex items-start gap-2.5">
                    <div className="text-tertiary-fixed mt-0.5">
                      <Icon name="map_pin" size={16} />
                    </div>
                    <span>Jl. Cut Nyak Dhien No. 36A, Cijoho, Kec. Kuningan, Kabupaten Kuningan, Jawa Barat 45513</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="text-tertiary-fixed">
                      <Icon name="mail" size={16} />
                    </div>
                    <span>ecocycle.unikun@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="text-tertiary-fixed">
                      <Icon name="phone" size={16} />
                    </div>
                    <span>+62 (0232) 871234 • Hotline Sirkular</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="text-tertiary-fixed">
                      <Icon name="clock" size={16} />
                    </div>
                    <span>Senin - Jumat: 08.00 - 16.30 WIB</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-primary-container">
                  <span className="text-[11px] text-surface-variant block mb-1">Penyelenggara Kompetisi:</span>
                  <span className="text-xs font-bold text-tertiary-fixed block">
                    HIMA TI FKOM Universitas Kuningan (Techno Versary Vol. II 2026)
                  </span>
                </div>
              </div>

              {/* Drop Point Directory Preview */}
              <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 space-y-3">
                <span className="font-label-caps text-secondary font-bold uppercase tracking-wider block">
                  Jaringan Drop-Point Resmi
                </span>
                <div className="space-y-2">
                  {DROP_POINTS.slice(0, 2).map((dp) => (
                    <div key={dp.id} className="p-2.5 rounded-lg bg-surface-container-low text-xs">
                      <span className="font-bold text-primary block">{dp.name}</span>
                      <span className="text-outline text-[11px] block">{dp.address}</span>
                      <span className="text-secondary font-semibold text-[10px] mt-1 inline-block">
                        {dp.status} • {dp.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* SECTION 3: FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION) */}
          <div className="p-space-lg sm:p-space-xl rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
            <div className="max-w-2xl">
              <span className="font-label-caps text-secondary font-bold uppercase tracking-wider block mb-1">
                Pertanyaan yang Sering Diajukan
              </span>
              <h2 className="font-headline-lg font-bold text-primary tracking-tight">
                Tanya Jawab Seputar Layanan ECOCYCLE
              </h2>
            </div>

            <div className="space-y-3 pt-2">
              {FAQ_ITEMS.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="rounded-xl border border-outline-variant/20 overflow-hidden bg-surface-container-low"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full p-4 text-left font-title-md font-bold text-sm text-primary flex items-center justify-between gap-4 cursor-pointer hover:bg-surface-container transition-colors"
                    >
                      <span>{faq.q}</span>
                      <div className="text-secondary shrink-0">
                        <Icon name={isOpen ? 'chevron_up' : 'chevron_down'} size={18} />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 font-body-sm text-xs text-on-surface-variant leading-relaxed border-t border-outline-variant/10 pt-3 animate-fadeIn">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
};
