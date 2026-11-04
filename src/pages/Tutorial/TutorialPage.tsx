import React, { useState, useRef } from 'react';
import { PageTransition } from '../../components/ui/PageTransition';
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
    <PageTransition>
      <div className="w-full bg-surface py-space-xl">
        <div className="max-w-[1380px] mx-auto px-margin-sm lg:px-margin space-y-space-xl">
          
          {/* Header */}
          <div className="border-b border-outline-variant/30 pb-space-lg flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                <span className="font-label-caps text-secondary font-bold uppercase tracking-wider">
                  Pusat Pembelajaran & Video Tutorial
                </span>
              </div>
              <h1 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl font-bold text-primary tracking-tight">
                Panduan Lengkap Penggunaan ECOCYCLE
              </h1>
              <p className="font-body-md text-on-surface-variant max-w-2xl mt-1">
                Pelajari seluruh alur operasional platform mulai dari pemilahan presisi, pencatatan setoran mandiri, neraca emisi karbon, hingga analitik data.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsTourModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-container shadow-md transition-all cursor-pointer shrink-0"
            >
              <Icon name="sparkles" size={16} />
              <span>Mulai Tur Panduan Interaktif</span>
              <Icon name="arrow_forward" size={14} />
            </button>
          </div>

          {/* Main Tutorial Stage Layout: Video Player (7 cols) + Chapter Navigator (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
            
            {/* Left: Video Player with Controls (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="rounded-3xl overflow-hidden bg-primary-container border border-outline-variant/30 shadow-xl relative aspect-video flex flex-col justify-between group">
                
                {/* 1. Underlying Video element */}
                <video
                  ref={videoRef}
                  src="/media/ecocycle-tutorial.mp4"
                  poster="/assets/images/workshop.jpg"
                  className={`w-full h-full object-cover ${hasVideoError ? 'hidden' : 'block'}`}
                  onError={() => setHasVideoError(true)}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />

                {/* 2. Interactive Simulated Walkthrough Canvas (When local MP4 is being demonstrated) */}
                {hasVideoError && (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#002517] via-[#123B2A] to-[#00170E] p-6 sm:p-8 flex flex-col justify-between text-surface-bright">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-secondary/30 border border-secondary/40 text-tertiary-fixed text-xs font-bold uppercase tracking-wider">
                        Bab {currentChapter.id}: {currentChapter.category}
                      </span>
                      <span className="text-xs text-primary-fixed-dim font-medium">
                        Mode Demonstrasi Terpandu
                      </span>
                    </div>

                    <div className="max-w-md space-y-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-surface-bright tracking-tight">
                        {currentChapter.title}
                      </h3>
                      <p className="text-xs text-primary-fixed-dim leading-relaxed line-clamp-3">
                        {currentChapter.description}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-primary/60 border border-tertiary-fixed/20 backdrop-blur-md flex items-center justify-between">
                      <div className="flex items-center gap-2.5 text-xs text-tertiary-fixed">
                        <Icon name="verified" size={16} />
                        <span>Target Rute: <strong>{currentChapter.targetRoute}</strong></span>
                      </div>
                      <a
                        href={currentChapter.targetRoute}
                        className="px-3 py-1 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed text-[11px] font-bold hover:bg-tertiary-fixed-dim transition-colors"
                      >
                        Buka Halaman Ini
                      </a>
                    </div>
                  </div>
                )}

                {/* Video Overlay Controls Bar */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col gap-2 z-10 opacity-90 group-hover:opacity-100 transition-opacity">
                  {/* Progress Line */}
                  <div className="w-full h-1 rounded-full bg-white/20 overflow-hidden cursor-pointer">
                    <div
                      className="h-full bg-secondary transition-all"
                      style={{ width: `${((activeChapterIndex + 1) / TOUR_CHAPTERS.length) * 100}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-surface-bright text-xs">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={togglePlay}
                        className="w-8 h-8 rounded-full bg-surface-bright/20 hover:bg-surface-bright/30 flex items-center justify-center text-surface-bright cursor-pointer transition-colors"
                        title={isPlaying ? 'Jeda' : 'Putar'}
                      >
                        <Icon name={isPlaying ? 'pause' : 'play'} size={16} />
                      </button>

                      <span className="font-mono text-[11px] text-surface-dim">
                        Bab {activeChapterIndex + 1} / {TOUR_CHAPTERS.length}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Speed Switcher */}
                      <div className="flex items-center bg-black/40 rounded-lg p-0.5 text-[11px] font-mono">
                        {[1, 1.5, 2].map((spd) => (
                          <button
                            key={spd}
                            type="button"
                            onClick={() => handleSpeedChange(spd)}
                            className={`px-1.5 py-0.5 rounded cursor-pointer ${
                              playbackSpeed === spd ? 'bg-secondary text-on-secondary font-bold' : 'text-surface-dim hover:text-white'
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
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold border cursor-pointer transition-colors ${
                          showCaptions
                            ? 'bg-secondary-fixed text-on-secondary-fixed border-secondary-fixed'
                            : 'bg-black/40 text-surface-dim border-white/20'
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
                <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-primary">
                    <span className="uppercase tracking-wider text-[10px] text-secondary">
                      Transkrip Narasi • Bab {currentChapter.id}
                    </span>
                    <span className="text-[11px] text-outline">Bahasa Indonesia</span>
                  </div>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    "{currentChapter.description} Pastikan Anda mempraktikkan langkah kunci: {currentChapter.keyActions.join(', ')}."
                  </p>
                </div>
              )}
            </div>

            {/* Right: Chapter Directory (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
                <span className="font-label-caps text-secondary font-bold uppercase tracking-wider text-xs">
                  Daftar Bab Pembelajaran (8 Modul)
                </span>
                <span className="text-xs text-outline font-semibold">
                  {Math.round(((activeChapterIndex + 1) / TOUR_CHAPTERS.length) * 100)}% Terselesaikan
                </span>
              </div>

              <div className="space-y-2 max-h-[560px] overflow-y-auto pr-1">
                {TOUR_CHAPTERS.map((ch, idx) => {
                  const isActive = idx === activeChapterIndex;
                  return (
                    <div
                      key={ch.id}
                      onClick={() => setActiveChapterIndex(idx)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                        isActive
                          ? 'bg-secondary-fixed/20 border-secondary shadow-md'
                          : 'bg-surface-container-lowest border-outline-variant/30 hover:border-outline'
                      }`}
                    >
                      <span
                        className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                          isActive
                            ? 'bg-secondary text-on-secondary shadow-sm'
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
                        <h4 className="font-title-md font-bold text-xs text-primary truncate mt-0.5">
                          {ch.title}
                        </h4>
                        <p className="font-body-sm text-[11px] text-on-surface-variant line-clamp-2 mt-1">
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
      </div>
    </PageTransition>
  );
};
