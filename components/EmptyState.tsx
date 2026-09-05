import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import type { LucideIcon } from 'lucide-react-native';

interface Props {
  icon: LucideIcon;
  title: string;
  message?: string;
}

export function EmptyState({ icon: Icon, title, message }: Props) {
  const { theme } = useAppTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconWrap,
          { backgroundColor: theme.colors.surfaceSecondary },
        ]}
      >
        <Icon size={28} color={theme.colors.textTertiary} strokeWidth={1.5} />
      </View>
      <Text
        style={{
          color: theme.colors.textPrimary,
          fontSize: theme.fontSize.bodyLg,
          fontWeight: theme.fontWeight.semibold,
          marginTop: 16,
        }}
      >
        {title}
      </Text>
      {message ? (
        <Text
          style={{
            color: theme.colors.textSecondary,
            fontSize: theme.fontSize.body,
            marginTop: 6,
            textAlign: 'center',
            lineHeight: 22,
          }}
        >
          {message}
        </Text>
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
});
