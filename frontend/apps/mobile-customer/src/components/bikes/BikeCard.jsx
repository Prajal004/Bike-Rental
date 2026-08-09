import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../styles/colors';

export const BikeCard = ({ bike, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.name}>{bike.name}</Text>
        <Text style={styles.price}>Rs {bike.pricePerDay}/day</Text>
      </View>
      <Text style={styles.details}>{bike.brand} · {bike.cc}cc</Text>
      <View style={styles.footer}>
        <Text style={styles.rating}>⭐ {bike.rating || 4.5}</Text>
        <Text style={[styles.status, { color: bike.available ? COLORS.success : COLORS.danger }]}>
          {bike.available ? '✅ Available' : '❌ Unavailable'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.white, borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: COLORS.border },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
  price: { fontSize: 16, fontWeight: 'bold', color: COLORS.primary },
  details: { fontSize: 14, color: COLORS.textSecondary, marginTop: 4 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  rating: { fontSize: 14, color: COLORS.textSecondary },
  status: { fontSize: 14, fontWeight: 'bold' },
});

export default BikeCard;
