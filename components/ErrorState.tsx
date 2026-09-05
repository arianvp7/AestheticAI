import { Pressable, StyleSheet, Text, View } from 'react-native';
import { RefreshCw, AlertCircle } from 'lucide-react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useHaptics } from '@/hooks/useHaptics';

interface Props {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: Props) {
  const { theme } = useAppTheme();
  const haptics = useHaptics();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconWrap,
          { backgroundColor: theme.colors.errorSoft },
        ]}
      >
        <AlertCircle size={28} color={theme.colors.error} strokeWidth={2} />
      </View>
      <Text
        style={{
          color: theme.colors.textPrimary,
          fontSize: theme.fontSize.bodyLg,
          fontWeight: theme.fontWeight.semibold,
          marginTop: 16,
          textAlign: 'center',
        }}
      >
        {message}
      </Text>
      {onRetry ? (
        <Pressable
          onPress={() => {
            haptics.impact('medium');
            onRetry();
          }}
          style={({ pressed }) => [
            styles.retryBtn,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <RefreshCw size={16} color={theme.colors.primary} strokeWidth={2} />
          <Text
            style={{
              color: theme.colors.primary,
              fontSize: theme.fontSize.body,
              fontWeight: theme.fontWeight.semibold,
              marginLeft: 8,
            }}
          >
            Try again
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 48,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 20,
  },
});
