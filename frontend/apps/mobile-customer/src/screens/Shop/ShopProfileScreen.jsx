import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ShopProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Shop</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Shop Name</Text>
        <Text style={styles.value}>Prajal Bike Shop</Text>
        <Text style={styles.label}>Address</Text>
        <Text style={styles.value}>Thamel, Kathmandu</Text>
        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>98XXXXXXXX</Text>
        <Text style={styles.label}>Status</Text>
        <Text style={[styles.value, { color: '#4CAF50' }]}>✅ Verified</Text>
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
