import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';

const MOCK_ORDERS = [
  { id: '1', bike: 'Honda CB Shine', date: '2026-07-28', amount: 350, status: 'Completed' },
  { id: '2', bike: 'Yamaha FZ', date: '2026-07-27', amount: 400, status: 'Ongoing' },
  { id: '3', bike: 'TVS Apache', date: '2026-07-26', amount: 380, status: 'Pending' },
];

export default function OrderHistoryScreen({ navigation }) {
  const [orders, setOrders] = useState(MOCK_ORDERS);

  const handleCancel = (id) => {
    Alert.alert('Cancel Order', 'Are you sure?', [
      { text: 'No', style: 'cancel' },
      { text: 'Yes', onPress: () => setOrders(orders.map(o => o.id === id ? { ...o, status: 'Cancelled' } : o)) },
    ]);
  };

  const getStatusColor = (status) => {
    if (status === 'Completed') return '#4CAF50';
    if (status === 'Ongoing') return '#2196F3';
    if (status === 'Pending') return '#FF9800';
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
      <FlatList data={orders} renderItem={renderItem} keyExtractor={(item) => item.id} contentContainerStyle={styles.list} />
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
});
