import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS } from '../../styles/colors';

const Button = ({ 
  title, 
  label,
  onPress, 
  loading = false, 
  disabled = false, 
  variant = 'primary',
  style = {},
  textStyle = {}
}) => {
  const buttonText = title || label || 'Button';
  const getBackgroundColor = () => {
    if (disabled) return '#ccc';
    if (variant === 'brick') return '#9C4A2E';
    if (variant === 'primary') return '#4CAF50';
    if (variant === 'secondary') return '#457B9D';
    if (variant === 'success') return '#2ECC71';
    return '#4CAF50';
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        style,
        disabled && styles.disabled
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={[styles.text, textStyle]}>{buttonText}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
    width: '100%',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabled: {
    opacity: 0.6,
  },
});

export default Button;
