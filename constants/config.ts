/**
 * Central app configuration.
 * Branding, feature flags, and other app-wide constants live here
 * so they can be changed in one place.
 */

export const APP_CONFIG = {
  name: 'Aesthetic AI',
  tagline: 'Research your appearance smarter.',
  version: '1.0.0',

  // Feature flags
  useMockData: true,
  authEnabled: true,
  faceScanEnabled: true,

  // Rate limit placeholders (enforced server-side later)
  freeDailyResearchLimit: 10,

  // External
  communityDomain: 'looksmax.org',
} as const;

export type AppConfig = typeof APP_CONFIG;
