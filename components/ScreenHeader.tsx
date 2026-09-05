import { Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useHaptics } from '@/hooks/useHaptics';

interface Props {
  title?: string;
  onBack?: () => void;
  right?: React.ReactNode;
  style?: ViewStyle;
}

export function ScreenHeader({ title, onBack, right, style }: Props) {
  const { theme } = useAppTheme();
  const haptics = useHaptics();

  return (
    <View
      style={[
        styles.container,
        {
          borderBottomColor: theme.colors.border,
        },
        style,
      ]}
    >
      {onBack ? (
        <Pressable
          onPress={() => {
            haptics.impact('light');
            onBack();
          }}
          hitSlop={12}
          style={({ pressed }) => [styles.backBtn, { opacity: pressed ? 0.6 : 1 }]}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <ChevronLeft size={22} color={theme.colors.textPrimary} strokeWidth={2} />
        </Pressable>
      ) : (
        <View style={styles.backBtn} />
      )}
      {title ? (
        <Text
          style={{
            color: theme.colors.textPrimary,
            fontSize: theme.fontSize.bodyLg,
            fontWeight: theme.fontWeight.semibold,
          }}
          numberOfLines={1}
        >
          {title}
        </Text>
      ) : (
        <View style={{ flex: 1 }} />
      )}
      <View style={styles.rightSlot}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSlot: {
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
