import { StyleSheet, Text, View } from 'react-native';
import { AlertTriangle, ShieldAlert, Shield } from 'lucide-react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import type { RiskItem } from '@/lib/types';

interface Props {
  risk: RiskItem;
}

const severityColor: Record<RiskItem['severity'], 'warning' | 'error' | 'success'> = {
  low: 'success',
  medium: 'warning',
  high: 'error',
};

const severitySoft: Record<RiskItem['severity'], 'successSoft' | 'warningSoft' | 'errorSoft'> = {
  low: 'successSoft',
  medium: 'warningSoft',
  high: 'errorSoft',
};

const severityIcon: Record<RiskItem['severity'], typeof AlertTriangle> = {
  low: Shield,
  medium: AlertTriangle,
  high: ShieldAlert,
};

export function RiskCard({ risk }: Props) {
  const { theme } = useAppTheme();
  const colorKey = severityColor[risk.severity];
  const softKey = severitySoft[risk.severity];
  const Icon = severityIcon[risk.severity];

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors[softKey],
          borderColor: theme.colors[colorKey] + '22',
        },
      ]}
    >
      <View style={styles.header}>
        <Icon size={18} color={theme.colors[colorKey]} strokeWidth={2} />
        <Text
          style={{
            color: theme.colors.textPrimary,
            fontSize: theme.fontSize.body,
            fontWeight: theme.fontWeight.semibold,
            flex: 1,
          }}
        >
          {risk.title}
        </Text>
        <View
          style={[
            styles.badge,
            { backgroundColor: theme.colors[colorKey] },
          ]}
        >
          <Text
            style={{
              color: '#fff',
              fontSize: 10,
              fontWeight: theme.fontWeight.bold,
              textTransform: 'uppercase',
            }}
          >
            {risk.severity}
          </Text>
        </View>
      </View>
      <Text
        style={{
          color: theme.colors.textSecondary,
          fontSize: theme.fontSize.body - 1,
          lineHeight: 21,
          marginTop: 8,
        }}
      >
        {risk.explanation}
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
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 999,
  },
});
