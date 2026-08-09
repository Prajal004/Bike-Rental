import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { api } from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const BookingScreen = ({ route, navigation }) => {
  const { bike, days, totalPrice } = route.params || {};
  const { user } = useAuth();
  const [pickupLocation, setPickupLocation] = useState('');
  const [returnLocation, setReturnLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [loading, setLoading] = useState(false);

  const locations = ['Thamel', 'Patan', 'Boudha', 'Swoyambhu', 'Airport', 'Lazimpat'];

  const handleBooking = async () => {
    if (!pickupLocation || !returnLocation || !pickupDate || !returnDate) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/rentals/create', {
        motorcycleId: bike.id,
        startDate: pickupDate,
        endDate: returnDate,
        pickupLocation,
        returnLocation,
        totalPrice: totalPrice || bike.pricePerDay * days,
      });

      if (response.success) {
        Alert.alert('Success', 'Booking confirmed!', [
          { text: 'OK', onPress: () => navigation.navigate('Payment', { rentalId: response.rental.id, totalPrice: totalPrice || bike.pricePerDay * days }) },
        ]);
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.bikeName}>{bike?.name || 'Bike'}</Text>
        <Text style={styles.bikePrice}>Rs {bike?.pricePerDay || 0}/day</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Pickup Location *</Text>
        <TextInput
          style={styles.input}
          placeholder="Select pickup location"
          value={pickupLocation}
          onChangeText={setPickupLocation}
        />

        <Text style={styles.label}>Return Location *</Text>
        <TextInput
          style={styles.input}
          placeholder="Select return location"
          value={returnLocation}
          onChangeText={setReturnLocation}
        />

        <Text style={styles.label}>Pickup Date *</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={pickupDate}
          onChangeText={setPickupDate}
        />

        <Text style={styles.label}>Return Date *</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={returnDate}
          onChangeText={setReturnDate}
        />

        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>Rs {totalPrice || bike?.pricePerDay * days || 0}</Text>
        </View>

        <TouchableOpacity style={styles.bookButton} onPress={handleBooking} disabled={loading}>
          <Text style={styles.bookButtonText}>
            {loading ? 'Processing...' : 'Confirm Booking'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  bikeName: { fontSize: 18, fontWeight: 'bold' },
  bikePrice: { fontSize: 16, fontWeight: 'bold', color: '#4CAF50' },
  form: { backgroundColor: '#fff', padding: 16, borderRadius: 12 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 8,
  },
  totalLabel: { fontSize: 18, fontWeight: 'bold' },
  totalPrice: { fontSize: 18, fontWeight: 'bold', color: '#4CAF50' },
  bookButton: {
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  bookButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default BookingScreen;
