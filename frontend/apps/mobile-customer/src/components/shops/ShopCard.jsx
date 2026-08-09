import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../styles/colors';

export const ShopCard = ({ shop, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.name}>{shop.shopName}</Text>
        <Text style={[styles.status, { color: shop.isVerified ? COLORS.success : COLORS.warning }]}>
          {shop.isVerified ? '✅ Verified' : '⏳ Pending'}
        </Text>
      </View>
      <Text style={styles.address}>📍 {shop.address}</Text>
      <Text style={styles.phone}>📞 {shop.phone}</Text>
      {shop.rating > 0 && <Text style={styles.rating}>⭐ {shop.rating}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.white, borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: COLORS.border },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
  status: { fontSize: 14, fontWeight: 'bold' },
  address: { fontSize: 14, color: COLORS.textSecondary, marginTop: 4 },
  phone: { fontSize: 14, color: COLORS.textSecondary, marginTop: 2 },
  rating: { fontSize: 14, color: COLORS.textSecondary, marginTop: 4 },
});

export default ShopCard;
