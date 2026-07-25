import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { COLORS } from '../../styles/colors';
import Button from '../../components/common/Button';

export default function PaymentScreen({ navigation, route }) {
  const { bike, addons = [], totalPrice, pickup, dropoff } = route.params || {};
  const [method, setMethod] = useState('cash');

  const methods = [
    { id: 'cash', name: 'Cash', icon: '💵' },
    { id: 'bank', name: 'Bank Transfer', icon: '��' },
    { id: 'esewa', name: 'eSewa', icon: '📲' },
    { id: 'khalti', name: 'Khalti', icon: '💳' },
    { id: 'fonepay', name: 'Fonepay', icon: '��' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.back}>←</Text></TouchableOpacity>
        <Text style={styles.topbarTitle}>Payment</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.ticket}>
          <View style={styles.row}><Text style={styles.l}>{bike?.name || 'Honda Beat'} rental</Text><Text style={styles.r}>Rs {bike?.price || 0}</Text></View>
          <View style={styles.row}><Text style={styles.l}>Add-ons</Text><Text style={styles.r}>Rs {addons?.length || 0}</Text></View>
          <View style={styles.row}><Text style={styles.l}>Delivery Fee</Text><Text style={styles.r}>Rs 20</Text></View>
          <View style={styles.divider} />
          <View style={[styles.row, styles.totalRow]}><Text style={styles.totalL}>Total payment</Text><Text style={styles.totalR}>Rs {totalPrice || 0}</Text></View>
        </View>

        <Text style={styles.sectionLabel}>SELECT PAYMENT METHOD</Text>
        {methods.map((m) => (
          <TouchableOpacity key={m.id} style={[styles.method, method === m.id && styles.methodSelected]} onPress={() => setMethod(m.id)}>
            <View style={styles.methodLeft}><View style={styles.badge}><Text>{m.icon}</Text></View><Text style={styles.methodName}>{m.name}</Text></View>
            <View style={[styles.radio, method === m.id && styles.radioOn]} />
          </TouchableOpacity>
        ))}

        <Button title={`Pay Rs ${totalPrice || 0}`} variant="primary" onPress={() => navigation.navigate('OrderConfirmation', { bike, pickup, dropoff, grandTotal: totalPrice, method })} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1ECE2' },
  topbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#16342A', paddingHorizontal: 18, paddingTop: 50, paddingBottom: 14 },
  back: { fontSize: 20, color: '#fff' },
  topbarTitle: { fontSize: 16, fontWeight: '600', color: '#fff' },
  content: { padding: 20 },
  ticket: { backgroundColor: '#FFFCF6', borderRadius: 18, padding: 16, marginBottom: 20, borderWidth: 1, borderColor: '#E4DDCC' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  l: { fontSize: 13, color: '#6B7A70' },
  r: { fontSize: 13, fontWeight: '600', color: '#1B2A22' },
  totalRow: { marginTop: 4 },
  totalL: { fontSize: 17, fontWeight: '700', color: '#1B2A22' },
  totalR: { fontSize: 17, fontWeight: '700', color: '#9C4A2E' },
  divider: { height: 1, backgroundColor: '#E4DDCC', marginVertical: 8 },
  sectionLabel: { fontSize: 11, fontWeight: '600', color: '#6B7A70', letterSpacing: 0.5, marginTop: 10, marginBottom: 10 },
  method: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, borderWidth: 1.5, borderColor: '#E4DDCC', borderRadius: 14, marginBottom: 10, backgroundColor: '#FFFCF6' },
  methodSelected: { borderColor: '#16342A', backgroundColor: '#EEF3EC' },
  methodLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  badge: { width: 34, height: 34, borderRadius: 9, backgroundColor: '#F1ECE2', alignItems: 'center', justifyContent: 'center' },
  methodName: { fontSize: 13.5, fontWeight: '600', color: '#1B2A22' },
  radio: { width: 17, height: 17, borderRadius: 9, borderWidth: 2, borderColor: '#E4DDCC' },
  radioOn: { borderColor: '#16342A', backgroundColor: '#16342A' },
});
