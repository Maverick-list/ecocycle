import { ChallengesService as LocalChallengesService } from './challengesService';
import { CommunityChallenge } from '../types';
import { trackEvent } from '../lib/analytics';

export const challengeService = {
  getChallenges(): CommunityChallenge[] {
    return LocalChallengesService.getChallenges();
  },

  joinChallenge(challengeId: string): CommunityChallenge[] {
    const updated = LocalChallengesService.joinChallenge(challengeId);
    trackEvent('challenge_joined', { challengeId });
    return updated;
  },

  toggleTask(challengeId: string, taskId: string) {
    const res = LocalChallengesService.toggleTask(challengeId, taskId);
    if (res.newlyCompleted) {
      trackEvent('challenge_completed', {
        challengeId,
        badgeName: res.badgeName,
        rewardPoints: res.rewardPoints
      });
    }
    return res;
  },

  getLeaderboard(currentUserPoints: number, currentUserWeight: number) {
    return LocalChallengesService.getLeaderboard(currentUserPoints, currentUserWeight);
  }
};
