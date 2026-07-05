import { createClient } from '@supabase/supabase-js';
import type { PlacementReport, StudentProfile } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

function getSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.',
    );
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}

export type AnalyzeResult =
  | { ok: true; report: PlacementReport }
  | { ok: false; error: string };

export async function analyzePlacement(profile: StudentProfile): Promise<AnalyzeResult> {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      return {
        ok: false,
        error:
          'Backend is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file, then redeploy the analyze-placement edge function.',
      };
    }

    const supabase = getSupabaseClient();
    const { data, error } = await supabase.functions.invoke('analyze-placement', {
      body: { profile },
    });

    if (error) {
      return {
        ok: false,
        error:
          error.message ||
          'The AI analysis service returned an error. Please try again in a moment.',
      };
    }

    if (!data || !data.report) {
      return {
        ok: false,
        error: 'The AI service returned an unexpected response. Please try again.',
      };
    }

    return { ok: true, report: data.report as PlacementReport };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error during analysis.';
    return { ok: false, error: message };
  }
}
