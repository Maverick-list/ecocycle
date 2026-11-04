import React, { useState, useRef } from 'react';
import { PageTransition } from '../../components/ui/PageTransition';
import { SEOHead } from '../../components/seo/SEOHead';
import { Icon } from '../../components/ui/Icon';
import { TOUR_CHAPTERS, InteractiveGuidedTour } from '../../components/features/InteractiveGuidedTour';

export const TutorialPage: React.FC = () => {
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [showCaptions, setShowCaptions] = useState<boolean>(true);
  const [isTourModalOpen, setIsTourModalOpen] = useState<boolean>(false);
  const [hasVideoError, setHasVideoError] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const currentChapter = TOUR_CHAPTERS[activeChapterIndex] || TOUR_CHAPTERS[0];

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {
          setHasVideoError(true);
          setIsPlaying(false);
        });
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  return (
    <PageTransition className="w-full min-h-screen bg-surface dark:bg-[#03140d] text-on-surface dark:text-white py-12 sm:py-16 transition-colors duration-300">
      <SEOHead
        title="Panduan Penggunaan Platform & Operasional Daur Ulang"
        canonical="/panduan"
        description="Panduan interaktif langkah demi langkah: mulai dari pemilihan jenis sampah, prosedur pembersihan, pencatatan setoran, hingga penukaran poin."
      />
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        
        {/* Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-outline-variant/20">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-semibold uppercase tracking-wider text-secondary">
              <Icon name="play" size={14} />
              <span>Panduan Interaktif & Video Tutorial</span>
            </div>
            <h1 className="font-display font-extrabold text-page-title text-primary tracking-tight leading-tight">
              Panduan Lengkap Penggunaan ECOCYCLE
            </h1>
            <p className="font-sans text-subheading text-on-surface-variant font-normal leading-relaxed">
              Pelajari alur lengkap ekosistem ECOCYCLE mulai dari teknik pemilahan presisi, mutasi buku tabungan bank sampah, audit reduksi karbon, hingga analitik data.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsTourModalOpen(true)}
            className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-secondary text-white text-xs font-bold hover:bg-secondary/90 shadow-md transition-all cursor-pointer shrink-0 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Icon name="sparkles" size={16} />
            <span>Mulai Tur Terpandu</span>
            <Icon name="arrow_forward" size={14} />
          </button>
        </div>

        {/* Main Tutorial Stage Layout: Video Player (7 cols) + Chapter Navigator (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Video Player with Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-3xl overflow-hidden glass-panel border border-outline-variant/25 shadow-2xl relative aspect-video flex flex-col justify-between group">
              
              {/* Underlying Video element */}
              <video
                ref={videoRef}
                src="/media/ecocycle-tutorial.mp4"
                poster="/assets/images/workshop.jpg"
                preload="metadata"
                playsInline
                controls={false}
                className={`w-full h-full object-cover ${hasVideoError ? 'hidden' : 'block'}`}
                onError={() => setHasVideoError(true)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <track
                  kind="captions"
                  src="/media/ecocycle-tutorial-captions.vtt"
                  srcLang="id"
                  label="Bahasa Indonesia"
                  default
                />
              </video>

              {/* Interactive Simulated Walkthrough Canvas */}
              {hasVideoError && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#064e3b] via-[#022c22] to-[#0f172a] p-8 flex flex-col justify-between text-white">
                  <div className="flex items-center justify-between">
                    <span className="px-3.5 py-1 rounded-full bg-secondary/30 border border-secondary/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                      Modul {currentChapter.id}: {currentChapter.category}
                    </span>
                    <span className="text-[11px] text-white/70 font-medium bg-black/40 px-3 py-1 rounded-full border border-white/10">
                      Simulasi Interaktif
                    </span>
                  </div>

                  <div className="max-w-md space-y-2">
                    <h3 className="text-2xl font-display font-bold text-white tracking-tight">
                      {currentChapter.title}
                    </h3>
                    <p className="text-xs text-white/80 leading-relaxed line-clamp-3">
                      {currentChapter.description}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-emerald-300 font-semibold">
                      <Icon name="verified" size={16} />
                      <span>Rute: <strong>{currentChapter.targetRoute}</strong></span>
                    </div>
                    <a
                      href={currentChapter.targetRoute}
                      className="px-3.5 py-1.5 rounded-xl bg-secondary text-white text-xs font-bold hover:bg-secondary/90 transition-colors"
                    >
                      Buka Rute Ini
                    </a>
                  </div>
                </div>
              )}

              {/* Video Overlay Controls Bar */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col gap-2 z-10 opacity-90 group-hover:opacity-100 transition-opacity">
                {/* Progress Line */}
                <div className="w-full h-1.5 rounded-full bg-white/20 overflow-hidden cursor-pointer">
                  <div
                    className="h-full bg-secondary transition-all"
                    style={{ width: `${((activeChapterIndex + 1) / TOUR_CHAPTERS.length) * 100}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-white text-xs pt-1">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white cursor-pointer transition-colors"
                      title={isPlaying ? 'Jeda' : 'Putar'}
                    >
                      <Icon name={isPlaying ? 'pause' : 'play'} size={16} />
                    </button>

                    <span className="font-mono text-xs text-white/70">
                      Modul {activeChapterIndex + 1} / {TOUR_CHAPTERS.length}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Speed Switcher */}
                    <div className="flex items-center bg-black/40 rounded-lg p-0.5 text-xs font-mono">
                      {[1, 1.5, 2].map((spd) => (
                        <button
                          key={spd}
                          type="button"
                          onClick={() => handleSpeedChange(spd)}
                          className={`px-2 py-0.5 rounded cursor-pointer ${
                            playbackSpeed === spd ? 'bg-secondary text-white font-bold' : 'text-white/70 hover:text-white'
                          }`}
                        >
                          {spd}x
                        </button>
                      ))}
                    </div>

                    {/* Captions Toggle */}
                    <button
                      type="button"
                      onClick={() => setShowCaptions(!showCaptions)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border cursor-pointer transition-colors ${
                        showCaptions
                          ? 'bg-secondary text-white border-secondary'
                          : 'bg-black/40 text-white/70 border-white/20'
                      }`}
                    >
                      CC
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Captions / Transcript Drawer */}
            {showCaptions && (
              <div className="p-6 rounded-3xl glass-panel border border-outline-variant/25 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-primary">
                  <span className="uppercase tracking-wider text-[11px] text-secondary">
                    Transkrip Narasi • Modul {currentChapter.id}
                  </span>
                  <span className="text-xs text-outline">Bahasa Indonesia</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  "{currentChapter.description} Pastikan Anda mempraktikkan langkah kunci: {currentChapter.keyActions.join(', ')}."
                </p>
              </div>
            )}
          </div>

          {/* Right: Chapter Directory (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                Daftar Modul Pembelajaran ({TOUR_CHAPTERS.length})
              </span>
              <span className="text-xs text-outline font-semibold">
                {Math.round(((activeChapterIndex + 1) / TOUR_CHAPTERS.length) * 100)}% Terselesaikan
              </span>
            </div>

            <div className="space-y-3 max-h-[560px] overflow-y-auto pr-1">
              {TOUR_CHAPTERS.map((ch, idx) => {
                const isActive = idx === activeChapterIndex;
                return (
                  <div
                    key={ch.id}
                    onClick={() => setActiveChapterIndex(idx)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                      isActive
                        ? 'glass-panel-elevated border-secondary/40 ring-1 ring-secondary/30 shadow-md'
                        : 'glass-panel border-outline-variant/20 hover:border-outline-variant/40'
                    }`}
                  >
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                        isActive
                          ? 'bg-secondary text-white shadow-sm'
                          : 'bg-surface-container text-primary'
                      }`}
                    >
                      {ch.id}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold uppercase text-secondary truncate">
                          {ch.category}
                        </span>
                        <span className="text-[10px] text-outline font-mono">
                          {ch.targetRoute}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-sm text-primary truncate mt-1">
                        {ch.title}
                      </h4>
                      <p className="text-xs text-on-surface-variant line-clamp-2 mt-1 leading-relaxed">
                        {ch.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Interactive Guided Tour Modal */}
        <InteractiveGuidedTour
          isOpen={isTourModalOpen}
          onClose={() => setIsTourModalOpen(false)}
          initialChapterIndex={activeChapterIndex}
        />

      </div>
    </PageTransition>
  );
};
