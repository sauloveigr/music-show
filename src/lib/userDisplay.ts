import type { User } from '@supabase/supabase-js';

const FALLBACK = 'Visitante';

export function getUserDisplayName(user: User | null): string {
  if (!user) return FALLBACK;
  const meta = user.user_metadata as Record<string, string | undefined> | undefined;
  const full = meta?.full_name?.trim() || meta?.name?.trim();
  if (full) return full.split(/\s+/)[0];
  return user.email?.split('@')[0] || FALLBACK;
}
