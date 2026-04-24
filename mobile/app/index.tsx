import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BodySilhouette } from '@/components/BodySilhouette';
import { Body, Muted, Pill, PrimaryButton } from '@/components/ui';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/fonts';

export default function OnboardingScreen() {
  const glow = useRef(new Animated.Value(0)).current;
  const arrow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glow, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(glow, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(arrow, {
          toValue: 1,
          duration: 750,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(arrow, {
          toValue: 0,
          duration: 750,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [arrow, glow]);

  const glowScale = glow.interpolate({ inputRange: [0, 1], outputRange: [1, 1.15] });
  const glowOpacity = glow.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] });
  const arrowTx = arrow.interpolate({ inputRange: [0, 1], outputRange: [0, 4] });
  const arrowOpacity = arrow.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] });

  return (
    <View style={{ flex: 1, backgroundColor: colors.dark }}>
      <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
          <LinearGradient
            colors={['#1a2a0a', '#0a0f05', colors.black]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.hero}
          >
            <Animated.View
              style={[
                styles.glow,
                { opacity: glowOpacity, transform: [{ scale: glowScale }] },
              ]}
            />
            <View style={styles.figures}>
              <View style={styles.fig}>
                <BodySilhouette variant="before" />
                <Text style={[styles.figLabel, { color: colors.textFaint }]}>
                  Aujourd&apos;hui
                </Text>
              </View>
              <Animated.Text
                style={[styles.arrow, { opacity: arrowOpacity, transform: [{ translateX: arrowTx }] }]}
              >
                →
              </Animated.Text>
              <View style={styles.fig}>
                <BodySilhouette variant="after" />
                <Text style={[styles.figLabel, { color: colors.lime }]}>Glofit You</Text>
              </View>
            </View>
          </LinearGradient>

          <View style={styles.content}>
            <Text style={styles.logo}>
              Glo<Text style={{ color: colors.lime }}>fit</Text>
            </Text>
            <Muted style={{ marginTop: 8, lineHeight: 20 }}>
              Vois ton futur corps aujourd&apos;hui.{'\n'}Entraîne-toi avec ta communauté.
            </Muted>

            <View style={styles.pills}>
              <Pill active>🤖 IA Body Scan</Pill>
              <Pill active>📍 FitMap</Pill>
              <Pill active>🏋️ Coach Pro</Pill>
              <Pill active>🍎 Nutrition IA</Pill>
              <Pill active>💬 FitChat</Pill>
            </View>

            <PrimaryButton
              title="Commencer gratuitement →"
              style={{ marginTop: 24 }}
              onPress={() => router.replace('/(tabs)/home')}
            />
            <PrimaryButton
              title="J'ai déjà un compte"
              variant="secondary"
              style={{ marginTop: 10 }}
              onPress={() => router.replace('/(tabs)/home')}
            />

            <View style={{ marginTop: 20, alignItems: 'center' }}>
              <Body size={11} color={colors.textFaint}>
                ✦ Prototype — Avril 2026
              </Body>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(200,241,53,0.18)',
  },
  figures: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 28,
  },
  fig: {
    alignItems: 'center',
    gap: 8,
  },
  figLabel: {
    fontFamily: fonts.display,
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  arrow: {
    color: colors.lime,
    fontSize: 24,
    paddingBottom: 60,
  },
  content: {
    padding: 28,
  },
  logo: {
    fontFamily: fonts.displayHeavy,
    fontSize: 38,
    color: colors.text,
    letterSpacing: -1,
    lineHeight: 40,
  },
  pills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 20,
  },
});
