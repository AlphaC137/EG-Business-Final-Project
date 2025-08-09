import type { User } from '@supabase/supabase-js';
import { supabase } from '../supabase';

export async function ensureProfileExists(user: User): Promise<void> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .maybeSingle();

    if (error) throw error;
    if (data) return; // already exists

  const meta = user.user_metadata as Record<string, unknown> | null | undefined;
  const fullName = (typeof meta?.full_name === 'string' && meta.full_name) || user.email || null;
  const avatarUrl = (typeof meta?.avatar_url === 'string' && meta.avatar_url) || null;

    const { error: insertErr } = await supabase.from('profiles').insert({
      id: user.id,
      full_name: fullName,
      avatar_url: avatarUrl,
      role: 'user',
    });
    if (insertErr) throw insertErr;
  } catch (e) {
    // Non-fatal; log for debugging
    console.error('ensureProfileExists error', e);
  }
}
