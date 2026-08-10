import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import Layout from '../../components/layout/Layout';
import { IMAGES } from '../../constants/images';
import { COLORS } from '../../styles/colors';

export default function BikeDetailScreen({ route, navigation }) {
  const { bikeId } = route.params || {};
  const [days, setDays] = useState(1);

  const bike = {
    id: bikeId || '1',
    name: 'Honda CB Shine',
    brand: 'Honda',
    year: 2024,
    cc: 125,
    pricePerDay: 350,
    description: 'Best commuter bike in Nepal. Excellent mileage and comfortable ride.',
    available: true,
    rating: 4.5,
    image: IMAGES.honda,
  };

  const totalPrice = bike.pricePerDay * days;

  const handleBook = () => {
    Alert.alert('Book Now', `Booking ${bike.name} for ${days} days (Rs ${totalPrice})`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Confirm', onPress: () => navigation.navigate('Booking', { bike, days, totalPrice }) },
    ]);
  };

  return (
    <Layout showBack title="Bike Details">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={bike.image} style={styles.mainImage} />

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{bike.name}</Text>
          <Text style={styles.brand}>{bike.brand} · {bike.year} · {bike.cc}cc</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>Rs {bike.pricePerDay}</Text>
            <Text style={styles.perDay}>/ day</Text>
          </View>

          <View style={[styles.statusBadge, { backgroundColor: bike.available ? COLORS.success : COLORS.danger }]}>
            <Text style={styles.statusText}>{bike.available ? '✅ Available' : '❌ Unavailable'}</Text>
          </View>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{bike.description}</Text>

          <Text style={styles.sectionTitle}>Rating</Text>
          <Text style={styles.rating}>⭐ {bike.rating} / 5</Text>

          <View style={styles.bookingSection}>
            <Text style={styles.sectionTitle}>Duration</Text>
            <View style={styles.durationRow}>
              <TouchableOpacity style={styles.durationBtn} onPress={() => setDays(Math.max(1, days - 1))}>
                <Text style={styles.durationBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.durationText}>{days} day{days > 1 ? 's' : ''}</Text>
              <TouchableOpacity style={styles.durationBtn} onPress={() => setDays(days + 1)}>
                <Text style={styles.durationBtnText}>+</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalPrice}>Rs {totalPrice}</Text>
            </View>

            <TouchableOpacity style={styles.bookBtn} onPress={handleBook}>
              <Text style={styles.bookBtnText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  mainImage: { width: '100%', height: 200, resizeMode: 'cover' },
  infoContainer: { padding: 16 },
  name: { fontSize: 22, fontWeight: 'bold', color: COLORS.text },
  brand: { fontSize: 14, color: COLORS.textSecondary, marginTop: 2 },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: 8 },
  price: { fontSize: 28, fontWeight: 'bold', color: COLORS.primary },
  perDay: { fontSize: 14, color: COLORS.textSecondary, marginLeft: 4 },
  statusBadge: { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, marginTop: 8 },
  statusText: { color: COLORS.white, fontSize: 13, fontWeight: 'bold' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.text, marginTop: 16, marginBottom: 6 },
  description: { fontSize: 14, color: COLORS.textSecondary, lineHeight: 20 },
  rating: { fontSize: 16, color: COLORS.textSecondary },
  bookingSection: { backgroundColor: COLORS.grayLight, padding: 16, borderRadius: 12, marginTop: 16 },
  durationRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  durationBtn: { backgroundColor: COLORS.white, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 6 },
  durationBtnText: { fontSize: 18, fontWeight: 'bold', color: COLORS.text },
  durationText: { fontSize: 16, fontWeight: 'bold', color: COLORS.text, minWidth: 50, textAlign: 'center' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: COLORS.border },
  totalLabel: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
  totalPrice: { fontSize: 18, fontWeight: 'bold', color: COLORS.primary },
  bookBtn: { backgroundColor: COLORS.primary, padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 12 },
  bookBtnText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
});
