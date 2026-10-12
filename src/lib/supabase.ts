import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Local storage keys for customizable Supabase configuration
const STORAGE_KEY_URL = 'portfolio_supabase_url';
const STORAGE_KEY_ANON = 'portfolio_supabase_anon_key';

const DEFAULT_SUPABASE_URL = 'https://scecfrqsvrihariunevm.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_hXGaaZR9_HGX_exWLfaN7Q_391rhOZI';

/**
 * Retrieves the configured Supabase URL from environment or localStorage.
 */
export const getSupabaseUrl = (): string => {
  const envUrl = (import.meta as any).env?.VITE_SUPABASE_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim().length > 0) {
    return envUrl.trim();
  }
  const local = localStorage.getItem(STORAGE_KEY_URL);
  if (local && local.trim().length > 0) {
    return local.trim();
  }
  return DEFAULT_SUPABASE_URL;
};

/**
 * Retrieves the configured Supabase Anon Key from environment or localStorage.
 */
export const getSupabaseAnonKey = (): string => {
  const envKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY;
  if (envKey && typeof envKey === 'string' && envKey.trim().length > 0) {
    return envKey.trim();
  }
  const local = localStorage.getItem(STORAGE_KEY_ANON);
  if (local && local.trim().length > 0) {
    return local.trim();
  }
  return DEFAULT_SUPABASE_ANON_KEY;
};

/**
 * Saves Supabase credentials to localStorage.
 */
export const saveSupabaseCredentials = (url: string, anonKey: string) => {
  if (url.trim()) {
    localStorage.setItem(STORAGE_KEY_URL, url.trim());
  } else {
    localStorage.removeItem(STORAGE_KEY_URL);
  }

  if (anonKey.trim()) {
    localStorage.setItem(STORAGE_KEY_ANON, anonKey.trim());
  } else {
    localStorage.removeItem(STORAGE_KEY_ANON);
  }
  
  // Reset cached instance
  cachedClient = null;
};

let cachedClient: SupabaseClient | null = null;

/**
 * Creates or retrieves the singleton Supabase client.
 * Returns null if URL or Anon Key is missing.
 */
export const getSupabaseClient = (): SupabaseClient | null => {
  const url = getSupabaseUrl();
  const anonKey = getSupabaseAnonKey();

  if (!url || !anonKey || !url.startsWith('http')) {
    return null;
  }

  if (cachedClient) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
    return cachedClient;
  } catch (err) {
    console.warn('Failed to initialize Supabase client:', err);
    return null;
  }
};

/**
 * Tests connection to the configured Supabase instance.
 */
export const testSupabaseConnection = async (): Promise<{ success: boolean; message: string }> => {
  const client = getSupabaseClient();
  if (!client) {
    return {
      success: false,
      message: 'Supabase URL ama Anon Key lama helin. Fadlan ku qor qaybta Settings-ka.',
    };
  }

  try {
    // Attempt a light query on projects or auth health
    const { error } = await client.from('projects').select('id').limit(1);
    if (error && error.code !== 'PGRST116') {
      // If table doesn't exist yet, but client connected
      if (error.message.includes('relation "public.projects" does not exist')) {
        return {
          success: true,
          message: 'Xiriirka Supabase wuu guuleystay! Fadlan shub SQL Schema-ka si jadwalku u samaysmo.',
        };
      }
      return {
        success: false,
        message: `Xiriirku ma guuleysan: ${error.message}`,
      };
    }
    return {
      success: true,
      message: 'Xiriirka Supabase waa diyaar oo si toos ah ayuu u shaqaynayaa!',
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Cilad xiriir: ${err.message || 'Xiriirinta waa lagu guuldareystay'}`,
    };
  }
};
