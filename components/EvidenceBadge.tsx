import { StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { ratingLabel } from '@/lib/validation';
import type { EvidenceRating } from '@/lib/types';

interface Props {
  rating: EvidenceRating;
  size?: 'sm' | 'md';
  style?: ViewStyle;
}

const ratingKey: Record<EvidenceRating, 'evidenceStrong' | 'evidenceModerate' | 'evidenceLimited' | 'evidenceUnsupported' | 'evidenceRisky'> = {
  strong: 'evidenceStrong',
  moderate: 'evidenceModerate',
  limited: 'evidenceLimited',
  unsupported: 'evidenceUnsupported',
  risky: 'evidenceRisky',
};

const ratingSoftKey: Record<EvidenceRating, 'successSoft' | 'infoSoft' | 'warningSoft' | 'surfaceSecondary' | 'errorSoft'> = {
  strong: 'successSoft',
  moderate: 'infoSoft',
  limited: 'warningSoft',
  unsupported: 'surfaceSecondary',
  risky: 'errorSoft',
};

const icon: Record<EvidenceRating, string> = {
  strong: '\u2713',
  moderate: '\u2248',
  limited: '?',
  unsupported: '\u2715',
  risky: '!',
};

export function EvidenceBadge({ rating, size = 'md', style }: Props) {
  const { theme } = useAppTheme();
  const color = theme.colors[ratingKey[rating]];
  const softColor = theme.colors[ratingSoftKey[rating]];
  const isSm = size === 'sm';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: softColor,
          paddingVertical: isSm ? 3 : 5,
          paddingHorizontal: isSm ? 8 : 10,
          borderRadius: theme.radius.sm,
        },
        style,
      ]}
    >
      <Text
        style={{
          color,
          fontSize: isSm ? theme.fontSize.caption : 13,
          fontWeight: theme.fontWeight.semibold,
          fontFamily: undefined,
        }}
      >
        {icon[rating]} {ratingLabel(rating)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
});
