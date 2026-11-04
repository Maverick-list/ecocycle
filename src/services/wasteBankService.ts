import { WasteTransaction, WasteStreamType } from '../types';
import { WASTE_CATEGORIES } from '../data/wasteData';
import { INITIAL_TRANSACTIONS } from '../data/initialTransactions';
import { StorageService } from './storageService';

const STORAGE_KEY = 'ecocycle_transactions_v2';

export const WasteBankService = {
  getTransactions(): WasteTransaction[] {
    return StorageService.get<WasteTransaction[]>(STORAGE_KEY, INITIAL_TRANSACTIONS);
  },

  saveTransactions(transactions: WasteTransaction[]): void {
    StorageService.set(STORAGE_KEY, transactions);
  },

  calculateEstimates(wasteType: WasteStreamType, weightKg: number) {
    const config = WASTE_CATEGORIES.find(c => c.name === wasteType) || WASTE_CATEGORIES[0];
    const safeWeight = Math.max(0.1, weightKg);

    const points = Math.round(safeWeight * config.pointsPerKg);
    const valueIdr = Math.round(safeWeight * config.pricePerKg);
    const co2OffsetKg = parseFloat((safeWeight * config.co2Factor).toFixed(2));
    const waterSavedLiters = Math.round(safeWeight * config.waterFactor);

    return {
      points,
      valueIdr,
      co2OffsetKg,
      waterSavedLiters,
      unitPrice: config.pricePerKg,
      pointsRate: config.pointsPerKg,
      config
    };
  },

  createTransaction(input: {
    wasteType: WasteStreamType;
    weightKg: number;
    dropPoint: string;
    photoUrl?: string;
    notes?: string;
    date?: string;
  }): WasteTransaction {
    const estimates = this.calculateEstimates(input.wasteType, input.weightKg);
    const now = new Date();
    
    const dateFormatted = input.date 
      ? new Date(input.date).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })
      : now.toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });

    const newTrx: WasteTransaction = {
      id: `TRX-${Math.floor(10000 + Math.random() * 90000)}`,
      date: dateFormatted,
      timestamp: now.getTime(),
      wasteType: input.wasteType,
      weightKg: input.weightKg,
      points: estimates.points,
      valueIdr: estimates.valueIdr,
      dropPoint: input.dropPoint,
      status: 'Terverifikasi',
      co2OffsetKg: estimates.co2OffsetKg,
      waterSavedLiters: estimates.waterSavedLiters,
      photoUrl: input.photoUrl,
      notes: input.notes || 'Setoran mandiri terverifikasi'
    };

    const existing = this.getTransactions();
    const updated = [newTrx, ...existing];
    this.saveTransactions(updated);

    return newTrx;
  },

  updateTransaction(id: string, updates: Partial<WasteTransaction>): WasteTransaction[] {
    const existing = this.getTransactions();
    const updated = existing.map(item => {
      if (item.id === id) {
        return { ...item, ...updates };
      }
      return item;
    });
    this.saveTransactions(updated);
    return updated;
  },

  deleteTransaction(id: string): WasteTransaction[] {
    const existing = this.getTransactions();
    const updated = existing.filter(item => item.id !== id);
    this.saveTransactions(updated);
    return updated;
  },

  seedDemoData(): WasteTransaction[] {
    this.saveTransactions(INITIAL_TRANSACTIONS);
    return INITIAL_TRANSACTIONS;
  },

  resetData(): WasteTransaction[] {
    this.saveTransactions([]);
    return [];
  }
};
