import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

type ImpactStyle = 'light' | 'medium' | 'heavy';

export function useHaptics() {
  const impact = (style: ImpactStyle = 'light') => {
    if (Platform.OS === 'web') return;
    try {
      const mapping: Record<ImpactStyle, Haptics.ImpactFeedbackStyle> = {
        light: Haptics.ImpactFeedbackStyle.Light,
        medium: Haptics.ImpactFeedbackStyle.Medium,
        heavy: Haptics.ImpactFeedbackStyle.Heavy,
      };
      Haptics.impactAsync(mapping[style]);
    } catch {
      // no-op
    }
  };

  const notify = (type: 'success' | 'warning' | 'error' = 'success') => {
    if (Platform.OS === 'web') return;
    try {
      const mapping = {
        success: Haptics.NotificationFeedbackType.Success,
        warning: Haptics.NotificationFeedbackType.Warning,
        error: Haptics.NotificationFeedbackType.Error,
      };
      Haptics.notificationAsync(mapping[type]);
    } catch {
      // no-op
    }
  };

  const selection = () => {
    if (Platform.OS === 'web') return;
    try {
      Haptics.selectionAsync();
    } catch {
      // no-op
    }
  };

  return { impact, notify, selection };
}
