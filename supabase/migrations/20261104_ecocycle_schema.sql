-- ==============================================================================
-- ECOCYCLE PLATFORM DATABASE SCHEMA & ROW LEVEL SECURITY (RLS) POLICIES
-- Target: Supabase / PostgreSQL 15+
-- Version: 2.0.0 Production Enterprise
-- ==============================================================================

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. User Profiles Table (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT DEFAULT 'Warga Sirkular',
  avatar_url TEXT,
  phone TEXT,
  address TEXT,
  city TEXT DEFAULT 'Kuningan',
  points INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 1,
  monthly_carbon_goal NUMERIC(10, 2) DEFAULT 15.00,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Waste Deposits Table (Private User Transactions)
CREATE TABLE IF NOT EXISTS public.waste_deposits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  material_name TEXT NOT NULL,
  stream TEXT NOT NULL DEFAULT 'Anorganik',
  weight_kg NUMERIC(10, 2) NOT NULL CHECK (weight_kg > 0),
  rate_per_kg NUMERIC(12, 2) NOT NULL,
  estimated_value NUMERIC(12, 2) NOT NULL,
  points_earned INTEGER NOT NULL DEFAULT 0,
  co2_reduced_kg NUMERIC(10, 2) NOT NULL DEFAULT 0,
  water_saved_liters NUMERIC(10, 2) NOT NULL DEFAULT 0,
  drop_point_name TEXT NOT NULL,
  proof_photo_url TEXT,
  status TEXT NOT NULL DEFAULT 'Diterima' CHECK (status IN ('Diajukan', 'Diterima', 'Terverifikasi', 'Ditolak')),
  manifest_code TEXT NOT NULL UNIQUE,
  chain_of_custody_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Community Challenges Table (Public Catalog)
CREATE TABLE IF NOT EXISTS public.eco_challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  duration TEXT NOT NULL,
  points_reward INTEGER NOT NULL,
  badge_name TEXT NOT NULL,
  badge_icon TEXT NOT NULL,
  description TEXT NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. User Challenges Table (User Progress on Challenges)
CREATE TABLE IF NOT EXISTS public.user_challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  challenge_id UUID NOT NULL REFERENCES public.eco_challenges(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  progress_percent INTEGER DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100),
  tasks_state JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, challenge_id)
);

-- 6. User Achievements / Badges Gallery
CREATE TABLE IF NOT EXISTS public.user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  badge_name TEXT NOT NULL,
  badge_icon TEXT NOT NULL,
  description TEXT NOT NULL,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, badge_name)
);

-- 7. User Activities Timeline
CREATE TABLE IF NOT EXISTS public.user_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  impact_metric TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. User Preferences
CREATE TABLE IF NOT EXISTS public.user_preferences (
  user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  email_notifications BOOLEAN DEFAULT TRUE,
  weekly_digest BOOLEAN DEFAULT TRUE,
  public_profile BOOLEAN DEFAULT TRUE,
  reduced_motion BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Strict Isolation: Users can only select, insert, update, or delete their own data
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waste_deposits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eco_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- 1. Profiles Policies (Strict Owner Isolation for sensitive data)
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Secure Public Leaderboard View (Exposes only non-sensitive gamification attributes)
CREATE OR REPLACE VIEW public.leaderboard_view AS
  SELECT 
    id, 
    full_name, 
    role, 
    points, 
    streak_days, 
    avatar_url, 
    city, 
    created_at
  FROM public.profiles
  WHERE points > 0;

GRANT SELECT ON public.leaderboard_view TO anon, authenticated;

-- 2. Waste Deposits Policies
CREATE POLICY "Users can view own deposits"
  ON public.waste_deposits FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own deposits"
  ON public.waste_deposits FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own deposits"
  ON public.waste_deposits FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own deposits"
  ON public.waste_deposits FOR DELETE
  USING (auth.uid() = user_id);

-- 3. Community Challenges Policies
CREATE POLICY "Public can read active challenges"
  ON public.eco_challenges FOR SELECT
  USING (active = TRUE);

-- 4. User Challenges Policies
CREATE POLICY "Users can view own challenge participations"
  ON public.user_challenges FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own challenge participations"
  ON public.user_challenges FOR ALL
  USING (auth.uid() = user_id);

-- 5. User Achievements Policies
CREATE POLICY "Users can view own achievements"
  ON public.user_achievements FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own achievements"
  ON public.user_achievements FOR ALL
  USING (auth.uid() = user_id);

-- 6. User Activities Policies
CREATE POLICY "Users can view own activity stream"
  ON public.user_activities FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activity"
  ON public.user_activities FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 7. User Preferences Policies
CREATE POLICY "Users can manage own preferences"
  ON public.user_preferences FOR ALL
  USING (auth.uid() = user_id);

-- ==============================================================================
-- AUTOMATIC PROFILE CREATION TRIGGER ON USER SIGNUP
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Pegiat Sirkular'),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );

  INSERT INTO public.user_preferences (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Bind trigger to auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- STORAGE BUCKET POLICIES FOR DEPOSIT EVIDENCE
-- ==============================================================================
-- Note: Create bucket 'deposit-proofs' in Supabase Storage dashboard
-- Policy for deposit-proofs bucket:
-- CREATE POLICY "Users can upload own deposit proof"
--   ON storage.objects FOR INSERT
--   WITH CHECK (bucket_id = 'deposit-proofs' AND auth.uid()::text = (storage.foldername(name))[1]);
-- CREATE POLICY "Users can view own deposit proof"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'deposit-proofs' AND auth.uid()::text = (storage.foldername(name))[1]);
