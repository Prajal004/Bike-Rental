import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import axiosClient from '../../api/axiosClient';

const VerifyBikesScreen = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPendingBikes();
  }, []);

  const fetchPendingBikes = async () => {
    try {
      const response = await axiosClient.get('/admin/bikes/pending');
      if (response.success) {
        setBikes(response.data.bikes || []);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load pending bikes');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleVerify = async (bikeId, status) => {
    try {
      const response = await axiosClient.put(`/admin/bikes/${bikeId}/verify`, {
        status,
        note: status === 'verified' ? 'Verified by admin' : 'Rejected',
      });
      if (response.success) {
        Alert.alert('Success', `Bike ${status} successfully`);
        fetchPendingBikes();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to verify bike');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.bikeName}>{item.name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: '#F39C12' }]}>
          <Text style={styles.statusText}>PENDING</Text>
        </View>
      </View>
      
      <Text style={styles.details}>{item.brand} • {item.year} • {item.cc}cc</Text>
      <Text style={styles.price}>Rs {item.pricePerDay}/day</Text>
      
      {item.shop && (
        <Text style={styles.shop}>🏪 {item.shop.shopName || 'Unknown Shop'}</Text>
      )}

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.approveButton]}
          onPress={() => handleVerify(item.id, 'verified')}
        >
          <Text style={styles.actionText}>✅ Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.rejectButton]}
          onPress={() => handleVerify(item.id, 'rejected')}
        >
          <Text style={styles.actionText}>❌ Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#E63946" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Bikes</Text>
      <Text style={styles.subtitle}>Review and verify pending bikes</Text>

      {bikes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>🎉 No pending bikes</Text>
          <Text style={styles.emptySubtext}>All bikes are verified</Text>
        </View>
      ) : (
        <FlatList
          data={bikes}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchPendingBikes} />
          }
          contentContainerStyle={styles.list}
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bikeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E63946',
    marginTop: 4,
  },
  shop: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  actionButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  approveButton: {
    backgroundColor: '#2ECC71',
  },
  rejectButton: {
    backgroundColor: '#E63946',
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  emptySubtext: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
});

export default VerifyBikesScreen;
