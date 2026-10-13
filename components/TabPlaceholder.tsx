import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';

const BRAND_LOGO = require('@/assets/images/brand-logo.png');

type TabPlaceholderProps = {
  title: string;
  icon: React.ComponentProps<typeof Feather>['name'];
};

export function TabPlaceholder({ title, icon }: TabPlaceholderProps) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
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
      <View style={styles.page}>
        <View style={styles.header}>
          <View style={styles.brand}>
            <Image
              accessibilityLabel="Aujunpeak"
              source={BRAND_LOGO}
              resizeMode="contain"
              style={styles.logo}
            />
            <Text style={[styles.brandName, { color: colors.foreground }]}>
              Aujunpeak
            </Text>
          </View>
          <View
            style={[styles.headerMark, { backgroundColor: colors.softBlue }]}
          >
            <Feather name="more-horizontal" size={19} color={colors.primary} />
          </View>
        </View>
        <View style={styles.emptyState}>
          <View
            style={[
              styles.iconBorder,
              { borderColor: colors.border, backgroundColor: colors.card },
            ]}
          >
            <LinearGradient
              colors={[colors.heroStart, colors.heroEnd]}
              style={styles.iconGradient}
            >
              <Feather name={icon} size={30} color={colors.white} />
            </LinearGradient>
          </View>
          <View
            style={[
              styles.comingSoon,
              { backgroundColor: colors.softBlue },
            ]}
          >
            <View
              style={[styles.comingSoonDot, { backgroundColor: colors.primary }]}
            />
            <Text style={[styles.comingSoonText, { color: colors.primary }]}>
              SẮP CÓ
            </Text>
          </View>
          <Text style={[styles.title, { color: colors.foreground }]}>
            {title}
          </Text>
          <Text style={[styles.description, { color: colors.mutedForeground }]}>
            Khu vực này đang để trống. Nội dung sẽ được bổ sung sau.
          </Text>
        </View>
        <Text style={[styles.footer, { color: colors.mutedForeground }]}>
          AUJUNPEAK · IOS DEVICE CHECK
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  page: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 18,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
  },
  brandName: {
    fontSize: 17,
    fontWeight: '700',
  },
  headerMark: {
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
  },
  iconBorder: {
    width: 106,
    height: 106,
    borderRadius: 34,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1756D4',
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  iconGradient: {
    width: 76,
    height: 76,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  comingSoon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    marginTop: 23,
  },
  comingSoonDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  comingSoonText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.1,
  },
  title: {
    marginTop: 14,
    fontSize: 23,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  description: {
    maxWidth: 260,
    textAlign: 'center',
    marginTop: 8,
    fontSize: 12,
    lineHeight: 18,
  },
  footer: {
    textAlign: 'center',
    fontSize: 8,
    fontWeight: '600',
    letterSpacing: 1.4,
  },
});
