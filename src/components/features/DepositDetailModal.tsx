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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/70 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeDetailTrx();
      }}
    >
      <div 
        className="bg-surface-container-lowest rounded-2xl max-w-lg w-full border border-outline-variant/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-modal-title"
      >
        {/* Header */}
        <div className="bg-primary p-space-md flex items-center justify-between text-on-primary">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-bold">
              <Icon name="verified" size={18} />
            </div>
            <div>
              <h3 id="detail-modal-title" className="font-headline-sm text-sm font-bold text-surface-bright">
                Manifest Setoran #{selectedDetailTrx.id}
              </h3>
              <span className="text-[11px] text-primary-fixed-dim">
                Standar Verifikasi Timbangan Hub & Pelacakan Material
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={closeDetailTrx}
            className="w-8 h-8 rounded-full flex items-center justify-center text-surface-variant hover:bg-primary-container transition-colors cursor-pointer"
            aria-label="Tutup rincian manifest"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-space-lg overflow-y-auto space-y-4 text-xs text-on-surface">
          {/* Status & Date Bar */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
            <div>
              <span className="text-[10px] text-outline block uppercase font-bold">Waktu Penyerahan</span>
              <span className="font-semibold text-primary">{selectedDetailTrx.date}</span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold text-[10px] uppercase">
              {selectedDetailTrx.status}
            </span>
          </div>

          {/* Photo Evidence Section */}
          <div>
            <span className="font-label-caps text-outline uppercase block font-bold mb-1.5">
              Bukti Fisik Material Terpilah:
            </span>
            {selectedDetailTrx.photoUrl ? (
              <div className="rounded-xl overflow-hidden border border-outline-variant/30 h-44 bg-surface-container flex items-center justify-center">
                <img
                  src={selectedDetailTrx.photoUrl}
                  alt="Bukti Foto Sampah"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-surface-container-low border border-dashed border-outline-variant/40 flex items-center gap-3">
                <Icon name="camera" size={24} className="text-outline" />
                <span className="text-[11px] text-on-surface-variant">
                  Diverifikasi langsung oleh petugas drop-point tanpa lampiran foto digital.
                </span>
              </div>
            )}
          </div>

          {/* Material & Financial Breakdown */}
          <div className="space-y-2 border-t border-outline-variant/20 pt-3">
            <span className="font-label-caps text-outline uppercase block font-bold">
              Rincian Material & Konversi Nilai:
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-2.5 rounded-lg bg-surface-container">
                <span className="text-[10px] text-outline block">Jenis Material</span>
                <span className="font-bold text-primary">{selectedDetailTrx.wasteType}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container">
                <span className="text-[10px] text-outline block">Bobot Bersih</span>
                <span className="font-bold text-primary">{selectedDetailTrx.weightKg} kg</span>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container">
                <span className="text-[10px] text-outline block">Nilai Rupiah</span>
                <span className="font-bold text-secondary">Rp {selectedDetailTrx.valueIdr.toLocaleString('id-ID')}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container">
                <span className="text-[10px] text-outline block">EcoPoints</span>
                <span className="font-bold text-primary">+{selectedDetailTrx.points} Poin</span>
              </div>
            </div>
          </div>

          {/* Environmental Savings Summary */}
          <div className="p-3.5 rounded-xl bg-primary text-on-primary space-y-1.5">
            <span className="font-label-caps text-tertiary-fixed uppercase font-bold text-[10px] block">
              Dampak Ekologis yang Dihasilkan
            </span>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-primary-fixed-dim">Reduksi Emisi Karbon:</span>
              <strong className="text-surface-bright">~{selectedDetailTrx.co2OffsetKg} kg CO₂e</strong>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-primary-fixed-dim">Konservasi Air Bersih:</span>
              <strong className="text-surface-bright">~{selectedDetailTrx.waterSavedLiters || Math.round(selectedDetailTrx.weightKg * 20)} Liter</strong>
            </div>
          </div>

          {/* Location & Notes */}
          <div className="text-[11px] space-y-1 text-on-surface-variant pt-1">
            <p><strong>Hub Drop-Point:</strong> {selectedDetailTrx.dropPoint}</p>
            {selectedDetailTrx.notes && <p><strong>Catatan:</strong> {selectedDetailTrx.notes}</p>}
          </div>

          <div className="pt-3 border-t border-outline-variant/20 flex justify-between items-center">
            <span className="text-[10px] text-outline italic">
              * Mode simulasi demonstrasi kompetisi
            </span>
            <button
              type="button"
              onClick={closeDetailTrx}
              className="h-9 px-4 rounded-lg bg-primary text-on-primary text-xs font-bold hover:bg-primary-container cursor-pointer"
            >
              Tutup Rincian
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
