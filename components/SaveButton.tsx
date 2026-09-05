import { Pressable, StyleSheet, type ViewStyle } from 'react-native';
import { Bookmark, BookmarkCheck } from 'lucide-react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useHaptics } from '@/hooks/useHaptics';

interface Props {
  saved: boolean;
  onToggle: () => void;
  style?: ViewStyle;
  size?: number;
}

export function SaveButton({ saved, onToggle, style, size = 22 }: Props) {
  const { theme } = useAppTheme();
  const haptics = useHaptics();

  const handlePress = () => {
    haptics.impact('light');
    onToggle();
  };

  return (
    <Pressable
      onPress={handlePress}
      hitSlop={12}
      style={({ pressed }) => [
        styles.btn,
        { opacity: pressed ? 0.6 : 1 },
        style,
      ]}
      accessibilityLabel={saved ? 'Unsave' : 'Save'}
      accessibilityRole="button"
    >
      {saved ? (
        <BookmarkCheck size={size} color={theme.colors.primary} strokeWidth={2} />
      ) : (
        <Bookmark size={size} color={theme.colors.textSecondary} strokeWidth={2} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    padding: 4,
  alignItems: 'center',
    justifyContent: 'center',
  },
});
