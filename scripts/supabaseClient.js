import { APP_CONFIG } from '../config.js';

function getSupabaseGlobal() {
  return window.supabase;
}

export function hasSupabaseConfig() {
  const url = APP_CONFIG?.supabaseUrl?.trim() || '';
  const key = APP_CONFIG?.supabasePublishableKey?.trim() || '';
  return Boolean(
    url &&
    key &&
    !url.includes('YOUR_PROJECT_REF') &&
    !key.startsWith('YOUR_')
  );
}

export const supabaseClient =
  hasSupabaseConfig() && getSupabaseGlobal()?.createClient
    ? getSupabaseGlobal().createClient(
        APP_CONFIG.supabaseUrl,
        APP_CONFIG.supabasePublishableKey
      )
    : null;

export function getFunctionHeaders() {
  if (!hasSupabaseConfig()) {
    return {};
  }

  return {
    apikey: APP_CONFIG.supabasePublishableKey,
    Authorization: `Bearer ${APP_CONFIG.supabasePublishableKey}`
  };
}
