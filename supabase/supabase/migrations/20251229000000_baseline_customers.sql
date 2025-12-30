-- Create customers table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.customers (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  linkedin_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);



-- Enable RLS
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- Recreate policies (drop first to avoid conflicts)
DROP POLICY IF EXISTS "Allow public read access" ON public.customers;
DROP POLICY IF EXISTS "Allow public insert access" ON public.customers;

CREATE POLICY "Allow public read access" ON public.customers FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON public.customers FOR INSERT WITH CHECK (true);

-- Cleanup old columns
ALTER TABLE public.customers DROP COLUMN IF EXISTS facebook_url;
