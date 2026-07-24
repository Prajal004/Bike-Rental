import React, { useState, useEffect } from 'react';
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
import { COLORS } from '../../styles/colors';
import motorbikeAPI from '../../api/motorbike.api';

const MOCK_BIKES = [
  { id: '1', name: 'Honda Beat', cc: '100cc', price: 280, rating: 4.5, dist: '0.4 km away' },
  { id: '2', name: 'Honda Vario', cc: '125cc', price: 500, rating: 4.6, dist: '0.6 km away' },
  { id: '3', name: 'Scoopy', cc: '100cc', price: 280, rating: 4.3, dist: '0.9 km away' },
  { id: '4', name: 'Supra X 125', cc: '125cc', price: 300, rating: 4.4, dist: '1.1 km away' },
];

function StarRating({ rating }) {
  const full = Math.round(rating);
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    stars += i <= full ? '★' : '☆';
  }
  return (
    <View style={styles.starRow}>
      <Text style={styles.starText}>{stars} {rating}</Text>
    </View>
  );
}

function BikeCard({ bike, onPress }) {
  return (
    <TouchableOpacity style={styles.bikeCard} onPress={onPress}>
      <View style={[styles.bikeThumb, { backgroundColor: `${COLORS.pine}14` }]}>
        <Text style={styles.bikeEmoji}>🏍️</Text>
      </View>
      <View style={styles.bikeInfo}>
        <Text style={styles.bikeName}>{bike.name}</Text>
        <Text style={styles.bikeCc}>{bike.cc}</Text>
        <Text style={styles.bikeDist}>📍 {bike.dist}</Text>
        <View style={styles.bikeBottom}>
          <View>
            <Text style={styles.bikePrice}>Rs {bike.price} <Text style={styles.bikePerDay}>/day</Text></Text>
            <StarRating rating={bike.rating} />
          </View>
          <View style={styles.goButton}>
            <Text style={styles.goText}>›</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen({ navigation }) {
  const [station] = useState('Satungal Station');
  const [bikes, setBikes] = useState(MOCK_BIKES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    setLoading(true);
    try {
      const response = await motorbikeAPI.getAll();
      if (response.success && response.motorcycles.length > 0) {
        setBikes(response.motorcycles.map(b => ({
          id: b.id,
          name: b.name,
          cc: `${b.cc}cc`,
          price: b.pricePerDay,
          rating: b.rating || 4.5,
          dist: '0.5 km away',
        })));
      }
    } catch (error) {
      console.error('Error fetching bikes:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.pine} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.stationPicker}>
          <Text style={styles.stationText}>{station} ⌄</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={22} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Enjoy prajal services and pay easily</Text>
          <Text style={styles.bannerEmoji}>🏍️</Text>
        </View>

        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Around you</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bikeGrid}>
          {bikes.map((bike) => (
            <BikeCard
              key={bike.id}
              bike={bike}
              onPress={() => navigation.navigate('BikeDetail', { bikeId: bike.id })}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.stone,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.stone,
  },
  header: {
    backgroundColor: COLORS.pine,
    paddingTop: 44,
    paddingHorizontal: 18,
    paddingBottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stationPicker: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stationText: {
    color: COLORS.white,
    fontSize: 14.5,
    fontWeight: '700',
  },
  banner: {
    marginHorizontal: 16,
    marginTop: 14,
    height: 132,
    borderRadius: 20,
    backgroundColor: '#16342A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
  bannerText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '600',
    maxWidth: '62%',
    lineHeight: 23,
  },
  bannerEmoji: {
    fontSize: 60,
    opacity: 0.28,
  },
  sectionHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 22,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.ink,
  },
  seeAll: {
    fontSize: 12,
    color: COLORS.brick,
    fontWeight: '700',
  },
  bikeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingBottom: 90,
    gap: 12,
  },
  bikeCard: {
    width: '47%',
    backgroundColor: COLORS.paper,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  bikeThumb: {
    height: 86,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bikeEmoji: {
    fontSize: 40,
  },
  bikeInfo: {
    paddingHorizontal: 12,
    paddingBottom: 13,
    paddingTop: 11,
  },
  bikeName: {
    fontSize: 13.5,
    fontWeight: '700',
    color: COLORS.ink,
  },
  bikeCc: {
    fontSize: 10,
    color: COLORS.inkSoft,
    marginBottom: 3,
  },
  bikeDist: {
    fontSize: 9.5,
    color: COLORS.pineSoft,
    fontWeight: '600',
    marginBottom: 7,
  },
  bikeBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  bikePrice: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.ink,
  },
  bikePerDay: {
    fontSize: 9,
    fontWeight: '500',
    color: COLORS.inkSoft,
  },
  starRow: {
    marginTop: 2,
  },
  starText: {
    fontSize: 10,
    color: COLORS.marigold,
  },
  goButton: {
    width: 27,
    height: 27,
    borderRadius: 14,
    backgroundColor: COLORS.pine,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
