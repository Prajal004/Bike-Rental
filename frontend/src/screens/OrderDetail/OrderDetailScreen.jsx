import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { COLORS } from '../../styles/colors';
import Button from '../../components/common/Button';

export default function OrderDetailScreen({ navigation, route }) {
  const { order } = route.params || {};

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.topbarTitle}>Order Details</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.statusCard}>
          <Text style={styles.statusPill}>⏳ Waiting for confirmation</Text>
          <View style={styles.orderItem}>
            <Text style={styles.bikeName}>Honda Beat 2018</Text>
            <Text style={styles.shopName}>Prajal Motor</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>👤</Text>
            <View>
              <Text style={styles.infoLabel}>Prajal Shah</Text>
              <Text style={styles.infoSub}>prajal@example.com · 98XXXXXXXX</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📍</Text>
            <View>
              <Text style={styles.infoLabel}>Pick Up Location</Text>
              <Text style={styles.infoSub}>Satungal Station</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📍</Text>
            <View>
              <Text style={styles.infoLabel}>Return Location</Text>
              <Text style={styles.infoSub}>Satungal Station</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>��️</Text>
            <View>
              <Text style={styles.infoLabel}>Rental Duration</Text>
              <Text style={styles.infoSub}>25 Jun 2026 → 26 Jun 2026</Text>
            </View>
          </View>
        </View>

        <Button title="Contact the Rental Office" onPress={() => navigation.navigate('Chat')} variant="secondary" />
        <Button title="Cancel Order" variant="danger" onPress={() => Alert.alert('Cancel Order', 'Are you sure?')} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1ECE2' },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#16342A',
    paddingHorizontal: 18,
    paddingTop: 50,
    paddingBottom: 14,
  },
  back: { fontSize: 20, color: '#fff' },
  topbarTitle: { fontSize: 16, fontWeight: '600', color: '#fff' },
  content: { padding: 20 },
  statusCard: { backgroundColor: '#FFFCF6', borderRadius: 18, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: '#E4DDCC' },
  statusPill: { backgroundColor: '#F7E7CE', color: '#93611A', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 999, fontSize: 10.5, fontWeight: '700', alignSelf: 'flex-start' },
  orderItem: { marginTop: 14 },
  bikeName: { fontSize: 16, fontWeight: '700', color: '#1B2A22' },
  shopName: { fontSize: 13, color: '#6B7A70', marginTop: 2 },
  card: { backgroundColor: '#FFFCF6', borderRadius: 18, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: '#E4DDCC' },
  infoRow: { flexDirection: 'row', gap: 12, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#E4DDCC' },
  infoIcon: { fontSize: 16, marginTop: 2 },
  infoLabel: { fontSize: 13, fontWeight: '600', color: '#1B2A22' },
  infoSub: { fontSize: 11, color: '#6B7A70', marginTop: 1 },
});
