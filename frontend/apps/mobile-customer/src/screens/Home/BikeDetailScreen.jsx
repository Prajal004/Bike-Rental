import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../../api/axios';

const BikeDetailScreen = ({ route, navigation }) => {
  const { bikeId } = route.params || {};
  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(1);

  useEffect(() => {
    if (bikeId) fetchBike();
  }, [bikeId]);

  const fetchBike = async () => {
    try {
      const response = await api.get(`/motorcycles/${bikeId}`);
      if (response.success) {
        setBike(response.motorcycle);
      }
    } catch (error) {
      console.error('Error fetching bike:', error);
      Alert.alert('Error', 'Failed to load bike details');
    } finally {
      setLoading(false);
    }
  };

  const handleBook = () => {
    navigation.navigate('Booking', { bike, days, totalPrice: bike.pricePerDay * days });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (!bike) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Bike not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Text style={styles.imagePlaceholder}>🏍️</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{bike.name}</Text>
        <Text style={styles.brand}>{bike.brand} · {bike.year} · {bike.cc}cc</Text>
        <Text style={styles.price}>Rs {bike.pricePerDay} <Text style={styles.perDay}>/ day</Text></Text>

        <View style={styles.statusContainer}>
          <Text style={[styles.status, { color: bike.available ? '#4CAF50' : '#E53935' }]}>
            {bike.available ? '✅ Available' : '❌ Unavailable'}
          </Text>
        </View>

        {bike.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{bike.description}</Text>
          </View>
        )}

        <View style={styles.bookingSection}>
          <View style={styles.daysContainer}>
            <Text style={styles.daysLabel}>📅 Days</Text>
            <View style={styles.daysControl}>
              <TouchableOpacity onPress={() => setDays(Math.max(1, days - 1))} style={styles.daysButton}>
                <Text style={styles.daysButtonText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.daysCount}>{days}</Text>
              <TouchableOpacity onPress={() => setDays(days + 1)} style={styles.daysButton}>
                <Text style={styles.daysButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalPrice}>Rs {bike.pricePerDay * days}</Text>
          </View>

          <TouchableOpacity style={styles.bookButton} onPress={handleBook}>
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  imageContainer: {
    height: 200,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: { fontSize: 80 },
  content: { padding: 16 },
  name: { fontSize: 24, fontWeight: 'bold', color: '#222' },
  brand: { fontSize: 14, color: '#888', marginTop: 4 },
  price: { fontSize: 28, fontWeight: 'bold', color: '#4CAF50', marginTop: 8 },
  perDay: { fontSize: 14, color: '#888', fontWeight: 'normal' },
  statusContainer: { marginTop: 8 },
  status: { fontSize: 14, fontWeight: 'bold' },
  section: { marginTop: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  description: { fontSize: 14, color: '#666', lineHeight: 20 },
  bookingSection: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  daysContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  daysLabel: { fontSize: 16, fontWeight: 'bold' },
  daysControl: { flexDirection: 'row', alignItems: 'center' },
  daysButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  daysButtonText: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  daysCount: { fontSize: 18, fontWeight: 'bold', marginHorizontal: 16, minWidth: 24, textAlign: 'center' },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalLabel: { fontSize: 18, fontWeight: 'bold' },
  totalPrice: { fontSize: 18, fontWeight: 'bold', color: '#4CAF50' },
  bookButton: {
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  bookButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default BikeDetailScreen;
