import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import type { CauseItem } from '@/lib/types';

interface Props {
  cause: CauseItem;
}

export function CauseCard({ cause }: Props) {
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
      <Text
        style={{
          color: theme.colors.textPrimary,
          fontSize: theme.fontSize.body,
          fontWeight: theme.fontWeight.semibold,
          marginBottom: 4,
        }}
      >
        {cause.title}
      </Text>
      <Text
        style={{
          color: theme.colors.textSecondary,
          fontSize: theme.fontSize.body - 1,
          lineHeight: 21,
        }}
      >
        {cause.explanation}
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
});
