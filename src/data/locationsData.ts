import { DropPointStation } from '../types';

export const DROP_POINTS: DropPointStation[] = [
  {
    id: 'dp-1',
    name: 'Drop-Point Bale RW 04 Menteng',
    address: 'Jl. HOS Cokroaminoto No. 42, Menteng',
    subdistrict: 'Menteng',
    city: 'Jakarta Pusat',
    hours: 'Senin - Sabtu: 08.00 - 16.00 WIB',
    status: 'Buka Sekarang',
    acceptedTypes: ['Plastik PET', 'Kardus & Kertas', 'Kaleng Logam', 'Botol Kaca'],
    contact: '+62 812-3456-7890'
  },
  {
    id: 'dp-2',
    name: 'Bank Sampah Induk Tebet Barat',
    address: 'Jl. Tebet Barat Raya No. 18, Tebet',
    subdistrict: 'Tebet',
    city: 'Jakarta Selatan',
    hours: 'Setiap Hari: 07.30 - 17.00 WIB',
    status: 'Buka Sekarang',
    acceptedTypes: ['Semua Material', 'Minyak Jelantah', 'E-Waste'],
    contact: '+62 813-8899-1122'
  },
  {
    id: 'dp-3',
    name: 'Hub Sirkular Sentral Terpadu Kuningan',
    address: 'Jl. Cut Nyak Dhien No. 36A, Cijoho',
    subdistrict: 'Kuningan',
    city: 'Kabupaten Kuningan',
    hours: 'Senin - Jumat: 08.30 - 16.30 WIB',
    status: 'Buka Sekarang',
    acceptedTypes: ['Kardus & Kertas', 'Plastik PET', 'Kaleng Logam', 'E-Waste Komunitas'],
    contact: '+62 857-1234-9988'
  },
  {
    id: 'dp-4',
    name: 'Pusat Daur Ulang Mandiri Kuningan',
    address: 'Jl. Siliwangi No. 104, Purwawinangun',
    subdistrict: 'Kuningan',
    city: 'Kabupaten Kuningan',
    hours: 'Senin - Sabtu: 08.00 - 15.00 WIB',
    status: 'Buka Sekarang',
    acceptedTypes: ['Plastik PET', 'Minyak Jelantah', 'Kardus & Kertas'],
    contact: '+62 821-4567-0011'
  }
];

export const FAQ_ITEMS = [
  {
    q: 'Bagaimana cara mulai menyetor sampah di Bank Sampah ECOCYCLE?',
    a: 'Cukup pilah sampah anorganik Anda di rumah (Plastik, Kertas, Logam, Kaca, atau Minyak Jelantah). Pastikan dalam keadaan bersih dan kering. Masukkan data estimasi bobot di menu "Setor Sampah" aplikasi, lalu bawa sampah Anda ke Drop-Point terdekat untuk ditimbang ulang dan diverifikasi oleh petugas.'
  },
  {
    q: 'Berapa nilai konversi EcoPoints ke Saldo Rupiah?',
    a: 'Setiap 1 EcoPoint setara dengan estimasi Rp 100 nilai pemulihan material. Poin dapat dikonversi menjadi saldo dompet digital (GoPay, OVO, DANA), token listrik PLN, atau didonasikan untuk program penanaman bibit pohon komunitas.'
  },
  {
    q: 'Apakah sampah organik dapur bisa disetorkan ke drop-point?',
    a: 'Sebagian besar drop-point kota memprioritaskan material anorganik kering dan minyak jelantah. Namun beberapa hub komunitas seperti Bank Sampah Induk dan Hub Kampus UNIKU menerima sisa organik segar untuk diolah di komposter biopori komunal.'
  },
  {
    q: 'Apakah platform ECOCYCLE ini gratis digunakan?',
    a: 'Ya, 100% gratis dan terbuka bagi seluruh warga, mahasiswa, dan komunitas rukun tetangga (RT/RW) untuk mencatat dan memonitor neraca sirkular sampah mereka.'
  }
];
