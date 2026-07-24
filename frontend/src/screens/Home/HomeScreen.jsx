import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  ScrollView, StyleSheet, ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import motorbikeAPI from '../../api/motorbike.api';

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    try {
      const response = await motorbikeAPI.getAll();
      if (response.success) {
        setBikes(response.motorcycles || []);
      }
    } catch (error) {
      console.error('Error fetching bikes:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderBike = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('MotorbikeDetail', { bikeId: item.id })}
    >
      <View style={styles.cardImage}>
        <Text style={styles.bikeEmoji}>🏍️</Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.cardCc}>{item.cc}cc</Text>
        <View style={styles.cardBottom}>
          <View>
            <Text style={styles.cardPrice}>Rs {item.pricePerDay}<Text style={styles.perDay}>/day</Text></Text>
            <Text style={styles.rating}>★ {item.rating || 4.5}</Text>
          </View>
          <View style={styles.arrowButton}>
            <Text style={styles.arrowText}>›</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.stationPicker}>
          <Text style={styles.stationText}>Satungal Station ⌄</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Enjoy prajal services and pay easily</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Around you</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {bikes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No bikes available</Text>
            <Text style={styles.emptySubtext}>Check back later!</Text>
          </View>
        ) : (
          <FlatList
            data={bikes}
            renderItem={renderBike}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            scrollEnabled={false}
            contentContainerStyle={styles.grid}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    backgroundColor: '#16342A',
    paddingTop: 44,
    paddingHorizontal: 18,
    paddingBottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stationText: { color: '#fff', fontSize: 14.5, fontWeight: '700' },
  banner: {
    marginHorizontal: 16,
    marginTop: 14,
    height: 132,
    borderRadius: 20,
    backgroundColor: '#24503F',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  bannerText: { color: '#fff', fontSize: 17, fontWeight: '600' },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 22,
    paddingBottom: 10,
  },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#1B2A22' },
  seeAll: { fontSize: 12, color: '#9C4A2E', fontWeight: '700' },
  grid: { paddingHorizontal: 12 },
  row: { justifyContent: 'space-between' },
  card: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E4DDCC',
  },
  cardImage: { height: 86, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F1ECE2' },
  bikeEmoji: { fontSize: 40 },
  cardBody: { paddingHorizontal: 12, paddingBottom: 13, paddingTop: 11 },
  cardName: { fontSize: 13.5, fontWeight: '700', color: '#1B2A22' },
  cardCc: { fontSize: 10, color: '#6B7A70' },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  cardPrice: { fontSize: 15, fontWeight: '600', color: '#1B2A22' },
  perDay: { fontSize: 9, fontWeight: '500', color: '#6B7A70' },
  rating: { fontSize: 10, color: '#E3A23D', marginTop: 2 },
  arrowButton: {
    width: 27,
    height: 27,
    borderRadius: 14,
    backgroundColor: '#16342A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  emptyContainer: { padding: 40, alignItems: 'center' },
  emptyText: { fontSize: 18, color: '#666' },
  emptySubtext: { fontSize: 14, color: '#999', marginTop: 4 },
});
