import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PAYMENT_METHODS = [
  { id: 'esewa', label: 'eSewa', icon: '💰' },
  { id: 'khalti', label: 'Khalti', icon: '💳' },
  { id: 'fonepay', label: 'Fonepay', icon: '📱' },
  { id: 'cash', label: 'Cash on Pickup', icon: '💵' },
];

export default function PaymentScreen({ route, navigation }) {
  const { bike, totalPrice = 350, duration = 1, pickupLocation, returnLocation } = route.params || {};
  const [selectedMethod, setSelectedMethod] = useState('esewa');
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      setPaid(true);
      
      // ✅ Save order
      const newOrder = {
        id: Date.now().toString(),
        bike: bike?.name || 'Honda CB Shine',
        date: new Date().toISOString().split('T')[0],
        amount: totalPrice,
        duration: duration,
        pickup: pickupLocation || 'Not specified',
        return: returnLocation || 'Not specified',
        status: 'Pending',
        paymentMethod: selectedMethod,
      };
      
      try {
        const existing = await AsyncStorage.getItem('orders');
        const orders = existing ? JSON.parse(existing) : [];
        orders.unshift(newOrder);
        await AsyncStorage.setItem('orders', JSON.stringify(orders));
      } catch (error) {
        console.error('Error saving order:', error);
      }
      
      Alert.alert('Success', 'Payment successful! Order confirmed.', [
        { text: 'OK', onPress: () => navigation.navigate('Orders') }
      ]);
    }, 1500);
  };

  if (paid) {
    return (
      <View style={styles.successContainer}>
        <Text style={styles.successIcon}>✅</Text>
        <Text style={styles.successTitle}>Payment Successful!</Text>
        <Text style={styles.successSub}>Your booking is confirmed</Text>
        <TouchableOpacity style={styles.viewOrdersBtn} onPress={() => navigation.navigate('Orders')}>
          <Text style={styles.viewOrdersBtnText}>View Orders</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💳 Payment</Text>

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total Amount</Text>
        <Text style={styles.totalPrice}>Rs {totalPrice}</Text>
        {duration > 0 && <Text style={styles.durationText}>{duration} day{duration > 1 ? 's' : ''}</Text>}
      </View>

      <Text style={styles.methodsTitle}>Select Payment Method</Text>

      {PAYMENT_METHODS.map((method) => (
        <TouchableOpacity
          key={method.id}
          style={[styles.methodCard, selectedMethod === method.id && styles.methodSelected]}
          onPress={() => setSelectedMethod(method.id)}
        >
          <Text style={styles.methodIcon}>{method.icon}</Text>
          <Text style={styles.methodLabel}>{method.label}</Text>
          <View style={[styles.radio, selectedMethod === method.id && styles.radioSelected]} />
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.payBtn} onPress={handlePayment} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.payBtnText}>Pay Rs {totalPrice}</Text>}
      </TouchableOpacity>

      <Text style={styles.secureText}>🔒 Your payment is secure</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  totalContainer: { backgroundColor: '#f5f5f5', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 20 },
  totalLabel: { fontSize: 14, color: '#888' },
  totalPrice: { fontSize: 28, fontWeight: 'bold', color: '#4CAF50', marginTop: 4 },
  durationText: { fontSize: 14, color: '#888', marginTop: 2 },
  methodsTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  methodCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderWidth: 1, borderColor: '#ddd', borderRadius: 10, marginBottom: 8 },
  methodSelected: { borderColor: '#4CAF50', backgroundColor: '#E8F5E9' },
  methodIcon: { fontSize: 24, marginRight: 12 },
  methodLabel: { flex: 1, fontSize: 16 },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#ddd' },
  radioSelected: { borderColor: '#4CAF50', backgroundColor: '#4CAF50' },
  payBtn: { backgroundColor: '#4CAF50', padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  payBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  secureText: { textAlign: 'center', color: '#888', marginTop: 12 },
  successContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  successIcon: { fontSize: 60, marginBottom: 16 },
  successTitle: { fontSize: 24, fontWeight: 'bold' },
  successSub: { fontSize: 16, color: '#888', marginTop: 4 },
  viewOrdersBtn: { backgroundColor: '#4CAF50', padding: 14, borderRadius: 10, marginTop: 20 },
  viewOrdersBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
