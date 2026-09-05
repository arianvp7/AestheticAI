import { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';
import {
  ArrowLeft,
  ScanLine,
  Eye,
  Brush,
  Triangle,
  Smile,
  Ruler,
  Search,
  ChevronRight,
  Info,
  AlertCircle,
} from 'lucide-react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useHaptics } from '@/hooks/useHaptics';
import { useResearch } from '@/hooks/useResearch';
import { MOCK_FACE_ANALYSIS } from '@/lib/mockData';
import type { FaceAnalysis, FeatureAnalysis, SkinAnalysis, ProportionAnalysis } from '@/lib/types';

export default function ScanResultScreen() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const haptics = useHaptics();
  const { submitResearch } = useResearch();
  const [analyzing, setAnalyzing] = useState(false);

  const analysis: FaceAnalysis = MOCK_FACE_ANALYSIS;

  const handleResearchThis = async (query: string) => {
    haptics.impact('medium');
    setAnalyzing(true);
    const result = await submitResearch(query, 'appearance');
    setAnalyzing(false);
    if (result) {
      router.push('/research/result');
    }
  };

  const renderFeatureSection = (
    title: string,
    icon: typeof Eye,
    features: FeatureAnalysis[] | SkinAnalysis[] | undefined,
  ) => {
    if (!features || features.length === 0) return null;
    return (
      <View style={{ marginTop: 28 }}>
        <View style={styles.sectionHeader}>
          <View style={[styles.sectionIcon, { backgroundColor: theme.colors.primarySoft }]}>
            {(() => {
              const Icon = icon;
              return <Icon size={16} color={theme.colors.primary} strokeWidth={2} />;
            })()}
          </View>
          <Text
            style={{
              color: theme.colors.textPrimary,
              fontSize: theme.fontSize.bodyLg,
              fontWeight: theme.fontWeight.bold,
            }}
          >
            {title}
          </Text>
        </View>
        <View style={{ gap: 12, marginTop: 12 }}>
          {features.map((f, i) => {
            const feature = f as FeatureAnalysis & SkinAnalysis;
            return (
              <View
                key={i}
                style={[
                  styles.featureCard,
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
                  {feature.label}
                </Text>
                <Text
                  style={{
                    color: theme.colors.textSecondary,
                    fontSize: theme.fontSize.body - 1,
                    lineHeight: 21,
                    marginTop: 6,
                  }}
                >
                  {feature.description}
                </Text>

                {feature.communityTerm ? (
                  <View
                    style={[
                      styles.communityTermBadge,
                      { backgroundColor: theme.colors.secondarySoft },
                    ]}
                  >
                    <Info size={12} color={theme.colors.textSecondary} strokeWidth={2} />
                    <Text
                      style={{
                        color: theme.colors.textSecondary,
                        fontSize: theme.fontSize.caption,
                        fontWeight: theme.fontWeight.medium,
                        marginLeft: 4,
                      }}
                    >
                      Community term: {feature.communityTerm}
                    </Text>
                  </View>
                ) : null}

                {feature.communityTermNote ? (
                  <Text
                    style={{
                      color: theme.colors.textTertiary,
                      fontSize: theme.fontSize.caption,
                      lineHeight: 18,
                      marginTop: 8,
                      fontStyle: 'italic',
                    }}
                  >
                    {feature.communityTermNote}
                  </Text>
                ) : null}

                {feature.researchSuggestion ? (
                  <Pressable
                    onPress={() => handleResearchThis(feature.researchSuggestion!)}
                    disabled={analyzing}
                    style={({ pressed }) => [
                      styles.researchBtn,
                      {
                        backgroundColor: theme.colors.primarySoft,
                        opacity: pressed ? 0.7 : 1,
                      },
                    ]}
                  >
                    <Search size={14} color={theme.colors.primary} strokeWidth={2} />
                    <Text
                      style={{
                        color: theme.colors.primary,
                        fontSize: theme.fontSize.body - 1,
                        fontWeight: theme.fontWeight.semibold,
                        marginLeft: 6,
                      }}
                    >
                      Research This
                    </Text>
                  </Pressable>
                ) : null}
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const renderProportions = (proportions: ProportionAnalysis[] | undefined) => {
    if (!proportions || proportions.length === 0) return null;
    return (
      <View style={{ marginTop: 28 }}>
        <View style={styles.sectionHeader}>
          <View style={[styles.sectionIcon, { backgroundColor: theme.colors.primarySoft }]}>
            <Ruler size={16} color={theme.colors.primary} strokeWidth={2} />
          </View>
          <Text
            style={{
              color: theme.colors.textPrimary,
              fontSize: theme.fontSize.bodyLg,
              fontWeight: theme.fontWeight.bold,
            }}
          >
            Facial Proportions
          </Text>
        </View>
        <View style={{ gap: 12, marginTop: 12 }}>
          {proportions.map((p, i) => (
            <View
              key={i}
              style={[
                styles.featureCard,
                { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
              ]}
            >
              <View style={styles.propHeader}>
                <Text
                  style={{
                    color: theme.colors.textPrimary,
                    fontSize: theme.fontSize.body,
                    fontWeight: theme.fontWeight.semibold,
                  }}
                >
                  {p.label}
                </Text>
                <View style={[styles.ratioBadge, { backgroundColor: theme.colors.primarySoft }]}>
                  <Text
                    style={{
                      color: theme.colors.primary,
                      fontSize: theme.fontSize.caption,
                      fontWeight: theme.fontWeight.semibold,
                    }}
                  >
                    {p.ratio}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  color: theme.colors.textSecondary,
                  fontSize: theme.fontSize.body - 1,
                  lineHeight: 21,
                  marginTop: 6,
                }}
              >
                {p.description}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
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
            Face Analysis
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 48, paddingTop: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Face Overview */}
          <View
            style={[
              styles.overviewCard,
              { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
            ]}
          >
            <View style={[styles.overviewIcon, { backgroundColor: theme.colors.primarySoft }]}>
              <ScanLine size={24} color={theme.colors.primary} strokeWidth={2} />
            </View>
            <Text
              style={{
                color: theme.colors.textPrimary,
                fontSize: theme.fontSize.heading,
                fontWeight: theme.fontWeight.bold,
                marginTop: 12,
              }}
            >
              Face Overview
            </Text>
            <Text
              style={{
                color: theme.colors.textSecondary,
                fontSize: theme.fontSize.body,
                lineHeight: 22,
                marginTop: 8,
              }}
            >
              Face detected with {Math.round((analysis.confidence || 0) * 100)}% confidence. Estimated face shape: {analysis.faceShape}.
            </Text>
          </View>

          {/* Mock notice */}
          <View style={[styles.mockNotice, { backgroundColor: theme.colors.warningSoft }]}>
            <AlertCircle size={16} color={theme.colors.warning} strokeWidth={2} />
            <Text
              style={{
                color: theme.colors.warning,
                fontSize: theme.fontSize.caption,
                marginLeft: 8,
                flex: 1,
              }}
            >
              Mock analysis for development. Real Face++ integration coming soon.
            </Text>
          </View>

          {/* Feature sections */}
          {renderFeatureSection('Eyes', Eye, analysis.eyes)}
          {renderFeatureSection('Brows', Brush, analysis.brows)}
          {renderFeatureSection('Jaw & Chin', Triangle, [...(analysis.jaw || []), ...(analysis.chin || [])])}
          {renderFeatureSection('Skin', Smile, analysis.skin)}
          {renderProportions(analysis.proportions)}

          {/* Areas to Research */}
          {analysis.researchSuggestions && analysis.researchSuggestions.length > 0 ? (
            <View style={{ marginTop: 28 }}>
              <Text
                style={{
                  color: theme.colors.textPrimary,
                  fontSize: theme.fontSize.bodyLg,
                  fontWeight: theme.fontWeight.bold,
                }}
              >
                Areas to Research
              </Text>
              <View style={{ gap: 10, marginTop: 12 }}>
                {analysis.researchSuggestions.map((s, i) => (
                  <Pressable
                    key={i}
                    onPress={() => handleResearchThis(s.query)}
                    disabled={analyzing}
                    style={({ pressed }) => [
                      styles.suggestionCard,
                      {
                        backgroundColor: theme.colors.surface,
                        borderColor: theme.colors.border,
                        opacity: pressed ? 0.7 : 1,
                      },
                    ]}
                  >
                    <Search size={16} color={theme.colors.primary} strokeWidth={2} />
                    <Text
                      style={{
                        color: theme.colors.textPrimary,
                        fontSize: theme.fontSize.body,
                        flex: 1,
                        marginLeft: 10,
                      }}
                    >
                      {s.label}
                    </Text>
                    <ChevronRight size={18} color={theme.colors.textTertiary} strokeWidth={2} />
                  </Pressable>
                ))}
              </View>
            </View>
          ) : null}

          {/* Disclaimer */}
          <Text
            style={{
              color: theme.colors.textTertiary,
              fontSize: theme.fontSize.caption,
              marginTop: 28,
              textAlign: 'center',
              paddingHorizontal: 16,
            }}
          >
            Educational information only. Not medical advice. Community aesthetic terms are informal, not clinical diagnoses.
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
  overviewCard: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  overviewIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mockNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionIcon: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureCard: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
  },
  communityTermBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  researchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  propHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratioBadge: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  suggestionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
  },
});
