import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OrderDetailScreen({ route }) {
  const { order } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Details</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Bike</Text>
        <Text style={styles.value}>{order?.bike || 'N/A'}</Text>
        <Text style={styles.label}>Date</Text>
        <Text style={styles.value}>{order?.date || 'N/A'}</Text>
        <Text style={styles.label}>Amount</Text>
        <Text style={styles.value}>Rs {order?.amount || 0}</Text>
        <Text style={styles.label}>Status</Text>
        <Text style={[styles.value, { color: order?.status === 'Completed' ? '#4CAF50' : '#FF9800' }]}>{order?.status || 'N/A'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12 },
  label: { fontSize: 14, color: '#888', marginTop: 8 },
  value: { fontSize: 16, fontWeight: 'bold', marginTop: 2 },
});
