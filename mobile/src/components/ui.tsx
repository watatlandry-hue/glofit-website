import { LinearGradient } from 'expo-linear-gradient';
import type { PropsWithChildren, ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { colors } from '@/theme/colors';
import { fonts } from '@/theme/fonts';

export function Heading({
  children,
  style,
  size = 22,
}: PropsWithChildren<{ style?: TextStyle; size?: number }>) {
  return (
    <Text
      style={[
        { fontFamily: fonts.displayHeavy, fontSize: size, color: colors.text, letterSpacing: -0.5 },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

export function SectionTitle({ children }: PropsWithChildren) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

export function Muted({
  children,
  size = 13,
  style,
}: PropsWithChildren<{ size?: number; style?: TextStyle }>) {
  return (
    <Text
      style={[
        { fontFamily: fonts.body, fontSize: size, color: colors.textDim },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

export function Body({
  children,
  size = 14,
  color = colors.text,
  weight = 'regular',
  style,
}: PropsWithChildren<{
  size?: number;
  color?: string;
  weight?: 'regular' | 'medium' | 'bold' | 'heavy';
  style?: TextStyle;
}>) {
  const fontFamily =
    weight === 'heavy'
      ? fonts.displayHeavy
      : weight === 'bold'
      ? fonts.display
      : weight === 'medium'
      ? fonts.bodyMedium
      : fonts.body;
  return (
    <Text style={[{ fontFamily, fontSize: size, color }, style]}>{children}</Text>
  );
}

type PrimaryButtonProps = {
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
  variant?: 'primary' | 'secondary' | 'small';
  color?: string;
  textColor?: string;
};

export function PrimaryButton({
  title,
  onPress,
  style,
  variant = 'primary',
  color = colors.lime,
  textColor = colors.black,
}: PrimaryButtonProps) {
  if (variant === 'secondary') {
    return (
      <Pressable onPress={onPress} style={[styles.btnSecondary, style]}>
        <Text style={styles.btnSecondaryText}>{title}</Text>
      </Pressable>
    );
  }
  if (variant === 'small') {
    return (
      <Pressable
        onPress={onPress}
        style={[styles.btnSmall, { backgroundColor: color }, style]}
      >
        <Text style={[styles.btnSmallText, { color: textColor }]}>{title}</Text>
      </Pressable>
    );
  }
  return (
    <Pressable
      onPress={onPress}
      style={[styles.btnPrimary, { backgroundColor: color }, style]}
    >
      <Text style={[styles.btnPrimaryText, { color: textColor }]}>{title}</Text>
    </Pressable>
  );
}

export function Pill({
  children,
  active,
}: PropsWithChildren<{ active?: boolean }>) {
  return (
    <View style={[styles.pill, active && styles.pillActive]}>
      <Text style={[styles.pillText, active && styles.pillTextActive]}>{children}</Text>
    </View>
  );
}

export function Tag({
  children,
  variant = 'default',
}: PropsWithChildren<{ variant?: 'default' | 'sport' | 'goal' }>) {
  const bg =
    variant === 'sport'
      ? 'rgba(79,195,247,0.1)'
      : variant === 'goal'
      ? 'rgba(200,241,53,0.1)'
      : colors.card2;
  const fg =
    variant === 'sport' ? colors.blue : variant === 'goal' ? colors.lime : colors.textDim;
  return (
    <View style={[styles.tag, { backgroundColor: bg }]}>
      <Text style={[styles.tagText, { color: fg }]}>{children}</Text>
    </View>
  );
}

export function BadgeAI({ children }: PropsWithChildren) {
  return (
    <View style={styles.badgeAI}>
      <Text style={styles.badgeAIText}>{children}</Text>
    </View>
  );
}

export function Card({
  children,
  style,
  padding = 16,
}: PropsWithChildren<{ style?: ViewStyle; padding?: number }>) {
  return <View style={[styles.card, { padding }, style]}>{children}</View>;
}

export function GradientCard({
  children,
  style,
  colors: grad = ['#1a2a0a', '#111a05'],
  borderColor = 'rgba(200,241,53,0.2)',
}: PropsWithChildren<{
  style?: ViewStyle;
  colors?: [string, string];
  borderColor?: string;
}>) {
  return (
    <LinearGradient colors={grad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.gradientCard, { borderColor }, style]}>
      {children}
    </LinearGradient>
  );
}

export function Avatar({
  label,
  size = 42,
  bg = colors.card,
  color = colors.text,
  borderColor,
}: {
  label: string | ReactNode;
  size?: number;
  bg?: string;
  color?: string;
  borderColor?: string;
}) {
  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: bg,
          borderWidth: borderColor ? 2 : 0,
          borderColor,
        },
      ]}
    >
      {typeof label === 'string' ? (
        <Text style={{ fontFamily: fonts.displayHeavy, color, fontSize: size * 0.4 }}>
          {label}
        </Text>
      ) : (
        label
      )}
    </View>
  );
}

export function Dot({ color = colors.green, size = 8 }: { color?: string; size?: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
      }}
    />
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontFamily: fonts.display,
    fontSize: 13,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: colors.textDim,
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  btnPrimary: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimaryText: {
    fontFamily: fonts.display,
    fontSize: 15,
    letterSpacing: 0.5,
  },
  btnSecondary: {
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  btnSecondaryText: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.textDim,
  },
  btnSmall: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSmallText: {
    fontFamily: fonts.display,
    fontSize: 12,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: colors.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pillActive: {
    backgroundColor: 'rgba(200,241,53,0.15)',
    borderColor: colors.lime,
  },
  pillText: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: colors.textDim,
  },
  pillTextActive: {
    color: colors.lime,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  tagText: {
    fontFamily: fonts.body,
    fontSize: 10,
  },
  badgeAI: {
    backgroundColor: 'rgba(200,241,53,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(200,241,53,0.3)',
  },
  badgeAIText: {
    fontFamily: fonts.display,
    fontSize: 10,
    color: colors.lime,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  gradientCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
