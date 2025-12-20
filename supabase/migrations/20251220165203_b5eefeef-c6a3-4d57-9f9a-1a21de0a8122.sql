-- Fix security vulnerability: Deny anonymous access to profiles table
-- This ensures only authenticated users can access profile data
CREATE POLICY "Deny anonymous access to profiles" 
ON public.profiles 
FOR SELECT 
TO anon
USING (false);

-- Fix security vulnerability: Strengthen chat_messages protection
-- Ensure authenticated users can only access their own messages
CREATE POLICY "Deny anonymous access to chat_messages" 
ON public.chat_messages 
FOR SELECT 
TO anon
USING (false);

-- Add policy to prevent conversation_id enumeration attacks
CREATE POLICY "Prevent unauthorized message access"
ON public.chat_messages
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);