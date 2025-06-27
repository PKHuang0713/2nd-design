
-- Create a storage bucket for clothing item images
INSERT INTO storage.buckets (id, name, public)
VALUES ('clothing-images', 'clothing-images', true);

-- Create policies for the clothing-images bucket
-- Allow authenticated users to upload images
CREATE POLICY "Users can upload clothing images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'clothing-images' AND auth.role() = 'authenticated');

-- Allow authenticated users to view images
CREATE POLICY "Users can view clothing images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'clothing-images');

-- Allow authenticated users to update their own images
CREATE POLICY "Users can update their own clothing images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'clothing-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow authenticated users to delete their own images
CREATE POLICY "Users can delete their own clothing images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'clothing-images' AND auth.uid()::text = (storage.foldername(name))[1]);
