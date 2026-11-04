export type WasteStreamType = 
  | 'Plastik PET' 
  | 'Kardus & Kertas' 
  | 'Kaleng Logam' 
  | 'Botol Kaca' 
  | 'Minyak Jelantah' 
  | 'Limbah Elektronik'
  | 'Sampah Organik';

export interface WasteCategoryConfig {
  id: string;
  name: WasteStreamType;
  icon: string;
  pricePerKg: number;
  pointsPerKg: number;
  co2Factor: number; // kg CO2 avoided per kg
  waterFactor: number; // Liters of water saved per kg
  stream: 'Organik' | 'Anorganik' | 'B3' | 'E-Waste';
  recyclability: 'Tinggi' | 'Sedang' | 'Khusus';
  prepSteps: string[];
  description: string;
}

export interface WasteTransaction {
  id: string;
  date: string;
  timestamp: number;
  wasteType: WasteStreamType;
  weightKg: number;
  points: number;
  valueIdr: number;
  dropPoint: string;
  status: 'Terverifikasi' | 'Menunggu Audit' | 'Selesai';
  co2OffsetKg: number;
  waterSavedLiters: number;
  photoUrl?: string; // Base64 data URL for photo evidence
  notes?: string;
  userRef?: string;
}

export interface Article {
  id: string;
  title: string;
  category: 'Daur Ulang' | 'Zero Waste' | 'Kompos' | 'Krisis Iklim' | 'Regulasi';
  readTime: string;
  author: string;
  date: string;
  excerpt: string;
  content: string[];
  image: string;
  featured?: boolean;
  relatedIds: string[];
}

export interface MythFactItem {
  id: string;
  myth: string;
  fact: string;
  explanation: string;
  category: string;
}

export interface ChallengeTask {
  id: string;
  text: string;
  done: boolean;
}

export interface CommunityChallenge {
  id: string;
  title: string;
  difficulty: 'Mudah' | 'Sedang' | 'Komprehensif';
  duration: string;
  pointsReward: number;
  description: string;
  tasks: ChallengeTask[];
  joined: boolean;
  completed: boolean;
  rewardClaimed: boolean;
  badgeName: string;
  badgeIcon: string;
  completedAt?: string;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  role: string;
  avatar: string;
  points: number;
  weightKg: number;
  rank: number;
  badgesCount: number;
  isCurrentUser?: boolean;
}

export interface DropPointStation {
  id: string;
  name: string;
  address: string;
  subdistrict: string;
  city: string;
  hours: string;
  status: 'Buka Sekarang' | 'Tutup';
  acceptedTypes: string[];
  contact: string;
}


export interface UserPreferences {
  monthlyGoalKg: number;
  notificationsEnabled: boolean;
  emailDigestWeekly: boolean;
  publicLeaderboard: boolean;
  preferredDropPoint: string;
}

export interface UserActivityItem {
  id: string;
  type: 'deposit' | 'challenge' | 'badge' | 'pledge' | 'reward';
  title: string;
  description: string;
  timestamp: string;
  pointsDelta?: number;
  weightDeltaKg?: number;
  icon: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  affiliation: string;
  avatar: string;
  bio: string;
  location: string;
  joinedDate: string;
  ecoLevel: string;
  currentStreakDays: number;
  preferences: UserPreferences;
}
