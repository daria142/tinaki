import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

export async function POST() {
  await supabaseServer().auth.signOut();
  return new NextResponse(null, { status: 303, headers: { Location: '/login' } });
}
