import React, { useState, useMemo } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, Alert
} from 'react-native';
import { COLORS, FONTS } from '../../styles/theme';
import Button from '../../components/common/Button';
import TicketCard from '../../components/common/TicketCard';
import { ADDONS } from '../../constants/addons';

const DELIVERY_FEE = 20;

const METHODS = [
  { id: 'cash', name: 'Cash', icon: '💵', ready: true },
  { id: 'bank', name: 'Bank Transfer', icon: '🏦', ready: true },
  { id: 'esewa', name: 'eSewa', icon: '📲', ready: false },
  { id: 'khalti', name: 'Khalti', icon: '💳', ready: false },
  { id: 'fonepay', name: 'Fonepay', icon: '📱', ready: false },
];

export default function PaymentScreen({ navigation, route }) {
  const { bike, addons = [], totalPrice, pickup, dropoff } = route.params || {};
  const [method, setMethod] = useState('cash');

  const rentalFee = bike?.price || 0;
  const addonsTotal = useMemo(
    () => addons.reduce((sum, id) => sum + (ADDONS.find(a => a.id === id)?.price || 0), 0),
    [addons]
  );
  const grandTotal = rentalFee + addonsTotal + DELIVERY_FEE;

  const selectedMethod = METHODS.find((m) => m.id === method);

  const handlePayNow = () => {
    if (!selectedMethod.ready) {
      Alert.alert(
        `${selectedMethod.name} — Coming Soon`,
        `${selectedMethod.name} integration isn't wired up yet. Use Cash or Bank Transfer.`
      );
      return;
    }
    navigation.navigate('OrderConfirmation', { bike, pickup, dropoff, grandTotal, method });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.topbarTitle}>Payment</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <TicketCard
          top={
            <View>
              <View style={styles.row}>
                <Text style={styles.l}>{bike?.name || 'Honda Beat'} rental</Text>
                <Text style={styles.r}>Rs {rentalFee}</Text>
              </View>
              {addons.map((id) => {
                const a = ADDONS.find((x) => x.id === id);
                if (!a) return null;
                return (
                  <View key={id} style={styles.row}>
                    <Text style={styles.l}>{a.icon} {a.name}</Text>
                    <Text style={styles.r}>{a.price === 0 ? 'Free' : `Rs ${a.price}`}</Text>
                  </View>
                );
              })}
              <View style={styles.row}>
                <Text style={styles.l}>Delivery Fee</Text>
                <Text style={styles.r}>Rs {DELIVERY_FEE}</Text>
              </View>
            </View>
          }
          bottom={
            <View style={styles.rowTotal}>
              <Text style={styles.totalL}>Total payment</Text>
              <Text style={styles.totalR}>Rs {grandTotal}</Text>
            </View>
          }
        />

        <Text style={styles.sectionLabel}>SELECT PAYMENT METHOD</Text>
        {METHODS.map((m) => {
          const selected = method === m.id;
          return (
            <TouchableOpacity
              key={m.id}
              style={[styles.method, selected && styles.methodSelected]}
              onPress={() => setMethod(m.id)}
            >
              <View style={styles.methodLeft}>
                <View style={styles.badge}><Text>{m.icon}</Text></View>
                <Text style={styles.methodName}>{m.name}</Text>
                {!m.ready && <Text style={styles.soon}>Soon</Text>}
              </View>
              <View style={[styles.radio, selected && styles.radioOn]} />
            </TouchableOpacity>
          );
        })}

        {method === 'bank' && (
          <View style={styles.bankCard}>
            <Text style={styles.bankLabel}>Transfer to</Text>
            <Text style={styles.bankValue}>Prajal Rentals — Nabil Bank</Text>
            <Text style={styles.bankValue}>Acc No: 01234567890123</Text>
            <Text style={styles.bankHint}>
              Upload proof of transfer after payment. Waiting for confirmation status appears in Order Detail.
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.stickyBottom}>
        <Button label="Pay Now" variant="brick" onPress={handlePayNow} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.stone },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: COLORS.pine,
    paddingHorizontal: 18,
    paddingTop: 50,
    paddingBottom: 14,
  },
  back: { fontSize: 20, color: '#fff' },
  topbarTitle: { fontSize: 16, fontWeight: '600', color: '#fff' },
  content: { padding: 20, paddingBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  l: { fontSize: 13, color: COLORS.inkSoft },
  r: { fontSize: 13, fontWeight: '600', color: COLORS.ink },
  rowTotal: { flexDirection: 'row', justifyContent: 'space-between' },
  totalL: { fontSize: 17, fontWeight: '700', color: COLORS.ink },
  totalR: { fontSize: 17, fontWeight: '700', color: COLORS.ink },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.inkSoft,
    letterSpacing: 0.5,
    marginTop: 22,
    marginBottom: 10,
  },
  method: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderWidth: 1.5,
    borderColor: COLORS.line,
    borderRadius: 14,
    marginBottom: 10,
    backgroundColor: COLORS.paper,
  },
  methodSelected: { borderColor: COLORS.pine, backgroundColor: '#EEF3EC' },
  methodLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  badge: {
    width: 34,
    height: 34,
    borderRadius: 9,
    backgroundColor: COLORS.stone,
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodName: { fontSize: 13.5, fontWeight: '600', color: COLORS.ink },
  soon: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.brick,
    backgroundColor: '#F7E7CE',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  radio: { width: 17, height: 17, borderRadius: 9, borderWidth: 2, borderColor: COLORS.line },
  radioOn: { borderColor: COLORS.pine, backgroundColor: COLORS.pine },
  bankCard: {
    backgroundColor: COLORS.paper,
    borderRadius: 14,
    padding: 16,
    marginTop: 4,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  bankLabel: { fontSize: 10.5, fontWeight: '600', color: COLORS.inkSoft, marginBottom: 4 },
  bankValue: { fontSize: 13.5, fontWeight: '700', color: COLORS.ink, marginBottom: 2 },
  bankHint: { fontSize: 11.5, color: COLORS.inkSoft, marginTop: 8, lineHeight: 16 },
  stickyBottom: { padding: 18, backgroundColor: COLORS.paper, borderTopWidth: 1, borderTopColor: COLORS.line },
});