import Svg, { Ellipse, Rect } from 'react-native-svg';

type Variant = 'before' | 'after';

type Props = {
  variant: Variant;
  width?: number;
  height?: number;
};

export function BodySilhouette({ variant, width = 60, height = 120 }: Props) {
  const fill = variant === 'after' ? '#C8F135' : '#444444';

  if (variant === 'after') {
    return (
      <Svg width={width} height={height} viewBox="0 0 60 120" fill="none">
        <Ellipse cx="30" cy="14" rx="9" ry="9" fill={fill} />
        <Rect x="17" y="26" width="26" height="40" rx="7" fill={fill} />
        <Rect x="9" y="28" width="9" height="28" rx="4.5" fill={fill} />
        <Rect x="42" y="28" width="9" height="28" rx="4.5" fill={fill} />
        <Rect x="18" y="64" width="10" height="42" rx="5" fill={fill} />
        <Rect x="32" y="64" width="10" height="42" rx="5" fill={fill} />
      </Svg>
    );
  }

  return (
    <Svg width={width} height={height} viewBox="0 0 60 120" fill="none">
      <Ellipse cx="30" cy="14" rx="10" ry="10" fill={fill} />
      <Rect x="14" y="26" width="32" height="44" rx="8" fill={fill} />
      <Rect x="8" y="28" width="10" height="30" rx="5" fill={fill} />
      <Rect x="42" y="28" width="10" height="30" rx="5" fill={fill} />
      <Rect x="16" y="68" width="12" height="40" rx="6" fill={fill} />
      <Rect x="32" y="68" width="12" height="40" rx="6" fill={fill} />
    </Svg>
  );
}

export function BodySilhouetteMini({ variant }: { variant: Variant }) {
  const fill = variant === 'after' ? '#C8F135' : '#444444';

  if (variant === 'after') {
    return (
      <Svg width={50} height={90} viewBox="0 0 50 90" fill="none">
        <Ellipse cx="25" cy="10" rx="7" ry="7" fill={fill} />
        <Rect x="14" y="20" width="22" height="30" rx="6" fill={fill} />
        <Rect x="6" y="22" width="8" height="22" rx="4" fill={fill} />
        <Rect x="36" y="22" width="8" height="22" rx="4" fill={fill} />
        <Rect x="14" y="48" width="9" height="32" rx="4.5" fill={fill} />
        <Rect x="27" y="48" width="9" height="32" rx="4.5" fill={fill} />
      </Svg>
    );
  }

  return (
    <Svg width={50} height={90} viewBox="0 0 50 90" fill="none">
      <Ellipse cx="25" cy="10" rx="8" ry="8" fill={fill} />
      <Rect x="11" y="20" width="28" height="34" rx="7" fill={fill} />
      <Rect x="5" y="22" width="8" height="24" rx="4" fill={fill} />
      <Rect x="37" y="22" width="8" height="24" rx="4" fill={fill} />
      <Rect x="13" y="52" width="10" height="30" rx="5" fill={fill} />
      <Rect x="27" y="52" width="10" height="30" rx="5" fill={fill} />
    </Svg>
  );
}
