import { View } from 'react-native';

import { colors } from '@/theme/colors';

import { Heading, Muted } from './ui';

export function ScreenHeader({
  title,
  accent,
  subtitle,
}: {
  title: string;
  accent?: string;
  subtitle?: string;
}) {
  return (
    <View style={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 12 }}>
      <Heading size={22}>
        {title}{' '}
        {accent ? <Heading size={22} style={{ color: colors.lime }}>{accent}</Heading> : null}
      </Heading>
      {subtitle ? <Muted style={{ marginTop: 4 }}>{subtitle}</Muted> : null}
    </View>
  );
}
