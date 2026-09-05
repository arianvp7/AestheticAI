import { useState, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, Dimensions, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Sparkles, Users, ShieldCheck, ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useHaptics } from '@/hooks/useHaptics';
import { setOnboardingComplete } from '@/lib/storage';
import { APP_CONFIG } from '@/constants/config';

const SCREENS = [
  {
    icon: Sparkles,
    headline: 'Research your appearance smarter.',
    sub: 'Ask questions about skin, hair, facial aesthetics, grooming, fitness, style, and more.',
    accent: 'primary' as const,
    soft: 'primarySoft' as const,
  },
  {
    icon: Users,
    headline: 'Community insight. Evidence checked.',
    sub: 'Discover what people discuss online while clearly separating community opinion from evidence-based information.',
    accent: 'info' as const,
    soft: 'infoSoft' as const,
  },
  {
    icon: ShieldCheck,
    headline: 'Make informed decisions.',
    sub: 'Understand potential benefits, limitations, risks, and safer alternatives.',
    accent: 'success' as const,
    soft: 'successSoft' as const,
  },
];

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function OnboardingScreen() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const haptics = useHaptics();
  const [index, setIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const scrollToIndex = (i: number) => {
    scrollRef.current?.scrollTo({ x: i * SCREEN_WIDTH, animated: true });
    setIndex(i);
  };

  const handleNext = () => {
    haptics.impact('light');
    if (index < SCREENS.length - 1) {
      scrollToIndex(index + 1);
    } else {
      handleGetStarted();
    }
  };

  const handleGetStarted = async () => {
    haptics.notify('success');
    await setOnboardingComplete(true);
    router.replace('/(auth)/sign-up');
  };

  const handleSignIn = () => {
    haptics.impact('light');
    router.replace('/(auth)/sign-in');
  };

  const handleScroll = (e: { nativeEvent: { contentOffset: { x: number } } }) => {
    const i = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    if (i !== index) setIndex(i);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <View style={styles.container}>
          {/* Skip button */}
          <View style={styles.skipRow}>
            {index < SCREENS.length - 1 ? (
              <Pressable
                onPress={() => {
                  haptics.impact('light');
                  scrollToIndex(SCREENS.length - 1);
                }}
                hitSlop={12}
              >
                <Text
                  style={{
                    color: theme.colors.textTertiary,
                    fontSize: theme.fontSize.body,
                    fontWeight: theme.fontWeight.medium,
                  }}
                >
                  Skip
                </Text>
              </Pressable>
            ) : (
              <View />
            )}
          </View>

          {/* Carousel */}
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            style={{ flex: 1 }}
          >
            {SCREENS.map((screen, i) => {
              const Icon = screen.icon;
              return (
                <View key={i} style={[styles.page, { width: SCREEN_WIDTH }]}>
                  <View
                    style={[
                      styles.iconWrap,
                      { backgroundColor: theme.colors[screen.soft] },
                    ]}
                  >
                    <Icon size={40} color={theme.colors[screen.accent]} strokeWidth={1.5} />
                  </View>
                  <Text
                    style={{
                      color: theme.colors.textPrimary,
                      fontSize: theme.fontSize.title,
                      fontWeight: theme.fontWeight.bold,
                      textAlign: 'center',
                      lineHeight: 34,
                      marginTop: theme.spacing.xl,
                    }}
                  >
                    {screen.headline}
                  </Text>
                  <Text
                    style={{
                      color: theme.colors.textSecondary,
                      fontSize: theme.fontSize.bodyLg,
                      textAlign: 'center',
                      lineHeight: 24,
                      marginTop: theme.spacing.md,
                      paddingHorizontal: theme.spacing.lg,
                    }}
                  >
                    {screen.sub}
                  </Text>
                </View>
              );
            })}
          </ScrollView>

          {/* Dots */}
          <View style={styles.dotsRow}>
            {SCREENS.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  {
                    backgroundColor: i === index ? theme.colors.primary : theme.colors.border,
                    width: i === index ? 24 : 8,
                  },
                ]}
              />
            ))}
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <Pressable
              onPress={handleNext}
              style={({ pressed }) => [
                styles.primaryBtn,
                {
                  backgroundColor: theme.colors.primary,
                  opacity: pressed ? 0.85 : 1,
                },
              ]}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: theme.fontSize.bodyLg,
                  fontWeight: theme.fontWeight.semibold,
                }}
              >
                {index === SCREENS.length - 1 ? 'Get Started' : 'Continue'}
              </Text>
              <ArrowRight size={18} color="#fff" strokeWidth={2} />
            </Pressable>

            <Pressable
              onPress={handleSignIn}
              style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
            >
              <Text
                style={{
                  color: theme.colors.textSecondary,
                  fontSize: theme.fontSize.body,
                  marginTop: theme.spacing.md,
                }}
              >
                Already have an account?{' '}
                <Text style={{ color: theme.colors.primary, fontWeight: theme.fontWeight.semibold }}>
                  Sign In
                </Text>
              </Text>
            </Pressable>

            <Text
              style={{
                color: theme.colors.textTertiary,
                fontSize: theme.fontSize.caption,
                marginTop: theme.spacing.lg,
                textAlign: 'center',
                paddingHorizontal: theme.spacing.xl,
              }}
            >
              Educational information only. Not medical advice.
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  paddingHorizontal: 24,
  paddingBottom: 16,
  gap: 16,
  },
  skipRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 8,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  iconWrap: {
    width: 88,
    height: 88,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
    paddingVertical: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  actions: {
    alignItems: 'center',
    paddingBottom: 8,
    gap: 4,
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    width: '100%',
  },
});
