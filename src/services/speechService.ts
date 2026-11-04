// ECOCYCLE Speech Service — Google Indonesian Voice AI Text-To-Speech (TTS)

export type SpeechStateListener = (isSpeaking: boolean) => void;

export class SpeechService {
  private static synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private static currentUtterance: SpeechSynthesisUtterance | null = null;
  private static isMuted: boolean = false;
  private static listeners: Set<SpeechStateListener> = new Set();
  private static isSpeakingState: boolean = false;

  public static addListener(listener: SpeechStateListener): () => void {
    this.listeners.add(listener);
    listener(this.isSpeakingState);
    return () => this.listeners.delete(listener);
  }

  private static notifyListeners(speaking: boolean) {
    this.isSpeakingState = speaking;
    this.listeners.forEach((l) => l(speaking));
  }

  public static getCurrentUtterance(): SpeechSynthesisUtterance | null {
    return this.currentUtterance;
  }

  public static toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stop();
    }
    return this.isMuted;
  }

  public static getIsMuted(): boolean {
    return this.isMuted;
  }

  public static getIsSpeaking(): boolean {
    return this.isSpeakingState;
  }

  public static stop(): void {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {
        // Ignore
      }
    }
    this.notifyListeners(false);
  }

  // Find Google Indonesian voice or standard id-ID voice
  private static getBestIndonesianVoice(): SpeechSynthesisVoice | null {
    if (!this.synth) return null;
    const voices = this.synth.getVoices();
    if (!voices || voices.length === 0) return null;

    // 1. Google Indonesian Voice (highest quality in Chrome)
    const googleIndo = voices.find(
      (v) =>
        v.lang.toLowerCase().startsWith('id') &&
        v.name.toLowerCase().includes('google')
    );
    if (googleIndo) return googleIndo;

    // 2. Any Indonesian voice
    const anyIndo = voices.find((v) => v.lang.toLowerCase().startsWith('id'));
    if (anyIndo) return anyIndo;

    // 3. Natural voice fallback
    const naturalVoice = voices.find((v) => v.name.toLowerCase().includes('natural'));
    if (naturalVoice) return naturalVoice;

    // 4. Default voice
    return voices[0] || null;
  }

  // Clean markdown syntax for natural spoken text
  private static cleanTextForSpeech(text: string): string {
    return text
      .replace(/[*_~`#]/g, '') // remove markdown symbols
      .replace(/•/g, ', ') // replace bullet points with natural comma pauses
      .replace(/https?:\/\/\S+/g, '') // remove urls
      .replace(/\(Rp\s*[\d.]+\)/g, '') // shorten inline currency parentheticals
      .replace(/CO₂e/g, 'C O 2 e')
      .replace(/PET/g, 'P E T')
      .replace(/SNI/g, 'S N I')
      .replace(/RLS/g, 'R L S')
      .replace(/\s+/g, ' ')
      .trim();
  }

  public static speak(text: string, onEndCallback?: () => void): void {
    if (!this.synth || this.isMuted) {
      if (onEndCallback) onEndCallback();
      return;
    }

    // Cancel any previous speech
    this.stop();

    const cleanText = this.cleanTextForSpeech(text);
    if (!cleanText) {
      if (onEndCallback) onEndCallback();
      return;
    }

    try {
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'id-ID';
      utterance.rate = 1.05; // natural pacing
      utterance.pitch = 1.0;

      const voice = this.getBestIndonesianVoice();
      if (voice) {
        utterance.voice = voice;
      }

      utterance.onstart = () => {
        this.notifyListeners(true);
      };

      utterance.onend = () => {
        this.notifyListeners(false);
        if (onEndCallback) onEndCallback();
      };

      utterance.onerror = (e) => {
        console.warn('SpeechSynthesis error:', e);
        this.notifyListeners(false);
        if (onEndCallback) onEndCallback();
      };

      this.currentUtterance = utterance;
      this.synth.speak(utterance);
    } catch (err) {
      console.warn('Failed to speak text:', err);
      this.notifyListeners(false);
      if (onEndCallback) onEndCallback();
    }
  }
}
