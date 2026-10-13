import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { checkIOSCompatibility } from '@/lib/ios-compatibility';

const BRAND_LOGO = require('@/assets/images/brand-logo.png');

export default function StartupScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const spin = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0.08)).current;
  const brandScale = useRef(new Animated.Value(0.94)).current;
  const brandOpacity = useRef(new Animated.Value(1)).current;
  const brandOffset = useRef(new Animated.Value(0)).current;
  const [step, setStep] = useState('Đang khởi tạo thiết bị');

  useEffect(() => {
    const spinLoop = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 1450,
        useNativeDriver: true,
      }),
    );
    spinLoop.start();

    const checkTimer = setTimeout(() => {
      checkIOSCompatibility();
      setStep('Đang đối chiếu phiên bản iOS');
      Animated.timing(progress, {
        toValue: 0.72,
        duration: 820,
        useNativeDriver: false,
      }).start();
    }, 650);

    const finishTimer = setTimeout(() => {
      setStep('Đã hoàn tất kiểm tra');
      Animated.parallel([
        Animated.timing(progress, {
          toValue: 1,
          duration: 420,
          useNativeDriver: false,
        }),
        Animated.timing(brandOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(brandScale, {
          toValue: 0.44,
          duration: 520,
          useNativeDriver: true,
        }),
        Animated.timing(brandOffset, {
          toValue: -24,
          duration: 520,
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (finished) {
          router.replace('/(tabs)');
        }
      });
    }, 1720);

    return () => {
      clearTimeout(checkTimer);
      clearTimeout(finishTimer);
      spinLoop.stop();
    };
  }, [brandOpacity, brandOffset, brandScale, progress, router, spin]);

  const spinStyle = {
    transform: [
      {
        rotate: spin.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };
  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['8%', '100%'],
  });
  const webInsets =
    Platform.OS === 'web'
      ? { paddingTop: Math.max(insets.top, 54), paddingBottom: 20 }
      : undefined;

  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      style={[styles.safeArea, { backgroundColor: colors.background }, webInsets]}
    >
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.brandBlock}>
          <View style={styles.orbit}>
            <View style={[styles.orbitTrack, { borderColor: colors.border }]} />
            <Animated.View style={[styles.orbitSpinner, spinStyle]}>
              <View
                style={[
                  styles.orbitHighlight,
                  { backgroundColor: colors.primary },
                ]}
              />
            </Animated.View>
            <Animated.View
              style={[
                styles.logoWell,
                {
                  borderColor: colors.border,
                    backgroundColor: colors.card,
                    shadowColor: colors.primary,
                  transform: [{ scale: brandScale }],
                },
              ]}
            >
              <Image
                accessibilityLabel="Logo Aujunpeak"
                source={BRAND_LOGO}
                resizeMode="contain"
                style={styles.logo}
              />
            </Animated.View>
          </View>
          <Animated.Text
            style={[
              styles.wordmark,
              {
                color: colors.foreground,
                opacity: brandOpacity,
                transform: [
                  { scale: brandScale },
                  { translateY: brandOffset },
                ],
              },
            ]}
          >
            Aujunpeak
          </Animated.Text>
          <Text style={[styles.caption, { color: colors.mutedForeground }]}>
            DEVICE COMPATIBILITY
          </Text>
        </View>

        <View style={styles.statusBlock}>
          <View style={styles.statusLine}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: colors.success },
              ]}
            />
            <Text style={[styles.statusText, { color: colors.foreground }]}>
              {step}
            </Text>
            <Feather name="activity" size={16} color={colors.primary} />
          </View>
          <View style={[styles.progressTrack, { backgroundColor: colors.muted }]}>
            <Animated.View
              style={[
                styles.progressFill,
                { backgroundColor: colors.primary, width: progressWidth },
              ]}
            />
          </View>
          <Text style={[styles.footer, { color: colors.mutedForeground }]}>
            Chỉ đọc thông tin hệ điều hành trên thiết bị
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    paddingTop: 34,
    paddingBottom: 28,
  },
  brandBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  orbit: {
    width: 192,
    height: 192,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },
  orbitTrack: {
    ...StyleSheet.absoluteFill,
    borderWidth: 1.5,
    borderRadius: 96,
  },
  orbitSpinner: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
  },
  orbitHighlight: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 2,
    shadowOpacity: 0.45,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
  logoWell: {
    width: 156,
    height: 156,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 44,
    overflow: 'hidden',
    shadowOpacity: 0.13,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  wordmark: {
    fontSize: 31,
    fontWeight: '700',
    letterSpacing: -1.3,
  },
  caption: {
    marginTop: 8,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2.6,
  },
  statusBlock: {
    width: '100%',
    maxWidth: 420,
  },
  statusLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  progressTrack: {
    height: 5,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  footer: {
    marginTop: 14,
    textAlign: 'center',
    fontSize: 11,
  },
});
