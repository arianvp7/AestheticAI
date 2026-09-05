import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, Lock, ArrowRight, Sparkles } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useHaptics } from '@/hooks/useHaptics';
import { useAuth } from '@/hooks/useAuth';

export default function SignInScreen() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const haptics = useHaptics();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email.');
      return;
    }
    setError(null);
    haptics.notify('success');
    await signIn(email.trim());
    router.replace('/(tabs)');
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.container}>
              <View
                style={[
                  styles.logoWrap,
                  { backgroundColor: theme.colors.primarySoft },
                ]}
              >
                <Sparkles size={28} color={theme.colors.primary} strokeWidth={1.5} />
              </View>

              <Text
                style={{
                  color: theme.colors.textPrimary,
                  fontSize: theme.fontSize.title,
                  fontWeight: theme.fontWeight.bold,
                  marginTop: theme.spacing.lg,
                }}
              >
                Welcome back
              </Text>
              <Text
                style={{
                  color: theme.colors.textSecondary,
                  fontSize: theme.fontSize.body,
                  marginTop: 6,
                }}
              >
                Sign in to continue your research.
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

              <View style={[styles.inputWrap, { borderColor: theme.colors.border, backgroundColor: theme.colors.surface }]}>
                <Lock size={18} color={theme.colors.textTertiary} strokeWidth={2} />
                <TextInput
                  style={{
                    flex: 1,
                    color: theme.colors.textPrimary,
                    fontSize: theme.fontSize.body,
                    marginLeft: 10,
                    paddingVertical: 14,
                  }}
                  placeholder="Password"
                  placeholderTextColor={theme.colors.textTertiary}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  textContentType="password"
                />
              </View>

              {error ? (
                <Text style={{ color: theme.colors.error, fontSize: theme.fontSize.body - 1, marginTop: 4 }}>
                  {error}
                </Text>
              ) : null}

              <Pressable
                onPress={handleSignIn}
                style={({ pressed }) => [
                  styles.primaryBtn,
                  { backgroundColor: theme.colors.primary, opacity: pressed ? 0.85 : 1 },
                ]}
              >
                <Text style={{ color: '#fff', fontSize: theme.fontSize.bodyLg, fontWeight: theme.fontWeight.semibold }}>
                  Sign In
                </Text>
                <ArrowRight size={18} color="#fff" strokeWidth={2} />
              </Pressable>

              <Pressable
                onPress={() => {
                  haptics.impact('light');
                  router.replace('/(auth)/forgot-password');
                }}
                style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
              >
                <Text
                  style={{
                    color: theme.colors.textSecondary,
                    fontSize: theme.fontSize.body,
                    marginTop: theme.spacing.md,
                    textAlign: 'center',
                  }}
                >
                  Forgot password?
                </Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  haptics.impact('light');
                  router.replace('/(auth)/sign-up');
                }}
                style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
              >
                <Text
                  style={{
                    color: theme.colors.textSecondary,
                    fontSize: theme.fontSize.body,
                    marginTop: theme.spacing.md,
                    textAlign: 'center',
                  }}
                >
                  Don\u2019t have an account?{' '}
                  <Text style={{ color: theme.colors.primary, fontWeight: theme.fontWeight.semibold }}>
                    Sign Up
                  </Text>
                </Text>
              </Pressable>
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
    paddingTop: 32,
    paddingBottom: 24,
    gap: 12,
  },
  logoWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
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
