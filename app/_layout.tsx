import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { ThemeProvider, useAppTheme } from '@/hooks/useAppTheme';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { ResearchProvider } from '@/hooks/useResearch';
import { getOnboardingComplete } from '@/lib/storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function RootNavigator() {
  const { theme, isDark } = useAppTheme();
  const { user, loading } = useAuth();
  const [onboardingComplete, setOnboardingDone] = useState<boolean | null>(null);

  useEffect(() => {
    getOnboardingComplete().then(setOnboardingDone);
  }, []);

  if (onboardingComplete === null || loading) {
    return null;
  }

  const showOnboarding = !onboardingComplete;
  const showAuth = onboardingComplete && !user;

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        {showOnboarding ? (
          <Stack.Screen name="onboarding" />
        ) : showAuth ? (
          <Stack.Screen name="(auth)" />
        ) : (
          <>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="research/result" />
            <Stack.Screen name="scan/result" />
          </>
        )}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </>
  );
}

export default function RootLayout() {
  useFrameworkReady();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AuthProvider>
            <ResearchProvider>
              <RootNavigator />
            </ResearchProvider>
          </AuthProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
