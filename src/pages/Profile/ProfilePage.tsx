import React, { useState, useEffect } from 'react';
import { useWasteBank } from '../../context/WasteBankContext';
import { useAuth } from '../../context/AuthContext';
import { UserService } from '../../services/userService';
import { SupabaseDataService } from '../../services/supabaseDataService';
import { FirebaseDataService } from '../../services/firebaseDataService';
import { UserProfile } from '../../types';
import { Icon } from '../../components/ui/Icon';
import { AnimatedCounter } from '../../components/ui/AnimatedCounter';
import { PageTransition } from '../../components/ui/PageTransition';
import { SEOHead } from '../../components/seo/SEOHead';
import { DROP_POINTS } from '../../data/locationsData';
import { COMMUNITY_CHALLENGES } from '../../data/challengesData';
import { WithdrawModal } from '../../components/features/WithdrawModal';
import { CertificateModal } from '../../components/features/CertificateModal';

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

  const { user, isConfigured, signOut } = useAuth();

  const [profile, setProfile] = useState<UserProfile>(() => UserService.getProfile());
  const [activeTab, setActiveTab] = useState<'transaksi' | 'lencana' | 'linimasa' | 'pengaturan'>('transaksi');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [withdrawnAmount, setWithdrawnAmount] = useState<number>(0);

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

  // Sync remote profile from Cloud (Firebase or Supabase) when user is authenticated
  useEffect(() => {
    if (user) {
      if (FirebaseDataService.isConfigured) {
        FirebaseDataService.fetchUserProfile(user.id).then(({ profile: remoteProfile, error }) => {
          if (!error && remoteProfile) {
            setProfile(prev => ({
              ...prev,
              id: remoteProfile.id || prev.id,
              name: remoteProfile.name || prev.name,
              email: remoteProfile.email || prev.email,
              phone: remoteProfile.phone || prev.phone,
              location: remoteProfile.location || prev.location,
              avatar: remoteProfile.avatar || prev.avatar,
            }));
            setEditName(remoteProfile.name || editName);
            setEditPhone(remoteProfile.phone || editPhone);
            setEditLocation(remoteProfile.location || editLocation);
          }
        });
      } else if (isConfigured) {
        SupabaseDataService.fetchProfile(user.id).then(({ profile: remoteProfile, error }) => {
          if (!error && remoteProfile) {
            setProfile(prev => ({
              ...prev,
              id: remoteProfile.id,
              name: remoteProfile.full_name || prev.name,
              email: remoteProfile.email || prev.email,
              phone: remoteProfile.phone || prev.phone,
              location: remoteProfile.address || prev.location,
              avatar: remoteProfile.avatar_url || prev.avatar,
            }));
            setEditName(remoteProfile.full_name || editName);
            setEditPhone(remoteProfile.phone || editPhone);
            setEditLocation(remoteProfile.address || editLocation);
          }
        });
      }
    }
  }, [user, isConfigured]);

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

    // If authenticated, update remote cloud profile (Firebase or Supabase)
    if (user) {
      if (FirebaseDataService.isConfigured) {
        FirebaseDataService.updateUserProfile(user.id, {
          name: editName,
          phone: editPhone,
          location: editLocation,
          bio: editBio,
          avatar: editAvatar,
        }).catch(err => console.warn('[Firebase Sync] Profile update warning:', err));
      } else if (isConfigured) {
        SupabaseDataService.updateProfile(user.id, {
          full_name: editName,
          phone: editPhone,
          address: editLocation,
        }).catch(err => console.warn('[Supabase Sync] Profile update warning:', err));
      }
    }

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
    <PageTransition className="w-full min-h-screen bg-surface dark:bg-[#03140d] text-on-surface dark:text-white py-12 sm:py-16 transition-colors duration-300">
      <SEOHead
        title="Pusat Kendali Pengguna Terpadu"
        canonical="/profil"
        description="Dasbor profil pribadi, neraca tabungan daur ulang, koleksi lencana sirkular, dan preferensi akun."
        noindex={true}
      />
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        
        {/* Top Breadcrumb & Status Bar with Soft Gradient Divider */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-secondary">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
            <span className="uppercase tracking-wider">
              {user ? `Akun Terautentikasi: ${user.displayName || user.email || 'Warga Sirkular'}` : 'Pusat Kendali Pengguna Terpadu'}
            </span>

            {/* Authentication Provider Badges */}
            {user?.authMethod === 'google' && (
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-500 border border-blue-500/30 text-[10px] font-bold flex items-center gap-1">
                <span>🌐</span>
                <span>Google Terverifikasi</span>
              </span>
            )}
            {user?.authMethod === 'phone' && (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1">
                <span>📱</span>
                <span>No. HP Terverifikasi ({user.phoneNumber})</span>
              </span>
            )}
            {user?.authMethod === 'email' && (
              <span className="px-2.5 py-0.5 rounded-full bg-teal-500/15 text-teal-500 border border-teal-500/30 text-[10px] font-bold flex items-center gap-1">
                <span>✉️</span>
                <span>Email Terverifikasi</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-medium text-secondary">
              <Icon name={user ? 'verified' : 'info'} size={14} />
              <span>
                {user
                  ? `Sesi Aktif: ${user.displayName || user.email || user.phoneNumber}`
                  : 'Mode Peraga Sandbox • Sesi Terbuka'}
              </span>
            </div>
            {user && (
              <button
                type="button"
                onClick={async () => {
                  await signOut();
                  showToast('Anda telah keluar dari sesi akun.', 'info');
                }}
                className="h-8 px-3 rounded-full glass-pill text-[11px] font-bold text-error hover:bg-error/15 transition-colors cursor-pointer"
              >
                Keluar
              </button>
            )}
          </div>
        </div>

        {/* Apple-style Soft Gradient Section Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent pointer-events-none" />

        {/* 1. HERO PROFILE CARD */}
        <div className="rounded-3xl glass-panel-elevated border border-outline-variant/25 p-8 sm:p-12 shadow-xl overflow-hidden relative">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
            {/* Left: Avatar + Identity */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative shrink-0">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-4 ring-secondary/20 shadow-xl"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <span className="absolute -bottom-2 -right-2 px-3 py-0.5 rounded-full bg-secondary text-white font-bold text-[10px] uppercase shadow-md flex items-center gap-1">
                  <Icon name="verified" size={12} />
                  <span>Aktif</span>
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-primary tracking-tight">
                    {profile.name}
                  </h1>
                  <span className="px-3 py-1 rounded-full bg-secondary/15 text-secondary font-bold text-xs">
                    {profile.ecoLevel}
                  </span>
                </div>
                <p className="text-xs font-semibold text-secondary">
                  {profile.role} • {profile.affiliation}
                </p>
                <p className="text-xs text-on-surface-variant max-w-xl line-clamp-2 leading-relaxed">
                  {profile.bio}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-outline pt-1">
                  <span className="flex items-center gap-1.5">
                    <Icon name="map_pin" size={14} className="text-secondary" />
                    <span>{profile.location}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icon name="calendar" size={14} className="text-secondary" />
                    <span>Bergabung {profile.joinedDate}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Streak & Actions */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 w-full lg:w-auto shrink-0">
              <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl glass-panel border border-outline-variant/20 shadow-sm w-full sm:w-auto justify-center">
                <span className="text-2xl">🔥</span>
                <div>
                  <span className="text-[10px] text-outline uppercase font-bold block">Konsistensi Aksi</span>
                  <span className="text-sm font-bold text-primary">
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
                className="h-11 px-5 rounded-xl bg-secondary text-white font-sans text-xs font-bold hover:bg-secondary/90 transition-all cursor-pointer flex items-center gap-2 shadow-md w-full sm:w-auto justify-center hover:scale-[1.02] active:scale-[0.98]"
              >
                <Icon name="edit" size={14} />
                <span>Perbarui Profil</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. PERSONAL ECO-STAT BENTO MATRIX */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Total Weight + Monthly Target Progress */}
          <div className="p-8 rounded-3xl glass-panel border border-outline-variant/25 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-outline">Akumulasi Setoran</span>
                <Icon name="recycle" size={20} className="text-secondary" />
              </div>
              <div className="flex items-baseline gap-1 my-2">
                <AnimatedCounter value={totalWeightKg} decimals={1} className="font-display font-extrabold text-3xl sm:text-4xl text-primary" />
                <span className="text-sm font-bold text-secondary">kg</span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Target Bulan Ini: <strong className="text-on-surface">{monthlyGoal} kg</strong>
              </p>
            </div>

            <div className="pt-3 border-t border-outline-variant/15 space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
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
          <div className="p-8 rounded-3xl glass-panel border border-outline-variant/25 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-outline">Saldo EcoPoints</span>
                <Icon name="coins" size={20} className="text-secondary" />
              </div>
              <div className="flex items-baseline gap-1 my-2">
                <AnimatedCounter value={totalPoints} className="font-display font-extrabold text-3xl sm:text-4xl text-secondary" />
                <span className="text-sm font-bold text-primary">Pts</span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Dapat ditukarkan kupon reward & bibit pohon
              </p>
            </div>

            <div className="pt-3 border-t border-outline-variant/15 flex items-center justify-between text-xs font-semibold text-primary">
              <span>Status Dompet:</span>
              <span className="text-secondary font-bold">Aktif & Terverifikasi</span>
            </div>
          </div>

          {/* Card 3: Saldo Rupiah */}
          <div className="p-8 rounded-3xl glass-panel border border-outline-variant/25 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-outline">Konversi Simpanan</span>
                <Icon name="wallet" size={20} className="text-secondary" />
              </div>
              <div className="my-2">
                <span className="font-display font-extrabold text-3xl sm:text-4xl text-primary">
                  Rp{Math.max(0, totalBalanceIdr - withdrawnAmount).toLocaleString('id-ID')}
                </span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Estimasi nilai tabungan material daur ulang
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-outline-variant/15">
              <div className="flex items-center justify-between text-xs text-outline">
                <span>Frekuensi Transaksi:</span>
                <strong className="text-on-surface">{transactions.length} Kali Setor</strong>
              </div>
              <button
                type="button"
                onClick={() => setIsWithdrawModalOpen(true)}
                className="w-full h-10 rounded-xl bg-secondary text-white font-extrabold text-xs hover:bg-secondary/90 transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer hover:scale-[1.01]"
              >
                <Icon name="payments" size={15} />
                <span>Tarik Saldo Rupiah</span>
              </button>
            </div>
          </div>

          {/* Card 4: Reduksi Karbon */}
          <div className="p-8 rounded-3xl glass-panel border border-outline-variant/25 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-outline">Jejak Karbon Terhindar</span>
                <Icon name="cloud" size={20} className="text-secondary" />
              </div>
              <div className="flex items-baseline gap-1 my-2">
                <AnimatedCounter value={totalCo2AvoidedKg} decimals={1} className="font-display font-extrabold text-3xl sm:text-4xl text-primary" />
                <span className="text-sm font-bold text-secondary">kg CO₂e</span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Setara ~{(totalCo2AvoidedKg / 21.77).toFixed(1)} pohon dewasa/tahun
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-outline-variant/15">
              <div className="text-xs text-outline flex items-center gap-1.5">
                <Icon name="leaf" size={13} className="text-secondary" />
                <span>Standar US EPA WARM v15</span>
              </div>
              <button
                type="button"
                onClick={() => setIsCertificateModalOpen(true)}
                className="w-full h-10 rounded-xl glass-pill border border-secondary/35 text-secondary hover:bg-secondary/15 font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer hover:scale-[1.01]"
              >
                <Icon name="award" size={15} />
                <span>Klaim Sertifikat Resmi</span>
              </button>
            </div>
          </div>

        </div>

        {/* 3. TABBED DASHBOARD CONTROLS WITH SOFT GRADIENT DIVIDER */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('transaksi')}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'transaksi'
                  ? 'bg-secondary text-white shadow-sm font-extrabold'
                  : 'glass-pill hover:bg-surface-container text-on-surface'
              }`}
            >
              <Icon name="receipt" size={16} />
              <span>Riwayat Transaksi Saya ({transactions.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('lencana')}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'lencana'
                  ? 'bg-secondary text-white shadow-sm font-extrabold'
                  : 'glass-pill hover:bg-surface-container text-on-surface'
              }`}
            >
              <Icon name="award" size={16} />
              <span>Lencana & Prestasi ({completedBadges.length})</span>
            </button>

          <button
            type="button"
            onClick={() => setActiveTab('linimasa')}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'linimasa'
                ? 'bg-secondary text-white shadow-sm'
                : 'glass-pill hover:bg-surface-container text-on-surface'
            }`}
          >
            <Icon name="activity" size={16} />
            <span>Linimasa Jejak Langkah</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pengaturan')}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'pengaturan'
                ? 'bg-secondary text-white shadow-sm'
                : 'glass-pill hover:bg-surface-container text-on-surface'
            }`}
          >
            <Icon name="settings" size={16} />
            <span>Pengaturan & Target Ekologis</span>
          </button>
        </div>

        {/* Soft Gradient Tab Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500/25 to-transparent pointer-events-none" />
      </div>

        {/* 4. TAB CONTENTS */}
        
        {/* TAB 1: TRANSAKSI SAYA */}
        {activeTab === 'transaksi' && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-outline-variant/25 glass-panel shadow-xl overflow-hidden">
              <div className="p-6 sm:p-8 border-b border-outline-variant/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display font-bold text-lg text-primary">
                    Buku Mutasi Penyetoran Mandiri
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                    Klik nomor tiket atau tombol manifest untuk membuka lembar verifikasi resmi timbangan.
                  </p>
                </div>
                <span className="text-xs text-outline font-medium">
                  {transactions.length} Catatan Tersimpan
                </span>
              </div>

              {transactions.length === 0 ? (
                <div className="p-16 text-center text-on-surface-variant space-y-3">
                  <Icon name="receipt" size={36} className="text-outline mx-auto" />
                  <p className="font-display font-bold text-primary text-base">Belum Ada Riwayat Setoran</p>
                  <p className="text-xs">Mulai setor sampah Anda di drop-point terdekat untuk mengumpulkan EcoPoints.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-outline-variant/15 glass-panel text-outline text-[11px] uppercase tracking-wider font-semibold">
                        <th className="py-4 px-6">No. Registrasi</th>
                        <th className="py-4 px-6">Waktu</th>
                        <th className="py-4 px-6">Material</th>
                        <th className="py-4 px-6 text-right">Bobot</th>
                        <th className="py-4 px-6 text-right">Nilai Rupiah</th>
                        <th className="py-4 px-6 text-right">Poin</th>
                        <th className="py-4 px-6">Titik Drop-Point</th>
                        <th className="py-4 px-6 text-center">Status</th>
                        <th className="py-4 px-6 text-center">Manifest</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/10 text-on-surface">
                      {transactions.map(trx => (
                        <tr key={trx.id} className="hover:bg-surface-container/40 transition-colors">
                          <td className="py-4 px-6 font-mono font-bold">
                            <button
                              type="button"
                              onClick={() => openDetailTrx(trx)}
                              className="text-primary hover:text-secondary hover:underline cursor-pointer flex items-center gap-1.5"
                            >
                              <span>{trx.id}</span>
                              {trx.photoUrl && <Icon name="image" size={13} className="text-secondary" />}
                            </button>
                          </td>
                          <td className="py-4 px-6 text-outline whitespace-nowrap">{trx.date}</td>
                          <td className="py-4 px-6 font-semibold text-primary">{trx.wasteType}</td>
                          <td className="py-4 px-6 text-right font-bold tabular-nums">{trx.weightKg.toFixed(1)} kg</td>
                          <td className="py-4 px-6 text-right font-bold text-primary tabular-nums">
                            Rp{trx.valueIdr.toLocaleString('id-ID')}
                          </td>
                          <td className="py-4 px-6 text-right font-bold text-secondary tabular-nums">
                            +{trx.points} Pts
                          </td>
                          <td className="py-4 px-6 text-outline truncate max-w-[160px]">{trx.dropPoint}</td>
                          <td className="py-4 px-6 text-center">
                            <span className="px-2.5 py-1 rounded-full bg-secondary/15 text-secondary font-bold text-[10px] uppercase">
                              {trx.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <button
                              type="button"
                              onClick={() => openDetailTrx(trx)}
                              className="p-2 rounded-xl glass-pill hover:bg-surface-container text-secondary hover:text-primary transition-colors cursor-pointer"
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
          <div className="space-y-6">
            <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-outline-variant/25 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/15 pb-4">
                <div>
                  <h3 className="font-display font-bold text-xl text-primary">
                    Etalase Pencapaian Sirkular
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                    Lencana digital diperoleh melalui aksi nyata konsisten memilah dan mengurangi limbah.
                  </p>
                </div>
                <span className="px-3.5 py-1.5 rounded-full bg-secondary/15 text-secondary font-bold text-xs">
                  {completedBadges.length} dari {COMMUNITY_CHALLENGES.length} Lencana Terbuka
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {COMMUNITY_CHALLENGES.map(ch => (
                  <div
                    key={ch.id}
                    className={`p-6 rounded-3xl border transition-all text-center space-y-3 ${
                      ch.completed
                        ? 'glass-panel-elevated border-secondary/40 shadow-md'
                        : 'glass-panel border-outline-variant/20 opacity-60'
                    }`}
                  >
                    <div className="w-16 h-16 mx-auto rounded-2xl glass-panel flex items-center justify-center text-3xl shadow-sm">
                      {ch.completed ? '🎖️' : '🔒'}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-primary">
                        {ch.badgeName}
                      </h4>
                      <p className="text-xs text-on-surface-variant line-clamp-2 mt-1 leading-relaxed">
                        {ch.description}
                      </p>
                    </div>
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase glass-pill">
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
          <div className="rounded-3xl glass-panel border border-outline-variant/25 p-8 sm:p-12 shadow-xl space-y-6">
            <div className="border-b border-outline-variant/15 pb-4">
              <h3 className="font-display font-bold text-xl text-primary">
                Kronologi Jejak Langkah Ekologis
              </h3>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                Rekaman historis interaksi Anda dalam sistem ECOCYCLE.
              </p>
            </div>

            <div className="relative pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-outline-variant/25">
              {activities.map(act => (
                <div key={act.id} className="relative space-y-1.5">
                  <span className="absolute -left-8 top-1.5 w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center text-[10px] ring-4 ring-surface" />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-display font-bold text-sm text-primary flex items-center gap-2">
                      <Icon name={act.icon} size={15} className="text-secondary" />
                      <span>{act.title}</span>
                    </span>
                    <span className="text-xs text-outline font-medium">{act.timestamp}</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {act.description}
                  </p>
                  {act.pointsDelta && (
                    <span className="inline-block text-xs font-bold text-secondary">
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
          <div className="rounded-3xl glass-panel border border-outline-variant/25 p-8 sm:p-12 shadow-xl space-y-8 max-w-2xl">
            <div className="border-b border-outline-variant/15 pb-4">
              <h3 className="font-display font-bold text-xl text-primary">
                Preferensi Akun & Target Ekologis
              </h3>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                Konfigurasikan target pemilahan bulanan dan notifikasi jadwal penjemputan.
              </p>
            </div>

            <div className="space-y-6 text-xs text-on-surface">
              {/* Monthly Goal Slider */}
              <div className="space-y-3 p-6 rounded-2xl glass-panel border border-outline-variant/20">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-primary text-sm">Target Pilahan Bulanan</span>
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
              <div className="space-y-2">
                <label className="block font-bold text-outline uppercase text-[11px] tracking-wider">
                  Titik Drop-Point Pilihan Utama
                </label>
                <select
                  value={preferredDropPoint}
                  onChange={(e) => setPreferredDropPoint(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl glass-panel text-xs text-on-surface outline-none border border-outline-variant/25 focus:ring-2 focus:ring-secondary/50"
                >
                  {DROP_POINTS.map(dp => (
                    <option key={dp.id} value={dp.name}>{dp.name} ({dp.subdistrict})</option>
                  ))}
                </select>
              </div>

              {/* Toggles */}
              <div className="space-y-3 pt-2">
                <label className="flex items-center justify-between p-4 rounded-2xl glass-panel border border-outline-variant/15 cursor-pointer">
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

                <label className="flex items-center justify-between p-4 rounded-2xl glass-panel border border-outline-variant/15 cursor-pointer">
                  <div>
                    <span className="font-bold text-primary block">Ringkasan Warta Mingguan</span>
                    <span className="text-[11px] text-outline">Laporan reduksi emisi dan audit material tiap Senin</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailDigest}
                    onChange={(e) => setEmailDigest(e.target.checked)}
                    className="w-4 h-4 accent-secondary cursor-pointer"
                  />
                </label>
              </div>

              {/* Keamanan & Sesi Akun */}
              <div className="p-6 rounded-2xl glass-panel border border-outline-variant/20 space-y-4">
                <span className="font-bold text-primary block text-xs uppercase tracking-wider">
                  Keamanan & Status Autentikasi
                </span>
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-outline">Surel Terautentikasi:</span>
                      <span className="font-mono font-bold text-primary">{user.email}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-outline">ID Pengguna (UID):</span>
                      <span className="font-mono text-[10px] text-outline truncate max-w-[180px]">{user.id}</span>
                    </div>
                    <div className="pt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={async () => {
                          await signOut();
                          showToast('Berhasil keluar dari akun.', 'info');
                        }}
                        className="px-5 py-2.5 rounded-xl bg-error/15 text-error font-bold text-xs hover:bg-error/25 transition-colors cursor-pointer"
                      >
                        Keluar dari Akun (Sign Out)
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-on-surface-variant block">Anda sedang dalam mode peraga.</span>
                      <span className="text-[11px] text-outline">Masuk ke akun untuk mengaktifkan sinkronisasi cloud.</span>
                    </div>
                    <a
                      href="/masuk"
                      className="px-4 py-2 rounded-xl bg-secondary text-white font-bold text-xs hover:bg-secondary/90 transition-colors"
                    >
                      Masuk ke Akun
                    </a>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-outline-variant/15 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleResetProfile}
                  className="h-11 px-5 rounded-xl text-error hover:bg-error/10 text-xs font-bold transition-colors cursor-pointer"
                >
                  Reset Profil ke Awal
                </button>

                <button
                  type="button"
                  onClick={handleSaveSettings}
                  className="h-11 px-6 rounded-xl bg-secondary text-white font-bold text-xs hover:bg-secondary/90 transition-all cursor-pointer shadow-md"
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsEditModalOpen(false);
          }}
        >
          <div className="glass-panel-elevated bg-surface text-on-surface rounded-3xl max-w-lg w-full border border-outline-variant/30 shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/15">
              <h3 className="font-display font-bold text-lg text-primary flex items-center gap-2">
                <Icon name="edit" size={18} className="text-secondary" />
                <span>Perbarui Identitas Pengguna</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="w-9 h-9 rounded-full glass-pill flex items-center justify-center text-outline hover:text-primary cursor-pointer"
              >
                <Icon name="close" size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs text-on-surface">
              {/* Avatar Selector */}
              <div>
                <label className="block font-bold text-outline uppercase text-[11px] mb-2 tracking-wider">
                  Pilih Avatar Profil
                </label>
                <div className="flex items-center gap-4">
                  {avatarOptions.map(opt => (
                    <button
                      key={opt.path}
                      type="button"
                      onClick={() => setEditAvatar(opt.path)}
                      className={`relative w-16 h-16 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                        editAvatar === opt.path ? 'border-secondary ring-4 ring-secondary/25 scale-105' : 'border-outline-variant/30 opacity-70'
                      }`}
                    >
                      <img src={opt.path} alt={opt.label} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-outline uppercase text-[11px] mb-1.5 tracking-wider">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl glass-panel text-xs text-on-surface outline-none border border-outline-variant/25 focus:ring-2 focus:ring-secondary/50"
                />
              </div>

              <div>
                <label className="block font-bold text-outline uppercase text-[11px] mb-1.5 tracking-wider">
                  Nomor Kontak / WhatsApp
                </label>
                <input
                  type="text"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl glass-panel text-xs text-on-surface outline-none border border-outline-variant/25 focus:ring-2 focus:ring-secondary/50"
                />
              </div>

              <div>
                <label className="block font-bold text-outline uppercase text-[11px] mb-1.5 tracking-wider">
                  Lokasi / Alamat Domisili
                </label>
                <input
                  type="text"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl glass-panel text-xs text-on-surface outline-none border border-outline-variant/25 focus:ring-2 focus:ring-secondary/50"
                />
              </div>

              <div>
                <label className="block font-bold text-outline uppercase text-[11px] mb-1.5 tracking-wider">
                  Biografi Singkat
                </label>
                <textarea
                  rows={3}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full p-4 rounded-xl glass-panel text-xs text-on-surface outline-none border border-outline-variant/25 focus:ring-2 focus:ring-secondary/50"
                />
              </div>

              <div className="pt-4 border-t border-outline-variant/15 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="h-11 px-5 rounded-xl glass-pill text-outline hover:text-on-surface font-semibold text-xs cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="h-11 px-6 rounded-xl bg-secondary text-white font-bold text-xs hover:bg-secondary/90 transition-all cursor-pointer shadow-md"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Interactive Withdraw Modal (Pencairan Saldo Rupiah) */}
      <WithdrawModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        availableBalance={Math.max(0, totalBalanceIdr - withdrawnAmount)}
        onSuccess={(amount, dest, acc) => {
          setWithdrawnAmount((prev) => prev + amount);
          showToast(
            `Penarikan dana sebesar Rp ${amount.toLocaleString('id-ID')} ke ${dest} (${acc}) berhasil diproses tanpa biaya admin!`,
            'success'
          );
        }}
      />

      {/* Official Ecological Carbon Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
        userName={profile.name}
        totalCo2Avoided={totalCo2AvoidedKg}
        totalWeightKg={totalWeightKg}
        joinedDate={profile.joinedDate}
      />

    </PageTransition>
  );
};
