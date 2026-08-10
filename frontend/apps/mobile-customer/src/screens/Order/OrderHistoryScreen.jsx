import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OrderHistoryScreen({ navigation }) {
  const [orders, setOrders] = useState([]);

  // ✅ Load orders from storage
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const stored = await AsyncStorage.getItem('orders');
      if (stored) {
        setOrders(JSON.parse(stored));
      } else {
        // ✅ Default mock orders
        const defaultOrders = [
          { id: '1', bike: 'Honda CB Shine', date: '2026-07-28', amount: 350, status: 'Completed' },
          { id: '2', bike: 'Yamaha FZ', date: '2026-07-27', amount: 400, status: 'Ongoing' },
          { id: '3', bike: 'TVS Apache', date: '2026-07-26', amount: 380, status: 'Pending' },
        ];
        setOrders(defaultOrders);
        await AsyncStorage.setItem('orders', JSON.stringify(defaultOrders));
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  // ✅ Add new order function
  const addOrder = async (newOrder) => {
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    await AsyncStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  const handleCancel = (id) => {
    Alert.alert('Cancel Order', 'Are you sure?', [
      { text: 'No', style: 'cancel' },
      { 
        text: 'Yes', 
        onPress: async () => {
          const updated = orders.map(o => o.id === id ? { ...o, status: 'Cancelled' } : o);
          setOrders(updated);
          await AsyncStorage.setItem('orders', JSON.stringify(updated));
        }
      },
    ]);
  };

  const getStatusColor = (status) => {
    if (status === 'Completed') return '#4CAF50';
    if (status === 'Ongoing') return '#2196F3';
    if (status === 'Pending') return '#FF9800';
    if (status === 'Cancelled') return '#E53935';
    return '#999';
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.bikeName}>{item.bike}</Text>
        <Text style={[styles.status, { color: getStatusColor(item.status) }]}>{item.status}</Text>
      </View>
      <Text style={styles.date}>{item.date} · Rs {item.amount}</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.viewBtn} onPress={() => navigation.navigate('OrderDetail', { order: item })}>
          <Text style={styles.viewBtnText}>View</Text>
        </TouchableOpacity>
        {item.status !== 'Completed' && item.status !== 'Cancelled' && (
          <TouchableOpacity style={styles.cancelBtn} onPress={() => handleCancel(item.id)}>
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Orders</Text>
      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No orders yet</Text>
          <Text style={styles.emptySubtext}>Start your first ride!</Text>
        </View>
      ) : (
        <FlatList data={orders} renderItem={renderItem} keyExtractor={(item) => item.id} contentContainerStyle={styles.list} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  list: { paddingBottom: 20 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bikeName: { fontSize: 16, fontWeight: 'bold' },
  status: { fontSize: 14, fontWeight: 'bold' },
  date: { fontSize: 14, color: '#888', marginTop: 4 },
  actions: { flexDirection: 'row', gap: 8, marginTop: 10 },
  viewBtn: { backgroundColor: '#2196F3', padding: 6, borderRadius: 6, flex: 1, alignItems: 'center' },
  viewBtnText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  cancelBtn: { backgroundColor: '#E53935', padding: 6, borderRadius: 6, flex: 1, alignItems: 'center' },
  cancelBtnText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 60 },
  emptyText: { fontSize: 18, color: '#666' },
  emptySubtext: { fontSize: 14, color: '#999', marginTop: 4 },
});
