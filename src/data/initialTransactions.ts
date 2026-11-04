import { WasteTransaction } from '../types';

export const INITIAL_TRANSACTIONS: WasteTransaction[] = [
  {
    id: 'TRX-94812',
    date: '28 Okt 2025, 09:42',
    wasteType: 'Plastik PET',
    weightKg: 4.8,
    points: 168,
    valueIdr: 16800,
    dropPoint: 'Drop-Point Bale RW 04 Menteng',
    status: 'Terverifikasi',
    co2OffsetKg: 7.2,
    notes: 'Botol mineral bening bersih dan dipipihkan'
  },
  {
    id: 'TRX-94750',
    date: '24 Okt 2025, 14:15',
    wasteType: 'Kardus & Kertas',
    weightKg: 12.5,
    points: 375,
    valueIdr: 37500,
    dropPoint: 'Bank Sampah Induk Tebet Barat',
    status: 'Terverifikasi',
    co2OffsetKg: 13.75,
    notes: 'Kardus kemasan boks paket online'
  },
  {
    id: 'TRX-94611',
    date: '19 Okt 2025, 11:20',
    wasteType: 'Minyak Jelantah',
    weightKg: 3.0,
    points: 240,
    valueIdr: 24000,
    dropPoint: 'Pusat Daur Ulang Mandiri Kuningan',
    status: 'Terverifikasi',
    co2OffsetKg: 6.3,
    notes: 'Minyak goreng bekas telah disaring 1 jeriken'
  },
  {
    id: 'TRX-94520',
    date: '15 Okt 2025, 16:30',
    wasteType: 'Kaleng Logam',
    weightKg: 2.2,
    points: 66,
    valueIdr: 6600,
    dropPoint: 'Drop-Point Bale RW 04 Menteng',
    status: 'Terverifikasi',
    co2OffsetKg: 7.04,
    notes: 'Kaleng minuman aluminium bersih'
  },
  {
    id: 'TRX-94408',
    date: '08 Okt 2025, 10:05',
    wasteType: 'Botol Kaca',
    weightKg: 5.0,
    points: 100,
    valueIdr: 10000,
    dropPoint: 'Hub Sirkular FKOM UNIKUN',
    status: 'Terverifikasi',
    co2OffsetKg: 2.0,
    notes: 'Botol sirup kaca utuh'
  }
];
