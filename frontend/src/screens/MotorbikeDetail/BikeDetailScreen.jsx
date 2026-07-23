import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import motorbikeAPI from '../../api/motorbike.api';
import Button from '../../components/common/Button';

const BikeDetailScreen = ({ route, navigation }) => {
  const { id } = route.params || {};
  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchBike();
  }, [id]);

  const fetchBike = async () => {
    try {
      const response = await motorbikeAPI.getById(id);
      if (response.success) {
        setBike(response.motorcycle);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load bike details');
    } finally {
      setLoading(false);
    }
  };

  const handleRent = () => {
    navigation.navigate('OrderSummary', { bikeId: id, bike });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E63946" />
      </View>
    );
  }

  if (!bike) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Bike not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Text style={styles.imagePlaceholder}>🏍️</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{bike.name}</Text>
        <Text style={styles.brand}>{bike.brand} • {bike.year}</Text>
        <Text style={styles.cc}>{bike.cc} cc</Text>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>Rs {bike.pricePerDay}</Text>
          <Text style={styles.priceLabel}>/ day</Text>
        </View>

        {bike.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{bike.description}</Text>
          </View>
        )}

        {bike.specifications && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Specifications</Text>
            <View style={styles.specGrid}>
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Engine</Text>
                <Text style={styles.specValue}>{bike.specifications.engine || 'N/A'}</Text>
              </View>
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Mileage</Text>
                <Text style={styles.specValue}>{bike.specifications.mileage || 'N/A'}</Text>
              </View>
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Fuel</Text>
                <Text style={styles.specValue}>{bike.specifications.fuelType || 'Petrol'}</Text>
              </View>
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Transmission</Text>
                <Text style={styles.specValue}>{bike.specifications.transmission || 'Manual'}</Text>
              </View>
            </View>
          </View>
        )}

        <Button title="Rent Now" onPress={handleRent} style={styles.rentButton} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#666',
  },
  imageContainer: {
    height: 250,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    fontSize: 80,
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  brand: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  cc: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 16,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E63946',
  },
  priceLabel: {
    fontSize: 16,
    color: '#666',
    marginLeft: 4,
  },
  section: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
  specGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  specItem: {
    width: '50%',
    paddingVertical: 8,
  },
  specLabel: {
    fontSize: 12,
    color: '#999',
  },
  specValue: {
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: '500',
    marginTop: 2,
  },
  rentButton: {
    marginTop: 20,
  },
});

export default BikeDetailScreen;
