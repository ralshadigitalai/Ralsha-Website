export const STORAGE_KEY = 'ralsha_attribution_v1';
export const MAX_PARAM_LENGTH = 200;

export const APPROVED_RALSHA_UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'platform',
  'gclid',
  'fbclid',
  'fbp',
  'fbc',
  'matchtype',
  'network',
  'device',
  'keyword',
  'placement',
  'campaignid',
  'adgroupid',
] as const;

export type RalshaUtmKey = (typeof APPROVED_RALSHA_UTM_KEYS)[number];
export type RalshaAttribution = Partial<Record<RalshaUtmKey, string>>;

const APPROVED_KEYS_SET = new Set<string>(APPROVED_RALSHA_UTM_KEYS);

/**
 * Sanitize value by trimming whitespace and capping at MAX_PARAM_LENGTH (200 chars).
 */
export function sanitizeValue(val: string): string {
  return val.trim().slice(0, MAX_PARAM_LENGTH);
}

/**
 * Safely read stored session attribution from sessionStorage.
 * If JSON is malformed or corrupted, safely removes the entry and returns empty object.
 */
export function readStoredAttribution(): RalshaAttribution {
  if (typeof window === 'undefined') return {};

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};

    const parsed = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      window.sessionStorage.removeItem(STORAGE_KEY);
      return {};
    }

    const clean: RalshaAttribution = {};
    for (const key of Object.keys(parsed)) {
      if (APPROVED_KEYS_SET.has(key)) {
        const val = parsed[key];
        if (typeof val === 'string' && val.trim().length > 0) {
          clean[key as RalshaUtmKey] = sanitizeValue(val);
        }
      }
    }

    return clean;
  } catch {
    // Malformed JSON or storage read error: safely remove corrupted entry
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Storage unavailable
    }
    return {};
  }
}

/**
 * Safely persist attribution object into sessionStorage.
 * Empty attribution objects will not overwrite existing valid stored attribution.
 */
export function saveAttribution(data: RalshaAttribution): void {
  if (typeof window === 'undefined') return;

  const validEntries = Object.entries(data).filter(
    ([key, val]) => APPROVED_KEYS_SET.has(key) && typeof val === 'string' && val.trim().length > 0
  );

  if (validEntries.length === 0) return;

  const clean: RalshaAttribution = {};
  for (const [key, val] of validEntries) {
    clean[key as RalshaUtmKey] = sanitizeValue(val as string);
  }

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
  } catch {
    // SessionStorage disabled or quota exceeded: fail silently
  }
}

/**
 * Capture live URL query parameters on landing page load and persist them to sessionStorage.
 * Unknown parameters and empty strings are ignored.
 */
export function captureLandingAttribution(): RalshaAttribution {
  if (typeof window === 'undefined') return {};

  try {
    const searchParams = new URLSearchParams(window.location.search);
    const live: RalshaAttribution = {};

    for (const key of APPROVED_RALSHA_UTM_KEYS) {
      const val = searchParams.get(key);
      if (val && val.trim().length > 0) {
        live[key] = sanitizeValue(val);
      }
    }

    const existingStored = readStoredAttribution();

    if (Object.keys(live).length > 0) {
      const merged = { ...existingStored, ...live };
      saveAttribution(merged);
      return merged;
    }

    return existingStored;
  } catch {
    return readStoredAttribution();
  }
}

/**
 * Retrieve attribution for lead submission.
 * Prefers live URL parameters over stored session attribution.
 */
export function getAttribution(): RalshaAttribution {
  if (typeof window === 'undefined') return {};

  try {
    const searchParams = new URLSearchParams(window.location.search);
    const live: RalshaAttribution = {};

    for (const key of APPROVED_RALSHA_UTM_KEYS) {
      const val = searchParams.get(key);
      if (val && val.trim().length > 0) {
        live[key] = sanitizeValue(val);
      }
    }

    const stored = readStoredAttribution();

    // Live URL parameters take precedence over stored session attribution
    return { ...stored, ...live };
  } catch {
    return readStoredAttribution();
  }
}

/**
 * Clear stored attribution after verified API submission success.
 */
export function clearAttribution(): void {
  if (typeof window === 'undefined') return;

  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Fail safely
  }
}
