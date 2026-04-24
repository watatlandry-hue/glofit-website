import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/ScreenHeader';
import { Body, Muted, PrimaryButton } from '@/components/ui';
import { coaches } from '@/data/mock';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/fonts';

const TABS = ['Disponibles', 'Spécialités', 'Avis'] as const;

export default function CoachScreen() {
  const [tab, setTab] = useState<(typeof TABS)[number]>('Disponibles');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.dark }} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <ScreenHeader
          title="Coaches"
          accent="🏆"
          subtitle="Humains & IA — disponibles pour toi"
        />

        {/* AI coach */}
        <Pressable style={styles.aiBar}>
          <LinearGradient
            colors={['#0d1a2a', '#050d15']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.aiBarInner}
          >
            <View style={styles.aiIcon}>
              <Text style={{ fontSize: 22 }}>🤖</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.aiTitle}>Coach IA Glofit</Text>
              <Muted size={11} style={{ marginTop: 3 }}>
                Disponible 24/7 · Analyse ton entraînement en temps réel
              </Muted>
            </View>
            <Text style={{ color: colors.blue, fontSize: 20 }}>→</Text>
          </LinearGradient>
        </Pressable>

        {/* My coach hero */}
        <LinearGradient
          colors={['#1a2a0a', '#0f1a05']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <LinearGradient
            colors={[colors.lime, '#88B000']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroAvatar}
          >
            <Text style={{ fontSize: 30 }}>👨‍💼</Text>
          </LinearGradient>
          <View style={{ flex: 1 }}>
            <Text style={styles.heroName}>Marc Dubois</Text>
            <Body size={12} color={colors.lime} style={{ marginTop: 2 }}>
              Ton coach personnel
            </Body>
            <Muted size={12} style={{ marginTop: 6 }}>
              ⭐ 4.9 · 127 clients · Montréal
            </Muted>
          </View>
          <PrimaryButton title="Message" variant="small" />
        </LinearGradient>

        {/* Tabs */}
        <View style={styles.tabs}>
          {TABS.map((t) => (
            <Pressable
              key={t}
              onPress={() => setTab(t)}
              style={[styles.tab, tab === t && styles.tabActive]}
            >
              <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
                {t}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Coach list */}
        <View style={{ paddingHorizontal: 16 }}>
          {coaches.map((coach) => (
            <View key={coach.id} style={styles.coachCard}>
              <View style={[styles.coachAvatar, { backgroundColor: coach.bgColor }]}>
                <Text style={{ fontSize: 24 }}>{coach.emoji}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.coachName}>{coach.name}</Text>
                <Muted size={11} style={{ marginTop: 3 }}>
                  {coach.specialties}
                </Muted>
                <Body size={10} color={coach.availabilityColor} style={{ marginTop: 4 }}>
                  ● {coach.availability}
                </Body>
              </View>
              <View style={{ alignItems: 'flex-end', gap: 6 }}>
                <View>
                  <Text style={styles.price}>{coach.price}$</Text>
                  <Muted size={10} style={{ textAlign: 'right' }}>
                    /séance
                  </Muted>
                </View>
                <PrimaryButton title="Réserver" variant="small" />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  aiBar: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  aiBarInner: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: 'rgba(79,195,247,0.2)',
    borderRadius: 20,
  },
  aiIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(79,195,247,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(79,195,247,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiTitle: {
    fontFamily: fonts.display,
    fontSize: 14,
    color: colors.blue,
  },
  hero: {
    marginHorizontal: 16,
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(200,241,53,0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  heroAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroName: {
    fontFamily: fonts.displayHeavy,
    fontSize: 18,
    color: colors.text,
  },
  tabs: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  tab: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  tabActive: {
    backgroundColor: 'rgba(200,241,53,0.15)',
    borderColor: colors.lime,
  },
  tabText: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textDim,
  },
  tabTextActive: {
    color: colors.lime,
    fontFamily: fonts.bodyMedium,
  },
  coachCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  coachAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coachName: {
    fontFamily: fonts.display,
    fontSize: 14,
    color: colors.text,
  },
  price: {
    fontFamily: fonts.displayHeavy,
    fontSize: 15,
    color: colors.lime,
  },
});
