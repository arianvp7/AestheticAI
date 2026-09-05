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
  DollarSign,
  Search,
  TrendingUp,
  CandlestickChart,
  BarChart3,
  Bitcoin,
  Briefcase,
  Laptop,
  Building2,
  Store,
  Sparkles,
  ChevronRight,
  MessageSquare,
  GraduationCap,
} from 'lucide-react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useHaptics } from '@/hooks/useHaptics';
import { useResearch } from '@/hooks/useResearch';
import { TopicChip } from '@/components/TopicChip';
import { PopularQuestionCard } from '@/components/PopularQuestionCard';
import { ThreadCard } from '@/components/ThreadCard';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { MOCK_MONEY_TOPICS, MOCK_MONEY_QUESTIONS, MOCK_MONEY_TRENDING, MOCK_MONEY_BASICS } from '@/lib/mockData';
import type { LucideIcon } from 'lucide-react-native';

const ICON_MAP: Record<string, LucideIcon> = {
  TrendingUp,
  CandlestickChart,
  BarChart3,
  Bitcoin,
  Briefcase,
  Laptop,
  Building2,
  Store,
};

export default function MoneyScreen() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const haptics = useHaptics();
  const { submitResearch, isLoading, error, clearError } = useResearch();
  const [query, setQuery] = useState('');
  const [savedThreadUrls, setSavedThreadUrls] = useState<Set<string>>(new Set());

  const handleSubmit = async () => {
    const trimmed = query.trim();
    if (!trimmed || isLoading) return;
    haptics.impact('medium');
    const result = await submitResearch(trimmed, 'money');
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
                <View style={[styles.logoWrap, { backgroundColor: theme.colors.accentSoft }]}>
                  <DollarSign size={20} color={theme.colors.accent} strokeWidth={2} />
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
                  Money
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
                Build your financial knowledge
              </Text>
              <Text
                style={{
                  color: theme.colors.textSecondary,
                  fontSize: theme.fontSize.bodyLg,
                  lineHeight: 24,
                  marginTop: theme.spacing.sm,
                }}
              >
                Research investing, trading, careers, business, and ways to earn.
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
                  style={{
                    flex: 1,
                    color: theme.colors.textPrimary,
                    fontSize: theme.fontSize.body,
                    marginLeft: 10,
                    paddingVertical: 14,
                    maxHeight: 100,
                  }}
                  placeholder="Ask anything about money..."
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
                    backgroundColor: query.trim() ? theme.colors.accent : theme.colors.borderStrong,
                    opacity: pressed ? 0.85 : 1,
                  },
                ]}
              >
                <Sparkles size={18} color="#fff" strokeWidth={2} />
                <Text style={{ color: '#fff', fontSize: theme.fontSize.bodyLg, fontWeight: theme.fontWeight.semibold, marginLeft: 8 }}>
                  Research
                </Text>
              </Pressable>

              {/* Topic chips */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.topicsScroll}
                contentContainerStyle={styles.topicsContent}
              >
                {MOCK_MONEY_TOPICS.map((topic) => {
                  const Icon = ICON_MAP[topic.icon] || DollarSign;
                  return (
                    <TopicChip
                      key={topic.label}
                      label={topic.label}
                      icon={Icon}
                      onPress={() => handlePopularQuestion(`Tell me about ${topic.label.toLowerCase()}`)}
                    />
                  );
                })}
              </ScrollView>

              {/* Popular Questions */}
              <Text
                style={{
                  color: theme.colors.textPrimary,
                  fontSize: theme.fontSize.bodyLg,
                  fontWeight: theme.fontWeight.bold,
                  marginTop: theme.spacing.xl,
                  marginBottom: theme.spacing.sm,
                }}
              >
                Popular Questions
              </Text>
              <View style={styles.questionsList}>
                {MOCK_MONEY_QUESTIONS.map((q, i) => (
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

              {/* Trending Discussions */}
              <Text
                style={{
                  color: theme.colors.textPrimary,
                  fontSize: theme.fontSize.bodyLg,
                  fontWeight: theme.fontWeight.bold,
                  marginTop: theme.spacing.xl,
                  marginBottom: theme.spacing.sm,
                }}
              >
                Trending Discussions
              </Text>
              <View style={{ gap: 12 }}>
                {MOCK_MONEY_TRENDING.map((t) => (
                  <ThreadCard
                    key={t.id}
                    thread={t}
                    saved={savedThreadUrls.has(t.url)}
                    onToggleSave={() => {
                      haptics.impact('light');
                      setSavedThreadUrls((prev) => {
                        const next = new Set(prev);
                        if (next.has(t.url)) next.delete(t.url);
                        else next.add(t.url);
                        return next;
                      });
                    }}
                    onOpen={() => {
                      haptics.impact('light');
                      // Mock links are disabled during development
                    }}
                  />
                ))}
              </View>

              {/* Learn the Basics */}
              <Text
                style={{
                  color: theme.colors.textPrimary,
                  fontSize: theme.fontSize.bodyLg,
                  fontWeight: theme.fontWeight.bold,
                  marginTop: theme.spacing.xl,
                  marginBottom: theme.spacing.sm,
                }}
              >
                Learn the Basics
              </Text>
              <View style={{ gap: 10 }}>
                {MOCK_MONEY_BASICS.map((item, i) => (
                  <Pressable
                    key={i}
                    onPress={() => {
                      haptics.impact('light');
                      setQuery(`What is ${item.title}?`);
                    }}
                    style={({ pressed }) => [
                      styles.basicsCard,
                      {
                        backgroundColor: theme.colors.surface,
                        borderColor: theme.colors.border,
                        opacity: pressed ? 0.7 : 1,
                      },
                    ]}
                  >
                    <View style={[styles.basicsIcon, { backgroundColor: theme.colors.accentSoft }]}>
                      <GraduationCap size={16} color={theme.colors.accent} strokeWidth={2} />
                    </View>
                    <View style={{ flex: 1, marginLeft: 10 }}>
                      <Text
                        style={{
                          color: theme.colors.textPrimary,
                          fontSize: theme.fontSize.body,
                          fontWeight: theme.fontWeight.semibold,
                        }}
                      >
                        {item.title}
                      </Text>
                      <Text
                        style={{
                          color: theme.colors.textSecondary,
                          fontSize: theme.fontSize.body - 1,
                          marginTop: 2,
                        }}
                      >
                        {item.description}
                      </Text>
                    </View>
                    <ChevronRight size={18} color={theme.colors.textTertiary} strokeWidth={2} />
                  </Pressable>
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
                Educational information only. Not financial advice. Community discussions reflect opinions and may not be reliable.
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
  basicsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
  },
  basicsIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
