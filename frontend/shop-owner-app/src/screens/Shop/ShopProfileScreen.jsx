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
import shopAPI from '../../api/shop.api';
import Button from '../../components/common/Button';

const ShopProfileScreen = ({ navigation }) => {
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyShop();
  }, []);

  const fetchMyShop = async () => {
    try {
      const response = await shopAPI.getMyShop();
      if (response.success) {
        setShop(response.shop);
      }
    } catch (error) {
      console.error('Error fetching shop:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#E63946" />
      </View>
    );
  }

  if (!shop) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>No shop registered</Text>
        <Button
          title="Register Shop"
          onPress={() => navigation.navigate('ShopRegistration')}
          style={styles.button}
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.shopName}>{shop.shopName}</Text>
        <View style={[styles.statusBadge, { backgroundColor: shop.isVerified ? '#2ECC71' : '#F39C12' }]}>
          <Text style={styles.statusText}>
            {shop.isVerified ? '✅ Verified' : '⏳ Pending'}
          </Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoLabel}>📍 Address</Text>
        <Text style={styles.infoValue}>{shop.address}</Text>

        <Text style={styles.infoLabel}>📞 Phone</Text>
        <Text style={styles.infoValue}>{shop.phone}</Text>

        {shop.email && (
          <>
            <Text style={styles.infoLabel}>📧 Email</Text>
            <Text style={styles.infoValue}>{shop.email}</Text>
          </>
        )}

        {shop.rating > 0 && (
          <>
            <Text style={styles.infoLabel}>⭐ Rating</Text>
            <Text style={styles.infoValue}>{shop.rating} / 5</Text>
          </>
        )}

        <Text style={styles.infoLabel}>📋 Total Rentals</Text>
        <Text style={styles.infoValue}>{shop.totalRentals || 0}</Text>
      </View>

      <View style={styles.actions}>
        <Button
          title="My Bikes"
          onPress={() => navigation.navigate('MyBikes')}
          variant="secondary"
        />
        <Button
          title="Add New Bike"
          onPress={() => navigation.navigate('AddBike')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 16,
  },
  shopName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginTop: 8,
  },
  infoValue: {
    fontSize: 16,
    color: '#1a1a1a',
    marginTop: 2,
  },
  actions: {
    gap: 10,
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
});

export default ShopProfileScreen;
