import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useHaptics } from '@/hooks/useHaptics';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const haptics = useHaptics();

  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!email.trim() || !email.includes('@')) return;
    haptics.notify('success');
    setSent(true);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
            <View style={styles.container}>
              <Pressable
                onPress={() => {
                  haptics.impact('light');
                  router.replace('/(auth)/sign-in');
                }}
                hitSlop={12}
                style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1, flexDirection: 'row', alignItems: 'center', gap: 4 })}
              >
                <ArrowLeft size={20} color={theme.colors.textSecondary} strokeWidth={2} />
                <Text style={{ color: theme.colors.textSecondary, fontSize: theme.fontSize.body }}>Back to sign in</Text>
              </Pressable>

              {sent ? (
                <View style={styles.sentWrap}>
                  <View style={[styles.iconWrap, { backgroundColor: theme.colors.successSoft }]}>
                    <CheckCircle size={32} color={theme.colors.success} strokeWidth={1.5} />
                  </View>
                  <Text
                    style={{
                      color: theme.colors.textPrimary,
                      fontSize: theme.fontSize.heading,
                      fontWeight: theme.fontWeight.bold,
                      marginTop: theme.spacing.lg,
                      textAlign: 'center',
                    }}
                  >
                    Check your email
                  </Text>
                  <Text
                    style={{
                      color: theme.colors.textSecondary,
                      fontSize: theme.fontSize.body,
                      marginTop: 8,
                      textAlign: 'center',
                      lineHeight: 22,
                    }}
                  >
                    If an account exists for {email}, you\u2019ll receive a reset link shortly.
                  </Text>
                  <Pressable
                    onPress={() => {
                      haptics.impact('light');
                      router.replace('/(auth)/sign-in');
                    }}
                    style={({ pressed }) => [
                      styles.primaryBtn,
                      { backgroundColor: theme.colors.primary, opacity: pressed ? 0.85 : 1 },
                    ]}
                  >
                    <Text style={{ color: '#fff', fontSize: theme.fontSize.bodyLg, fontWeight: theme.fontWeight.semibold }}>
                      Back to Sign In
                    </Text>
                  </Pressable>
                </View>
              ) : (
                <>
                  <Text
                    style={{
                      color: theme.colors.textPrimary,
                      fontSize: theme.fontSize.title,
                      fontWeight: theme.fontWeight.bold,
                      marginTop: theme.spacing.xl,
                    }}
                  >
                    Reset password
                  </Text>
                  <Text
                    style={{
                      color: theme.colors.textSecondary,
                      fontSize: theme.fontSize.body,
                      marginTop: 6,
                    }}
                  >
                    Enter your email and we\u2019ll send you a reset link.
                  </Text>

                  <View style={[styles.inputWrap, { borderColor: theme.colors.border, backgroundColor: theme.colors.surface }]}>
                    <Mail size={18} color={theme.colors.textTertiary} strokeWidth={2} />
                    <TextInput
                      style={{
                        flex: 1,
                        color: theme.colors.textPrimary,
                        fontSize: theme.fontSize.body,
                        marginLeft: 10,
                        paddingVertical: 14,
                      }}
                      placeholder="Email"
                      placeholderTextColor={theme.colors.textTertiary}
                      value={email}
                      onChangeText={setEmail}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      textContentType="emailAddress"
                    />
                  </View>

                  <Pressable
                    onPress={handleSend}
                    disabled={!email.trim()}
                    style={({ pressed }) => [
                      styles.primaryBtn,
                      {
                        backgroundColor: email.trim() ? theme.colors.primary : theme.colors.borderStrong,
                        opacity: pressed ? 0.85 : 1,
                      },
                    ]}
                  >
                    <Text style={{ color: '#fff', fontSize: theme.fontSize.bodyLg, fontWeight: theme.fontWeight.semibold }}>
                      Send Reset Link
                    </Text>
                    <ArrowRight size={18} color="#fff" strokeWidth={2} />
                  </Pressable>
                </>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    gap: 12,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sentWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    marginTop: 4,
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 8,
  },
});
