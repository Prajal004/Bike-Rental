import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../../api/axios';

const HomeScreen = ({ navigation }) => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBikes, setFilteredBikes] = useState([]);

  useEffect(() => {
    fetchBikes();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = bikes.filter(bike =>
        bike.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bike.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBikes(filtered);
    } else {
      setFilteredBikes(bikes);
    }
  }, [searchQuery, bikes]);

  const fetchBikes = async () => {
    try {
      const response = await api.get('/motorcycles');
      if (response.success) {
        setBikes(response.motorcycles || []);
        setFilteredBikes(response.motorcycles || []);
      }
    } catch (error) {
      console.error('Error fetching bikes:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('BikeDetail', { bikeId: item.id })}
    >
      <View style={styles.cardContent}>
        <View>
          <Text style={styles.bikeName}>{item.name}</Text>
          <Text style={styles.bikeBrand}>{item.brand} · {item.cc}cc</Text>
          <Text style={styles.bikePrice}>Rs {item.pricePerDay}/day</Text>
        </View>
        <View style={styles.bikeStatus}>
          <Text style={styles.bikeRating}>⭐ {item.rating || 4.5}</Text>
          <Text style={[styles.availability, { color: item.available ? '#4CAF50' : '#E53935' }]}>
            {item.available ? '✅ Available' : '❌ Unavailable'}
          </Text>
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
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search bikes..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close" size={20} color="#888" />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.resultCount}>{filteredBikes.length} bikes found</Text>

      <FlatList
        data={filteredBikes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, padding: 12, fontSize: 16 },
  resultCount: { fontSize: 14, color: '#888', marginBottom: 12 },
  list: { paddingBottom: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bikeName: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  bikeBrand: { fontSize: 14, color: '#888', marginTop: 2 },
  bikePrice: { fontSize: 16, fontWeight: 'bold', color: '#4CAF50', marginTop: 4 },
  bikeStatus: { alignItems: 'flex-end' },
  bikeRating: { fontSize: 14, color: '#f5a623' },
  availability: { fontSize: 12, marginTop: 4 },
});

export default HomeScreen;
