import { UserProfile, UserActivityItem } from '../types';
import { StorageService } from './storageService';
import { WasteBankService } from './wasteBankService';
import { ChallengesService } from './challengesService';

const USER_PROFILE_KEY = 'ecocycle_user_profile_v3';

export const DEFAULT_USER_PROFILE: UserProfile = {
  id: 'usr-eco-8821',
  name: 'Pratama Kusuma',
  email: 'pratama.kusuma@ecocycle.id',
  phone: '+62 812-3456-7890',
  role: 'Duta Sirkular Mandiri',
  affiliation: 'Inisiatif Pengelolaan Sumber Daya Lestari',
  avatar: '/assets/images/avatar_user.jpg',
  bio: 'Pegiat keberlanjutan dan penggerak ekonomi sirkular perkotaan. Berkomitmen mengurangi residu material ke tempat pembuangan akhir melalui pemilahan presisi.',
  location: 'Kuningan, Jawa Barat',
  joinedDate: '15 September 2025',
  ecoLevel: 'Pejuang Sirkular Tingkat 3',
  currentStreakDays: 14,
  preferences: {
    monthlyGoalKg: 15.0,
    notificationsEnabled: true,
    emailDigestWeekly: true,
    publicLeaderboard: true,
    preferredDropPoint: 'Hub Sirkular Sentral Kuningan Kota'
  }
};

export const UserService = {
  getProfile(): UserProfile {
    return StorageService.get<UserProfile>(USER_PROFILE_KEY, DEFAULT_USER_PROFILE);
  },

  updateProfile(updates: Partial<UserProfile>): UserProfile {
    const current = this.getProfile();
    const updated = {
      ...current,
      ...updates,
      preferences: {
        ...current.preferences,
        ...(updates.preferences || {})
      }
    };
    StorageService.set(USER_PROFILE_KEY, updated);
    return updated;
  },

  resetProfile(): UserProfile {
    StorageService.set(USER_PROFILE_KEY, DEFAULT_USER_PROFILE);
    return DEFAULT_USER_PROFILE;
  },

  getActivityTimeline(): UserActivityItem[] {
    const transactions = WasteBankService.getTransactions();
    const challenges = ChallengesService.getChallenges();

    const activities: UserActivityItem[] = [];

    // Derive from transactions
    transactions.slice(0, 8).forEach(t => {
      activities.push({
        id: `act-trx-${t.id}`,
        type: 'deposit',
        title: `Setoran Material: ${t.wasteType}`,
        description: `Menyerahkan ${t.weightKg.toFixed(1)} kg di ${t.dropPoint} (Nilai: Rp ${t.valueIdr.toLocaleString('id-ID')})`,
        timestamp: t.date,
        pointsDelta: t.points,
        weightDeltaKg: t.weightKg,
        icon: 'recycle'
      });
    });

    // Derive from challenges
    challenges.filter(c => c.completed).forEach(c => {
      activities.push({
        id: `act-ch-${c.id}`,
        type: 'badge',
        title: `Lencana Terbuka: ${c.badgeName}`,
        description: `Menuntaskan seluruh tugas dalam tantangan "${c.title}"`,
        timestamp: c.completedAt ? new Date(c.completedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Terbaru',
        pointsDelta: c.pointsReward,
        icon: 'award'
      });
    });

    // Add static initial milestones if activities are few
    if (activities.length < 3) {
      activities.push({
        id: 'act-init-1',
        type: 'pledge',
        title: 'Penandatanganan Ikrar Sirkular',
        description: 'Berkomitmen memilah sampah dari rumah tangga dan kampus',
        timestamp: '15 Sep 2025',
        pointsDelta: 50,
        icon: 'sparkles'
      });
    }

    return activities;
  }
};
