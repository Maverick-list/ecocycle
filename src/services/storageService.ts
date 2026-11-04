/**
 * Safe local storage service with error resilience and serialization
 */
export const StorageService = {
  get<T>(key: string, fallback: T): T {
    try {
      const item = localStorage.getItem(key);
      if (!item) return fallback;
      return JSON.parse(item) as T;
    } catch (e) {
      console.warn(`[StorageService] Failed to parse key "${key}":`, e);
      return fallback;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`[StorageService] Failed to set key "${key}":`, e);
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn(`[StorageService] Failed to remove key "${key}":`, e);
    }
  }
};
