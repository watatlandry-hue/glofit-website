export type Exercise = {
  id: string;
  name: string;
  icon: string;
  sets: number;
  reps: number;
  weight?: number;
  weightUnit?: 'kg' | 'bw';
  status: 'done' | 'current' | 'todo';
};

export type DayPlan = {
  day: string;
  date: number;
  state: 'done' | 'today' | 'upcoming';
};

export type WorkoutPlan = {
  name: string;
  duration: number;
  exercises: Exercise[];
};

export type Stat = {
  icon: string;
  value: string;
  label: string;
  color: string;
};

export type FitPal = {
  id: string;
  name: string;
  age: number;
  emoji: string;
  sport: string;
  sportIcon: string;
  goal: string;
  distanceKm: number;
  online: 'online' | 'away';
  bgColor: string;
};

export type MapPin = {
  id: string;
  name: string;
  emoji: string;
  top: number;
  left: number;
  isMe?: boolean;
};

export type Coach = {
  id: string;
  name: string;
  emoji: string;
  specialties: string;
  availability: string;
  availabilityColor: string;
  price: number;
  bgColor: string;
};

export type ChatMessage =
  | {
      id: string;
      kind: 'text';
      author: 'me' | 'them';
      authorEmoji: string;
      text: string;
      time: string;
    }
  | {
      id: string;
      kind: 'invite';
      author: 'them';
      authorEmoji: string;
      title: string;
      details: string;
      time: string;
    };
