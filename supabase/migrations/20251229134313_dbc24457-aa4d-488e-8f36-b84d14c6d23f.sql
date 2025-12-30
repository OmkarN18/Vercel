-- Create customers table
CREATE TABLE IF NOT EXISTS public.customers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  linkedin_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
DROP POLICY IF EXISTS "Allow public read access" ON public.customers;
CREATE POLICY "Allow public read access" ON public.customers FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert access" ON public.customers;
CREATE POLICY "Allow public insert access" ON public.customers FOR INSERT WITH CHECK (true);