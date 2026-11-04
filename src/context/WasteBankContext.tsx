import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { WasteTransaction, WasteStreamType } from '../types';
import { INITIAL_TRANSACTIONS } from '../data/initialTransactions';

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface WasteBankContextType {
  transactions: WasteTransaction[];
  addTransaction: (data: {
    wasteType: WasteStreamType;
    weightKg: number;
    points: number;
    valueIdr: number;
    dropPoint: string;
    co2OffsetKg: number;
    notes?: string;
  }) => void;
  updateTransaction: (id: string, updated: Partial<WasteTransaction>) => void;
  deleteTransaction: (id: string) => void;
  resetTransactions: () => void;
  seedSampleData: () => void;
  totalPoints: number;
  totalBalanceIdr: number;
  totalWeightKg: number;
  totalCo2AvoidedKg: number;
  treesPlantedEquivalent: number;
  ecoPledgesCount: number;
  hasPledged: boolean;
  signEcoPledge: () => void;
  isDepositModalOpen: boolean;
  openDepositModal: () => void;
  closeDepositModal: () => void;
  toast: ToastMessage | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const WasteBankContext = createContext<WasteBankContextType | undefined>(undefined);

const STORAGE_KEY_TRX = 'ecocycle_transactions_v2';
const STORAGE_KEY_PLEDGE = 'ecocycle_pledges_v2';
const STORAGE_KEY_HAS_PLEDGED = 'ecocycle_has_pledged_v2';

export const WasteBankProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<WasteTransaction[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TRX);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_TRANSACTIONS;
  });

  const [ecoPledgesCount, setEcoPledgesCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PLEDGE);
      if (saved) return parseInt(saved, 10);
    } catch {
      // fallback
    }
    return 1482;
  });

  const [hasPledged, setHasPledged] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_HAS_PLEDGED) === 'true';
    } catch {
      return false;
    }
  });

  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TRX, JSON.stringify(transactions));
    } catch {
      // storage unavailable
    }
  }, [transactions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PLEDGE, ecoPledgesCount.toString());
    } catch {
      // storage unavailable
    }
  }, [ecoPledgesCount]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_HAS_PLEDGED, hasPledged.toString());
    } catch {
      // storage unavailable
    }
  }, [hasPledged]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast(current => (current?.id === id ? null : current));
    }, 4000);
  };

  const addTransaction = (data: {
    wasteType: WasteStreamType;
    weightKg: number;
    points: number;
    valueIdr: number;
    dropPoint: string;
    co2OffsetKg: number;
    notes?: string;
  }) => {
    const now = new Date();
    const dateFormatted = now.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const newTrx: WasteTransaction = {
      id: `TRX-${Math.floor(10000 + Math.random() * 90000)}`,
      date: dateFormatted,
      wasteType: data.wasteType,
      weightKg: data.weightKg,
      points: data.points,
      valueIdr: data.valueIdr,
      dropPoint: data.dropPoint,
      status: 'Terverifikasi',
      co2OffsetKg: data.co2OffsetKg,
      notes: data.notes || 'Setoran mandiri via aplikasi web'
    };

    setTransactions(prev => [newTrx, ...prev]);
    showToast(`Setoran ${data.wasteType} (${data.weightKg} kg) berhasil dicatat! +${data.points} Poin`, 'success');
  };

  const updateTransaction = (id: string, updated: Partial<WasteTransaction>) => {
    setTransactions(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updated } : item))
    );
    showToast('Catatan setoran berhasil diperbarui!', 'info');
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(item => item.id !== id));
    showToast('Catatan setoran berhasil dihapus.', 'info');
  };

  const resetTransactions = () => {
    setTransactions([]);
    showToast('Seluruh riwayat transaksi telah dikosongkan.', 'info');
  };

  const seedSampleData = () => {
    setTransactions(INITIAL_TRANSACTIONS);
    showToast('Data simulasi kompetisi berhasil dimuat!', 'success');
  };

  const signEcoPledge = () => {
    if (!hasPledged) {
      setEcoPledgesCount(prev => prev + 1);
      setHasPledged(true);
      showToast('Terima kasih! Ikrar gaya hidup sirkular Anda telah dicatat.', 'success');
    } else {
      showToast('Anda telah menandatangani ikrar lingkungan sebelumnya. Bagikan ke rekan Anda!', 'info');
    }
  };

  // Metrics aggregations
  const totalWeightKg = useMemo(() => {
    return parseFloat(transactions.reduce((acc, curr) => acc + curr.weightKg, 0).toFixed(1));
  }, [transactions]);

  const totalPoints = useMemo(() => {
    return transactions.reduce((acc, curr) => acc + curr.points, 0);
  }, [transactions]);

  const totalBalanceIdr = useMemo(() => {
    return transactions.reduce((acc, curr) => acc + curr.valueIdr, 0);
  }, [transactions]);

  const totalCo2AvoidedKg = useMemo(() => {
    return parseFloat(transactions.reduce((acc, curr) => acc + curr.co2OffsetKg, 0).toFixed(2));
  }, [transactions]);

  const treesPlantedEquivalent = useMemo(() => {
    // 1 mature tree absorbs ~21.77 kg CO2 / year
    return parseFloat((totalCo2AvoidedKg / 21.77).toFixed(1));
  }, [totalCo2AvoidedKg]);

  return (
    <WasteBankContext.Provider
      value={{
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        resetTransactions,
        seedSampleData,
        totalPoints,
        totalBalanceIdr,
        totalWeightKg,
        totalCo2AvoidedKg,
        treesPlantedEquivalent,
        ecoPledgesCount,
        hasPledged,
        signEcoPledge,
        isDepositModalOpen,
        openDepositModal: () => setIsDepositModalOpen(true),
        closeDepositModal: () => setIsDepositModalOpen(false),
        toast,
        showToast
      }}
    >
      {children}
    </WasteBankContext.Provider>
  );
};

export const useWasteBank = () => {
  const context = useContext(WasteBankContext);
  if (!context) {
    throw new Error('useWasteBank must be used within a WasteBankProvider');
  }
  return context;
};
