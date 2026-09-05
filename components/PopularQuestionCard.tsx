import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useHaptics } from '@/hooks/useHaptics';

interface Props {
  question: string;
  topic?: string;
  onPress: () => void;
}

export function PopularQuestionCard({ question, topic, onPress }: Props) {
  const { theme } = useAppTheme();
  const haptics = useHaptics();

  return (
    <Pressable
      onPress={() => {
        haptics.selection();
        onPress();
      }}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <View style={styles.content}>
        <Text
          style={{
            color: theme.colors.textPrimary,
            fontSize: theme.fontSize.body,
            fontWeight: theme.fontWeight.medium,
            lineHeight: 21,
          }}
          numberOfLines={2}
        >
          {question}
        </Text>
        {topic ? (
          <Text
            style={{
              color: theme.colors.textTertiary,
              fontSize: theme.fontSize.caption,
              marginTop: 4,
            }}
          >
            {topic}
          </Text>
        ) : null}
      </View>
      <ChevronRight size={18} color={theme.colors.textTertiary} strokeWidth={2} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    gap: 8,
  },
  content: {
    flex: 1,
  },
});
