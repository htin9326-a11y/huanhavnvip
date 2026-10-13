import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import {
  checkIOSCompatibility,
  getDeviceIOSVersion,
  IOS_SUPPORT_MATRIX,
  type CompatibilityStatus,
} from '@/lib/ios-compatibility';

const BRAND_LOGO = require('@/assets/images/brand-logo.png');

export default function OverviewScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [refresh, setRefresh] = useState(0);
  const entrance = useRef(new Animated.Value(0)).current;
  const result = useMemo(
    () => checkIOSCompatibility(getDeviceIOSVersion()),
    [refresh],
  );

  useEffect(() => {
    entrance.setValue(0);
    Animated.timing(entrance, {
      toValue: 1,
      duration: 620,
      useNativeDriver: true,
    }).start();
  }, [entrance]);

  const animatedStyle = {
    opacity: entrance,
    transform: [
      {
        translateY: entrance.interpolate({
          inputRange: [0, 1],
          outputRange: [14, 0],
        }),
      },
    ],
  };

  const refreshStatus = () => {
    if (Platform.OS !== 'web') {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setRefresh((current) => current + 1);
  };

  const compatibilityColor = getStatusColor(result.status, colors);
  const webTopInset =
    Platform.OS === 'web' ? Math.max(insets.top, 56) : undefined;

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={[
        styles.safeArea,
        { backgroundColor: colors.background },
        webTopInset === undefined ? undefined : { paddingTop: webTopInset },
      ]}
    >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View style={animatedStyle}>
          <View style={styles.header}>
            <View style={styles.brand}>
              <Image
                accessibilityLabel="Aujunpeak"
                source={BRAND_LOGO}
                resizeMode="contain"
                style={styles.brandLogo}
              />
              <View>
                <Text style={[styles.brandName, { color: colors.foreground }]}>
                  Aujunpeak
                </Text>
                <Text
                  style={[
                    styles.brandCaption,
                    { color: colors.mutedForeground },
                  ]}
                >
                  iOS DEVICE CHECK
                </Text>
              </View>
            </View>
            <Pressable
              accessibilityLabel="Kiểm tra lại phiên bản iOS"
              accessibilityRole="button"
              onPress={refreshStatus}
              style={({ pressed }) => [
                styles.refreshButton,
                { borderColor: colors.border, backgroundColor: colors.card },
                pressed && styles.pressed,
              ]}
            >
              <Feather name="refresh-cw" size={17} color={colors.primary} />
            </Pressable>
          </View>

          <View style={styles.intro}>
            <Text style={[styles.eyebrow, { color: colors.primary }]}>
              KIỂM TRA THIẾT BỊ
            </Text>
            <Text style={[styles.title, { color: colors.foreground }]}>
              Phiên bản iOS
              {'\n'}
              của bạn.
            </Text>
          </View>

          <LinearGradient
            colors={[colors.heroStart, colors.heroMiddle, colors.heroEnd]}
            start={{ x: 0, y: 0.2 }}
            end={{ x: 1, y: 1 }}
            style={styles.hero}
          >
            <View
              style={[
                styles.heroDecoration,
                { borderColor: colors.heroLine },
              ]}
            />
            <View
              style={[
                styles.heroDecorationSmall,
                { backgroundColor: colors.heroDecoration },
              ]}
            />
            <View style={styles.heroHeader}>
              <View style={styles.heroLabelWrap}>
                <Text
                  style={[styles.heroLabel, { color: colors.heroMuted }]}
                >
                  HỆ ĐIỀU HÀNH PHÁT HIỆN
                </Text>
                <Text style={[styles.heroVersion, { color: colors.white }]}>
                  {result.version ? `iOS ${result.version}` : 'Chưa có dữ liệu'}
                </Text>
              </View>
              <View
                style={[
                  styles.heroIcon,
                  {
                    borderColor: colors.heroSurfaceBorder,
                    backgroundColor: colors.heroSurface,
                  },
                ]}
              >
                <Feather
                  name={result.status === 'supported' ? 'check' : 'smartphone'}
                  size={20}
                  color={colors.white}
                />
              </View>
            </View>
            <View
              style={[styles.heroDivider, { backgroundColor: colors.heroLine }]}
            />
            <View style={styles.heroFooter}>
              <View
                style={[styles.onlineDot, { backgroundColor: compatibilityColor }]}
              />
              <Text style={[styles.heroStatus, { color: colors.heroText }]}>
                {result.title}
              </Text>
            </View>
            <Text
              style={[styles.heroDescription, { color: colors.heroMuted }]}
            >
              {result.description}
            </Text>
          </LinearGradient>

          <View style={styles.sectionHeading}>
            <View style={styles.sectionHeadingText}>
              <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
                Dải phiên bản tham chiếu
              </Text>
              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.mutedForeground },
                ]}
              >
                Các bản iOS đã được đối chiếu
              </Text>
            </View>
            <View
              style={[
                styles.shieldBadge,
                { backgroundColor: colors.softBlue },
              ]}
            >
              <Feather name="shield" size={16} color={colors.primary} />
            </View>
          </View>

          <View
            style={[
              styles.matrixCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                shadowColor: colors.cardShadow,
              },
            ]}
          >
            {IOS_SUPPORT_MATRIX.map((item, index) => {
              const active = result.version?.startsWith(`${item.major}.`);
              return (
                <View
                  key={item.title}
                  style={[
                    styles.matrixRow,
                    index !== IOS_SUPPORT_MATRIX.length - 1 && {
                      borderBottomColor: colors.border,
                      borderBottomWidth: StyleSheet.hairlineWidth,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.matrixIcon,
                      {
                        backgroundColor: active
                          ? colors.softBlue
                          : colors.muted,
                      },
                    ]}
                  >
                    <Feather
                      name={item.status === 'supported' ? 'check' : 'info'}
                      size={15}
                      color={active ? colors.primary : colors.mutedForeground}
                    />
                  </View>
                  <View style={styles.matrixCopy}>
                    <View style={styles.matrixTitleLine}>
                      <Text
                        style={[
                          styles.matrixTitle,
                          { color: colors.foreground },
                        ]}
                      >
                        {item.title}
                      </Text>
                      {active && (
                        <View
                          style={[
                            styles.currentPill,
                            { backgroundColor: colors.softBlue },
                          ]}
                        >
                          <Text
                            style={[
                              styles.currentPillText,
                              { color: colors.primary },
                            ]}
                          >
                            HIỆN TẠI
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text
                      style={[
                        styles.matrixVersions,
                        { color: colors.mutedForeground },
                      ]}
                    >
                      {item.versions}
                    </Text>
                    {item.major === 27 && (
                      <Text
                        style={[
                          styles.buildCodes,
                          { color: colors.mutedForeground },
                        ]}
                      >
                        {item.detail}
                      </Text>
                    )}
                  </View>
                  <View
                    style={[
                      styles.matrixStatus,
                      {
                        backgroundColor:
                          item.status === 'supported'
                            ? colors.successBackground
                            : colors.warningBackground,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.matrixStatusText,
                        {
                          color:
                            item.status === 'supported'
                              ? colors.success
                              : colors.warning,
                        },
                      ]}
                    >
                      {item.status === 'supported' ? 'Có' : 'Build'}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          <View
            style={[
              styles.notice,
              {
                borderColor: colors.border,
                backgroundColor: colors.card,
              },
            ]}
          >
            <Feather
              name="info"
              size={17}
              color={colors.mutedForeground}
              style={styles.noticeIcon}
            />
            <Text style={[styles.noticeText, { color: colors.mutedForeground }]}>
              Đây là thông tin tham chiếu về phiên bản iOS. Bản xem trước này
              chỉ đọc hệ điều hành; không thử truy cập sandbox hay chạy công cụ
              hệ thống.
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

function getStatusColor(
  status: CompatibilityStatus,
  colors: ReturnType<typeof useColors>,
) {
  if (status === 'supported') {
    return colors.success;
  }
  if (status === 'build-required') {
    return colors.warning;
  }
  return colors.primary;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 112,
    width: '100%',
    maxWidth: 620,
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },
  brandLogo: {
    width: 45,
    height: 45,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
  },
  brandName: {
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  brandCaption: {
    marginTop: 3,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.4,
  },
  refreshButton: {
    width: 42,
    height: 42,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.74,
    transform: [{ scale: 0.96 }],
  },
  intro: {
    marginBottom: 20,
  },
  eyebrow: {
    marginBottom: 9,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.8,
  },
  title: {
    fontSize: 32,
    lineHeight: 37,
    fontWeight: '700',
    letterSpacing: -1.2,
  },
  hero: {
    minHeight: 184,
    borderRadius: 28,
    paddingHorizontal: 21,
    paddingVertical: 20,
    overflow: 'hidden',
    shadowOpacity: 0.2,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
  },
  heroDecoration: {
    position: 'absolute',
    width: 230,
    height: 230,
    borderRadius: 115,
    right: -83,
    top: -110,
    borderWidth: 1,
  },
  heroDecorationSmall: {
    position: 'absolute',
    width: 158,
    height: 158,
    borderRadius: 79,
    right: -24,
    top: -74,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroLabelWrap: {
    flex: 1,
  },
  heroLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.35,
  },
  heroVersion: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.7,
    marginTop: 8,
  },
  heroIcon: {
    width: 42,
    height: 42,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroDivider: {
    height: StyleSheet.hairlineWidth,
    marginTop: 17,
    marginBottom: 13,
  },
  heroFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  heroStatus: {
    fontSize: 13,
    fontWeight: '700',
  },
  heroDescription: {
    marginTop: 5,
    marginLeft: 15,
    fontSize: 10,
    lineHeight: 15,
  },
  sectionHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 13,
  },
  sectionHeadingText: {
    gap: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 11,
  },
  shieldBadge: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  matrixCard: {
    borderRadius: 22,
    borderWidth: 1,
    paddingHorizontal: 15,
    shadowOpacity: 0.04,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 5 },
  },
  matrixRow: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    paddingVertical: 12,
  },
  matrixIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  matrixCopy: {
    flex: 1,
    minWidth: 0,
  },
  matrixTitleLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    flexWrap: 'wrap',
  },
  matrixTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  currentPill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  currentPillText: {
    fontSize: 7,
    fontWeight: '800',
    letterSpacing: 0.7,
  },
  matrixVersions: {
    marginTop: 4,
    fontSize: 10,
    lineHeight: 14,
  },
  buildCodes: {
    marginTop: 3,
    fontSize: 8,
    lineHeight: 12,
  },
  matrixStatus: {
    minWidth: 42,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  matrixStatusText: {
    fontSize: 9,
    fontWeight: '700',
  },
  notice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderRadius: 17,
    paddingHorizontal: 13,
    paddingVertical: 12,
    marginTop: 15,
  },
  noticeIcon: {
    marginRight: 9,
    marginTop: 1,
  },
  noticeText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 15,
  },
});
