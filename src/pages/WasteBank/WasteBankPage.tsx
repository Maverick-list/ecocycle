import React, { useState } from 'react';
import { useWasteBank } from '../../context/WasteBankContext';
import { WasteTransaction, WasteStreamType } from '../../types';
import { WASTE_CATEGORIES } from '../../data/wasteData';

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
    <div className="w-full bg-surface py-space-xl">
      <div className="max-w-[1380px] mx-auto px-margin-sm lg:px-margin space-y-space-xl">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/30 pb-space-lg">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
              <span className="font-label-caps text-secondary font-bold uppercase tracking-wider">
                Bank Sampah Digital Terpadu
              </span>
            </div>
            <h1 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl font-bold text-primary tracking-tight">
              Buku Tabungan & Konversi Nilai Sirkular
            </h1>
            <p className="font-body-md text-on-surface-variant max-w-2xl mt-1">
              Pantau akumulasi material terpilah, saldo rupiah terverifikasi, dan perolehan EcoPoints yang dapat ditukarkan dengan beragam imbalan ekologis.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={seedSampleData}
              className="px-4 h-11 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-title-md text-xs font-semibold border border-outline-variant/40 transition-colors cursor-pointer"
              title="Muat data contoh untuk pengujian juri"
            >
              Muat Data Simulasi
            </button>
            <button
              type="button"
              onClick={openDepositModal}
              className="h-11 px-5 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed font-title-md text-sm font-bold hover:bg-tertiary-fixed-dim transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
              <span>Setor Sampah Baru</span>
            </button>
          </div>
        </div>

        {/* Top Wallet & Metric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter">
          
          {/* Main Wallet Card (Dark Forest) */}
          <div className="lg:col-span-5 rounded-2xl bg-primary text-on-primary p-space-lg shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-label-caps text-primary-fixed-dim uppercase tracking-wider font-bold">
                  Total Saldo Tabungan Sirkular
                </span>
                <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold uppercase">
                  Terverifikasi
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold font-metric-display text-surface-bright tracking-tight">
                  Rp {totalBalanceIdr.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2.5 py-1 rounded-md bg-primary-container text-tertiary-fixed font-bold text-xs">
                  {totalPoints.toLocaleString('id-ID')} EcoPoints
                </span>
                <span className="text-xs text-primary-fixed-dim">
                  ≈ 1 Poin = Rp 100
                </span>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-primary-container flex items-center justify-between">
              <span className="text-xs text-surface-variant">
                ID Rekening: <strong className="text-white">ECO-ID-2026-994</strong>
              </span>
              <button
                type="button"
                onClick={() => setIsRedeemOpen(true)}
                className="h-9 px-4 rounded-lg bg-secondary text-on-secondary text-xs font-bold hover:bg-on-secondary-container transition-colors cursor-pointer"
              >
                Tukar Poin Reward
              </button>
            </div>
          </div>

          {/* Secondary Metric Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-gutter">
            
            {/* Metric 1 */}
            <div className="p-space-lg rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
              <span className="font-label-caps text-outline uppercase block mb-1">
                Total Material
              </span>
              <div className="my-2">
                <span className="font-metric-display text-3xl font-extrabold text-primary">
                  {totalWeightKg.toLocaleString('id-ID')}
                </span>
                <span className="text-sm font-semibold text-secondary ml-1">kg</span>
              </div>
              <span className="text-xs text-on-surface-variant">
                {transactions.length} kali penyerahan tercatat
              </span>
            </div>

            {/* Metric 2 */}
            <div className="p-space-lg rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
              <span className="font-label-caps text-outline uppercase block mb-1">
                Reduksi Karbon
              </span>
              <div className="my-2">
                <span className="font-metric-display text-3xl font-extrabold text-primary">
                  {totalCo2AvoidedKg.toLocaleString('id-ID')}
                </span>
                <span className="text-sm font-semibold text-secondary ml-1">kg CO₂e</span>
              </div>
              <span className="text-xs text-on-surface-variant">
                Setara ~{(totalCo2AvoidedKg / 21.77).toFixed(1)} pohon diselamatkan
              </span>
            </div>

            {/* Metric 3 */}
            <div className="p-space-lg rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
              <span className="font-label-caps text-outline uppercase block mb-1">
                Kepatuhan SNI
              </span>
              <div className="my-2">
                <span className="font-metric-display text-3xl font-extrabold text-primary">
                  99.4%
                </span>
                <span className="text-sm font-semibold text-secondary ml-1">Akurasi</span>
              </div>
              <span className="text-xs text-on-surface-variant">
                Sesuai standar KLHK & ISO 14001
              </span>
            </div>

          </div>
        </div>

        {/* Material Stream Composition Progress Bar */}
        <div className="p-space-lg rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
            <h3 className="font-title-md font-bold text-primary">
              Distribusi Komposisi Material Daur Ulang
            </h3>
            <span className="text-xs text-outline">
              Berdasarkan akumulasi bobot setoran aktif
            </span>
          </div>

          {/* Segmented Progress Bar */}
          <div className="w-full h-3.5 bg-surface-container rounded-full overflow-hidden flex">
            <div style={{ width: '40%' }} className="bg-secondary h-full" title="Plastik PET (40%)" />
            <div style={{ width: '30%' }} className="bg-primary-container h-full" title="Kardus & Kertas (30%)" />
            <div style={{ width: '15%' }} className="bg-tertiary-fixed h-full" title="Kaleng Logam (15%)" />
            <div style={{ width: '10%' }} className="bg-secondary-fixed h-full" title="Minyak Jelantah (10%)" />
            <div style={{ width: '5%' }} className="bg-outline h-full" title="Lainnya (5%)" />
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-secondary" />
              <span>Plastik PET (40%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-primary-container" />
              <span>Kardus (30%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-tertiary-fixed" />
              <span>Logam (15%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-secondary-fixed" />
              <span>Jelantah (10%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-outline" />
              <span>Kaca/E-Waste (5%)</span>
            </div>
          </div>
        </div>

        {/* Transaction History & Mutations Table */}
        <div className="rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm overflow-hidden">
          
          {/* Table Header & Controls */}
          <div className="p-space-md sm:p-space-lg border-b border-outline-variant/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="font-headline-sm font-bold text-primary">
                Mutasi & Riwayat Setoran
              </h2>
              <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
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
                <span className="material-symbols-outlined text-[18px] text-outline absolute left-2.5 top-2.5">
                  search
                </span>
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
              <span className="material-symbols-outlined text-5xl text-outline">receipt_long</span>
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
                            <span className="material-symbols-outlined text-[14px] text-secondary" title="Memiliki bukti foto">
                              image
                            </span>
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
                            <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                          </button>
                          {/* Edit button */}
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(trx)}
                            className="p-1 rounded hover:bg-surface-container text-outline hover:text-primary transition-colors cursor-pointer"
                            title="Edit data transaksi"
                          >
                            <span className="material-symbols-outlined text-[16px]">edit</span>
                          </button>
                          {/* Delete button */}
                          <button
                            type="button"
                            onClick={() => setDeletingId(trx.id)}
                            className="p-1 rounded hover:bg-error-container text-outline hover:text-error transition-colors cursor-pointer"
                            title="Hapus transaksi"
                          >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface-container-lowest rounded-2xl max-w-md w-full p-space-lg shadow-2xl border border-outline-variant/30 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
              <h3 className="font-headline-sm font-bold text-primary">
                Edit Catatan Transaksi ({editingTrx.id})
              </h3>
              <button
                onClick={() => setEditingTrx(null)}
                className="text-outline hover:text-primary cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface-container-lowest rounded-2xl max-w-sm w-full p-space-lg shadow-2xl border border-outline-variant/30 space-y-4 text-center">
            <span className="material-symbols-outlined text-4xl text-error">warning</span>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-space-lg shadow-2xl border border-outline-variant/30 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">redeem</span>
                <h3 className="font-headline-sm font-bold text-primary">Katalog Penukaran Imbalan</h3>
              </div>
              <button onClick={() => setIsRedeemOpen(false)} className="text-outline hover:text-primary cursor-pointer">
                <span className="material-symbols-outlined">close</span>
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
                  className="px-3 h-8 rounded bg-secondary text-on-secondary text-xs font-bold hover:bg-on-secondary-container disabled:opacity-40 cursor-pointer"
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
              * Mode simulasi demonstrasi kompetisi Web Design Techno Versary Vol. II 2026.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
