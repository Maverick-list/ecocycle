import { WasteTransaction } from '../types';

export const INITIAL_TRANSACTIONS: WasteTransaction[] = [
  {
    id: 'TRX-94812',
    date: '28 Okt 2025, 09:42',
    timestamp: 1730083320000,
    wasteType: 'Plastik PET',
    weightKg: 4.8,
    points: 168,
    valueIdr: 16800,
    dropPoint: 'Drop-Point Bale RW 04 Menteng',
    status: 'Terverifikasi',
    co2OffsetKg: 7.2,
    waterSavedLiters: 115,
    notes: 'Botol mineral bening bersih dan dipipihkan'
  },
  {
    id: 'TRX-94750',
    date: '24 Okt 2025, 14:15',
    timestamp: 1729754100000,
    wasteType: 'Kardus & Kertas',
    weightKg: 12.5,
    points: 375,
    valueIdr: 37500,
    dropPoint: 'Bank Sampah Induk Tebet Barat',
    status: 'Terverifikasi',
    co2OffsetKg: 13.75,
    waterSavedLiters: 350,
    notes: 'Kardus kemasan boks paket online'
  },
  {
    id: 'TRX-94611',
    date: '19 Okt 2025, 11:20',
    timestamp: 1729311600000,
    wasteType: 'Minyak Jelantah',
    weightKg: 3.0,
    points: 240,
    valueIdr: 24000,
    dropPoint: 'Pusat Daur Ulang Mandiri Kuningan',
    status: 'Terverifikasi',
    co2OffsetKg: 6.3,
    waterSavedLiters: 300,
    notes: 'Minyak goreng bekas telah disaring 1 jeriken'
  },
  {
    id: 'TRX-94520',
    date: '15 Okt 2025, 16:30',
    timestamp: 1728984600000,
    wasteType: 'Kaleng Logam',
    weightKg: 2.2,
    points: 66,
    valueIdr: 6600,
    dropPoint: 'Drop-Point Bale RW 04 Menteng',
    status: 'Terverifikasi',
    co2OffsetKg: 7.04,
    waterSavedLiters: 88,
    notes: 'Kaleng minuman aluminium bersih'
  },
  {
    id: 'TRX-94408',
    date: '08 Okt 2025, 10:05',
    timestamp: 1728356700000,
    wasteType: 'Botol Kaca',
    weightKg: 5.0,
    points: 100,
    valueIdr: 10000,
    dropPoint: 'Hub Sirkular Sentral Terpadu',
    status: 'Terverifikasi',
    co2OffsetKg: 2.0,
    waterSavedLiters: 25,
    notes: 'Botol sirup kaca utuh'
  }
];
