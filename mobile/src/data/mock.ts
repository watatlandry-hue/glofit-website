import { colors } from '@/theme/colors';
import type {
  ChatMessage,
  Coach,
  DayPlan,
  Exercise,
  FitPal,
  MapPin,
  Stat,
  WorkoutPlan,
} from '@/types';

export const weekStats: Stat[] = [
  { icon: '🔥', value: '4', label: 'Séances', color: colors.accent },
  { icon: '⚡', value: '1 840', label: 'Calories', color: colors.lime },
  { icon: '👥', value: '3', label: 'FitPals', color: colors.blue },
];

export const todayWorkout = {
  name: 'Upper Body Power',
  meta: '6 exercices · 45 min · Gym',
};

export const fitpals: FitPal[] = [
  {
    id: 'karim',
    name: 'Karim',
    age: 26,
    emoji: '🏃',
    sport: 'Running',
    sportIcon: '🏃',
    goal: 'Perte de poids',
    distanceKm: 0.8,
    online: 'online',
    bgColor: 'rgba(200,241,53,0.1)',
  },
  {
    id: 'sofia',
    name: 'Sofia',
    age: 29,
    emoji: '💪',
    sport: 'Musculation',
    sportIcon: '🏋️',
    goal: 'Tonification',
    distanceKm: 1.2,
    online: 'online',
    bgColor: 'rgba(79,195,247,0.1)',
  },
  {
    id: 'marie',
    name: 'Marie',
    age: 32,
    emoji: '🧘',
    sport: 'Yoga',
    sportIcon: '🧘',
    goal: 'Santé générale',
    distanceKm: 1.9,
    online: 'away',
    bgColor: 'rgba(255,107,53,0.1)',
  },
];

export const mapPins: MapPin[] = [
  { id: 'me', name: 'Toi', emoji: '😊', top: 110, left: 170, isMe: true },
  { id: 'karim', name: 'Karim', emoji: '🏃', top: 70, left: 230 },
  { id: 'sofia', name: 'Sofia', emoji: '💪', top: 150, left: 100 },
  { id: 'marie', name: 'Marie', emoji: '🧘', top: 90, left: 110 },
  { id: 'lucas', name: 'Lucas', emoji: '🏋️', top: 170, left: 270 },
];

export const coaches: Coach[] = [
  {
    id: 'sarah',
    name: 'Sarah Chen',
    emoji: '🏋️',
    specialties: 'Musculation · HIIT · Powerlifting',
    availability: 'Disponible maintenant',
    availabilityColor: colors.green,
    price: 45,
    bgColor: 'rgba(200,241,53,0.1)',
  },
  {
    id: 'amadou',
    name: 'Amadou Diallo',
    emoji: '🧘',
    specialties: 'Cardio · Running · Nutrition',
    availability: 'Dispo ce soir',
    availabilityColor: colors.orange,
    price: 35,
    bgColor: 'rgba(79,195,247,0.1)',
  },
  {
    id: 'lea',
    name: 'Léa Martin',
    emoji: '🥊',
    specialties: 'Boxe · CrossFit · Mobilité',
    availability: 'Disponible maintenant',
    availabilityColor: colors.green,
    price: 50,
    bgColor: 'rgba(255,107,53,0.1)',
  },
];

export const weekDays: DayPlan[] = [
  { day: 'Lun', date: 13, state: 'done' },
  { day: 'Mar', date: 14, state: 'done' },
  { day: 'Mer', date: 15, state: 'today' },
  { day: 'Jeu', date: 16, state: 'upcoming' },
  { day: 'Ven', date: 17, state: 'upcoming' },
  { day: 'Sam', date: 18, state: 'upcoming' },
  { day: 'Dim', date: 19, state: 'upcoming' },
];

export const exercises: Exercise[] = [
  {
    id: 'bench',
    name: 'Développé couché',
    icon: '🏋️',
    sets: 4,
    reps: 10,
    weight: 70,
    weightUnit: 'kg',
    status: 'done',
  },
  {
    id: 'pullup',
    name: 'Tractions',
    icon: '💪',
    sets: 3,
    reps: 8,
    weightUnit: 'bw',
    status: 'done',
  },
  {
    id: 'row',
    name: 'Rowing haltères',
    icon: '▶',
    sets: 4,
    reps: 12,
    weight: 22,
    weightUnit: 'kg',
    status: 'current',
  },
  {
    id: 'lateral',
    name: 'Élévations latérales',
    icon: '🔵',
    sets: 3,
    reps: 15,
    weight: 10,
    weightUnit: 'kg',
    status: 'todo',
  },
  {
    id: 'curl',
    name: 'Curl biceps',
    icon: '🔵',
    sets: 3,
    reps: 12,
    weight: 16,
    weightUnit: 'kg',
    status: 'todo',
  },
  {
    id: 'triceps',
    name: 'Triceps poulie',
    icon: '🔵',
    sets: 3,
    reps: 15,
    weight: 25,
    weightUnit: 'kg',
    status: 'todo',
  },
];

export const workoutPlan: WorkoutPlan = {
  name: 'Upper Body Power',
  duration: 45,
  exercises,
};

export const chatMessages: ChatMessage[] = [
  {
    id: '1',
    kind: 'text',
    author: 'them',
    authorEmoji: '🏃',
    text: "Salut ! J'ai vu que t'es dispo pour courir. T'as l'habitude de faire quelle distance ?",
    time: '14:22',
  },
  {
    id: '2',
    kind: 'text',
    author: 'me',
    authorEmoji: '😊',
    text: 'Hey ! Ouais, en général 5-8 km. Tu connais les pistes du Parc du Mont-Royal ?',
    time: '14:24',
  },
  {
    id: '3',
    kind: 'text',
    author: 'them',
    authorEmoji: '🏃',
    text: 'Parfait ! J’y vais souvent le matin. Demain 7h ça te va ? 🏃‍♂️',
    time: '14:25',
  },
  {
    id: '4',
    kind: 'invite',
    author: 'them',
    authorEmoji: '🏃',
    title: '🗓️ Invitation Session',
    details: '📍 Parc du Mont-Royal\n📅 Demain, 7:00 AM · 8 km running',
    time: '14:26',
  },
];
