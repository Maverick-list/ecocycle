import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CommunityChallenge } from '../../types';
import { useWasteBank } from '../../context/WasteBankContext';
import { ChallengesService } from '../../services/challengesService';
import { Icon } from '../../components/ui/Icon';
import { PageTransition } from '../../components/ui/PageTransition';
import { SEOHead } from '../../components/seo/SEOHead';

export const EcoChallengesPage: React.FC = () => {
  const { totalPoints, totalWeightKg, showToast, addBonusPoints } = useWasteBank();
  const [challenges, setChallenges] = useState<CommunityChallenge[]>(() => ChallengesService.getChallenges());
  const [activeBadgeCelebration, setActiveBadgeCelebration] = useState<{ name: string; points: number } | null>(null);
  const [activeTab, setActiveTab] = useState<'tantangan' | 'peringkat'>('tantangan');

  const leaderboard = ChallengesService.getLeaderboard(totalPoints, totalWeightKg);
  const currentUserRank = leaderboard.find(u => u.isCurrentUser)?.rank || 1;

  const handleJoin = (challengeId: string) => {
    const updated = ChallengesService.joinChallenge(challengeId);
    setChallenges(updated);
    showToast('Berhasil bergabung dalam tantangan! Mulai centang aksi Anda.', 'info');
  };

  const handleToggleTask = (challengeId: string, taskId: string) => {
    const result = ChallengesService.toggleTask(challengeId, taskId);
    setChallenges(result.updatedChallenges);

    if (result.newlyCompleted) {
      addBonusPoints(result.rewardPoints, `Penyelesaian Tantangan: ${result.badgeName}`);
      setActiveBadgeCelebration({
        name: result.badgeName,
        points: result.rewardPoints
      });
      showToast(`Lencana "${result.badgeName}" Berhasil Dibuka! +${result.rewardPoints} Poin`, 'success');
    }
  };

  const completedCount = challenges.filter(c => c.completed).length;

  return (
    <PageTransition className="w-full bg-surface text-on-surface py-16 sm:py-24">
      <SEOHead
        title="Tantangan Komunitas & Papan Peringkat Sirkular"
        canonical="/tantangan"
        description="Ikuti misi aksi lingkungan bersama ribuan warga, raih lencana pencapaian digital, kumpulkan poin bonus, dan pantau leaderboard sirkular nasional."
      />
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        
        {/* Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-outline-variant/20">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-semibold uppercase tracking-wider text-secondary">
              <Icon name="award" size={14} />
              <span>Gamifikasi Kebiasaan Sirkular</span>
            </div>
            <h1 className="font-display font-extrabold text-page-title text-primary tracking-tight leading-tight">
              Tantangan Komunitas & Lencana Prestasi
            </h1>
            <p className="font-sans text-subheading text-on-surface-variant font-normal leading-relaxed">
              Bangun kebiasaan ramah lingkungan secara konsisten lewat misi berkala, kumpulkan lencana digital sirkular, dan bersaing sehat di papan peringkat komunitas.
            </p>
          </div>

          {/* Gamification Rank Profile */}
          <Link
            to="/profil"
            className="p-5 rounded-2xl glass-panel-elevated border border-secondary/30 shadow-lg hover:border-secondary transition-all flex items-center gap-4 shrink-0 group cursor-pointer"
            title="Buka Dasbor Profil Anda"
          >
            <div className="w-12 h-12 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center font-bold text-2xl group-hover:scale-105 transition-transform">
              🏆
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase font-bold text-outline">Peringkat Komunitas</span>
                <span className="text-[10px] text-secondary font-bold group-hover:underline">Buka Profil →</span>
              </div>
              <span className="font-display font-bold text-primary block text-sm">
                Rank #{currentUserRank} • {completedCount >= 3 ? 'Pahlawan Sirkular' : completedCount >= 1 ? 'Pejuang Daur Ulang' : 'Inisiator Hijau'}
              </span>
              <span className="text-xs text-secondary font-semibold">
                {completedCount} dari {challenges.length} Misi Rampung
              </span>
            </div>
          </Link>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-3 border-b border-outline-variant/20 pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('tantangan')}
            className={`pb-3 px-4 text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border-b-2 ${
              activeTab === 'tantangan'
                ? 'border-secondary text-primary'
                : 'border-transparent text-outline hover:text-on-surface'
            }`}
          >
            <Icon name="flag" size={16} />
            <span>Misi Berjalan ({challenges.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('peringkat')}
            className={`pb-3 px-4 text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border-b-2 ${
              activeTab === 'peringkat'
                ? 'border-secondary text-primary'
                : 'border-transparent text-outline hover:text-on-surface'
            }`}
          >
            <Icon name="leaderboard" size={16} />
            <span>Papan Peringkat Komunitas</span>
          </button>
        </div>

        {activeTab === 'tantangan' ? (
          <>
            {/* Challenges Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {challenges.map((ch) => {
                const completedTasks = ch.tasks.filter(t => t.done).length;
                const progressPercent = Math.round((completedTasks / ch.tasks.length) * 100);

                return (
                  <div
                    key={ch.id}
                    className={`p-8 rounded-3xl border transition-all flex flex-col justify-between space-y-6 ${
                      ch.completed
                        ? 'glass-panel-elevated border-secondary/40 shadow-lg'
                        : 'glass-panel border-outline-variant/25 hover:border-outline-variant/40 shadow-sm'
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full glass-pill text-xs font-bold uppercase tracking-wider text-outline">
                          Durasi: {ch.duration}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-bold">
                          +{ch.pointsReward} EcoPoints
                        </span>
                      </div>

                      <div>
                        <h3 className="font-display font-bold text-lg text-primary mb-1">
                          {ch.title}
                        </h3>
                        <p className="text-xs text-on-surface-variant leading-relaxed">
                          {ch.description}
                        </p>
                      </div>

                      {/* Join Gate or Progress Bar */}
                      {!ch.joined ? (
                        <div className="p-5 rounded-2xl glass-panel border border-dashed border-outline-variant/30 text-center space-y-3">
                          <p className="text-xs text-on-surface-variant font-medium">
                            Anda belum bergabung dalam tantangan aksi ini.
                          </p>
                          <button
                            type="button"
                            onClick={() => handleJoin(ch.id)}
                            className="px-5 py-2.5 rounded-xl bg-secondary text-white font-bold text-xs hover:bg-secondary/90 transition-all cursor-pointer shadow-md"
                          >
                            Ikuti Misi Ini
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {/* Progress Bar */}
                          <div className="space-y-1.5">
                            <div className="flex justify-between text-xs font-bold">
                              <span className="text-outline">Kemajuan Misi</span>
                              <span className="text-secondary">{progressPercent}%</span>
                            </div>
                            <div className="w-full h-2.5 rounded-full bg-surface-container overflow-hidden">
                              <div
                                style={{ width: `${progressPercent}%` }}
                                className={`h-full transition-all duration-300 ${
                                  ch.completed ? 'bg-secondary' : 'bg-emerald-400'
                                }`}
                              />
                            </div>
                          </div>

                          {/* Task Checklist */}
                          <div className="space-y-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-outline block">
                              Daftar Tindakan Nyata:
                            </span>
                            {ch.tasks.map((task) => (
                              <label
                                key={task.id}
                                className="flex items-start gap-3 p-2.5 rounded-xl glass-panel hover:bg-surface-container/60 cursor-pointer transition-colors text-xs text-on-surface border border-outline-variant/15"
                              >
                                <input
                                  type="checkbox"
                                  checked={task.done}
                                  onChange={() => handleToggleTask(ch.id, task.id)}
                                  className="mt-0.5 w-4 h-4 rounded text-secondary focus:ring-secondary cursor-pointer accent-secondary"
                                />
                                <span className={task.done ? 'line-through text-outline' : 'font-medium'}>
                                  {task.text}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Badge Unlocked Indicator */}
                    <div className="pt-4 border-t border-outline-variant/15 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-secondary/15 text-secondary flex items-center justify-center">
                          <Icon name={ch.badgeIcon || 'award'} size={18} />
                        </div>
                        <span className="text-xs font-bold text-primary">
                          Lencana: {ch.badgeName}
                        </span>
                      </div>
                      {ch.completed ? (
                        <span className="px-3 py-1 rounded-full bg-secondary text-white font-bold text-[10px] uppercase shadow-sm">
                          Selesai ✓
                        </span>
                      ) : ch.joined ? (
                        <span className="text-xs text-outline font-medium">
                          {ch.tasks.length - completedTasks} tugas tersisa
                        </span>
                      ) : (
                        <span className="text-xs text-outline italic">Siap diikuti</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Lencana Prestasi Digital Showcase */}
            <div className="p-8 sm:p-12 rounded-3xl glass-panel-elevated border border-secondary/30 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-secondary block">
                    Galeri Pencapaian
                  </span>
                  <h2 className="font-display font-bold text-2xl text-primary">
                    Lencana Sirkular Digital
                  </h2>
                </div>
                <span className="text-xs text-outline">
                  Tersimpan otomatis di profil peramban Anda
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                {challenges.map((ch) => (
                  <div
                    key={ch.id}
                    className={`p-5 rounded-2xl border text-center space-y-3 transition-all ${
                      ch.completed
                        ? 'glass-panel-elevated border-secondary/40 shadow-md'
                        : 'glass-panel border-outline-variant/20 opacity-60'
                    }`}
                  >
                    <div className="w-14 h-14 mx-auto rounded-2xl glass-panel flex items-center justify-center text-3xl shadow-sm">
                      {ch.completed ? '🎖️' : '🔒'}
                    </div>
                    <h4 className="font-display font-bold text-xs sm:text-sm text-primary">
                      {ch.badgeName}
                    </h4>
                    <span className="text-[10px] text-outline block">
                      {ch.completed ? 'Berhasil Terbuka' : 'Terkunci'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* LEADERBOARD VIEW */
          <div className="space-y-6">
            <div className="p-5 rounded-2xl glass-panel border border-secondary/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center">
                  <Icon name="award" size={18} />
                </div>
                <span className="text-xs font-medium text-on-surface">
                  Papan peringkat dihitung secara dinamis dari akumulasi EcoPoints dan massa pilahan terverifikasi.
                </span>
              </div>
              <span className="text-xs text-outline italic shrink-0">
                Peringkat Komunitas Sirkular Aktif
              </span>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-outline-variant/25 shadow-xl glass-panel">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/15 glass-panel text-outline text-[11px] uppercase tracking-wider font-semibold">
                    <th className="py-4 px-6 text-center w-20">Peringkat</th>
                    <th className="py-4 px-6">Nama Peserta / Komunitas</th>
                    <th className="py-4 px-6">Afiliasi / Peran</th>
                    <th className="py-4 px-6 text-right">Limbah Terpilah</th>
                    <th className="py-4 px-6 text-right">Total EcoPoints</th>
                    <th className="py-4 px-6 text-center">Lencana</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10 text-xs text-on-surface">
                  {leaderboard.map((user) => (
                    <tr
                      key={user.id}
                      className={`transition-colors ${
                        user.isCurrentUser
                          ? 'bg-secondary/10 font-bold border-l-4 border-l-secondary'
                          : 'hover:bg-surface-container/40'
                      }`}
                    >
                      <td className="py-4 px-6 text-center font-bold">
                        {user.rank === 1 ? (
                          <span className="text-2xl">🥇</span>
                        ) : user.rank === 2 ? (
                          <span className="text-2xl">🥈</span>
                        ) : user.rank === 3 ? (
                          <span className="text-2xl">🥉</span>
                        ) : (
                          <span className="text-outline font-mono">#{user.rank}</span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-secondary/15 text-secondary overflow-hidden shrink-0 border border-outline-variant/30 flex items-center justify-center font-bold text-xs">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <span className="block font-bold text-primary">
                              {user.name}
                            </span>
                            {user.isCurrentUser && (
                              <span className="text-[10px] text-secondary font-semibold">
                                Akun Anda Saat Ini (Sinkron dengan Profil)
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-outline">
                        {user.role}
                      </td>
                      <td className="py-4 px-6 text-right font-bold text-primary tabular-nums">
                        {user.weightKg.toFixed(1)} kg
                      </td>
                      <td className="py-4 px-6 text-right font-extrabold text-secondary tabular-nums">
                        {user.points.toLocaleString('id-ID')} Pts
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="px-2.5 py-1 rounded-full glass-pill font-bold text-[10px]">
                          {user.badgesCount} Lencana
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* BADGE CELEBRATION MODAL */}
      {activeBadgeCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
          <div className="glass-panel-elevated bg-surface text-on-surface rounded-3xl max-w-sm w-full p-8 text-center space-y-4 shadow-2xl border border-secondary/30">
            <span className="text-5xl animate-bounce block">🎉</span>
            <h3 className="font-display font-bold text-xl text-primary">
              Selamat! Lencana Baru Terbuka
            </h3>
            <div className="p-3.5 rounded-2xl glass-panel font-bold text-secondary text-sm border border-secondary/25">
              "{activeBadgeCelebration.name}"
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Anda mendapatkan <strong className="text-secondary">+{activeBadgeCelebration.points} EcoPoints</strong> yang ditambahkan langsung ke saldo profil Anda!
            </p>
            <button
              onClick={() => setActiveBadgeCelebration(null)}
              className="w-full h-11 rounded-xl bg-secondary text-white font-bold text-xs hover:bg-secondary/90 transition-all cursor-pointer shadow-md"
            >
              Klaim & Lanjutkan
            </button>
          </div>
        </div>
      )}
    </PageTransition>
  );
};
