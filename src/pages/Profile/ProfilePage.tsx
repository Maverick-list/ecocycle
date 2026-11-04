import React, { useState } from 'react';
import { useWasteBank } from '../../context/WasteBankContext';
import { UserService } from '../../services/userService';
import { UserProfile } from '../../types';
import { Icon } from '../../components/ui/Icon';
import { AnimatedCounter } from '../../components/ui/AnimatedCounter';
import { PageTransition } from '../../components/ui/PageTransition';
import { DROP_POINTS } from '../../data/locationsData';
import { COMMUNITY_CHALLENGES } from '../../data/challengesData';

export const ProfilePage: React.FC = () => {
  const { 
    transactions, 
    totalPoints, 
    totalBalanceIdr, 
    totalWeightKg, 
    totalCo2AvoidedKg,
    openDetailTrx,
    showToast 
  } = useWasteBank();

  const [profile, setProfile] = useState<UserProfile>(() => UserService.getProfile());
  const [activeTab, setActiveTab] = useState<'transaksi' | 'lencana' | 'linimasa' | 'pengaturan'>('transaksi');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Edit form state
  const [editName, setEditName] = useState(profile.name);
  const [editPhone, setEditPhone] = useState(profile.phone);
  const [editLocation, setEditLocation] = useState(profile.location);
  const [editBio, setEditBio] = useState(profile.bio);
  const [editAvatar, setEditAvatar] = useState(profile.avatar);

  // Settings state
  const [monthlyGoal, setMonthlyGoal] = useState(profile.preferences.monthlyGoalKg);
  const [notifications, setNotifications] = useState(profile.preferences.notificationsEnabled);
  const [emailDigest, setEmailDigest] = useState(profile.preferences.emailDigestWeekly);
  const [preferredDropPoint, setPreferredDropPoint] = useState(profile.preferences.preferredDropPoint);

  const activities = UserService.getActivityTimeline();
  const completedBadges = COMMUNITY_CHALLENGES.filter(c => c.completed);

  // Calculate monthly goal progress
  const monthlyProgressPercent = Math.min(100, Math.round((totalWeightKg / monthlyGoal) * 100));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = UserService.updateProfile({
      name: editName,
      phone: editPhone,
      location: editLocation,
      bio: editBio,
      avatar: editAvatar
    });
    setProfile(updated);
    setIsEditModalOpen(false);
    showToast('Profil pengguna berhasil diperbarui!', 'success');
  };

  const handleSaveSettings = () => {
    const updated = UserService.updateProfile({
      preferences: {
        ...profile.preferences,
        monthlyGoalKg: monthlyGoal,
        notificationsEnabled: notifications,
        emailDigestWeekly: emailDigest,
        preferredDropPoint
      }
    });
    setProfile(updated);
    showToast('Pengaturan preferensi tersimpan.', 'success');
  };

  const handleResetProfile = () => {
    if (window.confirm('Kembalikan data profil akun ke kondisi demonstrasi awal?')) {
      const reset = UserService.resetProfile();
      setProfile(reset);
      setEditName(reset.name);
      setEditPhone(reset.phone);
      setEditLocation(reset.location);
      setEditBio(reset.bio);
      setMonthlyGoal(reset.preferences.monthlyGoalKg);
      showToast('Profil telah direset ke preset demonstrasi.', 'info');
    }
  };

  const avatarOptions = [
    { label: 'Avatar Utama', path: '/assets/images/avatar_user.jpg' },
    { label: 'Karakter A', path: '/assets/images/avatar_female.jpg' },
    { label: 'Karakter B', path: '/assets/images/avatar_male.jpg' }
  ];

  return (
    <PageTransition className="w-full bg-surface py-space-xl">
      <div className="max-w-[1380px] mx-auto px-margin-sm lg:px-margin space-y-space-xl">
        
        {/* Top Breadcrumb & Demo Notice */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/30 pb-space-sm">
          <div className="flex items-center gap-2 text-xs font-semibold text-secondary">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
            <span className="uppercase tracking-wider">Dashboard Akun Pengguna Terintegrasi</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-secondary-fixed/30 border border-secondary/20 text-[11px] text-secondary font-medium">
            <Icon name="info" size={14} />
            <span>Mode Peraga Interaktif: Profil tersimpan lokal di peramban</span>
          </div>
        </div>

        {/* 1. HERO PROFILE CARD */}
        <div className="rounded-2xl bg-surface-container-lowest border border-outline-variant/30 p-space-lg sm:p-space-xl shadow-md overflow-hidden relative">
          <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-lg relative z-10">
            {/* Left: Avatar + Identity */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-space-md">
              <div className="relative shrink-0">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-secondary/20 shadow-lg"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-bold text-[10px] uppercase shadow-sm flex items-center gap-1">
                  <Icon name="verified" size={12} />
                  <span>Aktif</span>
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-primary tracking-tight">
                    {profile.name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-primary text-on-primary font-bold text-xs">
                    {profile.ecoLevel}
                  </span>
                </div>
                <p className="text-xs font-semibold text-secondary">
                  {profile.role} • {profile.affiliation}
                </p>
                <p className="text-xs text-on-surface-variant max-w-xl line-clamp-2 pt-1 leading-relaxed">
                  {profile.bio}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-[11px] text-outline pt-2">
                  <span className="flex items-center gap-1">
                    <Icon name="map_pin" size={13} className="text-secondary" />
                    <span>{profile.location}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="calendar" size={13} className="text-secondary" />
                    <span>Bergabung {profile.joinedDate}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Streak & Actions */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 w-full lg:w-auto shrink-0 pt-2 lg:pt-0">
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-surface-container border border-outline-variant/30 shadow-sm w-full sm:w-auto justify-center">
                <span className="text-2xl">🔥</span>
                <div>
                  <span className="text-[10px] text-outline uppercase font-bold block">Konsistensi Aksi</span>
                  <span className="text-sm font-bold text-primary font-metric-display">
                    {profile.currentStreakDays} Hari Beruntun
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditName(profile.name);
                  setEditPhone(profile.phone);
                  setEditLocation(profile.location);
                  setEditBio(profile.bio);
                  setEditAvatar(profile.avatar);
                  setIsEditModalOpen(true);
                }}
                className="h-10 px-5 rounded-lg bg-primary text-on-primary font-title-md text-xs font-bold hover:bg-primary-container transition-all cursor-pointer flex items-center gap-2 shadow-sm w-full sm:w-auto justify-center"
              >
                <Icon name="edit" size={14} />
                <span>Perbarui Profil</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. PERSONAL ECO-STAT BENTO MATRIX */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          
          {/* Card 1: Total Weight + Monthly Target Progress */}
          <div className="p-space-lg rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-label-caps text-outline uppercase font-bold text-[11px]">Akumulasi Setoran</span>
                <Icon name="recycle" size={20} className="text-secondary" />
              </div>
              <div className="flex items-baseline gap-1 my-2">
                <AnimatedCounter value={totalWeightKg} decimals={1} className="font-metric-display text-4xl font-extrabold text-primary" />
                <span className="text-sm font-bold text-secondary">kg</span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Target Bulan Ini: <strong>{monthlyGoal} kg</strong>
              </p>
            </div>

            <div className="pt-3 border-t border-outline-variant/20 space-y-1">
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-outline">Pencapaian Target</span>
                <span className="text-secondary">{monthlyProgressPercent}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                <div
                  style={{ width: `${monthlyProgressPercent}%` }}
                  className="h-full bg-secondary transition-all duration-500 rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Saldo EcoPoints */}
          <div className="p-space-lg rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-label-caps text-outline uppercase font-bold text-[11px]">Saldo EcoPoints</span>
                <Icon name="coins" size={20} className="text-secondary" />
              </div>
              <div className="flex items-baseline gap-1 my-2">
                <AnimatedCounter value={totalPoints} className="font-metric-display text-4xl font-extrabold text-secondary" />
                <span className="text-sm font-bold text-primary">Pts</span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Dapat ditukarkan kupon token & bibit pohon
              </p>
            </div>

            <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs font-semibold text-primary">
              <span>Status Dompet:</span>
              <span className="text-secondary font-bold">Aktif & Terverifikasi</span>
            </div>
          </div>

          {/* Card 3: Saldo Rupiah */}
          <div className="p-space-lg rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-label-caps text-outline uppercase font-bold text-[11px]">Nilai Konversi Simpanan</span>
                <Icon name="wallet" size={20} className="text-secondary" />
              </div>
              <div className="my-2">
                <span className="font-metric-display text-3xl font-extrabold text-primary">
                  Rp {totalBalanceIdr.toLocaleString('id-ID')}
                </span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Estimasi nilai tabungan material daur ulang
              </p>
            </div>

            <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs text-outline">
              <span>Frekuensi Transaksi:</span>
              <span className="font-bold text-primary">{transactions.length} Kali Setor</span>
            </div>
          </div>

          {/* Card 4: Reduksi Karbon */}
          <div className="p-space-lg rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-label-caps text-outline uppercase font-bold text-[11px]">Jejak Karbon Terhindar</span>
                <Icon name="cloud" size={20} className="text-secondary" />
              </div>
              <div className="flex items-baseline gap-1 my-2">
                <AnimatedCounter value={totalCo2AvoidedKg} decimals={1} className="font-metric-display text-4xl font-extrabold text-primary" />
                <span className="text-sm font-bold text-secondary">kg CO₂e</span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Setara serapan ~{(totalCo2AvoidedKg / 21.77).toFixed(1)} pohon dewasa per tahun
              </p>
            </div>

            <div className="pt-3 border-t border-outline-variant/20 text-[11px] text-outline flex items-center gap-1">
              <Icon name="leaf" size={13} className="text-secondary" />
              <span>Standar US EPA WARM v15</span>
            </div>
          </div>

        </div>

        {/* 3. TABBED DASHBOARD CONTROLS */}
        <div className="flex flex-wrap items-center gap-2 border-b border-outline-variant/20 pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('transaksi')}
            className={`px-4 py-2 rounded-lg font-title-md text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'transaksi'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            <Icon name="receipt" size={16} />
            <span>Riwayat Transaksi Saya ({transactions.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('lencana')}
            className={`px-4 py-2 rounded-lg font-title-md text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'lencana'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            <Icon name="award" size={16} />
            <span>Lencana & Prestasi ({completedBadges.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('linimasa')}
            className={`px-4 py-2 rounded-lg font-title-md text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'linimasa'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            <Icon name="activity" size={16} />
            <span>Linimasa Jejak Langkah</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pengaturan')}
            className={`px-4 py-2 rounded-lg font-title-md text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'pengaturan'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            <Icon name="settings" size={16} />
            <span>Pengaturan & Target Ekologis</span>
          </button>
        </div>

        {/* 4. TAB CONTENTS */}
        
        {/* TAB 1: TRANSAKSI SAYA */}
        {activeTab === 'transaksi' && (
          <div className="space-y-space-md">
            <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest shadow-sm overflow-hidden">
              <div className="p-4 border-b border-outline-variant/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-headline-sm text-sm font-bold text-primary">
                    Buku Mutasi Penyetoran Mandiri
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Klik nomor tiket atau ikon rincian untuk membuka lembar manifest verifikasi resmi.
                  </p>
                </div>
                <span className="text-[11px] text-outline font-medium">
                  {transactions.length} Catatan Tersimpan
                </span>
              </div>

              {transactions.length === 0 ? (
                <div className="p-12 text-center text-on-surface-variant space-y-2">
                  <Icon name="receipt" size={36} className="text-outline mx-auto" />
                  <p className="text-sm font-bold text-primary">Belum ada riwayat setoran</p>
                  <p className="text-xs">Mulai setor sampah Anda di drop-point terdekat untuk mengumpulkan EcoPoints.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-surface-container-low text-outline font-label-caps text-[10px] uppercase border-b border-outline-variant/20">
                        <th className="py-3 px-4">No. Registrasi</th>
                        <th className="py-3 px-4">Waktu</th>
                        <th className="py-3 px-4">Material</th>
                        <th className="py-3 px-4 text-right">Bobot</th>
                        <th className="py-3 px-4 text-right">Nilai Rupiah</th>
                        <th className="py-3 px-4 text-right">Poin</th>
                        <th className="py-3 px-4">Titik Drop-Point</th>
                        <th className="py-3 px-4 text-center">Status</th>
                        <th className="py-3 px-4 text-center">Manifest</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/10 text-on-surface">
                      {transactions.map(trx => (
                        <tr key={trx.id} className="hover:bg-surface-container-low/50 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold">
                            <button
                              type="button"
                              onClick={() => openDetailTrx(trx)}
                              className="text-primary hover:text-secondary hover:underline cursor-pointer flex items-center gap-1.5"
                            >
                              <span>{trx.id}</span>
                              {trx.photoUrl && <Icon name="image" size={13} className="text-secondary" />}
                            </button>
                          </td>
                          <td className="py-3 px-4 text-outline whitespace-nowrap">{trx.date}</td>
                          <td className="py-3 px-4 font-semibold text-primary">{trx.wasteType}</td>
                          <td className="py-3 px-4 text-right font-bold tabular-nums">{trx.weightKg.toFixed(1)} kg</td>
                          <td className="py-3 px-4 text-right font-bold text-primary tabular-nums">
                            Rp {trx.valueIdr.toLocaleString('id-ID')}
                          </td>
                          <td className="py-3 px-4 text-right font-bold text-secondary tabular-nums">
                            +{trx.points} Pts
                          </td>
                          <td className="py-3 px-4 text-outline truncate max-w-[160px]">{trx.dropPoint}</td>
                          <td className="py-3 px-4 text-center">
                            <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold text-[10px] uppercase">
                              {trx.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => openDetailTrx(trx)}
                              className="p-1.5 rounded-lg hover:bg-surface-container text-secondary hover:text-primary transition-colors cursor-pointer"
                              title="Buka Lembar Manifest"
                            >
                              <Icon name="receipt" size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: LENCANA & PENCAPAIAN */}
        {activeTab === 'lencana' && (
          <div className="space-y-space-md">
            <div className="p-space-lg rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/20 pb-3">
                <div>
                  <h3 className="font-headline-sm text-sm font-bold text-primary">
                    Etalase Pencapaian Sirkular
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Lencana digital diperoleh melalui aksi nyata konsisten memilah dan mengurangi limbah.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold text-xs">
                  {completedBadges.length} dari {COMMUNITY_CHALLENGES.length} Lencana Terbuka
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {COMMUNITY_CHALLENGES.map(ch => (
                  <div
                    key={ch.id}
                    className={`p-4 rounded-xl border transition-all text-center space-y-2.5 ${
                      ch.completed
                        ? 'bg-primary text-on-primary border-primary shadow-md'
                        : 'bg-surface-container-low border-outline-variant/30 opacity-60'
                    }`}
                  >
                    <div className="w-14 h-14 mx-auto rounded-full bg-surface-container-lowest/20 flex items-center justify-center text-3xl shadow-inner">
                      {ch.completed ? '🎖️' : '🔒'}
                    </div>
                    <div>
                      <h4 className="font-title-md font-bold text-xs">
                        {ch.badgeName}
                      </h4>
                      <p className="text-[11px] opacity-80 line-clamp-2 mt-0.5">
                        {ch.description}
                      </p>
                    </div>
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-surface-container-lowest/30">
                      {ch.completed ? 'Terverifikasi Selesai' : 'Belum Terbuka'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LINIMASA JEJAK LANGKAH */}
        {activeTab === 'linimasa' && (
          <div className="rounded-2xl bg-surface-container-lowest border border-outline-variant/30 p-space-lg sm:p-space-xl shadow-sm space-y-space-md">
            <div className="border-b border-outline-variant/20 pb-3">
              <h3 className="font-headline-sm text-sm font-bold text-primary">
                Kronologi Jejak Langkah Ekologis
              </h3>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Rekaman historis interaksi Anda dalam sistem ECOCYCLE.
              </p>
            </div>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-outline-variant/30">
              {activities.map(act => (
                <div key={act.id} className="relative space-y-1">
                  <span className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-secondary ring-4 ring-surface" />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-title-md font-bold text-xs text-primary flex items-center gap-1.5">
                      <Icon name={act.icon} size={14} className="text-secondary" />
                      <span>{act.title}</span>
                    </span>
                    <span className="text-[11px] text-outline">{act.timestamp}</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {act.description}
                  </p>
                  {act.pointsDelta && (
                    <span className="inline-block text-[11px] font-bold text-secondary">
                      +{act.pointsDelta} EcoPoints
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PENGATURAN & PREFERENSI */}
        {activeTab === 'pengaturan' && (
          <div className="rounded-2xl bg-surface-container-lowest border border-outline-variant/30 p-space-lg sm:p-space-xl shadow-sm space-y-space-md max-w-2xl">
            <div className="border-b border-outline-variant/20 pb-3">
              <h3 className="font-headline-sm text-sm font-bold text-primary">
                Preferensi Akun & Target Ekologis
              </h3>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Konfigurasikan target pemilahan bulanan dan notifikasi jadwal penjemputan.
              </p>
            </div>

            <div className="space-y-4 text-xs text-on-surface">
              {/* Monthly Goal Slider */}
              <div className="space-y-2 p-4 rounded-xl bg-surface-container-low border border-outline-variant/20">
                <div className="flex items-center justify-between font-bold">
                  <span>Target Pilahan Bulanan</span>
                  <span className="text-secondary text-base font-extrabold">{monthlyGoal} kg / bulan</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="1"
                  value={monthlyGoal}
                  onChange={(e) => setMonthlyGoal(parseFloat(e.target.value))}
                  className="w-full accent-secondary cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-outline">
                  <span>5 kg (Pemula)</span>
                  <span>25 kg (Keluarga)</span>
                  <span>50 kg (Komunitas)</span>
                </div>
              </div>

              {/* Preferred Drop-Point */}
              <div>
                <label className="block font-bold text-on-surface-variant uppercase text-[11px] mb-1">
                  Titik Drop-Point Pilihan Utama
                </label>
                <select
                  value={preferredDropPoint}
                  onChange={(e) => setPreferredDropPoint(e.target.value)}
                  className="w-full h-11 px-3 rounded-lg bg-surface-container text-xs text-on-surface outline-none border border-outline-variant/20 focus:ring-2 focus:ring-secondary"
                >
                  {DROP_POINTS.map(dp => (
                    <option key={dp.id} value={dp.name}>{dp.name} ({dp.subdistrict})</option>
                  ))}
                </select>
              </div>

              {/* Toggles */}
              <div className="space-y-3 pt-2">
                <label className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low cursor-pointer">
                  <div>
                    <span className="font-bold text-primary block">Notifikasi Setoran & Verifikasi</span>
                    <span className="text-[11px] text-outline">Pemberitahuan saat bobot diverifikasi oleh timbangan hub</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                    className="w-4 h-4 accent-secondary cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low cursor-pointer">
                  <div>
                    <span className="font-bold text-primary block">Ringkasan Warta Mingguan</span>
                    <span className="text-[11px] text-outline">Laporan reduksi emisi dan statistik kampus tiap hari Senin</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailDigest}
                    onChange={(e) => setEmailDigest(e.target.checked)}
                    className="w-4 h-4 accent-secondary cursor-pointer"
                  />
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-outline-variant/20 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleResetProfile}
                  className="h-10 px-4 rounded-lg text-error hover:bg-error-container text-xs font-bold transition-colors cursor-pointer"
                >
                  Reset Profil ke Awal
                </button>

                <button
                  type="button"
                  onClick={handleSaveSettings}
                  className="h-10 px-6 rounded-lg bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition-all cursor-pointer shadow-sm"
                >
                  Simpan Pengaturan
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/70 backdrop-blur-md animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsEditModalOpen(false);
          }}
        >
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full border border-outline-variant/30 shadow-2xl p-space-lg sm:p-space-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
              <h3 className="font-headline-sm text-sm font-bold text-primary flex items-center gap-2">
                <Icon name="edit" size={16} className="text-secondary" />
                <span>Perbarui Identitas Pengguna</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-outline hover:text-primary cursor-pointer"
              >
                <Icon name="close" size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3 text-xs text-on-surface">
              {/* Avatar Selector */}
              <div>
                <label className="block font-bold text-on-surface-variant uppercase text-[11px] mb-1.5">
                  Pilih Avatar Profil
                </label>
                <div className="flex items-center gap-3">
                  {avatarOptions.map(opt => (
                    <button
                      key={opt.path}
                      type="button"
                      onClick={() => setEditAvatar(opt.path)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        editAvatar === opt.path ? 'border-secondary ring-2 ring-secondary/30 scale-105' : 'border-outline-variant/40 opacity-70'
                      }`}
                    >
                      <img src={opt.path} alt={opt.label} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-on-surface-variant uppercase text-[11px] mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-surface-container text-xs text-on-surface outline-none border border-outline-variant/20 focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block font-bold text-on-surface-variant uppercase text-[11px] mb-1">
                  Nomor Kontak / WhatsApp
                </label>
                <input
                  type="text"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-surface-container text-xs text-on-surface outline-none border border-outline-variant/20 focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block font-bold text-on-surface-variant uppercase text-[11px] mb-1">
                  Lokasi / Alamat Domisili
                </label>
                <input
                  type="text"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-surface-container text-xs text-on-surface outline-none border border-outline-variant/20 focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block font-bold text-on-surface-variant uppercase text-[11px] mb-1">
                  Biografi Singkat
                </label>
                <textarea
                  rows={3}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-surface-container text-xs text-on-surface outline-none border border-outline-variant/20 focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div className="pt-3 border-t border-outline-variant/20 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="h-10 px-4 rounded-lg text-outline hover:bg-surface-container font-bold text-xs cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="h-10 px-6 rounded-lg bg-secondary text-on-secondary font-bold text-xs hover:bg-secondary/90 transition-all cursor-pointer shadow-sm"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </PageTransition>
  );
};
