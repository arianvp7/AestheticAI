import { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import {
  ScanLine,
  Camera,
  Image as ImageIcon,
  Shield,
  CheckCircle2,
  Sparkles,
  AlertCircle,
} from 'lucide-react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useHaptics } from '@/hooks/useHaptics';
import { APP_CONFIG } from '@/constants/config';

export default function ScanScreen() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const haptics = useHaptics();
  const [consentGiven, setConsentGiven] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Camera permission needed', 'Please grant camera access to take a photo.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      setImageUri(result.assets[0].uri);
      haptics.impact('light');
    }
  };

  const choosePhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Photo library permission needed', 'Please grant photo library access to select an image.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      setImageUri(result.assets[0].uri);
      haptics.impact('light');
    }
  };

  const handleAnalyze = async () => {
    if (!imageUri) return;
    haptics.impact('medium');
    setAnalyzing(true);
    // Simulate analysis delay
    await new Promise((r) => setTimeout(r, 2000));
    setAnalyzing(false);
    haptics.notify('success');
    router.push('/scan/result');
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
              <View style={[styles.logoWrap, { backgroundColor: theme.colors.primarySoft }]}>
                <ScanLine size={20} color={theme.colors.primary} strokeWidth={2} />
              </View>
              <Text
                style={{
                  color: theme.colors.textPrimary,
                  fontSize: 13,
                  fontWeight: theme.fontWeight.semibold,
                  letterSpacing: 0.5,
                  textTransform: 'uppercase',
                }}
              >
                Face Scan
              </Text>
            </View>

            {/* Heading */}
            <Text
              style={{
                color: theme.colors.textPrimary,
                fontSize: theme.fontSize.display,
                fontWeight: theme.fontWeight.bold,
                lineHeight: 38,
                marginTop: theme.spacing.lg,
              }}
            >
              Understand your features
            </Text>
            <Text
              style={{
                color: theme.colors.textSecondary,
                fontSize: theme.fontSize.bodyLg,
                lineHeight: 24,
                marginTop: theme.spacing.sm,
              }}
            >
              Use facial analysis to identify features you may want to research further.
            </Text>

            {/* Privacy Disclosure */}
            {!consentGiven ? (
              <View
                style={[
                  styles.privacyCard,
                  { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
                ]}
              >
                <View style={[styles.privacyIcon, { backgroundColor: theme.colors.primarySoft }]}>
                  <Shield size={24} color={theme.colors.primary} strokeWidth={2} />
                </View>
                <Text
                  style={{
                    color: theme.colors.textPrimary,
                    fontSize: theme.fontSize.bodyLg,
                    fontWeight: theme.fontWeight.semibold,
                    marginTop: 12,
                  }}
                >
                  Your privacy is protected
                </Text>
                <Text
                  style={{
                    color: theme.colors.textSecondary,
                    fontSize: theme.fontSize.body,
                    lineHeight: 22,
                    marginTop: 8,
                  }}
                >
                  Your photo is sent securely for analysis and is not permanently stored. Temporary image data is discarded after analysis unless you choose to save something. Your photos are never shared.
                </Text>
                <Pressable
                  onPress={() => {
                    haptics.impact('medium');
                    setConsentGiven(true);
                  }}
                  style={({ pressed }) => [
                    styles.consentBtn,
                    { backgroundColor: theme.colors.primary, opacity: pressed ? 0.85 : 1 },
                  ]}
                >
                  <CheckCircle2 size={18} color="#fff" strokeWidth={2} />
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: theme.fontSize.body,
                      fontWeight: theme.fontWeight.semibold,
                      marginLeft: 8,
                    }}
                  >
                    I Understand & Consent
                  </Text>
                </Pressable>
              </View>
            ) : (
              <>
                {/* Photo buttons */}
                {!imageUri ? (
                  <View style={{ gap: 12, marginTop: theme.spacing.lg }}>
                    <Pressable
                      onPress={takePhoto}
                      style={({ pressed }) => [
                        styles.photoBtn,
                        {
                          backgroundColor: theme.colors.primary,
                          opacity: pressed ? 0.85 : 1,
                        },
                      ]}
                    >
                      <Camera size={20} color="#fff" strokeWidth={2} />
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: theme.fontSize.bodyLg,
                          fontWeight: theme.fontWeight.semibold,
                          marginLeft: 10,
                        }}
                      >
                        Take Photo
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={choosePhoto}
                      style={({ pressed }) => [
                        styles.photoBtn,
                        {
                          backgroundColor: theme.colors.surface,
                          borderColor: theme.colors.border,
                          opacity: pressed ? 0.85 : 1,
                        },
                      ]}
                    >
                      <ImageIcon size={20} color={theme.colors.textPrimary} strokeWidth={2} />
                      <Text
                        style={{
                          color: theme.colors.textPrimary,
                          fontSize: theme.fontSize.bodyLg,
                          fontWeight: theme.fontWeight.semibold,
                          marginLeft: 10,
                        }}
                      >
                        Choose Photo
                      </Text>
                    </Pressable>
                  </View>
                ) : (
                  <>
                    {/* Preview + Analyze */}
                    <View
                      style={[
                        styles.previewWrap,
                        { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
                      ]}
                    >
                      <Image source={{ uri: imageUri }} style={styles.previewImage} resizeMode="cover" />
                    </View>
                    {!analyzing ? (
                      <View style={{ gap: 12, marginTop: 16 }}>
                        <Pressable
                          onPress={handleAnalyze}
                          style={({ pressed }) => [
                            styles.photoBtn,
                            { backgroundColor: theme.colors.primary, opacity: pressed ? 0.85 : 1 },
                          ]}
                        >
                          <Sparkles size={20} color="#fff" strokeWidth={2} />
                          <Text
                            style={{
                              color: '#fff',
                              fontSize: theme.fontSize.bodyLg,
                              fontWeight: theme.fontWeight.semibold,
                              marginLeft: 10,
                            }}
                          >
                            Analyze Features
                          </Text>
                        </Pressable>
                        <Pressable
                          onPress={() => {
                            haptics.impact('light');
                            setImageUri(null);
                          }}
                          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
                        >
                          <Text
                            style={{
                              color: theme.colors.textSecondary,
                              fontSize: theme.fontSize.body,
                              textAlign: 'center',
                            }}
                          >
                            Choose a different photo
                          </Text>
                        </Pressable>
                      </View>
                    ) : (
                      <View style={styles.analyzingWrap}>
                        <ScanLine size={32} color={theme.colors.primary} strokeWidth={2} />
                        <Text
                          style={{
                            color: theme.colors.textPrimary,
                            fontSize: theme.fontSize.bodyLg,
                            fontWeight: theme.fontWeight.semibold,
                            marginTop: 12,
                          }}
                        >
                          Analyzing your features...
                        </Text>
                        <Text
                          style={{
                            color: theme.colors.textSecondary,
                            fontSize: theme.fontSize.body,
                            marginTop: 4,
                          }}
                        >
                          This takes a few seconds.
                        </Text>
                      </View>
                    )}
                  </>
                )}

                {/* Mock data notice */}
                <View
                  style={[
                    styles.mockNotice,
                    { backgroundColor: theme.colors.warningSoft },
                  ]}
                >
                  <AlertCircle size={16} color={theme.colors.warning} strokeWidth={2} />
                  <Text
                    style={{
                      color: theme.colors.warning,
                      fontSize: theme.fontSize.caption,
                      marginLeft: 8,
                      flex: 1,
                    }}
                  >
                    Mock mode: Analysis results are simulated for development. Real Face++ integration will be added later.
                  </Text>
                </View>
              </>
            )}

            {/* Disclaimer */}
            <Text
              style={{
                color: theme.colors.textTertiary,
                fontSize: theme.fontSize.caption,
                marginTop: theme.spacing.xl,
                textAlign: 'center',
                paddingHorizontal: theme.spacing.lg,
              }}
            >
              Educational information only. Not medical advice. Facial analysis identifies features for research purposes only.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  privacyCard: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 24,
    alignItems: 'center',
  },
  privacyIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  consentBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    marginTop: 20,
  },
  photoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  previewWrap: {
    marginTop: 24,
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  previewImage: {
    width: 280,
    height: 280,
  },
  analyzingWrap: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  mockNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginTop: 20,
  },
});
