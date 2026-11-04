import React, { useRef, useEffect, useState } from 'react';

interface CinematicEcoHeroVideoProps {
  className?: string;
  videoSrc?: string;
  posterSrc?: string;
}

export const CinematicEcoHeroVideo: React.FC<CinematicEcoHeroVideoProps> = ({
  className = '',
  videoSrc = '/media/ecocycle-hero-videotron.mp4',
  posterSrc = '/assets/images/hero_sorting.jpg',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [hasVideoError, setHasVideoError] = useState<boolean>(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setVideoLoaded(true);
      setHasVideoError(false);
    };

    const handleError = () => {
      setHasVideoError(true);
      setVideoLoaded(false);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, [videoSrc]);

  // Generative Particle & Organic Leaves Fallback on Canvas
  useEffect(() => {
    if (videoLoaded && !hasVideoError) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Circular economy particles & leaf objects
    interface Particle {
      x: number;
      y: number;
      radius: number;
      color: string;
      speedX: number;
      speedY: number;
      angle: number;
      angleSpeed: number;
      orbitalRadius: number;
      type: 'circle' | 'leaf';
      opacity: number;
    }

    const particles: Particle[] = [];
    const colors = ['#CBF075', '#006C48', '#78D9AA', '#94F6C4', '#274E3C'];

    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: -Math.random() * 0.6 - 0.2, // rising gently upwards
        angle: Math.random() * Math.PI * 2,
        angleSpeed: (Math.random() - 0.5) * 0.02,
        orbitalRadius: Math.random() * 80 + 20,
        type: Math.random() > 0.4 ? 'leaf' : 'circle',
        opacity: Math.random() * 0.45 + 0.15,
      });
    }

    let t = 0;
    const render = () => {
      t += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle orbital rings representing circular recycling
      const centerX = width * 0.65;
      const centerY = height * 0.45;

      ctx.save();
      ctx.strokeStyle = 'rgba(203, 240, 117, 0.04)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 180 + Math.sin(t) * 10, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(0, 108, 72, 0.06)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 280 + Math.cos(t) * 15, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Render floating particles and leaves
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.angle += p.angleSpeed;

        if (p.y < -20) p.y = height + 20;
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        if (p.type === 'leaf') {
          // Draw miniature organic leaf
          ctx.beginPath();
          ctx.moveTo(0, -p.radius * 2);
          ctx.bezierCurveTo(p.radius * 2, -p.radius, p.radius * 1.5, p.radius, 0, p.radius * 2);
          ctx.bezierCurveTo(-p.radius * 1.5, p.radius, -p.radius * 2, -p.radius, 0, -p.radius * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [videoLoaded, hasVideoError]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}>
      {/* 1. Underlying Moving Videotron (User Provided Video at 30% Opacity) */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={posterSrc}
        aria-hidden="true"
        tabIndex={-1}
        className="w-full h-full object-cover opacity-30 transition-opacity duration-700"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* 2. Generative Organic Leaf Fallback (Only active if video fails to load) */}
      {hasVideoError && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-30"
        />
      )}

      {/* 3. Soft Ambient Vignette for Elegant Visual Depth & Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#062B1D]/35 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_35%,rgba(6,43,29,0.25)_100%)] pointer-events-none" />
    </div>
  );
};
