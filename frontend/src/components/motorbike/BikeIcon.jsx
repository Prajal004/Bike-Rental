import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { COLORS } from '../../styles/colors';

export default function BikeIcon({ color = COLORS.pine, size = 60 }) {
  return (
    <Svg viewBox="0 0 100 70" width={size} height={size * 0.7}>
      <Path d="M12 46 C8 34 10 20 20 14 C30 8 42 10 46 20 C50 28 54 30 58 32 C60 22 62 12 64 6 C66 3 70 5 68 9 C66 15 65 22 66 30 C72 34 76 40 76 46 L14 46 Z" fill={color} />
      <Circle cx={24} cy={48} r={9} fill={COLORS.ink} />
      <Circle cx={24} cy={48} r={4} fill={COLORS.paper} />
      <Circle cx={66} cy={48} r={9} fill={COLORS.ink} />
      <Circle cx={66} cy={48} r={4} fill={COLORS.paper} />
    </Svg>
  );
}
