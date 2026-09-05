import { StyleSheet, Text, View } from 'react-native';
import { MessageCircle } from 'lucide-react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import type { CommunitySuggestion } from '@/lib/types';

interface Props {
  suggestion: CommunitySuggestion;
}

export function CommunitySuggestionCard({ suggestion }: Props) {
  const { theme } = useAppTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <View style={styles.header}>
        <View
          style={[
            styles.iconWrap,
            { backgroundColor: theme.colors.secondarySoft },
          ]}
        >
          <MessageCircle size={14} color={theme.colors.textSecondary} strokeWidth={2} />
        </View>
        <Text
          style={{
            color: theme.colors.textPrimary,
            fontSize: theme.fontSize.body,
            fontWeight: theme.fontWeight.semibold,
            flex: 1,
          }}
        >
          {suggestion.title}
        </Text>
        <View
          style={[
            styles.freq,
            { backgroundColor: theme.colors.surfaceSecondary },
          ]}
        >
          <Text
            style={{
              color: theme.colors.textTertiary,
              fontSize: 11,
              fontWeight: theme.fontWeight.medium,
            }}
          >
            {suggestion.frequency}
          </Text>
        </View>
      </View>
      <Text
        style={{
          color: theme.colors.textSecondary,
          fontSize: theme.fontSize.body - 1,
          lineHeight: 21,
          marginTop: 8,
        }}
      >
        {suggestion.summary}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconWrap: {
    width: 26,
    height: 26,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  freq: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 999,
  },
});
