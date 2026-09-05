import { useState, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';
import { Bookmark, Clock, Trash2, ChevronRight, BookmarkCheck, MessageSquare } from 'lucide-react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useHaptics } from '@/hooks/useHaptics';
import { EmptyState } from '@/components/EmptyState';
import { getSavedAnswers, unsaveAnswer, getSavedThreads, unsaveThread, getHistory, deleteHistoryItem, clearHistory } from '@/lib/storage';
import type { SavedAnswerItem, SavedThreadItem, SearchHistoryItem } from '@/lib/types';

type TabKey = 'saved' | 'history';

function groupByDate(items: SearchHistoryItem[]): { label: string; items: SearchHistoryItem[] }[] {
  const groups: Record<string, SearchHistoryItem[]> = {};
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  for (const item of items) {
    const d = new Date(item.created_at).toDateString();
    const label = d === today ? 'Today' : d === yesterday ? 'Yesterday' : d;
    if (!groups[label]) groups[label] = [];
    groups[label].push(item);
  }

  return Object.entries(groups).map(([label, items]) => ({ label, items }));
}

export default function LibraryScreen() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const haptics = useHaptics();
  const [activeTab, setActiveTab] = useState<TabKey>('saved');
  const [savedAnswers, setSavedAnswers] = useState<SavedAnswerItem[]>([]);
  const [savedThreads, setSavedThreads] = useState<SavedThreadItem[]>([]);
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    const [answers, threads, hist] = await Promise.all([getSavedAnswers(), getSavedThreads(), getHistory()]);
    setSavedAnswers(answers);
    setSavedThreads(threads);
    setHistory(hist);
    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData]),
  );

  const handleUnsaveAnswer = (id: string) => {
    Alert.alert('Remove saved answer?', 'This will remove the answer from your saved items.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: async () => {
          await unsaveAnswer(id);
          haptics.impact('medium');
          loadData();
        },
      },
    ]);
  };

  const handleUnsaveThread = (url: string) => {
    Alert.alert('Remove saved thread?', 'This will remove the thread from your saved items.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: async () => {
          await unsaveThread(url);
          haptics.impact('medium');
          loadData();
        },
      },
    ]);
  };

  const handleClearAllHistory = () => {
    Alert.alert('Clear all history?', 'This will permanently delete your search history.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear All',
        style: 'destructive',
        onPress: async () => {
          await clearHistory();
          haptics.notify('warning');
          loadData();
        },
      },
    ]);
  };

  const handleDeleteHistoryItem = (id: string) => {
    Alert.alert('Delete this search?', '', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteHistoryItem(id);
          haptics.impact('light');
          loadData();
        },
      },
    ]);
  };

  const hasSavedData = savedAnswers.length > 0 || savedThreads.length > 0;
  const historyGroups = groupByDate(history);

  const cardStyle = {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    gap: 8,
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
  };

  const sectionLabelStyle = {
    fontSize: 13,
    fontWeight: '600' as const,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
    marginBottom: 10,
    color: theme.colors.textTertiary,
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={{ color: theme.colors.textPrimary, fontSize: theme.fontSize.title, fontWeight: theme.fontWeight.bold }}>
            Library
          </Text>
        </View>

        {/* Internal tabs */}
        <View style={styles.tabBar}>
          <Pressable
            onPress={() => {
              haptics.selection();
              setActiveTab('saved');
            }}
            style={({ pressed }) => [
              styles.tab,
              {
                backgroundColor: activeTab === 'saved' ? theme.colors.primary : theme.colors.surfaceSecondary,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <Bookmark
              size={16}
              color={activeTab === 'saved' ? '#fff' : theme.colors.textSecondary}
              strokeWidth={2}
            />
            <Text
              style={{
                color: activeTab === 'saved' ? '#fff' : theme.colors.textSecondary,
                fontSize: theme.fontSize.body - 1,
                fontWeight: theme.fontWeight.semibold,
                marginLeft: 6,
              }}
            >
              Saved
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              haptics.selection();
              setActiveTab('history');
            }}
            style={({ pressed }) => [
              styles.tab,
              {
                backgroundColor: activeTab === 'history' ? theme.colors.primary : theme.colors.surfaceSecondary,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <Clock
              size={16}
              color={activeTab === 'history' ? '#fff' : theme.colors.textSecondary}
              strokeWidth={2}
            />
            <Text
              style={{
                color: activeTab === 'history' ? '#fff' : theme.colors.textSecondary,
                fontSize: theme.fontSize.body - 1,
                fontWeight: theme.fontWeight.semibold,
                marginLeft: 6,
              }}
            >
              History
            </Text>
          </Pressable>
        </View>

        {/* Content */}
        {activeTab === 'saved' ? (
          !loading && !hasSavedData ? (
            <EmptyState
              icon={Bookmark}
              title="Nothing saved yet"
              message="Bookmark answers and discussion links to find them here later."
            />
          ) : (
            <ScrollView
              contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 48, paddingTop: 8 }}
              showsVerticalScrollIndicator={false}
            >
              {savedAnswers.length > 0 ? (
                <View>
                  <Text style={sectionLabelStyle}>Answers</Text>
                  <View style={{ gap: 10 }}>
                    {savedAnswers.map((item) => (
                      <Pressable
                        key={item.id}
                        onPress={() => {
                          haptics.impact('light');
                          router.push('/research/result');
                        }}
                        style={({ pressed }) => [cardStyle, { opacity: pressed ? 0.7 : 1 }]}
                      >
                        <View style={styles.cardHeader}>
                          <View style={[styles.iconWrap, { backgroundColor: theme.colors.primarySoft }]}>
                            <BookmarkCheck size={14} color={theme.colors.primary} strokeWidth={2} />
                          </View>
                          <View style={{ flex: 1, marginLeft: 8 }}>
                            <Text
                              style={{
                                color: theme.colors.textPrimary,
                                fontSize: theme.fontSize.body,
                                fontWeight: theme.fontWeight.semibold,
                                lineHeight: 21,
                              }}
                              numberOfLines={2}
                            >
                              {item.question}
                            </Text>
                            <Text style={{ color: theme.colors.textTertiary, fontSize: theme.fontSize.caption, marginTop: 2 }}>
                              {item.topic}
                            </Text>
                          </View>
                          <Pressable
                            onPress={() => handleUnsaveAnswer(item.answer_id)}
                            hitSlop={12}
                            style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1, padding: 4 })}
                          >
                            <Trash2 size={16} color={theme.colors.textTertiary} strokeWidth={2} />
                          </Pressable>
                        </View>
                      </Pressable>
                    ))}
                  </View>
                </View>
              ) : null}

              {savedThreads.length > 0 ? (
                <View style={{ marginTop: 28 }}>
                  <Text style={sectionLabelStyle}>Discussion Links</Text>
                  <View style={{ gap: 10 }}>
                    {savedThreads.map((item) => (
                      <View key={item.id} style={cardStyle}>
                        <View style={styles.cardHeader}>
                          <View style={[styles.iconWrap, { backgroundColor: theme.colors.secondarySoft }]}>
                            <MessageSquare size={14} color={theme.colors.textSecondary} strokeWidth={2} />
                          </View>
                          <View style={{ flex: 1, marginLeft: 8 }}>
                            <Text
                              style={{
                                color: theme.colors.textPrimary,
                                fontSize: theme.fontSize.body,
                                fontWeight: theme.fontWeight.semibold,
                                lineHeight: 21,
                              }}
                              numberOfLines={2}
                            >
                              {item.title}
                            </Text>
                            <Text style={{ color: theme.colors.textTertiary, fontSize: theme.fontSize.caption, marginTop: 2 }}>
                              {item.domain}
                            </Text>
                          </View>
                          <Pressable
                            onPress={() => handleUnsaveThread(item.url)}
                            hitSlop={12}
                            style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1, padding: 4 })}
                          >
                            <Trash2 size={16} color={theme.colors.textTertiary} strokeWidth={2} />
                          </Pressable>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              ) : null}
            </ScrollView>
          )
        ) : (
          !loading && history.length === 0 ? (
            <EmptyState
              icon={Clock}
              title="No searches yet"
              message="Your research history will appear here."
            />
          ) : (
            <ScrollView
              contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 48, paddingTop: 8 }}
              showsVerticalScrollIndicator={false}
            >
              <View style={{ alignItems: 'flex-end', paddingBottom: 8 }}>
                <Pressable
                  onPress={handleClearAllHistory}
                  hitSlop={12}
                  style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1, flexDirection: 'row', alignItems: 'center', gap: 4 })}
                >
                  <Trash2 size={16} color={theme.colors.error} strokeWidth={2} />
                  <Text style={{ color: theme.colors.error, fontSize: theme.fontSize.body - 1, fontWeight: theme.fontWeight.medium }}>
                    Clear All
                  </Text>
                </Pressable>
              </View>
              {historyGroups.map((group) => (
                <View key={group.label} style={{ marginBottom: 24 }}>
                  <Text
                    style={{
                      color: theme.colors.textTertiary,
                      fontSize: 13,
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                      marginBottom: 10,
                    }}
                  >
                    {group.label}
                  </Text>
                  <View style={{ gap: 10 }}>
                    {group.items.map((item) => (
                      <Pressable
                        key={item.id}
                        onPress={() => {
                          haptics.impact('light');
                          router.push('/research/result');
                        }}
                        style={({ pressed }) => [cardStyle, { opacity: pressed ? 0.7 : 1 }]}
                      >
                        <View style={{ flex: 1 }}>
                          <Text
                            style={{
                              color: theme.colors.textPrimary,
                              fontSize: theme.fontSize.body,
                              fontWeight: theme.fontWeight.semibold,
                              lineHeight: 21,
                            }}
                            numberOfLines={2}
                          >
                            {item.query}
                          </Text>
                          <Text style={{ color: theme.colors.textTertiary, fontSize: theme.fontSize.caption, marginTop: 2 }}>
                            {item.normalized_topic}
                          </Text>
                        </View>
                        <Pressable
                          onPress={() => handleDeleteHistoryItem(item.id)}
                          hitSlop={12}
                          style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1, padding: 4 })}
                        >
                          <Trash2 size={16} color={theme.colors.textTertiary} strokeWidth={2} />
                        </Pressable>
                      </Pressable>
                    ))}
                  </View>
                </View>
              ))}
            </ScrollView>
          )
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  tabBar: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 24,
    paddingBottom: 12,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
