import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Line } from 'react-native-svg';

import { ScreenHeader } from '@/components/ScreenHeader';
import { Body, Muted, Tag } from '@/components/ui';
import { fitpals, mapPins } from '@/data/mock';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/fonts';

export default function FitMapScreen() {
  const blink = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(blink, {
          toValue: 1,
          duration: 750,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(blink, {
          toValue: 0,
          duration: 750,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [blink]);

  const dotOpacity = blink.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.dark }} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <ScreenHeader
          title="FitMap"
          accent="📍"
          subtitle="Trouve des partenaires d'entraînement"
        />

        {/* Map */}
        <View style={styles.mapContainer}>
          {/* Grid lines */}
          <Svg style={StyleSheet.absoluteFill}>
            {[...Array(10)].map((_, i) => (
              <Line
                key={`h-${i}`}
                x1={0}
                y1={i * 40}
                x2={400}
                y2={i * 40}
                stroke="rgba(200,241,53,0.04)"
                strokeWidth={1}
              />
            ))}
            {[...Array(10)].map((_, i) => (
              <Line
                key={`v-${i}`}
                x1={i * 40}
                y1={0}
                x2={i * 40}
                y2={320}
                stroke="rgba(200,241,53,0.04)"
                strokeWidth={1}
              />
            ))}
          </Svg>

          {/* Roads */}
          <Svg style={[StyleSheet.absoluteFill, { opacity: 0.15 }]} viewBox="0 0 390 320">
            <Line x1="0" y1="120" x2="390" y2="140" stroke={colors.lime} strokeWidth={2} />
            <Line x1="0" y1="200" x2="390" y2="190" stroke={colors.lime} strokeWidth={1.5} />
            <Line x1="100" y1="0" x2="120" y2="320" stroke={colors.lime} strokeWidth={1.5} />
            <Line x1="260" y1="0" x2="240" y2="320" stroke={colors.lime} strokeWidth={2} />
            <Circle
              cx="195"
              cy="160"
              r="40"
              stroke={colors.lime}
              strokeWidth={1}
              fill="none"
              strokeDasharray="4 4"
            />
          </Svg>

          {/* Pins */}
          {mapPins.map((pin) => (
            <Pressable
              key={pin.id}
              style={[styles.pin, { top: pin.top, left: pin.left }]}
              onPress={() => !pin.isMe && router.push(`/chat/${pin.id}`)}
            >
              <View
                style={[
                  styles.pinAvatar,
                  {
                    borderColor: pin.isMe ? colors.accent : colors.lime,
                  },
                ]}
              >
                <Text style={{ fontSize: 18 }}>{pin.emoji}</Text>
              </View>
              <View style={styles.pinName}>
                <Text
                  style={{
                    fontFamily: fonts.bodyMedium,
                    fontSize: 10,
                    color: pin.isMe ? colors.accent : colors.text,
                  }}
                >
                  {pin.name}
                </Text>
              </View>
            </Pressable>
          ))}

          {/* Search overlay */}
          <View style={styles.mapTop}>
            <View style={styles.mapSearch}>
              <Text>🔍</Text>
              <Muted size={13}>Rechercher un sport…</Muted>
            </View>
            <View style={styles.mapFilter}>
              <Text style={{ fontSize: 16 }}>⚙️</Text>
            </View>
          </View>

          {/* Dispo button */}
          <View style={styles.disponBtn}>
            <Animated.View style={[styles.onlineDot, { opacity: dotOpacity }]} />
            <Text style={styles.disponText}>Dispo pour s&apos;entraîner</Text>
          </View>
        </View>

        <View style={styles.countRow}>
          <Text style={{ fontFamily: fonts.display, fontSize: 14, color: colors.text }}>
            5 FitPals dans ta zone
          </Text>
          <Muted size={12}>3 km ↗</Muted>
        </View>

        <View style={{ paddingHorizontal: 16 }}>
          {fitpals.map((pal) => (
            <Pressable
              key={pal.id}
              style={styles.nearbyCard}
              onPress={() => router.push(`/chat/${pal.id}`)}
            >
              <View style={[styles.nearbyAvatar, { backgroundColor: pal.bgColor }]}>
                <Text style={{ fontSize: 20 }}>{pal.emoji}</Text>
                <View
                  style={[
                    styles.onlineBadge,
                    pal.online === 'away' && { backgroundColor: colors.orange },
                  ]}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.nearbyName}>
                  {pal.name}, {pal.age}
                </Text>
                <View style={styles.nearbyMeta}>
                  <Tag variant="sport">
                    {pal.sportIcon} {pal.sport}
                  </Tag>
                  <Tag variant="goal">{pal.goal}</Tag>
                  <Body size={10} color={colors.textDim}>
                    {pal.distanceKm} km
                  </Body>
                </View>
              </View>
              <View style={styles.chatIconBtn}>
                <Text style={{ fontSize: 16 }}>💬</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    height: 320,
    backgroundColor: '#0f1a10',
    overflow: 'hidden',
    marginBottom: 8,
  },
  pin: {
    position: 'absolute',
    alignItems: 'center',
  },
  pinAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
  },
  pinName: {
    marginTop: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 6,
  },
  mapTop: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    gap: 8,
  },
  mapSearch: {
    flex: 1,
    backgroundColor: 'rgba(20,20,20,0.9)',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  mapFilter: {
    width: 42,
    height: 42,
    backgroundColor: 'rgba(200,241,53,0.9)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disponBtn: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    backgroundColor: colors.lime,
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.green,
  },
  disponText: {
    fontFamily: fonts.display,
    fontSize: 12,
    color: colors.black,
  },
  countRow: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nearbyCard: {
    backgroundColor: colors.card,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  nearbyAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.green,
    borderWidth: 2,
    borderColor: colors.card,
  },
  nearbyName: {
    fontFamily: fonts.display,
    fontSize: 14,
    color: colors.text,
  },
  nearbyMeta: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 4,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  chatIconBtn: {
    width: 36,
    height: 36,
    backgroundColor: 'rgba(200,241,53,0.15)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(200,241,53,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
