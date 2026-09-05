import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import {
  Sparkles,
  BookOpen,
  AlertTriangle,
  MessageSquare,
  FileText,
  HelpCircle,
  ArrowLeft,
  MessageCircle,
  ChevronRight,
} from 'lucide-react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useHaptics } from '@/hooks/useHaptics';
import { useResearch } from '@/hooks/useResearch';
import { AnswerSection } from '@/components/AnswerSection';
import { CauseCard } from '@/components/CauseCard';
import { CommunitySuggestionCard } from '@/components/CommunitySuggestionCard';
import { EvidenceCard } from '@/components/EvidenceCard';
import { RiskCard } from '@/components/RiskCard';
import { ThreadCard } from '@/components/ThreadCard';
import { SourceCard } from '@/components/SourceCard';
import { SaveButton } from '@/components/SaveButton';
import { ErrorState } from '@/components/ErrorState';
import { saveAnswer, unsaveAnswer, isAnswerSaved, saveThread, unsaveThread, isThreadSaved } from '@/lib/storage';
import type { ResearchResult } from '@/lib/types';

export default function ResearchResultScreen() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const haptics = useHaptics();
  const { currentResult, error, clearError } = useResearch();

  const [answerSaved, setAnswerSaved] = useState(false);
  const [savedThreadUrls, setSavedThreadUrls] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (currentResult) {
      isAnswerSaved(currentResult.researchId).then(setAnswerSaved);
      const checkThreads = async () => {
        const saved = new Set<string>();
        for (const t of currentResult.communityResults) {
          if (await isThreadSaved(t.url)) saved.add(t.url);
        }
        setSavedThreadUrls(saved);
      };
      checkThreads();
    }
  }, [currentResult]);

  if (!currentResult && error) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          <ErrorState message={error} onRetry={() => { clearError(); router.back(); }} />
        </SafeAreaView>
      </View>
    );
  }

  if (!currentResult) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          <ErrorState message="No research result found." onRetry={() => router.replace('/(tabs)')} />
        </SafeAreaView>
      </View>
    );
  }

  const { answer, communityResults, sources } = currentResult;

  const toggleSaveAnswer = async () => {
    if (answerSaved) {
      await unsaveAnswer(currentResult.researchId);
      setAnswerSaved(false);
      haptics.impact('light');
    } else {
      await saveAnswer({
        id: `saved-${currentResult.researchId}`,
        answer_id: currentResult.researchId,
        question: answer.question,
        topic: answer.topic,
        saved_at: new Date().toISOString(),
        answer,
      });
      setAnswerSaved(true);
      haptics.notify('success');
    }
  };

  const toggleSaveThread = async (url: string, title: string, domain: string, snippet?: string) => {
    if (savedThreadUrls.has(url)) {
      await unsaveThread(url);
      setSavedThreadUrls((prev) => {
        const next = new Set(prev);
        next.delete(url);
        return next;
      });
      haptics.impact('light');
    } else {
      await saveThread({
        id: `saved-thread-${Date.now()}`,
        title,
        url,
        domain,
        snippet,
        saved_at: new Date().toISOString(),
      });
      setSavedThreadUrls((prev) => new Set(prev).add(url));
      haptics.notify('success');
    }
  };

  const openUrl = async (url: string, isMock = false) => {
    if (isMock || url.includes('mock') || url.includes('example')) {
      Alert.alert('Mock Link', 'This is mock data for UI development. Real links will open in the in-app browser once the backend is connected.');
      return;
    }
    try {
      await WebBrowser.openBrowserAsync(url);
    } catch {
      Alert.alert('Error', 'Could not open this link.');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
          <Pressable
            onPress={() => {
              haptics.impact('light');
              router.back();
            }}
            hitSlop={12}
            style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
          >
            <ArrowLeft size={22} color={theme.colors.textPrimary} strokeWidth={2} />
          </Pressable>
          <Text
            style={{
              color: theme.colors.textPrimary,
              fontSize: theme.fontSize.bodyLg,
              fontWeight: theme.fontWeight.semibold,
              flex: 1,
              marginLeft: 8,
            }}
            numberOfLines={1}
          >
            Research Result
          </Text>
          <SaveButton saved={answerSaved} onToggle={toggleSaveAnswer} size={22} />
        </View>

        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 48, paddingTop: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Question */}
          <Text
            style={{
              color: theme.colors.textPrimary,
              fontSize: theme.fontSize.title,
              fontWeight: theme.fontWeight.bold,
              lineHeight: 34,
            }}
          >
            {answer.question}
          </Text>
          <View
            style={[
              styles.topicTag,
              { backgroundColor: theme.colors.primarySoft },
            ]}
          >
            <Text
              style={{
                color: theme.colors.primary,
                fontSize: theme.fontSize.caption,
                fontWeight: theme.fontWeight.semibold,
              }}
            >
              {answer.topic}
            </Text>
          </View>

          {/* AI Overview */}
          <AnswerSection title="AI Overview" icon={Sparkles} style={{ marginTop: 28 }}>
            <Text
              style={{
                color: theme.colors.textSecondary,
                fontSize: theme.fontSize.body,
                lineHeight: 24,
              }}
            >
              {answer.summary}
            </Text>
          </AnswerSection>

          {/* Terminology */}
          {answer.terminology.length > 0 ? (
            <AnswerSection title="Terminology" icon={BookOpen} style={{ marginTop: 28 }}>
              <View style={{ gap: 12 }}>
                {answer.terminology.map((t, i) => (
                  <View
                    key={i}
                    style={[
                      styles.termCard,
                      { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
                    ]}
                  >
                    <Text
                      style={{
                        color: theme.colors.textPrimary,
                        fontSize: theme.fontSize.body,
                        fontWeight: theme.fontWeight.semibold,
                      }}
                    >
                      {t.term}
                    </Text>
                    <Text
                      style={{
                        color: theme.colors.textSecondary,
                        fontSize: theme.fontSize.body - 1,
                        lineHeight: 21,
                        marginTop: 4,
                      }}
                    >
                      {t.definition}
                    </Text>
                  </View>
                ))}
              </View>
            </AnswerSection>
          ) : null}

          {/* Possible Causes */}
          {answer.possible_causes.length > 0 ? (
            <AnswerSection title="Possible Causes" icon={HelpCircle} style={{ marginTop: 28 }}>
              <View style={{ gap: 10 }}>
                {answer.possible_causes.map((c, i) => (
                  <CauseCard key={i} cause={c} />
                ))}
              </View>
            </AnswerSection>
          ) : null}

          {/* Community Suggestions */}
          {answer.community_suggestions.length > 0 ? (
            <AnswerSection title="Community Suggestions" icon={MessageCircle} style={{ marginTop: 28 }}>
              <Text
                style={{
                  color: theme.colors.textTertiary,
                  fontSize: theme.fontSize.caption,
                  marginBottom: 10,
                }}
              >
                What people online commonly suggest
              </Text>
              <View style={{ gap: 10 }}>
                {answer.community_suggestions.map((s, i) => (
                  <CommunitySuggestionCard key={i} suggestion={s} />
                ))}
              </View>
            </AnswerSection>
          ) : null}

          {/* Evidence Check */}
          {answer.evidence.length > 0 ? (
            <AnswerSection title="Evidence Check" icon={FileText} style={{ marginTop: 28 }}>
              <Text
                style={{
                  color: theme.colors.textTertiary,
                  fontSize: theme.fontSize.caption,
                  marginBottom: 10,
                }}
              >
                What reliable evidence supports
              </Text>
              <View style={{ gap: 10 }}>
                {answer.evidence.map((e, i) => (
                  <EvidenceCard key={i} item={e} />
                ))}
              </View>
            </AnswerSection>
          ) : null}

          {/* Risks */}
          {answer.risks.length > 0 ? (
            <AnswerSection title="Risks / Things to Know" icon={AlertTriangle} style={{ marginTop: 28 }}>
              <View style={{ gap: 10 }}>
                {answer.risks.map((r, i) => (
                  <RiskCard key={i} risk={r} />
                ))}
              </View>
            </AnswerSection>
          ) : null}

          {/* Community Discussions */}
          {communityResults.length > 0 ? (
            <AnswerSection title="Community Discussions" icon={MessageSquare} style={{ marginTop: 28 }}>
              <View style={{ gap: 12 }}>
                {communityResults.map((t) => (
                  <ThreadCard
                    key={t.id}
                    thread={t}
                    saved={savedThreadUrls.has(t.url)}
                    onToggleSave={() => toggleSaveThread(t.url, t.title, t.domain, t.snippet)}
                    onOpen={() => openUrl(t.url, t.isMock)}
                  />
                ))}
              </View>
            </AnswerSection>
          ) : null}

          {/* Other Sources */}
          {sources.length > 0 ? (
            <AnswerSection title="Other Sources" icon={FileText} style={{ marginTop: 28 }}>
              <View style={{ gap: 12 }}>
                {sources.map((s) => (
                  <SourceCard key={s.id} source={s} onOpen={() => openUrl(s.url, s.isMock)} />
                ))}
              </View>
            </AnswerSection>
          ) : null}

          {/* Related Questions */}
          {answer.related_questions.length > 0 ? (
            <AnswerSection title="Related Questions" icon={ChevronRight} style={{ marginTop: 28 }}>
              <View style={{ gap: 8 }}>
                {answer.related_questions.map((q, i) => (
                  <Pressable
                    key={i}
                    onPress={() => {
                      haptics.impact('light');
                      router.push({ pathname: '/research/result', params: { q } });
                    }}
                    style={({ pressed }) => [
                      styles.relatedRow,
                      { opacity: pressed ? 0.6 : 1 },
                    ]}
                  >
                    <Text
                      style={{
                        color: theme.colors.textPrimary,
                        fontSize: theme.fontSize.body,
                        flex: 1,
                      }}
                    >
                      {q}
                    </Text>
                    <ChevronRight size={16} color={theme.colors.textTertiary} strokeWidth={2} />
                  </Pressable>
                ))}
              </View>
            </AnswerSection>
          ) : null}

          {/* Follow-up */}
          <Pressable
            onPress={() => {
              haptics.impact('light');
              router.replace('/(tabs)');
            }}
            style={({ pressed }) => [
              styles.followUpBtn,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <MessageCircle size={18} color={theme.colors.primary} strokeWidth={2} />
            <Text
              style={{
                color: theme.colors.primary,
                fontSize: theme.fontSize.body,
                fontWeight: theme.fontWeight.semibold,
                marginLeft: 8,
              }}
            >
              Ask a follow-up
            </Text>
          </Pressable>

          {/* Disclaimer */}
          <Text
            style={{
              color: theme.colors.textTertiary,
              fontSize: theme.fontSize.caption,
              marginTop: 24,
              textAlign: 'center',
              paddingHorizontal: 16,
            }}
          >
            Educational information only. Not medical advice. Community discussions reflect opinions and may not be evidence-based.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  topicTag: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  termCard: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
  },
  relatedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 8,
  },
  followUpBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    marginTop: 28,
  },
});
