import { Article, MythFactItem } from '../types';

export const ACADEMY_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Anatomi Sebotol Plastik: Berapa Lama Sebenarnya Terurai di Alam?',
    category: 'Daur Ulang',
    readTime: '4 menit baca',
    author: 'Tim Sains Sirkular ECOCYCLE',
    date: '28 Okt 2025',
    excerpt: 'Membedah perjalanan molekuler plastik PET dari minyak bumi, botol minum di meja Anda, hingga ancaman mikroplastik di rantai makanan laut.',
    image: '/assets/images/facility_aerial.jpg',
    featured: true,
    relatedIds: ['art-2', 'art-3'],
    content: [
      'Plastik Polyethylene Terephthalate (PET) merupakan polimer sintetis rantai panjang yang direkayasa agar sangat tahan terhadap oksidasi dan pelapukan biologis. Sifat inilah yang menjadikannya wadah minuman ideal, namun menjadi bencana ketika berakhir di tempat pembuangan akhir (TPA).',
      'Dalam kondisi TPA tanpa sinar matahari, satu botol plastik membutuhkan waktu antara 450 hingga 1.000 tahun untuk terdegradasi. Yang lebih mengkhawatirkan, plastik tidak pernah benar-benar lenyap; ia hanya terfragmentasi menjadi partikel mikroplastik (< 5mm) yang kini telah terdeteksi dalam air minum kemasan, garam meja, hingga jaringan organ tubuh manusia.',
      'Melalui siklus daur ulang mekanis di Bank Sampah, botol PET bersih dicacah menjadi serpihan (flakes), dicuci panas, dan diekstrusi kembali menjadi serat poliester untuk tekstil pakaian atau botol rPET baru, menghemat hingga 79% emisi gas rumah kaca dibandingkan memproduksi plastik perawan.'
    ]
  },
  {
    id: 'art-2',
    title: 'Panduan Praktis Kompos Rumahan: Dari Sisa Dapur Jadi Emas Hitam',
    category: 'Kompos',
    readTime: '6 menit baca',
    author: 'Ir. Dewi Lestari',
    date: '22 Okt 2025',
    excerpt: 'Metode sederhana mengolah 60% timbunan sampah dapur menjadi pupuk organik kaya hara tanpa menimbulkan bau busuk atau mengundang belatung.',
    image: '/assets/images/workshop.jpg',
    relatedIds: ['art-1', 'art-4'],
    content: [
      'Lebih dari 60% sampah perkotaan di Indonesia adalah bahan organik basah. Ketika sampah ini tertimbun di TPA dan mengalami fermentasi anaerobik (tanpa oksigen), ia menghasilkan gas metana (CH₄) yang 28 kali lebih kuat memicu pemanasan global dibanding karbon dioksida.',
      'Kunci pengomposan aerobik yang sukses adalah rasio C:N (Karbon terhadap Nitrogen). Sampah basah seperti sisa sayur dan kulit buah adalah Unsur Hijau (Nitrogen), sedangkan daun kering, sekam, atau kardus cokelat sobek adalah Unsur Cokelat (Karbon).',
      'Gunakan perbandingan 2 bagian unsur cokelat untuk 1 bagian unsur hijau. Aduk wadah komposter seminggu sekali untuk sirkulasi oksigen. Dalam 4–6 minggu, sisa dapur Anda akan berubah menjadi kompos hitam beraroma tanah hutan yang siap menyuburkan tanaman rumah.'
    ]
  },
  {
    id: 'art-3',
    title: 'Bahaya Tersembunyi E-Waste: Mengapa Ponsel & Baterai Tak Boleh Masuk TPA',
    category: 'Regulasi',
    readTime: '5 menit baca',
    author: 'Divisi Audit B3 ECOCYCLE',
    date: '16 Okt 2025',
    excerpt: 'Kandungan timbal, kadmium, dan merkuri dalam sampah elektronik dapat merembes ke air tanah jika tidak dikelola lewat jalur formal.',
    image: '/assets/images/hero_sorting.jpg',
    relatedIds: ['art-1', 'art-4'],
    content: [
      'Pertumbuhan pesat perangkat pintar melahirkan krisis baru: timbunan sampah elektronik (e-waste) yang meningkat lebih dari 8% setiap tahun di Indonesia. Sayangnya, kurang dari 10% e-waste rumah tangga dikelola melalui jalur pengolahan berizin.',
      'Sebuah baterai litium-ion atau ponsel bekas mengandung logam berat beracun seperti Kadmium (merusak ginjal), Timbal (merusak sistem saraf pusat), dan Merkuri (racun bioakumulatif). Ketika terbakar di TPA terbuka, asapnya melepaskan dioksin karsinogenik ke udara sekitar permukiman.',
      'ECOCYCLE bermitra dengan fasilitas pengolah resmi bersertifikasi KLHK untuk mengekstraksi kembali logam berharga (emas, tembaga, perak) secara aman dan menetralkan sisa residu berbahaya.'
    ]
  },
  {
    id: 'art-4',
    title: '5 Langkah Menuju Dapur Zero-Waste Tanpa Ribet',
    category: 'Zero Waste',
    readTime: '3 menit baca',
    author: 'Nabila Ramadhani',
    date: '10 Okt 2025',
    excerpt: 'Tips realistis bagi keluarga muda dan anak kos untuk mengurangi plastik sekali pakai tanpa mengubah drastis gaya hidup sehari-hari.',
    image: '/assets/images/drop_point.jpg',
    relatedIds: ['art-2', 'art-3'],
    content: [
      '1. Siapkan Tas Belanja Kain di Kendaraan: Simpan selalu 2 kantong lipat di motor atau mobil agar tidak perlu menggunakan kantong kresek saat belanja mendadak.',
      '2. Beli Bahan Makanan Kering Curah: Manfaatkan toples kaca bekas selai untuk membeli beras, kacang-kacangan, atau bumbu dapur tanpa kemasan sachet plastik.',
      '3. Tolak Sedotan & Alat Makan Plastik saat Pesan Makanan Online: Cukup beri catatan "Tanpa Sendok Plastik" saat memesan makanan delivery.',
      '4. Gunakan Wadah Makanan Saat Beli Jajanan Basah: Membawa kotak makan sendiri saat membeli sate atau martabak menghemat ratusan lembar kertas minyak dan styrofoam setiap tahun.',
      '5. Alirkan Minyak Jelantah ke Bank Sampah: Jangan membuang minyak ke wastafel. Simpan di jeriken bekas dan tukarkan menjadi saldo rupiah di drop-point ECOCYCLE.'
    ]
  }
];

