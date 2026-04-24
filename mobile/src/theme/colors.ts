export const colors = {
  lime: '#C8F135',
  limeDark: '#A8D010',
  black: '#0A0A0A',
  dark: '#111111',
  card: '#1A1A1A',
  card2: '#222222',
  border: '#2A2A2A',
  muted: '#555555',
  text: '#F0F0F0',
  textDim: '#999999',
  textFaint: '#666666',
  accent: '#FF6B35',
  blue: '#4FC3F7',
  green: '#00FF88',
  orange: '#FF9900',
} as const;

export type ColorName = keyof typeof colors;
