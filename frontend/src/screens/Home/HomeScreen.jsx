import { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import motorbikeAPI from '../../api/motorbike.api';

function StarRating({ rating }) {
  const stars = [];
  const fullStars = Math.round(rating || 0);
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Text key={i} style={i <= fullStars ? styles.starFilled : styles.starEmpty}>★</Text>
    );
  }
  return (
    <View style={styles.ratingRow}>
      {stars}
      <Text style={styles.ratingText}>{rating || 0}</Text>
    </View>
  );
}

export default function HomeScreen({ navigation }) {
  const [station] = useState('Satungal Station');
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchBikes();
  };

  const renderBike = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('MotorbikeDetail', { bikeId: item.id })}
    >
      <Image 
        source={item.images && item.images.length > 0 
          ? { uri: `http://localhost:5001/uploads/${item.images[0]}` }
          : require('../../../assets/images/bike.png')
        } 
        style={styles.cardImage} 
        resizeMode="cover" 
      />
      <View style={styles.cardBody}>
        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.cardCc}>{item.cc}cc</Text>
        <View style={styles.cardBottomRow}>
          <View>
            <Text style={styles.cardPrice}>Rs {item.pricePerDay}<Text style={styles.perDay}>/day</Text></Text>
            <StarRating rating={item.rating || 4.5} />
          </View>
          <TouchableOpacity style={styles.arrowButton}>
            <Ionicons name="chevron-forward" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading bikes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.stationPicker}>
          <Text style={styles.stationText}>{station}</Text>
          <Ionicons name="chevron-down" size={14} color="#fff" style={{ marginLeft: 4 }} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Banner */}
        <Image
          source={require('../../../assets/images/bike.png')}
          style={styles.banner}
          resizeMode="cover"
        />

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
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  header: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 12,
  },
  stationPicker: { flexDirection: 'row', alignItems: 'center' },
  stationText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  banner: { width: '100%', height: 140, backgroundColor: '#e8f5e9', marginTop: 12 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 8,
  },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  seeAll: { fontSize: 13, color: '#4CAF50' },
  grid: { paddingHorizontal: 12 },
  row: { justifyContent: 'space-between' },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
    overflow: 'hidden',
  },
  cardImage: { width: '100%', height: 90, backgroundColor: '#f0f0f0' },
  cardBody: { padding: 10 },
  cardName: { fontSize: 14, fontWeight: 'bold', color: '#222' },
  cardCc: { fontSize: 11, color: '#888', marginBottom: 6 },
  cardBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  cardPrice: { fontSize: 13, fontWeight: 'bold', color: '#222' },
  perDay: { fontSize: 10, fontWeight: 'normal', color: '#888' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  starFilled: { fontSize: 10, color: '#FFB800', marginRight: 1 },
  starEmpty: { fontSize: 10, color: '#DDD', marginRight: 1 },
  ratingText: { fontSize: 10, color: '#888', marginLeft: 3 },
  arrowButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 14,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
});
