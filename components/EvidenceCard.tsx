import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { EvidenceBadge } from './EvidenceBadge';
import type { EvidenceItem } from '@/lib/types';

interface Props {
  item: EvidenceItem;
}

export function EvidenceCard({ item }: Props) {
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
        <Text
          style={{
            color: theme.colors.textPrimary,
            fontSize: theme.fontSize.body,
            fontWeight: theme.fontWeight.semibold,
            flex: 1,
            lineHeight: 21,
          }}
        >
          {item.claim}
        </Text>
        <EvidenceBadge rating={item.rating} size="sm" />
      </View>
      <Text
        style={{
          color: theme.colors.textSecondary,
          fontSize: theme.fontSize.body - 1,
          lineHeight: 21,
          marginTop: 8,
        }}
      >
        {item.explanation}
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
    alignItems: 'flex-start',
    gap: 8,
  },
});
