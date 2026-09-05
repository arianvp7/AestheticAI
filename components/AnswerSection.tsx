import { StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import type { LucideIcon } from 'lucide-react-native';

interface Props {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  style?: ViewStyle;
  action?: React.ReactNode;
}

export function AnswerSection({ title, icon: Icon, children, style, action }: Props) {
  const { theme } = useAppTheme();

  return (
    <View style={[styles.section, style]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {Icon ? (
            <View
              style={[
                styles.iconWrap,
                { backgroundColor: theme.colors.primarySoft },
              ]}
            >
              <Icon size={16} color={theme.colors.primary} strokeWidth={2} />
            </View>
          ) : null}
          <Text
            style={{
              color: theme.colors.textPrimary,
              fontSize: theme.fontSize.bodyLg,
              fontWeight: theme.fontWeight.bold,
            }}
          >
            {title}
          </Text>
        </View>
        {action}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconWrap: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
