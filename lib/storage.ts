import AsyncStorage from '@react-native-async-storage/async-storage';
import type {
  ResearchResult,
  SearchHistoryItem,
  SavedAnswerItem,
  SavedThreadItem,
  UserProfile,
} from './types';
import type { ThemeMode } from './theme';

/**
 * Local persistence layer (AsyncStorage).
 * In Phase 3 these are replaced/augmented by Supabase queries.
 * Keys are namespaced to avoid collisions.
 */

const KEYS = {
  onboardingComplete: '@aesthetic/onboarding_complete',
  themeMode: '@aesthetic/theme_mode',
  mockAuth: '@aesthetic/mock_auth',
  history: '@aesthetic/history',
  savedAnswers: '@aesthetic/saved_answers',
  savedThreads: '@aesthetic/saved_threads',
} as const;

// ---- onboarding ----
export async function getOnboardingComplete(): Promise<boolean> {
  const v = await AsyncStorage.getItem(KEYS.onboardingComplete);
  return v === 'true';
}
export async function setOnboardingComplete(v: boolean): Promise<void> {
  await AsyncStorage.setItem(KEYS.onboardingComplete, v ? 'true' : 'false');
}

// ---- theme ----
export async function getThemeMode(): Promise<ThemeMode> {
  const v = await AsyncStorage.getItem(KEYS.themeMode);
  return (v as ThemeMode) || 'system';
}
export async function setThemeMode(mode: ThemeMode): Promise<void> {
  await AsyncStorage.setItem(KEYS.themeMode, mode);
}

// ---- mock auth ----
export async function getMockAuthUser(): Promise<UserProfile | null> {
  const v = await AsyncStorage.getItem(KEYS.mockAuth);
  return v ? (JSON.parse(v) as UserProfile) : null;
}
export async function setMockAuthUser(user: UserProfile | null): Promise<void> {
  if (user) {
    await AsyncStorage.setItem(KEYS.mockAuth, JSON.stringify(user));
  } else {
    await AsyncStorage.removeItem(KEYS.mockAuth);
  }
}

// ---- history ----
export async function getHistory(): Promise<SearchHistoryItem[]> {
  const v = await AsyncStorage.getItem(KEYS.history);
  return v ? (JSON.parse(v) as SearchHistoryItem[]) : [];
}
export async function addHistoryItem(item: SearchHistoryItem): Promise<void> {
  const list = await getHistory();
  // avoid duplicates by query
  const filtered = list.filter((h) => h.query !== item.query);
  await AsyncStorage.setItem(KEYS.history, JSON.stringify([item, ...filtered].slice(0, 100)));
}
export async function deleteHistoryItem(id: string): Promise<void> {
  const list = await getHistory();
  await AsyncStorage.setItem(KEYS.history, JSON.stringify(list.filter((h) => h.id !== id)));
}
export async function clearHistory(): Promise<void> {
  await AsyncStorage.removeItem(KEYS.history);
}

// ---- saved answers ----
export async function getSavedAnswers(): Promise<SavedAnswerItem[]> {
  const v = await AsyncStorage.getItem(KEYS.savedAnswers);
  return v ? (JSON.parse(v) as SavedAnswerItem[]) : [];
}
export async function saveAnswer(item: SavedAnswerItem): Promise<void> {
  const list = await getSavedAnswers();
  if (list.some((a) => a.answer_id === item.answer_id)) return;
  await AsyncStorage.setItem(KEYS.savedAnswers, JSON.stringify([item, ...list]));
}
export async function unsaveAnswer(answerId: string): Promise<void> {
  const list = await getSavedAnswers();
  await AsyncStorage.setItem(
    KEYS.savedAnswers,
    JSON.stringify(list.filter((a) => a.answer_id !== answerId)),
  );
}
export async function isAnswerSaved(answerId: string): Promise<boolean> {
  const list = await getSavedAnswers();
  return list.some((a) => a.answer_id === answerId);
}

// ---- saved threads ----
export async function getSavedThreads(): Promise<SavedThreadItem[]> {
  const v = await AsyncStorage.getItem(KEYS.savedThreads);
  return v ? (JSON.parse(v) as SavedThreadItem[]) : [];
}
export async function saveThread(item: SavedThreadItem): Promise<void> {
  const list = await getSavedThreads();
  if (list.some((t) => t.url === item.url)) return;
  await AsyncStorage.setItem(KEYS.savedThreads, JSON.stringify([item, ...list]));
}
export async function unsaveThread(url: string): Promise<void> {
  const list = await getSavedThreads();
  await AsyncStorage.setItem(
    KEYS.savedThreads,
    JSON.stringify(list.filter((t) => t.url !== url)),
  );
}
export async function isThreadSaved(url: string): Promise<boolean> {
  const list = await getSavedThreads();
  return list.some((t) => t.url === url);
}

// ---- convenience: store a full research result into history + return history item ----
export async function persistResearchToHistory(
  result: ResearchResult,
): Promise<SearchHistoryItem> {
  const item: SearchHistoryItem = {
    id: result.researchId,
    query: result.answer.question,
    normalized_topic: result.answer.topic,
    created_at: new Date().toISOString(),
    answer: result.answer,
  };
  await addHistoryItem(item);
  return item;
}
