import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../../styles/colors';
import Button from '../../components/common/Button';

export default function ConfirmationScreen({ navigation, route }) {
  const { bike, pickup, dropoff, grandTotal, method } = route.params || {};

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.back}>←</Text></TouchableOpacity>
        <Text style={styles.topbarTitle}>Order Confirmation</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.successContainer}>
          <Text style={styles.successIcon}>✅</Text>
          <Text style={styles.successTitle}>Order Confirmed!</Text>
          <Text style={styles.successSubtitle}>Your motorbike has been booked</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Booking Details</Text>
          <View style={styles.row}><Text style={styles.label}>Bike</Text><Text style={styles.value}>{bike?.name || 'Honda Beat'}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Pickup</Text><Text style={styles.value}>{pickup?.name || pickup || 'Satungal Station'}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Return</Text><Text style={styles.value}>{dropoff?.name || dropoff || 'Satungal Station'}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Payment</Text><Text style={styles.value}>{method || 'Cash'}</Text></View>
          <View style={[styles.row, styles.totalRow]}><Text style={styles.totalLabel}>Total</Text><Text style={styles.totalValue}>Rs {grandTotal || 0}</Text></View>
        </View>

        <Button title="Go to Home" onPress={() => navigation.navigate('Tabs')} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1ECE2' },
  topbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#16342A', paddingHorizontal: 18, paddingTop: 50, paddingBottom: 14 },
  back: { fontSize: 20, color: '#fff' },
  topbarTitle: { fontSize: 16, fontWeight: '600', color: '#fff' },
  content: { padding: 20, flexGrow: 1 },
  successContainer: { alignItems: 'center', marginVertical: 20 },
  successIcon: { fontSize: 60 },
  successTitle: { fontSize: 24, fontWeight: '700', color: '#1B2A22', marginTop: 8 },
  successSubtitle: { fontSize: 14, color: '#6B7A70', marginTop: 4 },
  card: { backgroundColor: '#FFFCF6', borderRadius: 18, padding: 16, marginVertical: 16, borderWidth: 1, borderColor: '#E4DDCC' },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#1B2A22', marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#E4DDCC' },
  label: { fontSize: 14, color: '#6B7A70' },
  value: { fontSize: 14, fontWeight: '600', color: '#1B2A22' },
  totalRow: { borderBottomWidth: 0, paddingTop: 8 },
  totalLabel: { fontSize: 16, fontWeight: '700', color: '#1B2A22' },
  totalValue: { fontSize: 16, fontWeight: '700', color: '#9C4A2E' },
});
