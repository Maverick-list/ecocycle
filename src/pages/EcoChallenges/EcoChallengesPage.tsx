import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CommunityChallenge } from '../../types';
import { useWasteBank } from '../../context/WasteBankContext';
import { ChallengesService } from '../../services/challengesService';
import { Icon } from '../../components/ui/Icon';
import { PageTransition } from '../../components/ui/PageTransition';

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
    <PageTransition>
      <div className="w-full bg-surface py-space-xl">
        <div className="max-w-[1380px] mx-auto px-margin-sm lg:px-margin space-y-space-xl">
          
          {/* Header */}
          <div className="border-b border-outline-variant/30 pb-space-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                <span className="font-label-caps text-secondary font-bold uppercase tracking-wider">
                  Tantangan Komunitas & Gamifikasi
                </span>
              </div>
              <h1 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl font-bold text-primary tracking-tight">
                Aksi Berkelanjutan & Lencana Prestasi
              </h1>
              <p className="font-body-md text-on-surface-variant max-w-2xl mt-1">
                Bangun kebiasaan ramah lingkungan secara bertahap melalui aksi mingguan, dapatkan lencana digital, dan bersaing sehat di papan peringkat komunitas.
              </p>
            </div>

            {/* Gamification Rank Profile */}
            <Link
              to="/profil"
              className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm hover:border-secondary hover:shadow-md transition-all flex items-center gap-3 shrink-0 group cursor-pointer"
              title="Buka Dasbor Profil Anda"
            >
              <div className="w-12 h-12 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-bold text-2xl shadow-inner group-hover:scale-105 transition-transform">
                🏆
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-label-caps text-outline uppercase block text-[10px]">Peringkat Anda</span>
                  <span className="text-[10px] text-secondary font-bold group-hover:underline">Buka Profil →</span>
                </div>
                <span className="font-title-md font-bold text-primary block">
                  Rank #{currentUserRank} • {completedCount >= 3 ? 'Pahlawan Sirkular' : completedCount >= 1 ? 'Pejuang Daur Ulang' : 'Pemula Hijau'}
                </span>
                <span className="text-xs text-secondary font-semibold">
                  {completedCount} dari {challenges.length} Tantangan Selesai
                </span>
              </div>
            </Link>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-3 border-b border-outline-variant/20 pb-1">
            <button
              type="button"
              onClick={() => setActiveTab('tantangan')}
              className={`pb-2.5 px-3 font-title-md text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border-b-2 ${
                activeTab === 'tantangan'
                  ? 'border-secondary text-primary'
                  : 'border-transparent text-outline hover:text-on-surface'
              }`}
            >
              <Icon name="flag" size={16} />
              <span>Daftar Tantangan Berjalan ({challenges.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('peringkat')}
              className={`pb-2.5 px-3 font-title-md text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border-b-2 ${
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                {challenges.map((ch) => {
                  const completedTasks = ch.tasks.filter(t => t.done).length;
                  const progressPercent = Math.round((completedTasks / ch.tasks.length) * 100);

                  return (
                    <div
                      key={ch.id}
                      className={`p-space-lg rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                        ch.completed
                          ? 'bg-surface-container-low border-secondary shadow-md'
                          : 'bg-surface-container-lowest border-outline-variant/30 shadow-sm hover:shadow-md'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-primary text-[10px] font-bold uppercase">
                            Durasi: {ch.duration}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold">
                            +{ch.pointsReward} EcoPoints
                          </span>
                        </div>

                        <h3 className="font-headline-sm font-bold text-primary mb-1">
                          {ch.title}
                        </h3>
                        <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed mb-4">
                          {ch.description}
                        </p>

                        {/* Join Gate or Progress Bar */}
                        {!ch.joined ? (
                          <div className="p-4 rounded-xl bg-surface-container border border-dashed border-outline-variant text-center space-y-2.5">
                            <p className="text-xs text-on-surface-variant font-medium">
                              Anda belum bergabung dalam tantangan ini.
                            </p>
                            <button
                              type="button"
                              onClick={() => handleJoin(ch.id)}
                              className="px-5 py-2 rounded-lg bg-secondary text-on-secondary font-bold text-xs hover:bg-secondary/90 transition-all cursor-pointer shadow-sm"
                            >
                              Ikuti Tantangan Ini
                            </button>
                          </div>
                        ) : (
                          <>
                            {/* Progress Bar */}
                            <div className="space-y-1.5 mb-4">
                              <div className="flex justify-between text-xs font-bold">
                                <span className="text-outline">Kemajuan Aksi</span>
                                <span className="text-secondary">{progressPercent}%</span>
                              </div>
                              <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                                <div
                                  style={{ width: `${progressPercent}%` }}
                                  className={`h-full transition-all duration-300 ${
                                    ch.completed ? 'bg-secondary' : 'bg-tertiary-fixed'
                                  }`}
                                />
                              </div>
                            </div>

                            {/* Task Checklist */}
                            <div className="space-y-2">
                              <span className="font-label-caps text-outline uppercase block text-[11px] font-bold">
                                Daftar Tindakan Nyata:
                              </span>
                              {ch.tasks.map((task) => (
                                <label
                                  key={task.id}
                                  className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-surface-container/60 cursor-pointer transition-colors text-xs text-on-surface"
                                >
                                  <input
                                    type="checkbox"
                                    checked={task.done}
                                    onChange={() => handleToggleTask(ch.id, task.id)}
                                    className="mt-0.5 w-4 h-4 rounded text-secondary focus:ring-secondary cursor-pointer"
                                  />
                                  <span className={task.done ? 'line-through text-outline' : 'font-medium'}>
                                    {task.text}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </>
                        )}
                      </div>

                      {/* Badge Unlocked Indicator */}
                      <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="text-secondary">
                            <Icon name={ch.badgeIcon || 'award'} size={18} />
                          </div>
                          <span className="text-xs font-bold text-primary">
                            Lencana: {ch.badgeName}
                          </span>
                        </div>
                        {ch.completed ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-secondary text-on-secondary font-bold text-[10px] uppercase">
                            Selesai ✓
                          </span>
                        ) : ch.joined ? (
                          <span className="text-xs text-outline">
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
              <div className="p-space-lg sm:p-space-xl rounded-2xl bg-primary text-on-primary space-y-space-md shadow-xl border border-primary-container">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-label-caps text-tertiary-fixed font-bold uppercase tracking-wider block">
                      Galeri Pencapaian
                    </span>
                    <h2 className="font-headline-sm font-bold text-surface-bright">
                      Lencana Sirkular yang Dapat Dibuka
                    </h2>
                  </div>
                  <span className="text-xs text-primary-fixed-dim">
                    Tersimpan otomatis di profil peramban Anda
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  {challenges.map((ch) => (
                    <div
                      key={ch.id}
                      className={`p-4 rounded-xl border text-center space-y-2 transition-all ${
                        ch.completed
                          ? 'bg-primary-container border-tertiary-fixed shadow-lg'
                          : 'bg-primary/40 border-primary-container/40 opacity-50'
                      }`}
                    >
                      <div className="w-12 h-12 mx-auto rounded-full bg-surface flex items-center justify-center text-2xl shadow-inner">
                        {ch.completed ? '🎖️' : '🔒'}
                      </div>
                      <h4 className="font-title-md font-bold text-xs text-surface-bright">
                        {ch.badgeName}
                      </h4>
                      <span className="text-[10px] text-primary-fixed-dim block">
                        {ch.completed ? 'Berhasil Terbuka' : 'Terkunci'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* LEADERBOARD VIEW */
            <div className="space-y-space-md">
              <div className="p-4 rounded-xl bg-secondary-fixed/30 border border-secondary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="text-secondary">
                    <Icon name="award" size={18} />
                  </div>
                  <span className="text-xs font-semibold text-secondary">
                    Papan peringkat dihitung secara dinamis dari akumulasi EcoPoints dan massa pilahan terverifikasi.
                  </span>
                </div>
                <span className="text-[11px] text-outline italic">
                  Mode Simulasi Komunitas • Kuningan 2026
                </span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-outline-variant/30 shadow-sm bg-surface-container-lowest">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-outline-variant/20 bg-surface-container-low text-outline font-label-caps text-[11px] uppercase">
                      <th className="py-3 px-4 text-center w-16">Peringkat</th>
                      <th className="py-3 px-4">Nama Peserta / Komunitas</th>
                      <th className="py-3 px-4">Afiliasi / Peran</th>
                      <th className="py-3 px-4 text-right">Limbah Terpilah</th>
                      <th className="py-3 px-4 text-right">Total EcoPoints</th>
                      <th className="py-3 px-4 text-center">Lencana</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10 text-xs font-body-sm text-on-surface">
                    {leaderboard.map((user) => (
                      <tr
                        key={user.id}
                        className={`transition-colors ${
                          user.isCurrentUser
                            ? 'bg-secondary-fixed/20 font-bold border-l-4 border-l-secondary'
                            : 'hover:bg-surface-container-low/50'
                        }`}
                      >
                        <td className="py-3.5 px-4 text-center font-bold">
                          {user.rank === 1 ? (
                            <span className="text-xl">🥇</span>
                          ) : user.rank === 2 ? (
                            <span className="text-xl">🥈</span>
                          ) : user.rank === 3 ? (
                            <span className="text-xl">🥉</span>
                          ) : (
                            <span className="text-outline">#{user.rank}</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-surface-container overflow-hidden shrink-0 border border-outline-variant/40 flex items-center justify-center font-bold text-primary text-xs">
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
                        <td className="py-3.5 px-4 text-outline">
                          {user.role}
                        </td>
                        <td className="py-3.5 px-4 text-right font-bold text-primary tabular-nums">
                          {user.weightKg.toFixed(1)} kg
                        </td>
                        <td className="py-3.5 px-4 text-right font-extrabold text-secondary tabular-nums">
                          {user.points.toLocaleString('id-ID')} Pts
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="px-2 py-0.5 rounded-full bg-surface-container font-bold text-[10px]">
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/75 backdrop-blur-md animate-fadeIn">
            <div className="bg-surface-container-lowest rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-outline-variant/30">
              <span className="text-5xl animate-bounce block">🎉</span>
              <h3 className="font-headline-sm font-bold text-primary">
                Selamat! Lencana Baru Terbuka
              </h3>
              <div className="p-3 rounded-xl bg-surface-container-low font-bold text-secondary text-sm">
                "{activeBadgeCelebration.name}"
              </div>
              <p className="font-body-sm text-xs text-on-surface-variant">
                Anda mendapatkan <strong>+{activeBadgeCelebration.points} EcoPoints</strong> yang ditambahkan langsung ke saldo profil Anda!
              </p>
              <button
                onClick={() => setActiveBadgeCelebration(null)}
                className="w-full h-11 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed font-title-md font-bold hover:bg-tertiary-fixed-dim transition-all cursor-pointer"
              >
                Klaim & Lanjutkan
              </button>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};
