import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { Platform } from 'react-native';

/**
 * Design tokens — spacing, radii, typography, colors.
 * Both light and dark palettes are defined here.
 * Components consume tokens via the `useTheme()` hook.
 */

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
} as const;

export const fontSize = {
  caption: 12,
  body: 15,
  bodyLg: 17,
  heading: 22,
  title: 28,
  display: 34,
} as const;

export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export type ThemeMode = 'light' | 'dark' | 'system';

/** Color ramps — primary, secondary, accent, success, warning, error + neutrals */
export const lightColors = {
  // surfaces
  background: '#F7F8FA',
  surface: '#FFFFFF',
  surfaceSecondary: '#F1F3F6',
  surfaceElevated: '#FFFFFF',

  // text
  textPrimary: '#111827',
  textSecondary: '#5B6472',
  textTertiary: '#8B95A3',

  // borders & overlays
  border: '#E5E8EC',
  borderStrong: '#D1D6DB',
  overlay: 'rgba(0,0,0,0.45)',

  // brand — restrained teal accent
  primary: '#0D7E6E',
  primarySoft: '#E6F4F1',
  primaryPress: '#0A6557',

  secondary: '#3B4252',
  secondarySoft: '#EDEFF2',

  accent: '#C98A2E',
  accentSoft: '#FBF1E2',

  // semantic
  success: '#1B7F4B',
  successSoft: '#E4F4EB',
  warning: '#B86A00',
  warningSoft: '#FBF0DE',
  error: '#C0341D',
  errorSoft: '#FBE7E3',
  info: '#2D6CDF',
  infoSoft: '#E8F0FD',

  // evidence rating tints (not color-only — badges also use labels)
  evidenceStrong: '#1B7F4B',
  evidenceModerate: '#2D6CDF',
  evidenceLimited: '#B86A00',
  evidenceUnsupported: '#8B95A3',
  evidenceRisky: '#C0341D',

  // tab bar
  tabActive: '#0D7E6E',
  tabInactive: '#9AA3AF',
  tabBar: '#FFFFFF',
  tabBarBorder: '#E5E8EC',
};

export const darkColors = {
  background: '#0E1116',
  surface: '#181C22',
  surfaceSecondary: '#1F242C',
  surfaceElevated: '#222834',

  textPrimary: '#F2F4F7',
  textSecondary: '#A6AEBA',
  textTertiary: '#6E7785',

  border: '#2A2F38',
  borderStrong: '#3A414D',
  overlay: 'rgba(0,0,0,0.6)',

  primary: '#2BB89E',
  primarySoft: '#13352F',
  primaryPress: '#239F88',

  secondary: '#9AA3AF',
  secondarySoft: '#232830',

  accent: '#D9A24A',
  accentSoft: '#2A2118',

  success: '#3DBB7A',
  successSoft: '#13352C',
  warning: '#D9923A',
  warningSoft: '#2E2418',
  error: '#E55A3F',
  errorSoft: '#341A16',
  info: '#5B92E8',
  infoSoft: '#16233A',

  evidenceStrong: '#3DBB7A',
  evidenceModerate: '#5B92E8',
  evidenceLimited: '#D9923A',
  evidenceUnsupported: '#6E7785',
  evidenceRisky: '#E55A3F',

  tabActive: '#2BB89E',
  tabInactive: '#5B6472',
  tabBar: '#161A20',
  tabBarBorder: '#2A2F38',
};

export type AppColors = typeof lightColors;

export interface AppTheme {
  dark: boolean;
  colors: AppColors;
  spacing: typeof spacing;
  radius: typeof radius;
  fontSize: typeof fontSize;
  fontWeight: typeof fontWeight;
}

const buildTheme = (dark: boolean): AppTheme => ({
  dark,
  colors: (dark ? darkColors : lightColors) as AppColors,
  spacing,
  radius,
  fontSize,
  fontWeight,
});

export const lightTheme = buildTheme(false);
export const darkTheme = buildTheme(true);

export const navLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: lightColors.background,
    card: lightColors.surface,
    text: lightColors.textPrimary,
    border: lightColors.border,
    primary: lightColors.primary,
  },
};

export const navDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: darkColors.background,
    card: darkColors.tabBar,
    text: darkColors.textPrimary,
    border: darkColors.tabBarBorder,
    primary: darkColors.primary,
  },
};

export const platformShadow = (colors: AppColors) =>
  Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
    },
    android: { elevation: 2 },
    default: {},
  }) as object;

export const platformShadowLg = (colors: AppColors) =>
  Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.08,
      shadowRadius: 16,
    },
    android: { elevation: 4 },
    default: {},
  }) as object;
