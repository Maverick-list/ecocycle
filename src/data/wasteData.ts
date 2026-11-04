import { WasteCategoryConfig } from '../types';

export const WASTE_CATEGORIES: WasteCategoryConfig[] = [
  {
    id: 'pet',
    name: 'Plastik PET',
    icon: 'water_bottle',
    pricePerKg: 3500,
    pointsPerKg: 35,
    co2Factor: 1.5,
    stream: 'Anorganik',
    recyclability: 'Tinggi',
    prepSteps: [
      'Habiskan isi cairan sepenuhnya',
      'Bilas bagian dalam dengan sedikit air bersih',
      'Lepaskan label plastik dan tutup botol',
      'Remas/pipihkan botol untuk efisiensi volume hingga 70%'
    ],
    description: 'Botol air mineral bening, botol jus, dan wadah minuman ringan PET (Polyethylene Terephthalate).'
  },
  {
    id: 'kardus',
    name: 'Kardus & Kertas',
    icon: 'description',
    pricePerKg: 3000,
    pointsPerKg: 30,
    co2Factor: 1.1,
    stream: 'Anorganik',
    recyclability: 'Tinggi',
    prepSteps: [
      'Pastikan kardus dan kertas dalam keadaan kering dan bersih',
      'Lepaskan selotip, staples, atau lakban plastik',
      'Lipat rata kardus menjadi lembaran pipih',
      'Ikat rapi dengan tali rafia atau simpan di tempat kering'
    ],
    description: 'Kardus kemasan paket, boks karton tebal, kertas HVS dokumen, majalah, dan koran bekas.'
  },
  {
    id: 'kaleng',
    name: 'Kaleng Logam',
    icon: 'smart_toy',
    pricePerKg: 3000,
    pointsPerKg: 30,
    co2Factor: 3.2,
    stream: 'Anorganik',
    recyclability: 'Tinggi',
    prepSteps: [
      'Bilas sisa minuman manis atau makanan kaleng',
      'Keringkan sebelum disimpan agar tidak memicu karat atau serangga',
      'Injak atau pipihkan kaleng aluminium jika memungkinkan'
    ],
    description: 'Kaleng minuman bersoda, kaleng susu kental, wadah biskuit kaleng, dan tutup botol logam.'
  },
  {
    id: 'kaca',
    name: 'Botol Kaca',
    icon: 'liquor',
    pricePerKg: 2000,
    pointsPerKg: 20,
    co2Factor: 0.4,
    stream: 'Anorganik',
    recyclability: 'Sedang',
    prepSteps: [
      'Cuci bersih bagian dalam dari sisa saus, kecap, atau sirup',
      'Lepaskan tutup logam atau cincin plastik leher botol',
      'Simpan dalam kardus bersekat agar tidak pecah saat pengiriman'
    ],
    description: 'Botol sirup kaca, botol kecap, toples selai kaca, dan wadah beling utuh tidak retak.'
  },
  {
    id: 'minyak',
    name: 'Minyak Jelantah',
    icon: 'oil_barrel',
    pricePerKg: 8000,
    pointsPerKg: 80,
    co2Factor: 2.1,
    stream: 'Anorganik',
    recyclability: 'Tinggi',
    prepSteps: [
      'Dinginkan minyak setelah proses penggorengan',
      'Saring sisa remah makanan menggunakan kain atau saringan halus',
      'Tuangkan ke dalam jeriken atau botol plastik bekas bertutup rapat'
    ],
    description: 'Minyak goreng bekas rumah tangga dan usaha kuliner yang telah disaring, bahan baku biodiesel ramah lingkungan.'
  },
  {
    id: 'ewaste',
    name: 'Limbah Elektronik',
    icon: 'memory',
    pricePerKg: 10000,
    pointsPerKg: 100,
    co2Factor: 4.8,
    stream: 'E-Waste',
    recyclability: 'Khusus',
    prepSteps: [
      'Pisahkan baterai dari perangkat jika memungkinkan',
      'Gulung rapi kabel pengisi daya yang rusak',
      'Jangan membongkar paksa komponen PCB atau layar LCD yang retak'
    ],
    description: 'Kabel data bekas, adaptor charger rusak, ponsel mati, motherboard, dan komponen elektronik kecil.'
  },
  {
    id: 'organik',
    name: 'Sampah Organik',
    icon: 'eco',
    pricePerKg: 1500,
    pointsPerKg: 15,
    co2Factor: 0.8,
    stream: 'Organik',
    recyclability: 'Tinggi',
    prepSteps: [
      'Tiriskan kuah atau cairan makanan sebelum dimasukkan ke wadah',
      'Potong kecil sisa sayur dan kulit buah untuk mempercepat dekomposisi',
      'Hindari mencampur plastik pembungkus makanan ke dalam wadah organik'
    ],
    description: 'Sisa sayuran mentah, kulit buah, ampas kopi, daun kering, dan sisa makanan dapur untuk komposter.'
  }
];

