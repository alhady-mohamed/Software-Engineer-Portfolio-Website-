-- ====================================================================
-- SUPABASE POSTGRESQL SCHEMA FOR PORTFOLIO ADMIN DASHBOARD & CMS
-- Run this in your Supabase project SQL Editor (SQL Editor -> New Query -> Run)
-- ====================================================================

-- 1. Enable UUID generator extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Web App',
  summary TEXT,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  gallery_urls TEXT[] DEFAULT '{}',
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  live_url TEXT DEFAULT '#',
  github_url TEXT DEFAULT '',
  featured BOOLEAN DEFAULT false,
  metrics JSONB DEFAULT '{}'::jsonb,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TIMELINES TABLE (Education & Work Experience)
CREATE TABLE IF NOT EXISTS public.timelines (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  type TEXT CHECK (type IN ('education', 'experience')) NOT NULL,
  title TEXT NOT NULL,
  institution TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT NOT NULL,
  skills TEXT[] DEFAULT '{}',
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS public.testimonials (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  client_name TEXT NOT NULL,
  client_role TEXT NOT NULL,
  company TEXT,
  avatar_url TEXT,
  rating INT DEFAULT 5,
  content TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. CONTACT MESSAGES / INQUIRIES INBOX
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  replied BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow public read access to projects, timelines, and approved testimonials
CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public Read Timelines" ON public.timelines FOR SELECT USING (true);
CREATE POLICY "Public Read Approved Testimonials" ON public.testimonials FOR SELECT USING (is_approved = true OR auth.role() = 'authenticated');

-- Allow visitors to insert new contact messages
CREATE POLICY "Public Insert Messages" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- Allow authenticated users (or service role) full access
CREATE POLICY "Auth Full Access Projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'anon');
CREATE POLICY "Auth Full Access Timelines" ON public.timelines FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'anon');
CREATE POLICY "Auth Full Access Testimonials" ON public.testimonials FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'anon');
CREATE POLICY "Auth Full Access Messages" ON public.contact_messages FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'anon');
