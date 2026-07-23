import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import shopAPI from '../../api/shop.api';
import Button from '../../components/common/Button';

const ShopDetailScreen = ({ route, navigation }) => {
  const { shopId } = route.params || {};
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (shopId) fetchShop();
  }, [shopId]);

  const fetchShop = async () => {
    try {
      const response = await shopAPI.getShopById(shopId);
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
        <Text style={styles.errorText}>Shop not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.shopName}>{shop.shopName}</Text>
        {shop.isVerified && (
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>✅ Verified</Text>
          </View>
        )}
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

        {shop.description && (
          <>
            <Text style={styles.infoLabel}>📝 Description</Text>
            <Text style={styles.infoValue}>{shop.description}</Text>
          </>
        )}
      </View>

      <Button
        title="View Bikes"
        onPress={() => navigation.navigate('MyBikes', { shopId: shop.id })}
        style={styles.button}
      />
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
  },
  errorText: {
    fontSize: 18,
    color: '#666',
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
  verifiedBadge: {
    backgroundColor: '#2ECC71',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verifiedText: {
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
  button: {
    marginBottom: 20,
  },
});

export default ShopDetailScreen;