export const SORTING_ITEMS = [
  {
    id: 'item-1',
    name: 'Botol Air Mineral (PET #1)',
    category: 'Plastik PET',
    stream: 'Anorganik',
    tag: 'Daur Ulang Tinggi',
    difficulty: 'Mudah',
    steps: ['Kosongkan cairan', 'Bilas', 'Lepas label & tutup', 'Pipihkan'],
    dos: 'Remas botol hingga pipih untuk menghemat ruang tampung.',
    donts: 'Jangan mencampur puntung rokok atau sampah lain ke dalam botol.'
  },
  {
    id: 'item-2',
    name: 'Kardus Boks Paket (Corrugated)',
    category: 'Kardus & Kertas',
    stream: 'Anorganik',
    tag: 'Nilai Ekonomis',
    difficulty: 'Mudah',
    steps: ['Lepas lakban plastik', 'Buka lipatan', 'Tumpuk rata', 'Ikat tali'],
    dos: 'Jaga tetap kering dari cipratan air hujan.',
    donts: 'Jangan menyertakan kardus yang basah kuyup atau berjamur parah.'
  },
  {
    id: 'item-3',
    name: 'Kaleng Minuman Bersoda (Aluminium)',
    category: 'Kaleng Logam',
    stream: 'Anorganik',
    tag: 'Daur Ulang 100%',
    difficulty: 'Mudah',
    steps: ['Bilas sisa gula', 'Keringkan', 'Injak hingga ceper'],
    dos: 'Aluminium dapat didaur ulang tanpa penurunan kualitas berulang kali.',
    donts: 'Jangan menyatukan kaleng aerosol bertekanan tanpa melubanginya aman.'
  },
  {
    id: 'item-4',
    name: 'Botol Sirup & Selai (Kaca)',
    category: 'Botol Kaca',
    stream: 'Anorganik',
    tag: 'Daur Ulang Kaca',
    difficulty: 'Sedang',
    steps: ['Bilas bersih', 'Lepas tutup seng/plastik', 'Simpan wadah tegak'],
    dos: 'Kelompokkan berdasarkan warna kaca jika memungkinkan (bening/hijau/cokelat).',
    donts: 'Jangan memecahkan botol sengaja karena membahayakan petugas pilah.'
  },
  {
    id: 'item-5',
    name: 'Minyak Goreng Bekas (Jelantah)',
    category: 'Minyak Jelantah',
    stream: 'Anorganik',
    tag: 'Bahan Biodiesel',
    difficulty: 'Sedang',
    steps: ['Dinginkan', 'Saring endapan', 'Tampung di jeriken tertutup'],
    dos: 'Setorkan secara berkala minimal 2–5 liter untuk diproses biodiesel.',
    donts: 'JANGAN PERNAH menuang minyak jelantah ke wastafel atau selokan.'
  },
  {
    id: 'item-6',
    name: 'Kabel Charger & Earphone Rusak',
    category: 'Limbah Elektronik',
    stream: 'E-Waste',
    tag: 'Limbah B3/E-Waste',
    difficulty: 'Khusus',
    steps: ['Gulung rapi', 'Pisahkan dari sampah umum', 'Setor ke drop-point e-waste'],
    dos: 'Serahkan ke fasilitas berizin karena mengandung tembaga dan polimer khusus.',
    donts: 'Jangan membakar kabel untuk mengambil tembaga karena asapnya beracun.'
  },
  {
    id: 'item-7',
    name: 'Sisa Sayur & Kulit Buah Dapur',
    category: 'Sampah Organik',
    stream: 'Organik',
    tag: 'Bahan Kompos',
    difficulty: 'Mudah',
    steps: ['Tiriskan air', 'Cacah kasar', 'Masukkan tong biopori/komposter'],
    dos: 'Campurkan dengan daun kering atau serbuk gergaji untuk rasio karbon-nitrogen seimbang.',
    donts: 'Jangan campur tulang daging besar atau minyak goreng ke komposter biasa.'
  },
  {
    id: 'item-8',
    name: 'Baterai Kering Bekas (AA/AAA)',
    category: 'Limbah Elektronik',
    stream: 'B3',
    tag: 'B3 Berbahaya',
    difficulty: 'Khusus',
    steps: ['Tutup kedua kutub dengan isolasi', 'Simpan di wadah plastik kering', 'Drop ke kotak B3'],
    dos: 'Baterai bekas mengandung logam berat merkuri, kadmium, dan timbal.',
    donts: 'Jangan buang baterai ke tong sampah biasa atau membakarnya.'
  }
];
