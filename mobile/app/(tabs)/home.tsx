import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BodySilhouetteMini } from '@/components/BodySilhouette';
import {
  Avatar,
  BadgeAI,
  Body,
  Card,
  GradientCard,
  Muted,
  PrimaryButton,
  SectionTitle,
} from '@/components/ui';
import { todayWorkout, weekStats } from '@/data/mock';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/fonts';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.dark }} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Muted size={12}>Mercredi, 15 Avril</Muted>
            <Text style={styles.greeting}>
              Bonjour,{' '}
              <Text style={{ color: colors.lime }}>Alex 👋</Text>
            </Text>
          </View>
          <LinearGradient
            colors={[colors.lime, '#88B000']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.avatarGradient}
          >
            <Text style={styles.avatarLetter}>A</Text>
          </LinearGradient>
        </View>

        {/* Transformation IA */}
        <SectionTitle>Ma Transformation IA</SectionTitle>
        <Card style={styles.transformCard} padding={0}>
          <View style={styles.transformHeader}>
            <Text style={styles.transformTitle}>Avant → Après</Text>
            <BadgeAI>✦ IA Généré</BadgeAI>
          </View>

          <View style={styles.beforeAfter}>
            <View style={styles.baBox}>
              <Text style={styles.baLabel}>Aujourd&apos;hui</Text>
              <BodySilhouetteMini variant="before" />
              <Text style={styles.baWeight}>82 kg</Text>
            </View>
            <LinearGradient
              colors={['#1a2a0a', '#111111']}
              style={[styles.baBox, styles.baFuture]}
            >
              <Text style={[styles.baLabel, { color: colors.lime }]}>Glofit You</Text>
              <BodySilhouetteMini variant="after" />
              <Text style={[styles.baWeight, { color: colors.lime }]}>72 kg</Text>
            </LinearGradient>
          </View>

          <View style={{ padding: 20, paddingTop: 0 }}>
            <View style={styles.progressLabelRow}>
              <Muted size={12}>Progression</Muted>
              <Body size={12} color={colors.lime} weight="medium">
                34%
              </Body>
            </View>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
          </View>
        </Card>

        {/* Stats */}
        <SectionTitle>Cette semaine</SectionTitle>
        <View style={styles.statsRow}>
          {weekStats.map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <Text style={styles.statIcon}>{stat.icon}</Text>
              <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
              <Muted size={10}>{stat.label}</Muted>
            </View>
          ))}
        </View>

        {/* Today */}
        <SectionTitle>Aujourd&apos;hui</SectionTitle>
        <View style={{ paddingHorizontal: 16, marginBottom: 20 }}>
          <GradientCard>
            <View style={styles.workoutRow}>
              <View style={[styles.workoutIcon, { backgroundColor: colors.lime }]}>
                <Text style={{ fontSize: 24 }}>💪</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.workoutName}>{todayWorkout.name}</Text>
                <Muted size={12} style={{ marginTop: 4 }}>
                  {todayWorkout.meta}
                </Muted>
              </View>
              <PrimaryButton
                title="Démarrer"
                variant="small"
                onPress={() => router.push('/(tabs)/plan')}
              />
            </View>
          </GradientCard>
        </View>

        {/* FitPals teaser */}
        <SectionTitle>FitPals près de toi</SectionTitle>
        <View style={{ paddingHorizontal: 16, marginBottom: 20 }}>
          <GradientCard
            colors={['#0d1a2a', '#050d15']}
            borderColor="rgba(79,195,247,0.2)"
          >
            <View style={styles.workoutRow}>
              <View
                style={[
                  styles.workoutIcon,
                  { backgroundColor: 'rgba(79,195,247,0.2)' },
                ]}
              >
                <Text style={{ fontSize: 20 }}>📍</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.workoutName, { color: colors.blue }]}>
                  5 personnes dispo
                </Text>
                <Muted size={12} style={{ marginTop: 4 }}>
                  Dans un rayon de 3 km
                </Muted>
              </View>
              <PrimaryButton
                title="Voir"
                variant="small"
                color={colors.blue}
                textColor={colors.black}
                onPress={() => router.push('/(tabs)/fitmap')}
              />
            </View>
          </GradientCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 24,
    paddingTop: 4,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontFamily: fonts.display,
    fontSize: 22,
    color: colors.text,
    marginTop: 4,
  },
  avatarGradient: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    fontFamily: fonts.displayHeavy,
    color: colors.black,
    fontSize: 16,
  },
  transformCard: {
    marginHorizontal: 16,
    marginBottom: 20,
    overflow: 'hidden',
  },
  transformHeader: {
    padding: 20,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transformTitle: {
    fontFamily: fonts.display,
    fontSize: 15,
    color: colors.text,
  },
  beforeAfter: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  baBox: {
    flex: 1,
    backgroundColor: colors.card2,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    gap: 10,
  },
  baFuture: {
    borderWidth: 1,
    borderColor: 'rgba(200,241,53,0.2)',
  },
  baLabel: {
    fontFamily: fonts.display,
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.textDim,
  },
  baWeight: {
    fontFamily: fonts.displayHeavy,
    fontSize: 18,
    color: colors.text,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.card2,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: '34%',
    backgroundColor: colors.lime,
    borderRadius: 3,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    gap: 4,
  },
  statIcon: { fontSize: 20, marginBottom: 2 },
  statValue: {
    fontFamily: fonts.displayHeavy,
    fontSize: 20,
    lineHeight: 22,
  },
  workoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  workoutIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  workoutName: {
    fontFamily: fonts.display,
    fontSize: 15,
    color: colors.text,
  },
});
