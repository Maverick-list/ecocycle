import { CommunityChallenge, LeaderboardUser } from '../types';
import { COMMUNITY_CHALLENGES, DEMO_LEADERBOARD_USERS } from '../data/challengesData';
import { StorageService } from './storageService';

const CHALLENGES_KEY = 'ecocycle_challenges_state_v2';

export const ChallengesService = {
  getChallenges(): CommunityChallenge[] {
    return StorageService.get<CommunityChallenge[]>(CHALLENGES_KEY, COMMUNITY_CHALLENGES);
  },

  saveChallenges(challenges: CommunityChallenge[]): void {
    StorageService.set(CHALLENGES_KEY, challenges);
  },

  joinChallenge(id: string): CommunityChallenge[] {
    const list = this.getChallenges();
    const updated = list.map(c => {
      if (c.id === id) {
        return { ...c, joined: true };
      }
      return c;
    });
    this.saveChallenges(updated);
    return updated;
  },

  toggleTask(challengeId: string, taskId: string): {
    updatedChallenges: CommunityChallenge[];
    newlyCompleted: boolean;
    rewardPoints: number;
    badgeName: string;
  } {
    const list = this.getChallenges();
    let newlyCompleted = false;
    let rewardPoints = 0;
    let badgeName = '';

    const updated = list.map(c => {
      if (c.id !== challengeId) return c;

      const tasks = c.tasks.map(t => (t.id === taskId ? { ...t, done: !t.done } : t));
      const allDone = tasks.every(t => t.done);

      // Check if newly completed and not already claimed
      if (allDone && !c.completed && !c.rewardClaimed) {
        newlyCompleted = true;
        rewardPoints = c.pointsReward;
        badgeName = c.badgeName;
      }

      return {
        ...c,
        tasks,
        completed: allDone,
        rewardClaimed: allDone ? true : c.rewardClaimed,
        completedAt: allDone && !c.completedAt ? new Date().toISOString() : c.completedAt
      };
    });

    this.saveChallenges(updated);

    return {
      updatedChallenges: updated,
      newlyCompleted,
      rewardPoints,
      badgeName
    };
  },

  getLeaderboard(currentUserPoints: number, currentUserWeight: number): LeaderboardUser[] {
    const currentUser: LeaderboardUser = {
      id: 'usr-current',
      name: 'Anda (Akun Saya)',
      role: 'Pengguna Aktif Komunitas',
      avatar: '/assets/images/avatar_user.jpg',
      points: currentUserPoints,
      weightKg: currentUserWeight,
      rank: 1,
      badgesCount: 1,
      isCurrentUser: true
    };

    const combined = [...DEMO_LEADERBOARD_USERS, currentUser];
    combined.sort((a, b) => b.points - a.points);

    return combined.map((user, idx) => ({
      ...user,
      rank: idx + 1
    }));
  }
};
