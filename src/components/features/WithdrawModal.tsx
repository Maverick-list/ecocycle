import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '../ui/Icon';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableBalance: number;
  onSuccess: (amount: number, destination: string, accountNum: string) => void;
}

const EWALLET_OPTIONS = [
  { id: 'gopay', name: 'GoPay', type: 'E-Wallet', icon: 'account_balance_wallet', color: '#00AED6' },
  { id: 'ovo', name: 'OVO', type: 'E-Wallet', icon: 'account_balance_wallet', color: '#4C3494' },
  { id: 'dana', name: 'DANA', type: 'E-Wallet', icon: 'account_balance_wallet', color: '#118EEA' },
  { id: 'shopeepay', name: 'ShopeePay', type: 'E-Wallet', icon: 'account_balance_wallet', color: '#EE4D2D' },
  { id: 'bca', name: 'Bank BCA', type: 'Transfer Bank', icon: 'account_balance', color: '#005EB8' },
  { id: 'mandiri', name: 'Bank Mandiri', type: 'Transfer Bank', icon: 'account_balance', color: '#003D79' },
];

export const WithdrawModal: React.FC<WithdrawModalProps> = ({
  isOpen,
  onClose,
  availableBalance,
  onSuccess,
}) => {
  const [selectedMethod, setSelectedMethod] = useState(EWALLET_OPTIONS[0]);
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [amount, setAmount] = useState<number>(Math.min(50000, availableBalance));
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!accountNumber || accountNumber.trim().length < 8) {
      setError('Masukkan nomor rekening / nomor e-wallet yang valid (minimal 8 digit).');
      return;
    }

    if (!accountName || accountName.trim().length < 2) {
      setError('Masukkan nama pemilik akun penerima.');
      return;
    }

    if (amount < 10000) {
      setError('Jumlah penarikan minimum adalah Rp 10.000.');
      return;
    }

    if (amount > availableBalance) {
      setError(`Saldo tidak mencukupi. Saldo tersedia saat ini: Rp ${availableBalance.toLocaleString('id-ID')}`);
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess(amount, selectedMethod.name, accountNumber);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9995] flex items-center justify-center p-4 overflow-y-auto bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg rounded-4xl glass-panel-elevated p-6 sm:p-8 border border-outline-variant/30 shadow-2xl overflow-hidden bg-surface dark:bg-[#062419] text-on-surface dark:text-white"
        >
          {/* Top Soft Gradient Accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#86efac]/70 to-transparent" />

          {/* Header */}
          <div className="flex items-center justify-between pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center">
                <Icon name="payments" size={22} />
              </div>
              <div>
                <h2 className="font-display font-extrabold text-xl text-primary tracking-tight">
                  Tarik Saldo Rupiah
                </h2>
                <p className="text-xs text-on-surface-variant font-medium">
                  Cairkan saldo tabungan sampah ke dompet digital / rekening bank Anda.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full glass-pill flex items-center justify-center text-outline hover:text-on-surface cursor-pointer"
            >
              <Icon name="close" size={16} />
            </button>
          </div>

          {/* Soft Gradient Separator */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500/25 to-transparent my-3 pointer-events-none" />

          {/* Available Balance Pill */}
          <div className="p-4 rounded-2xl bg-secondary/10 border border-secondary/25 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-outline block">
                Saldo Tersedia untuk Ditarik
              </span>
              <span className="font-display font-black text-2xl text-secondary">
                Rp {availableBalance.toLocaleString('id-ID')}
              </span>
            </div>
            <span className="px-3 py-1 rounded-full bg-secondary/20 text-secondary text-[10px] font-extrabold uppercase">
              Bebas Biaya Admin
            </span>
          </div>

          {error && (
            <div className="p-3 rounded-2xl bg-error/15 text-error text-xs flex items-center gap-2 border border-error/20 my-3">
              <Icon name="alert" size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleWithdraw} className="space-y-4 pt-2">
            {/* 1. Destination Method Grid */}
            <div>
              <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">
                Pilih Tujuan Pencairan
              </label>
              <div className="grid grid-cols-3 gap-2">
                {EWALLET_OPTIONS.map((method) => {
                  const isSelected = selectedMethod.id === method.id;
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedMethod(method)}
                      className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                        isSelected
                          ? 'border-secondary bg-secondary/15 ring-2 ring-secondary/40 shadow-sm'
                          : 'border-outline-variant/20 glass-panel hover:bg-surface-container/60'
                      }`}
                    >
                      <span className="text-xs font-extrabold text-primary">{method.name}</span>
                      <span className="text-[10px] text-outline">{method.type}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Account Number & Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-1.5">
                  Nomor HP / Rekening
                </label>
                <input
                  type="text"
                  required
                  placeholder="081234567890"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl glass-panel text-xs text-on-surface outline-none border border-outline-variant/25 focus:ring-2 focus:ring-secondary/50 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-1.5">
                  Nama Pemilik Akun
                </label>
                <input
                  type="text"
                  required
                  placeholder="Sesuai Akun Bank/E-Wallet"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl glass-panel text-xs text-on-surface outline-none border border-outline-variant/25 focus:ring-2 focus:ring-secondary/50"
                />
              </div>
            </div>

            {/* 3. Amount */}
            <div>
              <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-1.5">
                Nominal Penarikan (Rp)
              </label>
              <input
                type="number"
                min={10000}
                max={availableBalance}
                step={5000}
                required
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-11 px-3.5 rounded-xl glass-panel text-base font-mono font-extrabold text-primary outline-none border border-outline-variant/25 focus:ring-2 focus:ring-secondary/50"
              />

              {/* Quick Amount Buttons */}
              <div className="flex items-center gap-2 mt-2">
                {[20000, 50000, availableBalance].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAmount(preset)}
                    className="px-2.5 py-1 rounded-lg glass-pill text-[10px] font-bold text-secondary hover:bg-secondary/15 transition-colors cursor-pointer"
                  >
                    Rp {preset.toLocaleString('id-ID')}
                  </button>
                ))}
              </div>
            </div>

            {/* Soft Gradient Separator */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500/25 to-transparent my-3 pointer-events-none" />

            {/* Submit Action */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="h-11 px-5 rounded-xl glass-pill text-xs font-bold text-outline hover:text-on-surface cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isProcessing || availableBalance <= 0}
                className="h-11 px-6 rounded-xl bg-secondary text-white font-extrabold text-xs hover:bg-secondary/90 transition-all cursor-pointer shadow-md flex items-center gap-2 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50"
              >
                {isProcessing ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Icon name="check_circle" size={15} />
                    <span>Konfirmasi Penarikan Saldo</span>
                  </>
                )}
              </button>
            </div>
          </form>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
