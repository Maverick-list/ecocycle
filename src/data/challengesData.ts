import { CommunityChallenge, LeaderboardUser } from '../types';

export const COMMUNITY_CHALLENGES: CommunityChallenge[] = [
  {
    id: 'ch-1',
    title: '7 Hari Bebas Kantong Plastik Sekali Pakai',
    difficulty: 'Mudah',
    duration: '7 Hari',
    pointsReward: 150,
    description: 'Tolak penggunaan kantong kresek di minimarket dan pasar selama 7 hari berturut-turut dengan selalu membawa tas kain lipat sendiri.',
    joined: true,
    completed: false,
    rewardClaimed: false,
    badgeName: 'Pahlawan Nol Kresek',
    badgeIcon: 'shopping_bag',
    tasks: [
      { id: 't1', text: 'Siapkan 2 tas belanja kain di motor atau tas kerja', done: true },
      { id: 't2', text: 'Hari 1-3: Tolak kresek saat belanja di minimarket / warung', done: false },
      { id: 't3', text: 'Hari 4-7: Gunakan tas kain untuk belanja pasar tradisional / sayur', done: false }
    ]
  },
  {
    id: 'ch-2',
    title: 'Pilah 5kg Sampah Kering untuk Bank Sampah',
    difficulty: 'Sedang',
    duration: '14 Hari',
    pointsReward: 300,
    description: 'Kumpulkan, bilas, dan pipihkan minimal 5 kilogram sampah anorganik (botol PET, kardus, atau kaleng) lalu setorkan ke drop-point terdekat.',
    joined: true,
    completed: false,
    rewardClaimed: false,
    badgeName: 'Kurator Sirkular',
    badgeIcon: 'recycling',
    tasks: [
      { id: 't4', text: 'Sediakan wadah terpisah khusus sampah kering di rumah/kos', done: true },
      { id: 't5', text: 'Bilas bersih minimal 20 botol plastik atau kaleng minuman', done: false },
      { id: 't6', text: 'Timbang dan capai akumulasi total 5 kg setoran di aplikasi', done: false }
    ]
  },
  {
    id: 'ch-3',
    title: 'Selamatkan 2 Liter Minyak Jelantah dari Saluran Air',
    difficulty: 'Sedang',
    duration: '21 Hari',
    pointsReward: 400,
    description: 'Jangan tuang minyak goreng bekas ke wastafel. Saring dan tampung dalam jeriken untuk dikonversi menjadi bahan bakar biodiesel bersih.',
    joined: false,
    completed: false,
    rewardClaimed: false,
    badgeName: 'Penjaga Air Bersih',
    badgeIcon: 'water_drop',
    tasks: [
      { id: 't7', text: 'Siapkan wadah jeriken/botol plastik bekas untuk minyak dingin', done: false },
      { id: 't8', text: 'Saring sisa penggorengan menggunakan saringan halus dapur', done: false },
      { id: 't9', text: 'Kumpulkan minimal 2 liter dan setorkan ke drop-point resmi', done: false }
    ]
  },
  {
    id: 'ch-4',
    title: 'Mulai Wadah Kompos Organik Mandiri',
    difficulty: 'Komprehensif',
    duration: '30 Hari',
    pointsReward: 600,
    description: 'Olah sisa sayur dan kulit buah menjadi kompos menggunakan ember biopori atau takakura mini selama 1 bulan penuh.',
    joined: false,
    completed: false,
    rewardClaimed: false,
    badgeName: 'Alkemis Tanah Hitam',
    badgeIcon: 'potted_plant',
    tasks: [
      { id: 't10', text: 'Siapkan ember berlubang atau komposter sederhana', done: false },
      { id: 't11', text: 'Isi lapisan dasar dengan daun kering atau sekam kayu', done: false },
      { id: 't12', text: 'Masukkan cacahan sisa dapur dan aduk teratur setiap minggu', done: false },
      { id: 't13', text: 'Panen hasil kompos matang beraroma tanah subur setelah 30 hari', done: false }
    ]
  }
];

export const DEMO_LEADERBOARD_USERS: LeaderboardUser[] = [
  {
    id: 'usr-1',
    name: 'Nabila Ramadhani',
    role: 'Mahasiswi FKOM UNIKU • Duta Sirkular',
    avatar: '/assets/images/avatar_female.jpg',
    points: 1840,
    weightKg: 48.5,
    rank: 1,
    badgesCount: 4
  },
  {
    id: 'usr-2',
    name: 'Farhan Kurniawan',
    role: 'Mahasiswa TI • Pegiat Kos Zero-Waste',
    avatar: '/assets/images/avatar_male.jpg',
    points: 1420,
    weightKg: 36.2,
    rank: 2,
    badgesCount: 3
  },
  {
    id: 'usr-3',
    name: 'Ibu Ratna & Keluarga',
    role: 'Warga RW 04 Menteng • RT Percontohan',
    avatar: '/assets/images/avatar_female.jpg',
    points: 1250,
    weightKg: 32.0,
    rank: 3,
    badgesCount: 3
  },
  {
    id: 'usr-4',
    name: 'Pak Joko Subroto',
    role: 'Ketua Bank Sampah Mandiri Kuningan',
    avatar: '/assets/images/avatar_male.jpg',
    points: 980,
    weightKg: 24.8,
    rank: 4,
    badgesCount: 2
  }
];
