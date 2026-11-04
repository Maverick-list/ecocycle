import { supabase, isSupabaseConfigured } from './supabaseClient';
import { WasteTransaction } from '../types';

export interface SupabaseProfileRow {
  id: string;
  email: string;
  full_name: string;
  role: string;
  avatar_url: string | null;
  phone: string | null;
  address: string | null;
  city: string;
  points: number;
  streak_days: number;
  monthly_carbon_goal: number;
  verified: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface SupabaseDepositRow {
  id: string;
  user_id: string;
  category: string;
  material_name: string;
  stream: string;
  weight_kg: number;
  rate_per_kg: number;
  estimated_value: number;
  points_earned: number;
  co2_reduced_kg: number;
  water_saved_liters: number;
  drop_point_name: string;
  proof_photo_url: string | null;
  status: 'Diajukan' | 'Diterima' | 'Terverifikasi' | 'Ditolak';
  manifest_code: string;
  chain_of_custody_hash: string;
  created_at: string;
}

export const SupabaseDataService = {
  /**
   * Fetch authenticated user's private profile
   */
  async fetchProfile(userId: string): Promise<{ profile: SupabaseProfileRow | null; error: Error | null }> {
    if (!isSupabaseConfigured) {
      return { profile: null, error: new Error('Supabase is not configured.') };
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        return { profile: null, error };
      }

      return { profile: data as SupabaseProfileRow, error: null };
    } catch (err: any) {
      return { profile: null, error: err };
    }
  },

  /**
   * Update authenticated user's profile
   */
  async updateProfile(userId: string, updates: Partial<SupabaseProfileRow>): Promise<{ error: Error | null }> {
    if (!isSupabaseConfigured) {
      return { error: new Error('Supabase is not configured.') };
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      return { error: error || null };
    } catch (err: any) {
      return { error: err };
    }
  },

  /**
   * Fetch deposits belonging strictly to the authenticated user
   */
  async fetchUserDeposits(userId: string): Promise<{ deposits: WasteTransaction[]; error: Error | null }> {
    if (!isSupabaseConfigured) {
      return { deposits: [], error: new Error('Supabase is not configured.') };
    }

    try {
      const { data, error } = await supabase
        .from('waste_deposits')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        return { deposits: [], error };
      }

      const mapped: WasteTransaction[] = (data || []).map((row: SupabaseDepositRow) => ({
        id: row.manifest_code || row.id,
        date: new Date(row.created_at).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }),
        timestamp: new Date(row.created_at).getTime(),
        wasteType: row.material_name as any,
        weightKg: Number(row.weight_kg),
        points: row.points_earned,
        valueIdr: Number(row.estimated_value),
        dropPoint: row.drop_point_name,
        status: row.status as any,
        co2OffsetKg: Number(row.co2_reduced_kg),
        waterSavedLiters: Number(row.water_saved_liters),
        photoUrl: row.proof_photo_url || undefined,
        notes: `Manifest: ${row.manifest_code}`
      }));

      return { deposits: mapped, error: null };
    } catch (err: any) {
      return { deposits: [], error: err };
    }
  },

  /**
   * Insert a new waste deposit record under the authenticated user
   */
  async insertDeposit(userId: string, trx: WasteTransaction): Promise<{ error: Error | null }> {
    if (!isSupabaseConfigured) {
      return { error: new Error('Supabase is not configured.') };
    }

    try {
      const manifestCode = `MAN-${Math.floor(100000 + Math.random() * 900000)}`;
      const hash = `0x${Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;

      const { error } = await supabase.from('waste_deposits').insert({
        user_id: userId,
        category: 'Anorganik Terpilah',
        material_name: trx.wasteType,
        stream: 'Anorganik',
        weight_kg: trx.weightKg,
        rate_per_kg: trx.weightKg > 0 ? Math.round(trx.valueIdr / trx.weightKg) : 0,
        estimated_value: trx.valueIdr,
        points_earned: trx.points,
        co2_reduced_kg: trx.co2OffsetKg,
        water_saved_liters: trx.waterSavedLiters,
        drop_point_name: trx.dropPoint,
        proof_photo_url: trx.photoUrl || null,
        status: trx.status || 'Terverifikasi',
        manifest_code: manifestCode,
        chain_of_custody_hash: hash,
      });

      return { error: error || null };
    } catch (err: any) {
      return { error: err };
    }
  }
};
