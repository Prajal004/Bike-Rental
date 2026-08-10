import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import { IMAGES } from '../../constants/images';
import { COLORS } from '../../styles/colors';
import { DISTRICTS } from '../../constants/locations';

const MOCK_BIKES = [
  { id: '1', name: 'Honda CB Shine', brand: 'Honda', cc: 125, price: 350, rating: 4.5, available: true, location: 'Kathmandu', image: IMAGES.honda },
  { id: '2', name: 'Yamaha FZ', brand: 'Yamaha', cc: 150, price: 400, rating: 4.6, available: true, location: 'Pokhara', image: IMAGES.yamaha },
  { id: '3', name: 'TVS Apache', brand: 'TVS', cc: 160, price: 380, rating: 4.3, available: false, location: 'Lalitpur', image: IMAGES.tvs },
  { id: '4', name: 'Royal Enfield', brand: 'Royal Enfield', cc: 350, price: 1200, rating: 4.8, available: true, location: 'Chitwan', image: IMAGES.royal },
];

export default function HomeScreen({ navigation }) {
  const [selectedCity, setSelectedCity] = useState('Kathmandu');
  const [modalVisible, setModalVisible] = useState(false);
  const [bikes] = useState(MOCK_BIKES);

  // ✅ Filter bikes by city
  const filteredBikes = bikes.filter(bike => 
    bike.location?.toLowerCase().includes(selectedCity.toLowerCase())
  );

  const renderBike = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('BikeDetail', { bike: item })}
    >
      <Image source={item.image} style={styles.cardImage} />
      <View style={styles.cardBody}>
        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.cardBrand}>{item.brand} · {item.cc}cc</Text>
        <View style={styles.locationRow}>
          <Text style={styles.locationIcon}>📍</Text>
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
        <View style={styles.cardBottom}>
          <Text style={styles.cardPrice}>Rs {item.price}/day</Text>
          <Text style={[styles.status, { color: item.available ? COLORS.success : COLORS.danger }]}>
            {item.available ? '✅ Available' : '❌ Unavailable'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* ✅ City Selector Header */}
      <TouchableOpacity style={styles.citySelector} onPress={() => setModalVisible(true)}>
        <Text style={styles.cityLabel}>📍 {selectedCity}</Text>
        <Text style={styles.cityArrow}>▼</Text>
      </TouchableOpacity>

      {/* ✅ City Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select City</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.cityGrid}>
                {DISTRICTS.map((city) => (
                  <TouchableOpacity
                    key={city}
                    style={[styles.cityItem, selectedCity === city && styles.cityItemSelected]}
                    onPress={() => {
                      setSelectedCity(city);
                      setModalVisible(false);
                    }}
                  >
                    <Text style={selectedCity === city ? styles.cityTextSelected : styles.cityText}>
                      {city}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ✅ Bike List */}
      <FlatList
        data={filteredBikes}
        renderItem={renderBike}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No bikes available in {selectedCity}</Text>
            <Text style={styles.emptySubtext}>Try selecting another city</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  citySelector: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    backgroundColor: '#fff', 
    padding: 14, 
    marginHorizontal: 12, 
    marginTop: 12, 
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  cityLabel: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  cityArrow: { fontSize: 16, color: '#888' },
  list: { padding: 12 },
  card: { backgroundColor: '#fff', borderRadius: 12, marginBottom: 12, overflow: 'hidden', flexDirection: 'row' },
  cardImage: { width: 100, height: 100, resizeMode: 'cover' },
  cardBody: { flex: 1, padding: 12, justifyContent: 'center' },
  cardName: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  cardBrand: { fontSize: 14, color: '#888', marginTop: 2 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  locationIcon: { fontSize: 12, marginRight: 4 },
  locationText: { fontSize: 12, color: '#666' },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 },
  cardPrice: { fontSize: 16, fontWeight: 'bold', color: '#4CAF50' },
  status: { fontSize: 12, fontWeight: 'bold' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#fff', borderRadius: 16, padding: 20, width: '90%', maxHeight: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 20, fontWeight: 'bold' },
  modalClose: { fontSize: 24, color: '#888' },
  cityGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  cityItem: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, borderWidth: 1, borderColor: '#ddd', margin: 4 },
  cityItemSelected: { backgroundColor: '#4CAF50', borderColor: '#4CAF50' },
  cityText: { color: '#333', fontSize: 14 },
  cityTextSelected: { color: '#fff', fontSize: 14 },
  emptyContainer: { padding: 40, alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#666' },
  emptySubtext: { fontSize: 14, color: '#999', marginTop: 4 },
});
