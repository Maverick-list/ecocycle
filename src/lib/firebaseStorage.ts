import {
  ref,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage';
import { storage, isFirebaseConfigured } from './firebase';

export interface UploadProgressCallback {
  (progressPercent: number): void;
}

export const firebaseStorage = {
  isConfigured: isFirebaseConfigured,

  /**
   * Upload user profile avatar (Max 5MB, images only)
   */
  async uploadProfileAvatar(
    userId: string,
    file: File,
    onProgress?: UploadProgressCallback
  ): Promise<string> {
    if (!storage) throw new Error('Firebase Storage belum dikonfigurasi.');

    // 1. Validation
    if (!file.type.startsWith('image/')) {
      throw new Error('Berkas harus berupa gambar (JPG, PNG, WebP).');
    }
    const maxBytes = 5 * 1024 * 1024;
    if (file.size > maxBytes) {
      throw new Error('Ukuran foto profil maksimal 5MB.');
    }

    const fileExt = file.name.split('.').pop() || 'jpg';
    const filePath = `users/${userId}/avatar_${Date.now()}.${fileExt}`;
    const storageRef = ref(storage, filePath);

    const uploadTask = uploadBytesResumable(storageRef, file, {
      contentType: file.type,
      customMetadata: { userId, uploadedAt: new Date().toISOString() }
    });

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) onProgress(Math.round(progress));
        },
        (error) => reject(error),
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadUrl);
        }
      );
    });
  },

  /**
   * Upload waste deposit proof photo (Max 10MB, images only)
   */
  async uploadDepositProof(
    userId: string,
    file: File,
    onProgress?: UploadProgressCallback
  ): Promise<string> {
    if (!storage) throw new Error('Firebase Storage belum dikonfigurasi.');

    if (!file.type.startsWith('image/')) {
      throw new Error('Bukti foto setoran harus berformat gambar.');
    }
    const maxBytes = 10 * 1024 * 1024;
    if (file.size > maxBytes) {
      throw new Error('Ukuran berkas bukti maksimal 10MB.');
    }

    const fileExt = file.name.split('.').pop() || 'jpg';
    const filePath = `wasteDeposits/${userId}/deposit_${Date.now()}.${fileExt}`;
    const storageRef = ref(storage, filePath);

    const uploadTask = uploadBytesResumable(storageRef, file, {
      contentType: file.type,
      customMetadata: { userId, type: 'DEPOSIT_PROOF' }
    });

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) onProgress(Math.round(progress));
        },
        (error) => reject(error),
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadUrl);
        }
      );
    });
  }
};
