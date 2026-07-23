import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const BikeCard = ({ bike, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imagePlaceholder}>
        <Text style={styles.placeholderText}>🏍️</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{bike.name}</Text>
        <Text style={styles.brand}>{bike.brand}</Text>
        <Text style={styles.price}>Rs {bike.pricePerDay}/day</Text>
        {bike.isVerified && (
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>✅ Verified</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 36,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  brand: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E63946',
    marginTop: 4,
  },
  verifiedBadge: {
    marginTop: 4,
  },
  verifiedText: {
    fontSize: 12,
    color: '#2ECC71',
  },
});

export default BikeCard;
