-- Copy and paste this into your Supabase SQL Editor to create the necessary table

CREATE TABLE public.onboarding_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    user_id UUID REFERENCES auth.users(id),
    email TEXT,
    name TEXT,
    phone TEXT,
    "fullName" TEXT,
    "roleTitle" TEXT,
    "companyName" TEXT,
    industry TEXT,
    "targetAudience" TEXT,
    "linkedinGoal" TEXT,
    "writingStyle" TEXT,
    "sentenceStyle" TEXT,
    humor TEXT,
    "wordsAlwaysUse" TEXT,
    "wordsNeverUse" TEXT,
    topics JSONB,
    "othersTopic" TEXT,
    "voiceTranscript" TEXT,
    "industryMisconceptions" TEXT,
    "hardestLesson" TEXT,
    "disagreedBeliefs" TEXT,
    "toneCalibration" TEXT
);

-- Turn on Row Level Security (RLS)
ALTER TABLE public.onboarding_profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to insert their own records
CREATE POLICY "Users can insert their own onboarding profile" 
ON public.onboarding_profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Allow users to read their own records
CREATE POLICY "Users can read their own onboarding profile" 
ON public.onboarding_profiles FOR SELECT 
USING (auth.uid() = user_id);
