import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ShopCard = ({ shop, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.name}>{shop.shopName}</Text>
        {shop.isVerified && (
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>✅ Verified</Text>
          </View>
        )}
      </View>
      <Text style={styles.address}>{shop.address}</Text>
      <Text style={styles.phone}>📞 {shop.phone}</Text>
      {shop.rating > 0 && (
        <Text style={styles.rating}>⭐ {shop.rating} / 5</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  verifiedBadge: {
    backgroundColor: '#2ECC71',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  verifiedText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  phone: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  rating: {
    fontSize: 14,
    color: '#F39C12',
    marginTop: 4,
  },
});

export default ShopCard;
