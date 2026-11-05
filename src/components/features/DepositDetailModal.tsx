import React, { useEffect } from 'react';
import { useWasteBank } from '../../context/WasteBankContext';
import { Icon } from '../ui/Icon';

export const DepositDetailModal: React.FC = () => {
  const { selectedDetailTrx, closeDetailTrx } = useWasteBank();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDetailTrx();
      }
    };
    if (selectedDetailTrx) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDetailTrx, closeDetailTrx]);

  if (!selectedDetailTrx) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeDetailTrx();
      }}
    >
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-[#062418]/95 dark:bg-[#031910]/95 border border-emerald-500/35 shadow-[0_25px_60px_-15px_rgba(0,35,18,0.7)] backdrop-blur-3xl overflow-hidden flex flex-col max-h-[92vh] text-white"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-modal-title"
      >
        {/* Apple visionOS Frosted Header */}
        <div className="relative px-6 py-5 flex items-center justify-between bg-white/5 backdrop-blur-md">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 flex items-center justify-center font-bold shadow-sm">
              <Icon name="verified" size={20} />
            </div>
            <div>
              <h3 id="detail-modal-title" className="font-display font-extrabold text-lg text-white tracking-tight">
                Manifest Setoran #{selectedDetailTrx.id}
              </h3>
              <p className="text-xs text-emerald-300/80 font-medium">
                Standar Verifikasi Timbangan Hub & Pelacakan Material
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeDetailTrx}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Tutup rincian manifest"
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        {/* Soft Organic Gradient Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs" style={{ scrollbarWidth: 'thin' }}>
          {/* Status & Date Bar */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <div>
              <span className="text-[10px] text-emerald-300/70 block uppercase font-bold tracking-wider">Waktu Penyerahan</span>
              <span className="font-bold text-sm text-white">{selectedDetailTrx.date}</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-extrabold text-[11px] uppercase tracking-wider">
              {selectedDetailTrx.status}
            </span>
          </div>

          {/* Photo Evidence Section */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300/80 block mb-2">
              Bukti Fisik Material Terpilah:
            </span>
            {selectedDetailTrx.photoUrl ? (
              <div className="rounded-2xl overflow-hidden border border-emerald-500/30 h-44 bg-black/40 flex items-center justify-center">
                <img
                  src={selectedDetailTrx.photoUrl}
                  alt="Bukti Foto Sampah"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-white/5 border border-dashed border-emerald-500/30 flex items-center gap-3">
                <Icon name="camera" size={24} className="text-emerald-400" />
                <span className="text-xs text-white/70">
                  Diverifikasi langsung oleh petugas drop-point tanpa lampiran foto digital.
                </span>
              </div>
            )}
          </div>

          {/* Material & Financial Breakdown */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300/80 block">
              Rincian Material & Konversi Nilai:
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-white/60 block uppercase font-semibold">Jenis Material</span>
                <span className="font-extrabold text-white text-sm">{selectedDetailTrx.wasteType}</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-white/60 block uppercase font-semibold">Bobot Bersih</span>
                <span className="font-extrabold text-emerald-300 text-sm">{selectedDetailTrx.weightKg} kg</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-white/60 block uppercase font-semibold">Nilai Rupiah</span>
                <span className="font-extrabold text-emerald-400 text-sm">Rp {selectedDetailTrx.valueIdr.toLocaleString('id-ID')}</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-white/60 block uppercase font-semibold">EcoPoints</span>
                <span className="font-extrabold text-[#86efac] text-sm">+{selectedDetailTrx.points} Poin</span>
              </div>
            </div>
          </div>

          {/* Environmental Savings Summary */}
          <div className="p-4 rounded-2xl bg-gradient-to-tr from-emerald-950/70 to-[#063321]/60 border border-emerald-500/30 space-y-2">
            <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider block">
              Dampak Ekologis yang Dihasilkan
            </span>
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/70">Reduksi Emisi Karbon:</span>
              <strong className="text-emerald-300 font-extrabold text-sm">~{selectedDetailTrx.co2OffsetKg} kg CO₂e</strong>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/70">Konservasi Air Bersih:</span>
              <strong className="text-[#86efac] font-extrabold text-sm">~{selectedDetailTrx.waterSavedLiters || Math.round(selectedDetailTrx.weightKg * 20)} Liter</strong>
            </div>
          </div>

          {/* Location & Notes */}
          <div className="text-xs space-y-1 text-white/70 pt-1">
            <p><strong className="text-white">Hub Drop-Point:</strong> {selectedDetailTrx.dropPoint}</p>
            {selectedDetailTrx.notes && <p><strong className="text-white">Catatan:</strong> {selectedDetailTrx.notes}</p>}
          </div>

          {/* Footer Action */}
          <div className="pt-3 border-t border-white/10 flex justify-between items-center">
            <span className="text-[10px] text-white/40 italic">
              * Mode verifikasi standar SNI 19-3983-1995
            </span>
            <button
              type="button"
              onClick={closeDetailTrx}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all cursor-pointer"
            >
              Tutup Rincian
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
