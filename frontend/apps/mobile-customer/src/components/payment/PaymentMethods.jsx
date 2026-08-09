import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../styles/colors';

export const PaymentMethods = ({ selected, onSelect }) => {
  const methods = [
    { id: 'esewa', label: 'eSewa', icon: '💰' },
    { id: 'khalti', label: 'Khalti', icon: '💳' },
    { id: 'fonepay', label: 'Fonepay', icon: '📱' },
    { id: 'cash', label: 'Cash', icon: '💵' },
  ];

  return (
    <View style={styles.container}>
      {methods.map((m) => (
        <TouchableOpacity
          key={m.id}
          style={[styles.method, selected === m.id && styles.selected]}
          onPress={() => onSelect(m.id)}
        >
          <Text style={styles.icon}>{m.icon}</Text>
          <Text style={styles.label}>{m.label}</Text>
          <View style={[styles.radio, selected === m.id && styles.radioSelected]} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: 8 },
  method: { flexDirection: 'row', alignItems: 'center', padding: 14, borderWidth: 1, borderColor: COLORS.border, borderRadius: 8 },
  selected: { borderColor: COLORS.primary, backgroundColor: COLORS.primaryLight },
  icon: { fontSize: 24, marginRight: 12 },
  label: { flex: 1, fontSize: 16 },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: COLORS.border },
  radioSelected: { borderColor: COLORS.primary, backgroundColor: COLORS.primary },
});

export default PaymentMethods;
