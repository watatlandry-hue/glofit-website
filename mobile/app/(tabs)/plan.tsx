import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BadgeAI, Body, Heading, Muted } from '@/components/ui';
import { exercises as initialExercises, weekDays, workoutPlan } from '@/data/mock';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/fonts';
import type { Exercise } from '@/types';

export default function PlanScreen() {
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises);

  const toggle = (id: string) => {
    setExercises((prev) =>
      prev.map((ex) =>
        ex.id === id
          ? { ...ex, status: ex.status === 'done' ? 'todo' : 'done' }
          : ex
      )
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.dark }} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 16 }}>
          <Heading size={22}>Mon Plan 💪</Heading>
          <Muted style={{ marginTop: 4 }}>Semaine 6 · Généré par IA</Muted>
        </View>

        {/* Week days */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.weekDays}
        >
          {weekDays.map((d) => (
            <Pressable
              key={d.date}
              style={[
                styles.dayChip,
                d.state === 'done' && styles.dayDone,
                d.state === 'today' && styles.dayToday,
              ]}
            >
              <Text
                style={[
                  styles.dayLetter,
                  d.state === 'today' && { color: colors.black },
                ]}
              >
                {d.day}
              </Text>
              <Text
                style={[
                  styles.dayNumber,
                  d.state === 'today' && { color: colors.black },
                ]}
              >
                {d.date}
              </Text>
              {d.state !== 'upcoming' && (
                <View
                  style={[
                    styles.dayDot,
                    d.state === 'today' && { backgroundColor: colors.black },
                  ]}
                />
              )}
            </Pressable>
          ))}
        </ScrollView>

        {/* Workout header */}
        <View style={styles.workoutHeader}>
          <Text style={styles.workoutTitle}>{workoutPlan.name}</Text>
          <BadgeAI>{workoutPlan.duration} min</BadgeAI>
        </View>

        {/* Exercises */}
        <View style={{ paddingHorizontal: 16 }}>
          {exercises.map((ex) => {
            const isCurrent = ex.status === 'current';
            const isDone = ex.status === 'done';
            return (
              <Pressable
                key={ex.id}
                onPress={() => toggle(ex.id)}
                style={[
                  styles.exItem,
                  isDone && { opacity: 0.6, borderColor: 'rgba(200,241,53,0.2)' },
                  isCurrent && { borderColor: 'rgba(200,241,53,0.4)' },
                ]}
              >
                <View
                  style={[
                    styles.exIcon,
                    {
                      backgroundColor: isCurrent
                        ? colors.lime
                        : isDone
                        ? 'rgba(200,241,53,0.1)'
                        : colors.card2,
                    },
                  ]}
                >
                  <Text style={{ fontSize: 20 }}>{ex.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.exName}>{ex.name}</Text>
                  <Body size={11} color={colors.textDim} style={{ marginTop: 3 }}>
                    {ex.sets} séries · {ex.reps} reps ·{' '}
                    {ex.weightUnit === 'bw'
                      ? 'Poids de corps'
                      : `${ex.weight} kg`}
                    {isCurrent && (
                      <Body size={11} color={colors.lime}>
                        {' '}
                        — En cours
                      </Body>
                    )}
                  </Body>
                </View>
                <View
                  style={[
                    styles.check,
                    isDone && { backgroundColor: colors.lime, borderColor: colors.lime },
                  ]}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: isDone ? colors.black : colors.textFaint,
                      fontFamily: fonts.display,
                    }}
                  >
                    {isDone ? '✓' : '○'}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  weekDays: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 6,
  },
  dayChip: {
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: 48,
  },
  dayDone: {
    backgroundColor: 'rgba(200,241,53,0.08)',
    borderColor: 'rgba(200,241,53,0.3)',
  },
  dayToday: {
    backgroundColor: colors.lime,
    borderColor: colors.lime,
  },
  dayLetter: {
    fontFamily: fonts.display,
    fontSize: 10,
    color: colors.textDim,
    textTransform: 'uppercase',
  },
  dayNumber: {
    fontFamily: fonts.displayHeavy,
    fontSize: 15,
    color: colors.text,
  },
  dayDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.lime,
  },
  workoutHeader: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  workoutTitle: {
    fontFamily: fonts.display,
    fontSize: 16,
    color: colors.text,
  },
  exItem: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  exIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exName: {
    fontFamily: fonts.display,
    fontSize: 14,
    color: colors.text,
  },
  check: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
