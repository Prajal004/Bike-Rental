import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../../styles/theme';

const MOCK_ORDERS = [
  { id: '1', bike: 'Honda Beat', date: '23 Jul 2026', status: 'Completed', price: 800 },
  { id: '2', bike: 'Honda Vario', date: '12 Jul 2026', status: 'Completed', price: 1500 },
  { id: '3', bike: 'Scoopy', date: '02 Jul 2026', status: 'Completed', price: 840 },
];

export default function HistoryScreen({ navigation }) {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [loading, setLoading] = useState(false);

  const getStatusColor = (status) => {
    return status === 'Completed' ? '#2ECC71' : '#F39C12';
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.date}>{item.date}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.bikeName}>{item.bike}</Text>
      <Text style={styles.price}>Rs {item.price}</Text>
    </TouchableOpacity>
  );

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
        <Text style={styles.title}>My Orders</Text>
      </View>

      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>📋</Text>
          <Text style={styles.emptyTitle}>No Orders Yet</Text>
          <Text style={styles.emptySubtext}>Start your first rental!</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.stone },
  header: { padding: 20, paddingTop: 44, backgroundColor: COLORS.pine },
  title: { fontSize: 24, fontWeight: '700', color: '#fff' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { padding: 16 },
  card: {
    backgroundColor: COLORS.paper,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  date: { fontSize: 12, color: COLORS.inkSoft },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 2, borderRadius: 12 },
  statusText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  bikeName: { fontSize: 16, fontWeight: '600', color: COLORS.ink, marginTop: 6 },
  price: { fontSize: 14, fontWeight: '700', color: COLORS.brick, marginTop: 4 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  emptyText: { fontSize: 60, marginBottom: 16 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: COLORS.ink },
  emptySubtext: { fontSize: 14, color: COLORS.inkSoft, marginTop: 4 },
});