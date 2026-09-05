import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ExternalLink, FileText, FlaskConical, Landmark, Stethoscope } from 'lucide-react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useHaptics } from '@/hooks/useHaptics';
import type { SourceResult } from '@/lib/types';

interface Props {
  source: SourceResult;
  onOpen: () => void;
}

const typeIcon: Record<SourceResult['sourceType'], typeof Stethoscope> = {
  medical: Stethoscope,
  research: FlaskConical,
  government: Landmark,
  general: FileText,
};

const typeLabel: Record<SourceResult['sourceType'], string> = {
  medical: 'Medical',
  research: 'Research',
  government: 'Government',
  general: 'Informational',
};

const typeColor: Record<SourceResult['sourceType'], 'primary' | 'info' | 'accent' | 'secondary'> = {
  medical: 'primary',
  research: 'info',
  government: 'accent',
  general: 'secondary',
};

const typeSoft: Record<SourceResult['sourceType'], 'primarySoft' | 'infoSoft' | 'accentSoft' | 'secondarySoft'> = {
  medical: 'primarySoft',
  research: 'infoSoft',
  government: 'accentSoft',
  general: 'secondarySoft',
};

export function SourceCard({ source, onOpen }: Props) {
  const { theme } = useAppTheme();
  const haptics = useHaptics();
  const Icon = typeIcon[source.sourceType];
  const colorKey = typeColor[source.sourceType];
  const softKey = typeSoft[source.sourceType];

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
      <View style={styles.header}>
        <View
          style={[
            styles.iconWrap,
            { backgroundColor: theme.colors[softKey] },
          ]}
        >
          <Icon size={14} color={theme.colors[colorKey]} strokeWidth={2} />
        </View>
        <Text
          style={{
            color: theme.colors[colorKey],
            fontSize: theme.fontSize.caption,
            fontWeight: theme.fontWeight.semibold,
          }}
        >
          {typeLabel[source.sourceType]}
        </Text>
        <View style={{ flex: 1 }} />
        <Text
          style={{
            color: theme.colors.textTertiary,
            fontSize: theme.fontSize.caption,
          }}
        >
          {source.domain}
        </Text>
      </View>

      <Text
        style={{
          color: theme.colors.textPrimary,
          fontSize: theme.fontSize.body,
          fontWeight: theme.fontWeight.semibold,
          lineHeight: 21,
          marginTop: 10,
        }}
        numberOfLines={2}
      >
        {source.title}
      </Text>

      <Text
        style={{
          color: theme.colors.textSecondary,
          fontSize: theme.fontSize.body - 1,
          lineHeight: 20,
          marginTop: 6,
        }}
        numberOfLines={3}
      >
        {source.explanation}
      </Text>

      <Pressable
        onPress={() => {
          haptics.impact('light');
          onOpen();
        }}
        style={({ pressed }) => [
          styles.openBtn,
          {
            backgroundColor: theme.colors.surfaceSecondary,
            opacity: pressed ? 0.7 : 1,
          },
        ]}
      >
        <ExternalLink size={14} color={theme.colors.textSecondary} strokeWidth={2} />
        <Text
          style={{
            color: theme.colors.textSecondary,
            fontSize: theme.fontSize.body - 1,
            fontWeight: theme.fontWeight.semibold,
            marginLeft: 6,
          }}
        >
          Open Source
        </Text>
      </Pressable>
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
  iconWrap: {
    width: 26,
    height: 26,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  openBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
});
