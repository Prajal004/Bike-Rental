import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

const LOCATIONS = {
  'Kathmandu': ['Thamel', 'Boudha', 'Swoyambhu', 'Kalanki', 'Koteshwor', 'Maitighar', 'Lazimpat', 'Baluwatar'],
  'Lalitpur': ['Patan', 'Jawalakhel', 'Kumaripati', 'Lagankhel'],
  'Bhaktapur': ['Bhaktapur Durbar Square', 'Changu Narayan', 'Thimi'],
  'Pokhara': ['Lakeside', 'Sarangkot', 'Phewa Lake', 'Damside'],
  'Chitwan': ['Sauraha', 'Bharatpur', 'Narayanghat'],
};

export default function BookingScreen({ route, navigation }) {
  const { bike } = route.params || {};
  const [pickupLocation, setPickupLocation] = useState('');
  const [returnLocation, setReturnLocation] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('Kathmandu');
  const [duration, setDuration] = useState(1);

  const pricePerDay = bike?.pricePerDay || 350;
  const totalPrice = pricePerDay * duration;

  const handleConfirm = () => {
    // ✅ Booking confirmed — Price pass garne
    navigation.navigate('Payment', { 
      bike: bike,
      totalPrice: totalPrice,
      duration: duration,
      pickupLocation: pickupLocation || 'Not specified',
      returnLocation: returnLocation || 'Not specified',
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📋 Booking</Text>

      <View style={styles.bikeInfo}>
        <Text style={styles.bikeName}>{bike?.name || 'Honda CB Shine'}</Text>
        <Text style={styles.bikePrice}>Rs {pricePerDay}/day</Text>
      </View>

      {/* Duration */}
      <Text style={styles.label}>📅 Duration (days)</Text>
      <View style={styles.durationContainer}>
        <TouchableOpacity style={styles.durationBtn} onPress={() => setDuration(Math.max(1, duration - 1))}>
          <Text style={styles.durationBtnText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.durationText}>{duration}</Text>
        <TouchableOpacity style={styles.durationBtn} onPress={() => setDuration(duration + 1)}>
          <Text style={styles.durationBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* District Selector */}
      <Text style={styles.label}>📍 Select District</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.districtScroll}>
        {Object.keys(LOCATIONS).map((district) => (
          <TouchableOpacity
            key={district}
            style={[styles.districtBtn, selectedDistrict === district && styles.districtSelected]}
            onPress={() => setSelectedDistrict(district)}
          >
            <Text style={selectedDistrict === district ? styles.districtTextSelected : styles.districtText}>
              {district}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Pickup Location (Optional) */}
      <Text style={styles.label}>📍 Pickup Location (Optional)</Text>
      <View style={styles.locationContainer}>
        {(LOCATIONS[selectedDistrict] || []).map((loc) => (
          <TouchableOpacity
            key={loc}
            style={[styles.locationBtn, pickupLocation === loc && styles.locationSelected]}
            onPress={() => setPickupLocation(loc)}
          >
            <Text style={pickupLocation === loc ? styles.locationTextSelected : styles.locationText}>
              {loc}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Return Location (Optional) */}
      <Text style={styles.label}>📍 Return Location (Optional)</Text>
      <View style={styles.locationContainer}>
        {(LOCATIONS[selectedDistrict] || []).map((loc) => (
          <TouchableOpacity
            key={loc}
            style={[styles.locationBtn, returnLocation === loc && styles.locationSelected]}
            onPress={() => setReturnLocation(loc)}
          >
            <Text style={returnLocation === loc ? styles.locationTextSelected : styles.locationText}>
              {loc}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Total */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalPrice}>Rs {totalPrice}</Text>
      </View>

      <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
        <Text style={styles.confirmBtnText}>Confirm Booking</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  bikeInfo: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 16 },
  bikeName: { fontSize: 16, fontWeight: 'bold' },
  bikePrice: { fontSize: 16, fontWeight: 'bold', color: '#4CAF50' },
  label: { fontSize: 14, fontWeight: '600', marginTop: 12, marginBottom: 8 },
  durationContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 12 },
  durationBtn: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#f0f0f0', borderRadius: 6 },
  durationBtnText: { fontSize: 20, fontWeight: 'bold' },
  durationText: { fontSize: 18, fontWeight: 'bold', marginHorizontal: 20, minWidth: 30, textAlign: 'center' },
  districtScroll: { flexDirection: 'row', marginBottom: 8 },
  districtBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#ddd', marginRight: 8 },
  districtSelected: { backgroundColor: '#4CAF50', borderColor: '#4CAF50' },
  districtText: { color: '#333' },
  districtTextSelected: { color: '#fff' },
  locationContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  locationBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#ddd', marginRight: 6, marginBottom: 6 },
  locationSelected: { backgroundColor: '#4CAF50', borderColor: '#4CAF50' },
  locationText: { color: '#333', fontSize: 13 },
  locationTextSelected: { color: '#fff', fontSize: 13 },
  totalContainer: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', padding: 16, borderRadius: 12, marginTop: 16 },
  totalLabel: { fontSize: 18, fontWeight: 'bold' },
  totalPrice: { fontSize: 18, fontWeight: 'bold', color: '#4CAF50' },
  confirmBtn: { backgroundColor: '#4CAF50', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 20, marginBottom: 40 },
  confirmBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
