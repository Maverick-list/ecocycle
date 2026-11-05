import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWasteBank } from '../../context/WasteBankContext';
import { WasteTransaction, WasteStreamType } from '../../types';
import { WASTE_CATEGORIES } from '../../data/wasteData';
import { Icon } from '../../components/ui/Icon';
import { AnimatedCounter } from '../../components/ui/AnimatedCounter';
import { PageTransition } from '../../components/ui/PageTransition';
import { SEOHead } from '../../components/seo/SEOHead';

export const WasteBankPage: React.FC = () => {
  const {
    transactions,
    totalPoints,
    totalBalanceIdr,
    totalWeightKg,
    totalCo2AvoidedKg,
    openDepositModal,
    openDetailTrx,
    seedSampleData,
    resetTransactions,
    deleteTransaction,
    updateTransaction,
    showToast
  } = useWasteBank();

  // Search & filter state
  const [filterType, setFilterType] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Editing state
  const [editingTrx, setEditingTrx] = useState<WasteTransaction | null>(null);
  const [editWeight, setEditWeight] = useState<number>(0);
  const [editType, setEditType] = useState<WasteStreamType>('Plastik PET');

  // Deletion prompt state
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Redemption drawer state
  const [isRedeemOpen, setIsRedeemOpen] = useState(false);

  // Keyboard escape listener for open modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setEditingTrx(null);
        setDeletingId(null);
        setIsRedeemOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filtered transactions
  const filteredTransactions = transactions.filter((trx) => {
    const matchesFilter = filterType === 'Semua' || trx.wasteType.includes(filterType);
    const matchesSearch =
      trx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trx.wasteType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trx.dropPoint.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleOpenEdit = (trx: WasteTransaction) => {
    setEditingTrx(trx);
    setEditWeight(trx.weightKg);
    setEditType(trx.wasteType);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTrx) return;

    const catConfig = WASTE_CATEGORIES.find(c => c.name === editType) || WASTE_CATEGORIES[0];
    const newPoints = Math.round(editWeight * catConfig.pointsPerKg);
    const newIdr = Math.round(editWeight * catConfig.pricePerKg);
    const newCo2 = parseFloat((editWeight * catConfig.co2Factor).toFixed(2));

    updateTransaction(editingTrx.id, {
      wasteType: editType,
      weightKg: editWeight,
      points: newPoints,
      valueIdr: newIdr,
      co2OffsetKg: newCo2,
    });

    setEditingTrx(null);
  };

  const handleConfirmDelete = () => {
    if (deletingId) {
      deleteTransaction(deletingId);
      setDeletingId(null);
    }
  };

  return (
    <PageTransition className="w-full min-h-screen bg-surface dark:bg-[#03140d] text-on-surface dark:text-white py-12 sm:py-16 transition-colors duration-300">
      <SEOHead
        title="Bank Sampah Digital & Buku Tabungan Sirkular"
        canonical="/bank-sampah"
        description="Setor sampah terpilah, catat manifest tertimbang, dan konversikan material daur ulang menjadi saldo rupiah serta poin ekologis."
      />
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        
        {/* Editorial Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-semibold uppercase tracking-wider text-secondary">
              <Icon name="account_balance" size={14} />
              <span>Buku Tabungan Sirkular</span>
            </div>
            <h1 className="font-display font-extrabold text-page-title tracking-tight leading-tight">
              <span className="animate-title-flow">Bank Sampah Digital</span> & Konversi Nilai
            </h1>
            <p className="font-sans text-subheading text-on-surface-variant font-normal leading-relaxed">
              Pantau akumulasi material terpilah, mutasi saldo rupiah terverifikasi, dan perolehan EcoPoints untuk ditukarkan dengan beragam imbalan ekologis.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/analitik"
              className="px-4 h-11 rounded-xl glass-pill hover:bg-surface-container text-on-surface font-sans text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <Icon name="analytics" size={15} className="text-secondary" />
              <span>Analitik Tren</span>
            </Link>

            <button
              type="button"
              onClick={seedSampleData}
              className="px-4 h-11 rounded-xl glass-pill hover:bg-surface-container text-on-surface font-sans text-xs font-semibold transition-all cursor-pointer"
              title="Muat data demonstrasi simulasi"
            >
              Reset Data Contoh
            </button>
            <button
              type="button"
              onClick={openDepositModal}
              className="h-11 px-5 rounded-xl bg-secondary text-white font-sans text-xs font-bold hover:bg-secondary/90 transition-all shadow-md flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Icon name="add_circle" size={16} />
              <span>Setor Sampah Baru</span>
            </button>
          </div>
        </div>

        {/* Apple-style Soft Gradient Header Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent pointer-events-none" />

        {/* Top Wallet & Metric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          
          {/* Main Wallet Card (Luminous Emerald Glass) */}
          <div className="lg:col-span-5 rounded-3xl glass-panel-elevated p-8 shadow-xl relative overflow-hidden flex flex-col justify-between border border-secondary/30">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                  Total Saldo Tabungan Sirkular
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-secondary/15 text-secondary text-[10px] font-bold uppercase">
                  Aktif
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                  Rp{totalBalanceIdr.toLocaleString('id-ID')}
                </span>
                <span className="text-xs text-outline font-semibold">Tersedia</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Dapat dicairkan ke dompet digital atau ditukarkan dengan sembako dan bibit pohon.
              </p>
            </div>

            <div className="pt-6 border-t border-outline-variant/15 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setIsRedeemOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-container transition-all cursor-pointer"
              >
                Tarik Saldo / Tukar Reward
              </button>
              <span className="text-[11px] text-outline font-mono">Bebas Biaya Admin</span>
            </div>
          </div>

          {/* Metric 1: EcoPoints */}
          <div className="lg:col-span-3 rounded-3xl glass-panel p-8 flex flex-col justify-between border border-outline-variant/20">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-outline block">
                Akumulasi EcoPoints
              </span>
              <div className="flex items-baseline gap-2">
                <AnimatedCounter value={totalPoints} className="font-display font-extrabold text-3xl text-secondary" />
                <span className="text-xs font-bold text-secondary">Poin</span>
              </div>
            </div>
            <p className="text-xs text-on-surface-variant pt-4 leading-relaxed">
              Tingkatkan poin dengan menyetor material bersih dan menyelesaikan misi mingguan.
            </p>
          </div>

          {/* Metric 2: Total Weight & Carbon */}
          <div className="lg:col-span-4 rounded-3xl glass-panel p-8 flex flex-col justify-between border border-outline-variant/20">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase text-outline block">Total Massa</span>
                <div className="flex items-baseline gap-1">
                  <AnimatedCounter value={totalWeightKg} className="font-display font-extrabold text-2xl text-primary" />
                  <span className="text-xs font-bold text-outline">kg</span>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase text-outline block">Reduksi CO₂e</span>
                <div className="flex items-baseline gap-1">
                  <AnimatedCounter value={totalCo2AvoidedKg} className="font-display font-extrabold text-2xl text-secondary" />
                  <span className="text-xs font-bold text-secondary">kg</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-on-surface-variant pt-4 leading-relaxed border-t border-outline-variant/15">
              Tata kelola terverifikasi berbasis standar SNI 19-3983 dan faktor ilmiah EPA WARM.
            </p>
          </div>

        </div>

        {/* Material Stream Composition Progress Bar */}
        <div className="p-8 rounded-3xl glass-panel border border-outline-variant/25 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-display font-bold text-primary text-base">
                Distribusi Komposisi Material Daur Ulang
              </h3>
              <p className="text-xs text-on-surface-variant">
                Proporsi massa sampah berdasarkan akumulasi setoran aktif di buku tabungan
              </p>
            </div>
            <Link to="/analitik" className="text-secondary font-bold text-xs hover:underline flex items-center gap-1">
              <span>Rincian Analitik Lengkap</span>
              <Icon name="arrow_forward" size={13} />
            </Link>
          </div>

          {/* Segmented Progress Bar */}
          <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden flex">
            <div style={{ width: '40%' }} className="bg-secondary h-full" title="Plastik PET (40%)" />
            <div style={{ width: '30%' }} className="bg-primary h-full" title="Kardus & Kertas (30%)" />
            <div style={{ width: '15%' }} className="bg-emerald-400 h-full" title="Kaleng Logam (15%)" />
            <div style={{ width: '10%' }} className="bg-amber-400 h-full" title="Minyak Jelantah (10%)" />
            <div style={{ width: '5%' }} className="bg-outline h-full" title="Lainnya (5%)" />
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
              <span>Plastik PET (40%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-primary" />
              <span>Kardus (30%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>Logam (15%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span>Jelantah (10%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-outline" />
              <span>Kaca/B3 (5%)</span>
            </div>
          </div>
        </div>

        {/* Transaction History & Mutations Table */}
        <div className="rounded-3xl glass-panel border border-outline-variant/25 overflow-hidden">
          
          {/* Table Header & Controls */}
          <div className="p-6 sm:p-8 border-b border-outline-variant/15 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="font-display font-bold text-xl text-primary">
                Mutasi & Riwayat Setoran
              </h2>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Daftar transaksi penyerahan material terpilah yang tercatat di sistem
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Category Filter */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="h-10 px-3 rounded-lg bg-surface-container text-xs text-on-surface font-semibold outline-none focus:ring-1 focus:ring-secondary"
              >
                <option value="Semua">Semua Kategori</option>
                <option value="Plastik">Plastik PET</option>
                <option value="Kardus">Kardus & Kertas</option>
                <option value="Kaleng">Kaleng Logam</option>
                <option value="Minyak">Minyak Jelantah</option>
                <option value="Kaca">Botol Kaca</option>
              </select>

              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari ID / Drop-Point..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 pl-9 pr-3 rounded-lg bg-surface-container text-xs text-on-surface outline-none focus:ring-1 focus:ring-secondary w-44 sm:w-56"
                />
                <Icon name="search" size={16} className="text-outline absolute left-2.5 top-3" />
              </div>

              {transactions.length > 0 && (
                <button
                  type="button"
                  onClick={resetTransactions}
                  className="h-10 px-3 rounded-lg text-error hover:bg-error-container text-xs font-semibold transition-colors cursor-pointer"
                  title="Kosongkan seluruh data"
                >
                  Reset Tabel
                </button>
              )}
            </div>
          </div>

          {/* Table Content */}
          {filteredTransactions.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <Icon name="receipt" size={44} className="text-outline mx-auto" />
              <h4 className="font-title-md font-bold text-primary">Belum Ada Transaksi Ditemukan</h4>
              <p className="font-body-sm text-xs text-on-surface-variant max-w-sm mx-auto">
                Mulai catat setoran sampah pertama Anda atau muat data simulasi kompetisi.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={seedSampleData}
                  className="h-10 px-4 rounded-lg bg-surface-container text-primary font-bold text-xs hover:bg-surface-container-high transition-colors cursor-pointer"
                >
                  Muat Data Contoh
                </button>
                <button
                  onClick={openDepositModal}
                  className="h-10 px-4 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed font-bold text-xs hover:bg-tertiary-fixed-dim transition-colors cursor-pointer"
                >
                  Setor Sampah Sekarang
                </button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-surface-container-low text-[11px] font-bold text-outline uppercase tracking-wider border-b border-outline-variant/20">
                  <tr>
                    <th className="py-3 px-4">ID Transaksi</th>
                    <th className="py-3 px-4">Tanggal</th>
                    <th className="py-3 px-4">Material Terpilah</th>
                    <th className="py-3 px-4 text-right">Bobot (kg)</th>
                    <th className="py-3 px-4 text-right">Nilai (IDR)</th>
                    <th className="py-3 px-4 text-right">EcoPoints</th>
                    <th className="py-3 px-4">Lokasi Drop-Point</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10 font-body-sm text-xs text-on-surface">
                  {filteredTransactions.map((trx) => (
                    <tr key={trx.id} className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold">
                        <button
                          type="button"
                          onClick={() => openDetailTrx(trx)}
                          className="text-primary hover:text-secondary hover:underline cursor-pointer flex items-center gap-1.5"
                          title="Klik untuk melihat lembar manifest detail"
                        >
                          <span>{trx.id}</span>
                          {trx.photoUrl && (
                            <Icon name="image" size={13} className="text-secondary" />
                          )}
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-outline whitespace-nowrap">
                        {trx.date}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-primary">
                        {trx.wasteType}
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold tabular-nums">
                        {trx.weightKg.toFixed(1)} kg
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-primary tabular-nums">
                        Rp {trx.valueIdr.toLocaleString('id-ID')}
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-secondary tabular-nums">
                        +{trx.points} Pts
                      </td>
                      <td className="py-3.5 px-4 text-on-surface-variant truncate max-w-[180px]">
                        {trx.dropPoint}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold text-[10px] uppercase">
                          {trx.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {/* View detail button */}
                          <button
                            type="button"
                            onClick={() => openDetailTrx(trx)}
                            className="p-1 rounded hover:bg-surface-container text-secondary hover:text-primary transition-colors cursor-pointer"
                            title="Buka Lembar Manifest & Bukti Setor"
                          >
                            <Icon name="receipt" size={16} />
                          </button>
                          {/* Edit button */}
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(trx)}
                            className="p-1 rounded hover:bg-surface-container text-outline hover:text-primary transition-colors cursor-pointer"
                            title="Edit data transaksi"
                          >
                            <Icon name="edit" size={16} />
                          </button>
                          {/* Delete button */}
                          <button
                            type="button"
                            onClick={() => setDeletingId(trx.id)}
                            className="p-1 rounded hover:bg-error-container text-outline hover:text-error transition-colors cursor-pointer"
                            title="Hapus transaksi"
                          >
                            <Icon name="delete" size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

      {/* EDIT MODAL */}
      {editingTrx && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/70 backdrop-blur-sm animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setEditingTrx(null);
          }}
        >
          <div className="bg-surface-container-lowest rounded-2xl max-w-md w-full p-space-lg shadow-2xl border border-outline-variant/30 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
              <h3 className="font-headline-sm font-bold text-primary">
                Edit Catatan Transaksi ({editingTrx.id})
              </h3>
              <button
                onClick={() => setEditingTrx(null)}
                className="text-outline hover:text-primary cursor-pointer"
              >
                <Icon name="close" size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3">
              <div>
                <label className="text-xs text-on-surface-variant block mb-1 font-bold">Kategori Material</label>
                <select
                  value={editType}
                  onChange={(e) => setEditType(e.target.value as WasteStreamType)}
                  className="w-full h-10 px-3 rounded-lg bg-surface-container text-xs text-on-surface outline-none"
                >
                  {WASTE_CATEGORIES.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-on-surface-variant block mb-1 font-bold">Bobot (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={editWeight}
                  onChange={(e) => setEditWeight(parseFloat(e.target.value) || 0.1)}
                  className="w-full h-10 px-3 rounded-lg bg-surface-container text-xs text-on-surface font-bold outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingTrx(null)}
                  className="px-4 h-10 rounded-lg text-xs font-semibold hover:bg-surface-container cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 h-10 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold hover:bg-tertiary-fixed-dim cursor-pointer"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingId && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/70 backdrop-blur-sm animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setDeletingId(null);
          }}
        >
          <div className="bg-surface-container-lowest rounded-2xl max-w-sm w-full p-space-lg shadow-2xl border border-outline-variant/30 space-y-4 text-center">
            <Icon name="alert" size={36} className="text-error mx-auto" />
            <h3 className="font-headline-sm font-bold text-primary">Hapus Catatan Setoran?</h3>
            <p className="font-body-sm text-xs text-on-surface-variant">
              Tindakan ini akan menghapus riwayat {deletingId} dan menyesuaikan saldo poin buku tabungan Anda secara otomatis.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeletingId(null)}
                className="px-4 h-10 rounded-lg text-xs font-semibold hover:bg-surface-container cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 h-10 rounded-lg bg-error text-on-error text-xs font-bold hover:bg-on-error-container cursor-pointer"
              >
                Ya, Hapus Catatan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SIMULATED REDEMPTION DRAWER / MODAL */}
      {isRedeemOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/70 backdrop-blur-sm animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsRedeemOpen(false);
          }}
        >
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-space-lg shadow-2xl border border-outline-variant/30 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <Icon name="savings" size={18} className="text-secondary" />
                <h3 className="font-headline-sm font-bold text-primary">Katalog Penukaran Imbalan</h3>
              </div>
              <button onClick={() => setIsRedeemOpen(false)} className="text-outline hover:text-primary cursor-pointer">
                <Icon name="close" size={18} />
              </button>
            </div>

            <p className="text-xs text-on-surface-variant">
              Pilih manfaat yang ingin Anda konversi menggunakan saldo EcoPoints Anda (Tersedia: <strong>{totalPoints} Poin</strong>).
            </p>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-surface-container flex items-center justify-between">
                <div>
                  <h4 className="font-title-md font-bold text-xs text-primary">Saldo Dompet Digital Rp 25.000</h4>
                  <p className="text-[11px] text-outline">GoPay, DANA, OVO, atau ShopeePay</p>
                </div>
                <button
                  disabled={totalPoints < 250}
                  onClick={() => {
                    showToast('Permintaan pencairan Rp 25.000 berhasil disimulasikan!', 'success');
                    setIsRedeemOpen(false);
                  }}
                  className="px-3 h-8 rounded bg-primary text-on-primary text-xs font-bold hover:bg-primary-container disabled:opacity-40 cursor-pointer"
                >
                  250 Poin
                </button>
              </div>

              <div className="p-3 rounded-xl bg-surface-container flex items-center justify-between">
                <div>
                  <h4 className="font-title-md font-bold text-xs text-primary">1 Bibit Pohon Mangrove / Buah</h4>
                  <p className="text-[11px] text-outline">Ditanam atas nama Anda di Kuningan / Cirebon</p>
                </div>
                <button
                  disabled={totalPoints < 200}
                  onClick={() => {
                    showToast('Sertifikat adopsi bibit pohon berhasil disimulasikan!', 'success');
                    setIsRedeemOpen(false);
                  }}
                  className="px-3 h-8 rounded bg-secondary text-on-secondary text-xs font-bold hover:bg-secondary/90 disabled:opacity-40 cursor-pointer"
                >
                  200 Poin
                </button>
              </div>

              <div className="p-3 rounded-xl bg-surface-container flex items-center justify-between">
                <div>
                  <h4 className="font-title-md font-bold text-xs text-primary">Token Listrik PLN Rp 50.000</h4>
                  <p className="text-[11px] text-outline">Voucher kode meteran listrik rumah tangga</p>
                </div>
                <button
                  disabled={totalPoints < 500}
                  onClick={() => {
                    showToast('Simulasi voucher token PLN Rp 50.000 berhasil!', 'success');
                    setIsRedeemOpen(false);
                  }}
                  className="px-3 h-8 rounded bg-primary text-on-primary text-xs font-bold hover:bg-primary-container disabled:opacity-40 cursor-pointer"
                >
                  500 Poin
                </button>
              </div>
            </div>

            <div className="pt-2 text-center text-[11px] text-outline">
              * Nilai tukar poin dan penukaran insentif sirkular diverifikasi oleh mitra pengelola berizin.
            </div>
          </div>
        </div>
      )}
    </PageTransition>
  );
};
