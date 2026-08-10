import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { IMAGES } from '../../constants/images';
import { COLORS } from '../../styles/colors';

const MOCK_BIKES = [
  { id: '1', name: 'Honda CB Shine', brand: 'Honda', cc: 125, price: 350, rating: 4.5, available: true, image: IMAGES.honda },
  { id: '2', name: 'Yamaha FZ', brand: 'Yamaha', cc: 150, price: 400, rating: 4.6, available: true, image: IMAGES.yamaha },
  { id: '3', name: 'TVS Apache', brand: 'TVS', cc: 160, price: 380, rating: 4.3, available: false, image: IMAGES.tvs },
  { id: '4', name: 'Royal Enfield', brand: 'Royal Enfield', cc: 350, price: 1200, rating: 4.8, available: true, image: IMAGES.royal },
];

export default function HomeScreen({ navigation }) {
  const [bikes, setBikes] = useState(MOCK_BIKES);
  const [loading, setLoading] = useState(false);

  const renderBike = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('BikeDetail', { bikeId: item.id })}
    >
      <Image source={item.image} style={styles.cardImage} />
      <View style={styles.cardBody}>
        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.cardBrand}>{item.brand} · {item.cc}cc</Text>
        <View style={styles.cardBottom}>
          <Text style={styles.cardPrice}>Rs {item.price}/day</Text>
          <Text style={[styles.status, { color: item.available ? COLORS.success : COLORS.danger }]}>
            {item.available ? '✅ Available' : '❌ Unavailable'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Banner */}
      <Image source={IMAGES.banner} style={styles.banner} />
      
      <FlatList
        data={bikes}
        renderItem={renderBike}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  banner: { width: '100%', height: 120, marginBottom: 12 },
  list: { padding: 12 },
  card: { backgroundColor: '#fff', borderRadius: 12, marginBottom: 12, overflow: 'hidden', flexDirection: 'row' },
  cardImage: { width: 100, height: 100, resizeMode: 'cover' },
  cardBody: { flex: 1, padding: 12, justifyContent: 'center' },
  cardName: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  cardBrand: { fontSize: 14, color: '#888', marginTop: 2 },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 },
  cardPrice: { fontSize: 16, fontWeight: 'bold', color: '#4CAF50' },
  status: { fontSize: 12, fontWeight: 'bold' },
});
