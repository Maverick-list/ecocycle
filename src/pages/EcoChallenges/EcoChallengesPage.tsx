import React, { useState } from 'react';
import { COMMUNITY_CHALLENGES } from '../../data/challengesData';
import { CommunityChallenge } from '../../types';
import { useWasteBank } from '../../context/WasteBankContext';

export const EcoChallengesPage: React.FC = () => {
  const { showToast } = useWasteBank();
  const [challenges, setChallenges] = useState<CommunityChallenge[]>(COMMUNITY_CHALLENGES);
  const [activeBadgeCelebration, setActiveBadgeCelebration] = useState<string | null>(null);

  const handleToggleTask = (challengeId: string, taskId: string) => {
    setChallenges(prev =>
      prev.map(ch => {
        if (ch.id !== challengeId) return ch;

        const updatedTasks = ch.tasks.map(t =>
          t.id === taskId ? { ...t, done: !t.done } : t
        );

        const allDone = updatedTasks.every(t => t.done);
        const wasCompleted = ch.completed;

        if (allDone && !wasCompleted) {
          showToast(`Lencana "${ch.badgeName}" Berhasil Dibuka! +${ch.pointsReward} Poin`, 'success');
          setActiveBadgeCelebration(ch.badgeName);
        }

        return {
          ...ch,
          tasks: updatedTasks,
          completed: allDone
        };
      })
    );
  };

  const completedCount = challenges.filter(c => c.completed).length;

  return (
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
              Bangun kebiasaan ramah lingkungan secara bertahap melalui tantangan mingguan dan kumpulkan lencana digital untuk komunitas Anda.
            </p>
          </div>

          {/* Gamification Rank Profile */}
          <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex items-center gap-3 shrink-0">
            <div className="w-12 h-12 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-bold text-2xl">
              🏆
            </div>
            <div>
              <span className="font-label-caps text-outline uppercase block text-[10px]">Peringkat Ekologis</span>
              <span className="font-title-md font-bold text-primary block">
                {completedCount >= 3 ? 'Pahlawan Sirkular' : completedCount >= 1 ? 'Pejuang Daur Ulang' : 'Pemula Hijau'}
              </span>
              <span className="text-xs text-secondary font-semibold">
                {completedCount} dari {challenges.length} Tantangan Selesai
              </span>
            </div>
          </div>
        </div>

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

                  {/* Progress Bar */}
                  <div className="space-y-1.5 mb-4">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-outline">Kemajuan</span>
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
                      Daftar Tindakan:
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
                </div>

                {/* Badge Unlocked Indicator */}
                <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-lg">
                      {ch.badgeIcon}
                    </span>
                    <span className="text-xs font-bold text-primary">
                      Lencana: {ch.badgeName}
                    </span>
                  </div>
                  {ch.completed ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-secondary text-on-secondary font-bold text-[10px] uppercase">
                      Selesai ✓
                    </span>
                  ) : (
                    <span className="text-xs text-outline">
                      {ch.tasks.length - completedTasks} tugas tersisa
                    </span>
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
              Tampilkan di profil komunitas dan media sosial
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
              "{activeBadgeCelebration}"
            </div>
            <p className="font-body-sm text-xs text-on-surface-variant">
              Tindakan nyata Anda berkontribusi langsung pada pengurangan limbah dan konservasi alam.
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
  );
};
