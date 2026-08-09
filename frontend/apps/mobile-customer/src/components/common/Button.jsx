import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS } from '../../styles/colors';

export const Button = ({ title, onPress, loading, disabled, variant = 'primary', style }) => {
  const getBackground = () => {
    if (disabled) return COLORS.gray;
    if (variant === 'primary') return COLORS.primary;
    if (variant === 'danger') return COLORS.danger;
    return COLORS.primary;
  };

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: getBackground() }, style]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? <ActivityIndicator color={COLORS.white} /> : <Text style={styles.text}>{title}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: { padding: 16, borderRadius: 8, alignItems: 'center', minHeight: 50 },
  text: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
});

export default Button;
