import { Pressable, StyleSheet, Text, type ViewStyle } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useHaptics } from '@/hooks/useHaptics';
import type { LucideIcon } from 'lucide-react-native';

interface Props {
  label: string;
  icon: LucideIcon;
  onPress: () => void;
  style?: ViewStyle;
}

export function TopicChip({ label, icon: Icon, onPress, style }: Props) {
  const { theme } = useAppTheme();
  const haptics = useHaptics();

  return (
    <Pressable
      onPress={() => {
        haptics.selection();
        onPress();
      }}
      style={({ pressed }) => [
        styles.chip,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          opacity: pressed ? 0.7 : 1,
        },
        style,
      ]}
    >
      <Icon size={16} color={theme.colors.primary} strokeWidth={2} />
      <Text
        style={{
          color: theme.colors.textPrimary,
          fontSize: theme.fontSize.body,
          fontWeight: theme.fontWeight.medium,
          marginLeft: theme.spacing.sm,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
  },
});
