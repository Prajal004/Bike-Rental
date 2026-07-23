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

const VerifyShopsScreen = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPendingShops();
  }, []);

  const fetchPendingShops = async () => {
    try {
      const response = await axiosClient.get('/admin/shops/pending');
      if (response.success) {
        setShops(response.data.shops || []);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load pending shops');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleVerify = async (shopId, status) => {
    try {
      const response = await axiosClient.put(`/admin/shops/${shopId}/verify`, {
        status,
        note: status === 'verified' ? 'Verified by admin' : 'Rejected',
      });
      if (response.success) {
        Alert.alert('Success', `Shop ${status} successfully`);
        fetchPendingShops();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to verify shop');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.shopName}>{item.shopName}</Text>
        <View style={[styles.statusBadge, { backgroundColor: '#F39C12' }]}>
          <Text style={styles.statusText}>PENDING</Text>
        </View>
      </View>
      
      <Text style={styles.address}>📍 {item.address}</Text>
      <Text style={styles.phone}>📞 {item.phone}</Text>
      {item.email && <Text style={styles.email}>📧 {item.email}</Text>}
      
      <View style={styles.documents}>
        <Text style={styles.docTitle}>📄 Documents:</Text>
        {item.registrationNumber && (
          <Text style={styles.docText}>• Reg No: {item.registrationNumber}</Text>
        )}
        {item.panNumber && (
          <Text style={styles.docText}>• PAN: {item.panNumber}</Text>
        )}
      </View>

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
      <Text style={styles.title}>Verify Shops</Text>
      <Text style={styles.subtitle}>Review and verify pending shops</Text>

      {shops.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>🎉 No pending shops</Text>
          <Text style={styles.emptySubtext}>All shops are verified</Text>
        </View>
      ) : (
        <FlatList
          data={shops}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchPendingShops} />
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
    marginBottom: 8,
  },
  shopName: {
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
  address: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  phone: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  documents: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  docTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  docText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
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

export default VerifyShopsScreen;
