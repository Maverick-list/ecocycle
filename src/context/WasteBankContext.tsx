import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { WasteTransaction, WasteStreamType } from '../types';
import { WasteBankService } from '../services/wasteBankService';
import { StorageService } from '../services/storageService';
import { useAuth } from './AuthContext';
import { SupabaseDataService } from '../services/supabaseDataService';
import { FirebaseDataService } from '../services/firebaseDataService';
import { trackEvent } from '../lib/analytics';

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
    dropPoint: string;
    photoUrl?: string;
    notes?: string;
    date?: string;
  }) => WasteTransaction;
  updateTransaction: (id: string, updated: Partial<WasteTransaction>) => void;
  deleteTransaction: (id: string) => void;
  resetTransactions: () => void;
  seedSampleData: () => void;
  totalPoints: number;
  totalBalanceIdr: number;
  totalWeightKg: number;
  totalCo2AvoidedKg: number;
  totalWaterSavedLiters: number;
  treesPlantedEquivalent: number;
  ecoPledgesCount: number;
  hasPledged: boolean;
  signEcoPledge: () => void;
  isDepositModalOpen: boolean;
  openDepositModal: () => void;
  closeDepositModal: () => void;
  selectedDetailTrx: WasteTransaction | null;
  openDetailTrx: (trx: WasteTransaction) => void;
  closeDetailTrx: () => void;
  toast: ToastMessage | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  addBonusPoints: (points: number, reason: string) => void;
}

const WasteBankContext = createContext<WasteBankContextType | undefined>(undefined);

const STORAGE_KEY_PLEDGE = 'ecocycle_pledges_v2';
const STORAGE_KEY_HAS_PLEDGED = 'ecocycle_has_pledged_v2';
const STORAGE_KEY_BONUS_POINTS = 'ecocycle_bonus_points_v2';

export const WasteBankProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isConfigured } = useAuth();

  const [transactions, setTransactions] = useState<WasteTransaction[]>(() => {
    return WasteBankService.getTransactions();
  });

  // Sync with Cloud (Firebase or Supabase) when authenticated
  useEffect(() => {
    if (user) {
      if (FirebaseDataService.isConfigured) {
        FirebaseDataService.fetchUserDeposits(user.id).then(({ deposits, error }) => {
          if (!error && deposits.length > 0) {
            setTransactions(deposits);
          }
        });
      } else if (isConfigured) {
        SupabaseDataService.fetchUserDeposits(user.id).then(({ deposits, error }) => {
          if (!error && deposits.length > 0) {
            setTransactions(deposits);
          }
        });
      }
    } else {
      setTransactions(WasteBankService.getTransactions());
    }
  }, [user, isConfigured]);

  const [bonusPoints, setBonusPoints] = useState<number>(() => {
    return StorageService.get<number>(STORAGE_KEY_BONUS_POINTS, 0);
  });

  const [ecoPledgesCount, setEcoPledgesCount] = useState<number>(() => {
    return StorageService.get<number>(STORAGE_KEY_PLEDGE, 1482);
  });

  const [hasPledged, setHasPledged] = useState<boolean>(() => {
    return StorageService.get<boolean>(STORAGE_KEY_HAS_PLEDGED, false);
  });

  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [selectedDetailTrx, setSelectedDetailTrx] = useState<WasteTransaction | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  useEffect(() => {
    StorageService.set(STORAGE_KEY_BONUS_POINTS, bonusPoints);
  }, [bonusPoints]);

  useEffect(() => {
    StorageService.set(STORAGE_KEY_PLEDGE, ecoPledgesCount);
  }, [ecoPledgesCount]);

  useEffect(() => {
    StorageService.set(STORAGE_KEY_HAS_PLEDGED, hasPledged);
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
    dropPoint: string;
    photoUrl?: string;
    notes?: string;
    date?: string;
  }) => {
    const newTrx = WasteBankService.createTransaction(data);
    setTransactions(WasteBankService.getTransactions());

    // Track GA4 event
    trackEvent('deposit_submitted', {
      category: data.wasteType,
      weight: data.weightKg,
      points: newTrx.points
    });

    // Asynchronously sync with Cloud (Firebase or Supabase) if authenticated
    if (user) {
      if (FirebaseDataService.isConfigured) {
        FirebaseDataService.submitDeposit(user.id, newTrx).catch((err: any) => {
          console.warn('[Firebase Sync] Could not save deposit to Firestore:', err);
        });
      } else if (isConfigured) {
        SupabaseDataService.insertDeposit(user.id, newTrx).catch((err: any) => {
          console.warn('[Supabase Sync] Could not save deposit remotely:', err);
        });
      }
    }

    showToast(`Setoran ${data.wasteType} (${data.weightKg} kg) berhasil dicatat! +${newTrx.points} Poin`, 'success');
    return newTrx;
  };

  const updateTransaction = (id: string, updated: Partial<WasteTransaction>) => {
    const updatedList = WasteBankService.updateTransaction(id, updated);
    setTransactions(updatedList);
    showToast('Catatan setoran berhasil diperbarui!', 'info');
  };

  const deleteTransaction = (id: string) => {
    const updatedList = WasteBankService.deleteTransaction(id);
    setTransactions(updatedList);
    showToast('Catatan setoran berhasil dihapus.', 'info');
  };

  const resetTransactions = () => {
    const emptyList = WasteBankService.resetData();
    setTransactions(emptyList);
    showToast('Seluruh riwayat transaksi telah dikosongkan.', 'info');
  };

  const seedSampleData = () => {
    const seeded = WasteBankService.seedDemoData();
    setTransactions(seeded);
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

  const addBonusPoints = (points: number, reason: string) => {
    setBonusPoints(prev => prev + points);
    showToast(`+${points} Poin Bonus didapatkan: ${reason}!`, 'success');
  };

  // Metrics aggregations
  const totalWeightKg = useMemo(() => {
    return parseFloat(transactions.reduce((acc, curr) => acc + curr.weightKg, 0).toFixed(1));
  }, [transactions]);

  const basePoints = useMemo(() => {
    return transactions.reduce((acc, curr) => acc + curr.points, 0);
  }, [transactions]);

  const totalPoints = basePoints + bonusPoints;

  const totalBalanceIdr = useMemo(() => {
    return transactions.reduce((acc, curr) => acc + curr.valueIdr, 0);
  }, [transactions]);

  const totalCo2AvoidedKg = useMemo(() => {
    return parseFloat(transactions.reduce((acc, curr) => acc + curr.co2OffsetKg, 0).toFixed(2));
  }, [transactions]);

  const totalWaterSavedLiters = useMemo(() => {
    return transactions.reduce((acc, curr) => acc + (curr.waterSavedLiters || 0), 0);
  }, [transactions]);

  const treesPlantedEquivalent = useMemo(() => {
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
        totalWaterSavedLiters,
        treesPlantedEquivalent,
        ecoPledgesCount,
        hasPledged,
        signEcoPledge,
        isDepositModalOpen,
        openDepositModal: () => setIsDepositModalOpen(true),
        closeDepositModal: () => setIsDepositModalOpen(false),
        selectedDetailTrx,
        openDetailTrx: (trx) => setSelectedDetailTrx(trx),
        closeDetailTrx: () => setSelectedDetailTrx(null),
        toast,
        showToast,
        addBonusPoints
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
