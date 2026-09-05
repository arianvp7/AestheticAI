import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ExternalLink, MessageSquare } from 'lucide-react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useHaptics } from '@/hooks/useHaptics';
import { SaveButton } from './SaveButton';
import type { ThreadResult } from '@/lib/types';

interface Props {
  thread: ThreadResult;
  saved: boolean;
  onToggleSave: () => void;
  onOpen: () => void;
}

export function ThreadCard({ thread, saved, onToggleSave, onOpen }: Props) {
  const { theme } = useAppTheme();
  const haptics = useHaptics();

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
            { backgroundColor: theme.colors.secondarySoft },
          ]}
        >
          <MessageSquare size={14} color={theme.colors.textSecondary} strokeWidth={2} />
        </View>
        <Text
          style={{
            color: theme.colors.textTertiary,
            fontSize: theme.fontSize.caption,
            fontWeight: theme.fontWeight.medium,
          }}
        >
          {thread.domain}
        </Text>
        <View style={{ flex: 1 }} />
        <SaveButton saved={saved} onToggle={onToggleSave} size={18} />
      </View>

      <Text
        style={{
          color: theme.colors.textPrimary,
          fontSize: theme.fontSize.body,
          fontWeight: theme.fontWeight.semibold,
          lineHeight: 21,
          marginTop: 10,
        }}
        numberOfLines={3}
      >
        {thread.title}
      </Text>

      {thread.snippet ? (
        <Text
          style={{
            color: theme.colors.textSecondary,
            fontSize: theme.fontSize.body - 1,
            lineHeight: 20,
            marginTop: 6,
          }}
          numberOfLines={2}
        >
          {thread.snippet}
        </Text>
      ) : null}

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
          Open Discussion
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
    gap: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconWrap: {
    width: 24,
    height: 24,
    borderRadius: 6,
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
