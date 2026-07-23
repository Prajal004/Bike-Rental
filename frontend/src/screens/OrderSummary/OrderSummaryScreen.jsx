import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Button from '../../components/common/Button';
import LocationPicker from '../../components/booking/LocationPicker';
import DurationPicker from '../../components/booking/DurationPicker';
import rentalAPI from '../../api/rental.api';

const OrderSummaryScreen = ({ route, navigation }) => {
  const { bikeId, bike } = route.params || {};
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [returnLocation, setReturnLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateTotal = () => {
    if (!startDate || !endDate) return 0;
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    return bike?.pricePerDay * days || 0;
  };

  const handleRent = async () => {
    if (!startDate || !endDate) {
      Alert.alert('Error', 'Please select dates');
      return;
    }
    if (!pickupLocation) {
      Alert.alert('Error', 'Please select pickup location');
      return;
    }

    setLoading(true);
    try {
      const response = await rentalAPI.create({
        motorcycleId: bikeId,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        pickupLocation: pickupLocation.address || pickupLocation.name,
        returnLocation: returnLocation?.address || returnLocation?.name || pickupLocation.address || pickupLocation.name,
        paymentMethod: 'esewa',
      });

      if (response.success) {
        navigation.navigate('Payment', {
          rentalId: response.rental.rentalId,
          total: calculateTotal(),
        });
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to create rental');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Order Summary</Text>

      <View style={styles.bikeInfo}>
        <Text style={styles.bikeName}>{bike?.name || 'Bike'}</Text>
        <Text style={styles.bikePrice}>Rs {bike?.pricePerDay || 0}/day</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rental Duration</Text>
        <DurationPicker
          startDate={startDate}
          endDate={endDate}
          onSelect={(type, date) => {
            if (type === 'start') setStartDate(date);
            else setEndDate(date);
          }}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pickup Location</Text>
        <LocationPicker
          label="Pickup Location"
          selectedLocation={pickupLocation}
          onSelect={setPickupLocation}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Return Location</Text>
        <LocationPicker
          label="Return Location"
          selectedLocation={returnLocation}
          onSelect={setReturnLocation}
        />
      </View>

      {startDate && endDate && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>Rs {calculateTotal()}</Text>
          <Text style={styles.totalDays}>
            {Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))} days
          </Text>
        </View>
      )}

      <Button
        title="Proceed to Payment"
        onPress={handleRent}
        loading={loading}
        style={styles.button}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: 20,
    marginBottom: 16,
  },
  bikeInfo: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bikeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  bikePrice: {
    fontSize: 16,
    color: '#E63946',
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  totalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginVertical: 16,
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    color: '#666',
  },
  totalPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E63946',
    marginVertical: 4,
  },
  totalDays: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    marginBottom: 20,
  },
});

export default OrderSummaryScreen;
