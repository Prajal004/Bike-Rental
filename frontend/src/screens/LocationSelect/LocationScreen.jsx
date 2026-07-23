import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as Location from 'expo-location';
import locationAPI from '../../api/location.api';

const LocationScreen = ({ route, navigation }) => {
  const { type = 'pickup' } = route.params || {};
  const [searchQuery, setSearchQuery] = useState('');
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    fetchLocations();
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      const loc = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        lat: loc.coords.latitude,
        lng: loc.coords.longitude,
        name: 'Current Location',
        address: 'Your current position',
      });
    }
  };

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const response = await locationAPI.getAll();
      if (response.success) {
        setLocations(response.locations || []);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load locations');
    } finally {
      setLoading(false);
    }
  };

  const searchLocations = async (query) => {
    if (!query.trim()) {
      fetchLocations();
      return;
    }
    setLoading(true);
    try {
      const response = await locationAPI.search(query);
      if (response.success) {
        setLocations(response.locations || []);
      }
    } catch (error) {
      Alert.alert('Error', 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (location) => {
    navigation.navigate('OrderSummary', {
      [type === 'pickup' ? 'pickupLocation' : 'returnLocation']: location,
    });
  };

  const handleCurrentLocation = () => {
    if (currentLocation) {
      handleSelect(currentLocation);
    } else {
      Alert.alert('Error', 'Unable to get current location');
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.locationItem} onPress={() => handleSelect(item)}>
      <View style={styles.locationIcon}>
        <Text style={styles.iconText}>📍</Text>
      </View>
      <View style={styles.locationInfo}>
        <Text style={styles.locationName}>{item.name}</Text>
        <Text style={styles.locationAddress}>{item.address}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {type === 'pickup' ? 'Select Pickup Location' : 'Select Return Location'}
      </Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search locations..."
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            searchLocations(text);
          }}
        />
      </View>

      {currentLocation && (
        <TouchableOpacity style={styles.currentLocation} onPress={handleCurrentLocation}>
          <Text style={styles.currentLocationText}>📍 Use Current Location</Text>
        </TouchableOpacity>
      )}

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#E63946" />
        </View>
      ) : (
        <FlatList
          data={locations}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No locations found</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: 20,
    marginBottom: 16,
  },
  searchContainer: {
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
  },
  currentLocation: {
    backgroundColor: '#E63946',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  currentLocationText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  locationItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 12,
  },
  iconText: {
    fontSize: 24,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  locationAddress: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default LocationScreen;
