import { StyleSheet, Text, View } from 'react-native';
import { Loader2 } from 'lucide-react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { LOADING_STEPS } from '@/hooks/useResearch';

export function LoadingState() {
  const { theme } = useAppTheme();

  return (
    <View style={styles.container}>
      <View style={styles.steps}>
        {LOADING_STEPS.map((step, i) => (
          <View key={i} style={styles.stepRow}>
            <View
              style={[
                styles.stepDot,
                {
                  backgroundColor: theme.colors.primary,
                  opacity: i === 0 ? 1 : 0.25,
                },
              ]}
            />
            <Text
              style={{
                color: theme.colors.textPrimary,
                fontSize: theme.fontSize.body,
                fontWeight: i === 0 ? theme.fontWeight.semibold : theme.fontWeight.regular,
                opacity: i === 0 ? 1 : 0.5,
              }}
            >
              {step}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  steps: {
    gap: 16,
    alignItems: 'flex-start',
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