export const MYTH_FACT_ITEMS: MythFactItem[] = [
  {
    id: 'myth-1',
    myth: 'Semua plastik dengan simbol segitiga daur ulang pasti bisa didaur ulang di manapun.',
    fact: 'Hanya resin tipe #1 (PET), #2 (HDPE), dan #5 (PP) yang bernilai ekonomis tinggi di Indonesia.',
    explanation: 'Simbol panah segitiga adalah Resin Identification Code (RIC) yang menandakan jenis polimer, bukan jaminan bahwa fasilitas daur ulang lokal memiliki pasar untuk memprosesnya. Plastik tipe #3 (PVC), #6 (Styrofoam), dan #7 (Other) sangat jarang diterima bank sampah umum.',
    category: 'Plastik'
  },
  {
    id: 'myth-2',
    myth: 'Kantong plastik biodegradable langsung lenyap jika dibuang ke selokan atau tanah.',
    fact: 'Plastik oxo-biodegradable hanya hancur menjadi mikroplastik tak kasat mata jika tidak di komposter industri.',
    explanation: 'Sebagian besar kantong berlabel ramah lingkungan membutuhkan kondisi suhu tinggi (50–60°C) dan kelembapan stabil di fasilitas komposting komersial. Di lingkungan alam liar atau laut, kantong ini tetap membutuhkan waktu bertahun-tahun dan justru mencemari air.',
    category: 'Biodegradable'
  },
  {
    id: 'myth-3',
    myth: 'Membilas botol dan kaleng sebelum disetor hanya membuang-buang air bersih.',
    fact: 'Membilas dengan 100ml air bekas cucian piring menyelamatkan 100% material dari penolakan daur ulang.',
    explanation: 'Satu botol minuman bersisa gula atau minyak dapat mengkontaminasi ratusan kilogram kertas dan kardus di truk pengangkut. Kontaminasi organik memicu bau busuk dan jamur, menyebabkan seluruh muatan ditolak oleh pabrik daur ulang dan dibuang ke TPA.',
    category: 'Kebersihan'
  },
  {
    id: 'myth-4',
    myth: 'Memilah sampah di rumah tidak ada gunanya karena di truk sampah akan dicampur lagi.',
    fact: 'Dengan sistem Bank Sampah ECOCYCLE, sampah Anda dijemput secara terpilah langsung ke hub pemulihan berizin.',
    explanation: 'Stigma ini berasal dari truk konvensional pemerintah daerah. Jalur Bank Sampah Mandiri dan kemitraan ECOCYCLE menjamin rantai lacak material (chain of custody) terpisah, di mana tiap kilogram tercatat dan langsung menuju industri daur ulang resmi.',
    category: 'Logistik'
  }
];
