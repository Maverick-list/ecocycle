import { logEvent } from 'firebase/analytics';
import { analytics } from './firebase';

export type AnalyticsEvent =
  | 'page_view'
  | 'sign_up'
  | 'login'
  | 'logout'
  | 'google_sign_in'
  | 'facebook_sign_in'
  | 'phone_otp_requested'
  | 'phone_otp_verified'
  | 'withdraw_balance'
  | 'waste_category_view'
  | 'deposit_started'
  | 'deposit_submitted'
  | 'challenge_joined'
  | 'challenge_completed'
  | 'educational_article_view'
  | 'tutorial_video_play';

/**
 * Dispatch privacy-preserving event to Google Analytics 4
 */
export function trackEvent(eventName: AnalyticsEvent, params: Record<string, any> = {}): void {
  // Never transmit sensitive PII like passwords, full emails, or financial tokens
  const sanitizedParams: Record<string, any> = {};
  for (const [key, value] of Object.entries(params)) {
    if (['password', 'email', 'token', 'secret', 'phone'].includes(key.toLowerCase())) {
      continue;
    }
    sanitizedParams[key] = value;
  }

  if (analytics) {
    try {
      logEvent(analytics, eventName as any, sanitizedParams);
    } catch (err) {
      // Non-blocking telemetry warning
      console.debug('[GA4] Event dispatch silently skipped:', err);
    }
  }

  // Also support window.gtag if directly injected via Google Search Console / Tag Manager
  if (typeof window !== 'undefined' && (window as any).gtag) {
    try {
      (window as any).gtag('event', eventName, sanitizedParams);
    } catch {
      // Ignore
    }
  }
}
