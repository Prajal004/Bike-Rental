import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, StyleSheet, ScrollView
} from 'react-native';
import { COLORS } from '../../styles/colors';
import Button from '../../components/common/Button';

const MOCK_LOCATIONS = [
  { id: '1', name: 'Satungal Station', address: 'Satungal, Kathmandu' },
  { id: '2', name: 'ASHOK Motors', address: 'Kathmandu, Nepal' },
  { id: '3', name: 'NADAR Motors', address: 'Kathmandu, Nepal' },
  { id: '4', name: 'Thamel Bike Rental', address: 'Thamel, Kathmandu' },
  { id: '5', name: 'Lakeside Rentals', address: 'Pokhara Lakeside' },
];

export default function LocationScreen({ navigation, route }) {
  const { bike, addons, totalPrice } = route.params || {};
  const [pickup, setPickup] = useState(null);
  const [dropoff, setDropoff] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(null);

  const filteredLocations = MOCK_LOCATIONS.filter(loc =>
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectLocation = (type, location) => {
    if (type === 'pickup') setPickup(location);
    else setDropoff(location);
    setShowSearch(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.topbarTitle}>Sewa Motor</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.bikeName}>{bike?.name || 'Honda Beat'} 2018</Text>
          <Text style={styles.bikeSub}>Rental prajal · ★ {bike?.rating || 4.6}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>PICK UP LOCATION *</Text>
          <TouchableOpacity style={styles.locationSelector} onPress={() => setShowSearch('pickup')}>
            <Text style={pickup ? styles.locationText : styles.placeholderText}>
              {pickup ? pickup.name : 'Select pickup location'}
            </Text>
            <Text style={styles.chevron}>⌄</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>RETURN LOCATION *</Text>
          <TouchableOpacity style={styles.locationSelector} onPress={() => setShowSearch('return')}>
            <Text style={dropoff ? styles.locationText : styles.placeholderText}>
              {dropoff ? dropoff.name : 'Select return location'}
            </Text>
            <Text style={styles.chevron}>⌄</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>RENTAL DURATION *</Text>
          <Text style={styles.durationText}>25 Jun 2026, 09:00 → 26 Jun 2026, 09:00</Text>
        </View>

        <TouchableOpacity
          style={[styles.continueButton, (!pickup || !dropoff) && styles.continueDisabled]}
          onPress={() => navigation.navigate('Payment', { bike, addons, totalPrice, pickup, dropoff })}
          disabled={!pickup || !dropoff}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>

      {showSearch && (
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{showSearch === 'pickup' ? 'Pickup Location' : 'Return Location'}</Text>
              <TouchableOpacity onPress={() => setShowSearch(null)}><Text style={styles.closeText}>✕</Text></TouchableOpacity>
            </View>
            <TextInput style={styles.searchInput} placeholder="Search location..." value={searchQuery} onChangeText={setSearchQuery} autoFocus />
            <FlatList data={filteredLocations} keyExtractor={(item) => item.id} renderItem={({ item }) => (
              <TouchableOpacity style={styles.locationItem} onPress={() => selectLocation(showSearch, item)}>
                <Text style={styles.locationIcon}>📍</Text>
                <View style={styles.locationItemText}>
                  <Text style={styles.locationItemName}>{item.name}</Text>
                  <Text style={styles.locationItemAddress}>{item.address}</Text>
                </View>
              </TouchableOpacity>
            )} />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1ECE2' },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#16342A',
    paddingHorizontal: 18,
    paddingTop: 50,
    paddingBottom: 14,
  },
  back: { fontSize: 20, color: '#fff' },
  topbarTitle: { fontSize: 16, fontWeight: '600', color: '#fff' },
  content: { padding: 20 },
  card: {
    backgroundColor: '#FFFCF6',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E4DDCC',
  },
  bikeName: { fontSize: 14.5, fontWeight: '600', color: '#1B2A22', marginBottom: 2 },
  bikeSub: { fontSize: 11, color: '#6B7A70' },
  sectionLabel: { fontSize: 11, fontWeight: '600', color: '#6B7A70', textTransform: 'uppercase', letterSpacing: 0.3, marginBottom: 6 },
  locationSelector: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1.5, borderBottomColor: '#E4DDCC' },
  locationText: { fontSize: 14, fontWeight: '600', color: '#1B2A22' },
  placeholderText: { fontSize: 14, color: '#6B7A70' },
  chevron: { fontSize: 14, color: '#6B7A70' },
  durationText: { fontSize: 13, fontWeight: '600', color: '#1B2A22', marginTop: 4 },
  continueButton: { backgroundColor: '#9C4A2E', borderRadius: 999, padding: 15, alignItems: 'center', marginTop: 8 },
  continueDisabled: { backgroundColor: '#ccc' },
  continueText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  modal: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#FFFCF6', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, maxHeight: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 18, fontWeight: '600', color: '#1B2A22' },
  closeText: { fontSize: 20, color: '#6B7A70' },
  searchInput: { borderWidth: 1.5, borderColor: '#E4DDCC', borderRadius: 12, padding: 14, fontSize: 15, backgroundColor: '#FFFCF6', marginBottom: 16, color: '#1B2A22' },
  locationItem: { flexDirection: 'row', alignItems: 'center', padding: 14, borderBottomWidth: 1, borderBottomColor: '#E4DDCC' },
  locationIcon: { fontSize: 18, marginRight: 12 },
  locationItemText: { flex: 1 },
  locationItemName: { fontSize: 14, fontWeight: '600', color: '#1B2A22' },
  locationItemAddress: { fontSize: 12, color: '#6B7A70' },
});
