import { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  Sparkles,
  Search,
  Scissors,
  Eye,
  Triangle,
  Circle,
  Dumbbell,
  Shirt,
  Brush,
  Smile,
  Microscope,
  ScanLine,
  DollarSign,
  ChevronRight,
} from 'lucide-react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useHaptics } from '@/hooks/useHaptics';
import { useResearch } from '@/hooks/useResearch';
import { TopicChip } from '@/components/TopicChip';
import { PopularQuestionCard } from '@/components/PopularQuestionCard';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { MOCK_TOPICS, MOCK_POPULAR_QUESTIONS } from '@/lib/mockData';
import { APP_CONFIG } from '@/constants/config';
import type { LucideIcon } from 'lucide-react-native';

const ICON_MAP: Record<string, LucideIcon> = {
  Sparkles,
  Scissors,
  Eye,
  Triangle,
  Circle,
  Dumbbell,
  Shirt,
  Brush,
  Smile,
  Microscope,
};

export default function HomeScreen() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const haptics = useHaptics();
  const { submitResearch, isLoading, error, clearError } = useResearch();
  const [query, setQuery] = useState('');
  const inputRef = useRef<TextInput>(null);

  const handleSubmit = async () => {
    const trimmed = query.trim();
    if (!trimmed || isLoading) return;
    haptics.impact('medium');
    const result = await submitResearch(trimmed);
    if (result) {
      router.push('/research/result');
    }
  };

  const handlePopularQuestion = (q: string) => {
    setQuery(q);
    haptics.selection();
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          <LoadingState />
        </SafeAreaView>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          <ErrorState message={error} onRetry={clearError} />
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.container}>
              {/* Header */}
              <View style={styles.header}>
                <View style={[styles.logoWrap, { backgroundColor: theme.colors.primarySoft }]}>
                  <Sparkles size={20} color={theme.colors.primary} strokeWidth={2} />
                </View>
                <Text
                  style={{
                    color: theme.colors.textPrimary,
                    fontSize: 13,
                    fontWeight: theme.fontWeight.semibold,
                    letterSpacing: 0.5,
                    textTransform: 'uppercase',
                  }}
                >
                  {APP_CONFIG.name}
                </Text>
              </View>

              {/* Heading */}
              <Text
                style={{
                  color: theme.colors.textPrimary,
                  fontSize: theme.fontSize.display,
                  fontWeight: theme.fontWeight.bold,
                  lineHeight: 38,
                  marginTop: theme.spacing.lg,
                }}
              >
                What do you want to improve?
              </Text>
              <Text
                style={{
                  color: theme.colors.textSecondary,
                  fontSize: theme.fontSize.bodyLg,
                  lineHeight: 24,
                  marginTop: theme.spacing.sm,
                }}
              >
                Ask anything about appearance, grooming, skincare, aesthetics, or fitness.
              </Text>

              {/* Search */}
              <View
                style={[
                  styles.searchWrap,
                  { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
                ]}
              >
                <Search size={20} color={theme.colors.textTertiary} strokeWidth={2} />
                <TextInput
                  ref={inputRef}
                  style={{
                    flex: 1,
                    color: theme.colors.textPrimary,
                    fontSize: theme.fontSize.body,
                    marginLeft: 10,
                    paddingVertical: 14,
                    maxHeight: 100,
                  }}
                  placeholder="Ask anything about appearance..."
                  placeholderTextColor={theme.colors.textTertiary}
                  value={query}
                  onChangeText={setQuery}
                  multiline
                  autoCorrect
                  autoCapitalize="sentences"
                  returnKeyType="search"
                  onSubmitEditing={handleSubmit}
                />
              </View>

              {/* Research button */}
              <Pressable
                onPress={handleSubmit}
                disabled={!query.trim()}
                style={({ pressed }) => [
                  styles.researchBtn,
                  {
                    backgroundColor: query.trim() ? theme.colors.primary : theme.colors.borderStrong,
                    opacity: pressed ? 0.85 : 1,
                  },
                ]}
              >
                <Sparkles size={18} color="#fff" strokeWidth={2} />
                <Text
                  style={{
                    color: '#fff',
                    fontSize: theme.fontSize.bodyLg,
                    fontWeight: theme.fontWeight.semibold,
                    marginLeft: 8,
                  }}
                >
                  Research
                </Text>
              </Pressable>

              {/* Feature cards */}
              <View style={styles.featureCardsRow}>
                <Pressable
                  onPress={() => {
                    haptics.impact('light');
                    router.push('/(tabs)/scan');
                  }}
                  style={({ pressed }) => [
                    styles.featureCard,
                    {
                      backgroundColor: theme.colors.surface,
                      borderColor: theme.colors.border,
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}
                >
                  <View style={[styles.featureIcon, { backgroundColor: theme.colors.primarySoft }]}>
                    <ScanLine size={20} color={theme.colors.primary} strokeWidth={2} />
                  </View>
                  <Text
                    style={{
                      color: theme.colors.textPrimary,
                      fontSize: theme.fontSize.body,
                      fontWeight: theme.fontWeight.semibold,
                      marginTop: 10,
                    }}
                  >
                    Scan Your Face
                  </Text>
                  <Text
                    style={{
                      color: theme.colors.textSecondary,
                      fontSize: theme.fontSize.caption,
                      marginTop: 2,
                    }}
                  >
                    Understand your facial features
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => {
                    haptics.impact('light');
                    router.push('/(tabs)/money');
                  }}
                  style={({ pressed }) => [
                    styles.featureCard,
                    {
                      backgroundColor: theme.colors.surface,
                      borderColor: theme.colors.border,
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}
                >
                  <View style={[styles.featureIcon, { backgroundColor: theme.colors.accentSoft }]}>
                    <DollarSign size={20} color={theme.colors.accent} strokeWidth={2} />
                  </View>
                  <Text
                    style={{
                      color: theme.colors.textPrimary,
                      fontSize: theme.fontSize.body,
                      fontWeight: theme.fontWeight.semibold,
                      marginTop: 10,
                    }}
                  >
                    Money & Success
                  </Text>
                  <Text
                    style={{
                      color: theme.colors.textSecondary,
                      fontSize: theme.fontSize.caption,
                      marginTop: 2,
                    }}
                  >
                    Research ways to earn, invest and build skills
                  </Text>
                </Pressable>
              </View>

              {/* Topic chips */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.topicsScroll}
                contentContainerStyle={styles.topicsContent}
              >
                {MOCK_TOPICS.map((topic) => {
                  const Icon = ICON_MAP[topic.icon] || Sparkles;
                  return (
                    <TopicChip
                      key={topic.label}
                      label={topic.label}
                      icon={Icon}
                      onPress={() => handlePopularQuestion(`Tell me about ${topic.label.toLowerCase()}`)}
                    />
                  );
                })}
                <TopicChip
                  label="Money"
                  icon={DollarSign}
                  onPress={() => router.push('/(tabs)/money')}
                />
              </ScrollView>

              {/* Popular questions */}
              <Text
                style={{
                  color: theme.colors.textPrimary,
                  fontSize: theme.fontSize.bodyLg,
                  fontWeight: theme.fontWeight.bold,
                  marginTop: theme.spacing.xl,
                  marginBottom: theme.spacing.sm,
                }}
              >
                Popular questions
              </Text>
              <View style={styles.questionsList}>
                {MOCK_POPULAR_QUESTIONS.map((q, i) => (
                  <PopularQuestionCard
                    key={i}
                    question={q.question}
                    topic={q.topic}
                    onPress={() => {
                      setQuery(q.question);
                      handleSubmit();
                    }}
                  />
                ))}
              </View>

              {/* Disclaimer */}
              <Text
                style={{
                  color: theme.colors.textTertiary,
                  fontSize: theme.fontSize.caption,
                  marginTop: theme.spacing.xl,
                  textAlign: 'center',
                  paddingHorizontal: theme.spacing.lg,
                }}
              >
                Educational information only. Not medical advice.
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 24,
  },
  researchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 12,
  },
  featureCardsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  featureCard: {
    flex: 1,
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicsScroll: {
    marginTop: 24,
    marginHorizontal: -24,
  },
  topicsContent: {
    paddingHorizontal: 24,
    gap: 8,
  },
  questionsList: {
    gap: 10,
  },
});
