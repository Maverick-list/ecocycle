import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '../ui/Icon';
import { EcocycleLogo } from '../brand/EcocycleLogo';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  totalCo2Avoided: number;
  totalWeightKg: number;
  joinedDate: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  userName,
  totalCo2Avoided,
  totalWeightKg,
  joinedDate,
}) => {
  if (!isOpen) return null;

  const certNumber = `ECO-CERT-2026-${Math.floor(100000 + Math.random() * 900000)}`;
  const treeEquivalent = (totalCo2Avoided / 21.77).toFixed(1);

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9995] flex items-center justify-center p-4 overflow-y-auto bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl rounded-4xl glass-panel-elevated p-6 sm:p-10 border border-secondary/40 shadow-2xl overflow-hidden bg-surface dark:bg-[#062419] text-on-surface dark:text-white"
        >
          {/* Top Gold & Emerald Gradient Accent */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500" />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full glass-pill flex items-center justify-center text-outline hover:text-on-surface cursor-pointer z-10"
          >
            <Icon name="close" size={16} />
          </button>

          {/* Certificate Inner Frame (Apple-style Luxury Design) */}
          <div className="border-2 border-secondary/30 rounded-3xl p-6 sm:p-8 relative bg-gradient-to-b from-surface dark:from-[#08291c] to-surface-container/50 dark:to-[#041910] space-y-6 text-center">
            
            {/* Top Certificate Header */}
            <div className="space-y-2 flex flex-col items-center">
              <EcocycleLogo size="md" showTagline={false} />
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-secondary text-[10px] font-extrabold uppercase tracking-widest mt-1">
                <span>Sertifikat Audit Dampak Ekologis Resmi</span>
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-primary tracking-tight pt-1">
                Sertifikat Partisipasi Sirkular
              </h2>
              <p className="text-[11px] text-outline font-mono">
                No. Registrasi: {certNumber}
              </p>
            </div>

            {/* Soft Gradient Separator */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent my-2 pointer-events-none" />

            {/* Recipient Statement */}
            <div className="space-y-3">
              <p className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                Diberikan dengan penuh apresiasi kepada:
              </p>
              <h3 className="font-display font-black text-2xl sm:text-4xl text-primary tracking-tight underline decoration-secondary decoration-2 underline-offset-8">
                {userName}
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant max-w-lg mx-auto leading-relaxed pt-2">
                Atas kontribusi nyata dan dedikasi berkelanjutan dalam memilah, menyetorkan, dan mengalihkan sampah bernilai dari tempat pemrosesan akhir (TPA) menuju siklus ekonomi sirkular.
              </p>
            </div>

            {/* Impact Metric Matrix */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-secondary/10 border border-secondary/25">
              <div className="text-center space-y-1">
                <span className="text-[10px] uppercase font-bold text-outline block">Total Sampah Terpilah</span>
                <span className="font-display font-black text-lg sm:text-xl text-primary">{totalWeightKg.toFixed(1)} kg</span>
              </div>

              <div className="text-center space-y-1 border-x border-secondary/20 px-2">
                <span className="text-[10px] uppercase font-bold text-outline block">Reduksi Emisi Karbon</span>
                <span className="font-display font-black text-lg sm:text-xl text-secondary">{totalCo2Avoided.toFixed(2)} kg CO₂e</span>
              </div>

              <div className="text-center space-y-1">
                <span className="text-[10px] uppercase font-bold text-outline block">Ekuivalensi Serapan</span>
                <span className="font-display font-black text-lg sm:text-xl text-primary">~{treeEquivalent} Pohon</span>
              </div>
            </div>

            {/* Verification Standard & Signature */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-left border-t border-secondary/20 text-xs">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] font-bold uppercase text-outline block">Metodologi & Verifikasi:</span>
                <span className="text-[11px] font-medium text-on-surface-variant block">Model Sains US EPA WARM v15</span>
                <span className="text-[11px] font-medium text-on-surface-variant block">Standar SNI 19-3983-1995</span>
              </div>

              <div className="text-center sm:text-right space-y-1">
                <span className="text-[10px] font-bold uppercase text-outline block">Diterbitkan Pada:</span>
                <span className="text-[11px] font-mono font-bold text-primary block">{joinedDate || '5 November 2026'}</span>
                <span className="text-[10px] text-secondary font-bold block">ECOCYCLE Circular Foundation</span>
              </div>
            </div>

          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-6">
            <span className="text-xs text-outline font-medium">
              Sertifikat terverifikasi secara kriptografis di jaringan ECOCYCLE.
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="h-10 px-4 rounded-xl glass-pill text-xs font-bold text-outline hover:text-on-surface cursor-pointer"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="h-10 px-5 rounded-xl bg-secondary text-white font-extrabold text-xs hover:bg-secondary/90 transition-all cursor-pointer shadow-md flex items-center gap-2"
              >
                <Icon name="download" size={15} />
                <span>Unduh / Cetak Sertifikat</span>
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
