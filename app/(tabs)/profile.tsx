import { useState, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';
import {
  User,
  Moon,
  Sun,
  Monitor,
  Shield,
  Info,
  LogOut,
  ChevronRight,
  Trash2,
  Sparkles,
} from 'lucide-react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useHaptics } from '@/hooks/useHaptics';
import { useAuth } from '@/hooks/useAuth';
import type { ThemeMode } from '@/lib/theme';

const THEME_OPTIONS: { label: string; value: ThemeMode; icon: typeof Sun }[] = [
  { label: 'System', value: 'system', icon: Monitor },
  { label: 'Light', value: 'light', icon: Sun },
  { label: 'Dark', value: 'dark', icon: Moon },
];

export default function ProfileScreen() {
  const router = useRouter();
  const { theme, mode, setMode, isDark } = useAppTheme();
  const haptics = useHaptics();
  const { user, signOut, isMock } = useAuth();

  const handleSignOut = () => {
    Alert.alert('Sign out?', 'You will be returned to the sign-in screen.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          haptics.impact('medium');
          await signOut();
          router.replace('/(auth)/sign-in');
        },
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete account?',
      'This will permanently delete your account and all saved data. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            haptics.notify('error');
            await signOut();
            router.replace('/(auth)/sign-up');
          },
        },
      ],
    );
  };

  const displayName = user?.display_name || 'Guest';
  const email = user?.email || 'Not signed in';

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 48, paddingTop: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile header */}
          <View
            style={[
              styles.profileCard,
              { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
            ]}
          >
            <View
              style={[
                styles.avatar,
                { backgroundColor: theme.colors.primarySoft },
              ]}
            >
              <Text style={{ color: theme.colors.primary, fontSize: 24, fontWeight: theme.fontWeight.bold }}>
                {displayName.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text
                style={{
                  color: theme.colors.textPrimary,
                  fontSize: theme.fontSize.bodyLg,
                  fontWeight: theme.fontWeight.bold,
                }}
              >
                {displayName}
              </Text>
              <Text
                style={{
                  color: theme.colors.textSecondary,
                  fontSize: theme.fontSize.body - 1,
                  marginTop: 2,
                }}
              >
                {email}
              </Text>
              {isMock ? (
                <View style={[styles.mockBadge, { backgroundColor: theme.colors.warningSoft }]}>
                  <Text style={{ color: theme.colors.warning, fontSize: 10, fontWeight: theme.fontWeight.semibold }}>
                    DEV MODE
                  </Text>
                </View>
              ) : null}
            </View>
          </View>

          {/* Appearance */}
          <Text style={styles.sectionLabel}>Appearance</Text>
          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 4 }}>
            {THEME_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const active = mode === opt.value;
              return (
                <Pressable
                  key={opt.value}
                  onPress={() => {
                    haptics.selection();
                    setMode(opt.value);
                  }}
                  style={({ pressed }) => [
                    styles.themeBtn,
                    {
                      backgroundColor: active ? theme.colors.primarySoft : theme.colors.surface,
                      borderColor: active ? theme.colors.primary : theme.colors.border,
                      opacity: pressed ? 0.7 : 1,
                    },
                  ]}
                >
                  <Icon size={18} color={active ? theme.colors.primary : theme.colors.textSecondary} strokeWidth={2} />
                  <Text
                    style={{
                      color: active ? theme.colors.primary : theme.colors.textSecondary,
                      fontSize: theme.fontSize.body - 1,
                      fontWeight: active ? theme.fontWeight.semibold : theme.fontWeight.regular,
                      marginTop: 6,
                    }}
                  >
                    {opt.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Settings */}
          <Text style={[styles.sectionLabel, { marginTop: 28 }]}>Settings</Text>
          <View
            style={[
              styles.settingsCard,
              { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
            ]}
          >
            <SettingRow icon={Shield} label="Privacy" theme={theme} onPress={() => haptics.impact('light')} />
            <Divider theme={theme} />
            <SettingRow icon={Info} label="About" theme={theme} onPress={() => haptics.impact('light')} />
            <Divider theme={theme} />
            <SettingRow
              icon={Sparkles}
              label="Educational Disclaimer"
              theme={theme}
              onPress={() => haptics.impact('light')}
            />
          </View>

          {/* Account */}
          <Text style={[styles.sectionLabel, { marginTop: 28 }]}>Account</Text>
          <View
            style={[
              styles.settingsCard,
              { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
            ]}
          >
            <Pressable
              onPress={handleSignOut}
              style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }, styles.settingRow]}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <View style={[styles.settingIcon, { backgroundColor: theme.colors.surfaceSecondary }]}>
                  <LogOut size={18} color={theme.colors.textSecondary} strokeWidth={2} />
                </View>
                <Text style={{ color: theme.colors.textPrimary, fontSize: theme.fontSize.body, fontWeight: theme.fontWeight.medium }}>
                  Sign Out
                </Text>
              </View>
              <ChevronRight size={18} color={theme.colors.textTertiary} strokeWidth={2} />
            </Pressable>
            <Divider theme={theme} />
            <Pressable
              onPress={handleDeleteAccount}
              style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }, styles.settingRow]}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <View style={[styles.settingIcon, { backgroundColor: theme.colors.errorSoft }]}>
                  <Trash2 size={18} color={theme.colors.error} strokeWidth={2} />
                </View>
                <Text style={{ color: theme.colors.error, fontSize: theme.fontSize.body, fontWeight: theme.fontWeight.medium }}>
                  Delete Account
                </Text>
              </View>
            </Pressable>
          </View>

          {/* Footer */}
          <Text
            style={{
              color: theme.colors.textTertiary,
              fontSize: theme.fontSize.caption,
              textAlign: 'center',
              marginTop: 32,
            }}
          >
            Version 1.0.0
          </Text>
          <Text
            style={{
              color: theme.colors.textTertiary,
              fontSize: theme.fontSize.caption,
              textAlign: 'center',
              marginTop: 4,
            }}
          >
            Educational information only. Not medical advice.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function SettingRow({
  icon: Icon,
  label,
  theme,
  onPress,
}: {
  icon: typeof Info;
  label: string;
  theme: ReturnType<typeof useAppTheme>['theme'];
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }, styles.settingRow]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View style={[styles.settingIcon, { backgroundColor: theme.colors.surfaceSecondary }]}>
          <Icon size={18} color={theme.colors.textSecondary} strokeWidth={2} />
        </View>
        <Text style={{ color: theme.colors.textPrimary, fontSize: theme.fontSize.body, fontWeight: theme.fontWeight.medium }}>
          {label}
        </Text>
      </View>
      <ChevronRight size={18} color={theme.colors.textTertiary} strokeWidth={2} />
    </Pressable>
  );
}

function Divider({ theme }: { theme: ReturnType<typeof useAppTheme>['theme'] }) {
  return <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: theme.colors.border, marginLeft: 48 }} />;
}

const styles = StyleSheet.create({
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mockBadge: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
    marginTop: 4,
  },
  themeBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  settingsCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  settingIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
