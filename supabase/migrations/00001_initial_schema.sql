-- SarıSite Database Schema
-- Supabase SQL Migration

-- 0. ENUMS
CREATE TYPE account_type AS ENUM ('bireysel', 'kurumsal');
CREATE TYPE listing_status AS ENUM ('active', 'passive', 'pending', 'sold');
CREATE TYPE currency AS ENUM ('TL', 'EUR', 'USD');

-- 1. PROFILES (auth.users ile trigger ile senkron)
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  account_type account_type NOT NULL DEFAULT 'bireysel',
  full_name TEXT NOT NULL,
  phone TEXT,
  phone_visible BOOLEAN DEFAULT false,
  email_visible BOOLEAN DEFAULT false,
  avatar_url TEXT,
  tc_kimlik TEXT,
  vergi_no TEXT,
  address TEXT,
  city TEXT,
  district TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

-- 2. STORES (Kurumsal üyeler için mağaza)
CREATE TABLE stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  store_name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  working_hours TEXT,
  license_number TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. CATEGORIES (Kategori ağacı)
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  parent_id UUID REFERENCES categories(id),
  metadata_schema JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. LISTINGS (İlanlar)
CREATE TABLE listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(12, 2) NOT NULL,
  currency currency NOT NULL DEFAULT 'TL',
  city TEXT NOT NULL,
  district TEXT NOT NULL,
  neighborhood TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  status listing_status NOT NULL DEFAULT 'active',
  views INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. LISTING IMAGES (İlan fotoğrafları)
CREATE TABLE listing_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. FAVORITES (Favori ilanlar)
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, listing_id)
);

-- 7. DOPING TYPES (Doping türleri)
CREATE TABLE doping_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  duration_days INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. LISTING DOPINGS (İlan doping ilişkisi)
CREATE TABLE listing_dopings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  doping_type_id UUID NOT NULL REFERENCES doping_types(id),
  start_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  end_date TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- INDEXES
CREATE INDEX idx_listings_category ON listings(category_id);
CREATE INDEX idx_listings_status ON listings(status);
CREATE INDEX idx_listings_city ON listings(city);
CREATE INDEX idx_listings_district ON listings(district);
CREATE INDEX idx_listings_created ON listings(created_at DESC);
CREATE INDEX idx_listings_price ON listings(price);
CREATE INDEX idx_listing_images_listing ON listing_images(listing_id);
CREATE INDEX idx_favorites_user ON favorites(user_id);
CREATE INDEX idx_listing_dopings_end ON listing_dopings(end_date);

-- FULL TEXT SEARCH (başlık ve açıklama araması için)
ALTER TABLE listings ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (to_tsvector('turkish', coalesce(title, '') || ' ' || coalesce(description, ''))) STORED;

CREATE INDEX idx_listings_search ON listings USING GIN(search_vector);

-- ROW LEVEL SECURITY
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_dopings ENABLE ROW LEVEL SECURITY;

-- POLICIES
-- Profiller: herkes görebilir, sadece kullanıcı kendi profilini düzenleyebilir
CREATE POLICY "Profiller herkese açık" ON profiles FOR SELECT USING (true);
CREATE POLICY "Kullanıcı kendi profilini düzenleyebilir" ON profiles FOR ALL USING (auth.uid() = user_id);

-- İlanlar: aktif ilanlar herkese açık, kullanıcı kendi ilanlarını yönetir
CREATE POLICY "Aktif ilanlar herkese açık" ON listings FOR SELECT USING (status = 'active' OR auth.uid() = user_id);
CREATE POLICY "Kullanıcı kendi ilanını yönetir" ON listings FOR ALL USING (auth.uid() = user_id);

-- Fotoğraflar: ilana bağlı fotoğraflar
CREATE POLICY "Fotoğraflar herkese açık" ON listing_images FOR SELECT USING (true);
CREATE POLICY "Kullanıcı kendi ilan fotoğraflarını yönetir" ON listing_images FOR ALL USING (
  EXISTS (SELECT 1 FROM listings WHERE listings.id = listing_images.listing_id AND listings.user_id = auth.uid())
);

-- Favoriler: sadece kullanıcı kendi favorilerini görebilir
CREATE POLICY "Kullanıcı kendi favorilerini yönetir" ON favorites FOR ALL USING (auth.uid() = user_id);

-- Mağazalar: herkese açık
CREATE POLICY "Mağazalar herkese açık" ON stores FOR SELECT USING (true);
CREATE POLICY "Mağaza sahibi düzenleyebilir" ON stores FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = stores.profile_id AND profiles.user_id = auth.uid())
);

-- TRIGGER: profile created on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, account_type)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE((NEW.raw_user_meta_data->>'account_type')::account_type, 'bireysel')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
