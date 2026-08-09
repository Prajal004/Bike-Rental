import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PaymentScreen = ({ route, navigation }) => {
  const { rentalId, totalPrice } = route.params || {};
  const [selectedMethod, setSelectedMethod] = useState('esewa');
  const [loading, setLoading] = useState(false);

  const methods = [
    { id: 'esewa', label: 'eSewa', icon: '💰' },
    { id: 'khalti', label: 'Khalti', icon: '💳' },
    { id: 'fonepay', label: 'Fonepay', icon: '📱' },
    { id: 'cash', label: 'Cash on Pickup', icon: '💵' },
  ];

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Payment successful!', [
        { text: 'OK', onPress: () => navigation.navigate('Orders') },
      ]);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment</Text>

      <View style={styles.amountContainer}>
        <Text style={styles.amountLabel}>Total Amount</Text>
        <Text style={styles.amount}>Rs {totalPrice || 0}</Text>
      </View>

      <Text style={styles.sectionTitle}>Select Payment Method</Text>

      {methods.map((method) => (
        <TouchableOpacity
          key={method.id}
          style={[styles.methodCard, selectedMethod === method.id && styles.selectedMethod]}
          onPress={() => setSelectedMethod(method.id)}
        >
          <Text style={styles.methodIcon}>{method.icon}</Text>
          <View style={styles.methodInfo}>
            <Text style={styles.methodName}>{method.label}</Text>
          </View>
          <View style={styles.radioButton}>
            {selectedMethod === method.id && <View style={styles.radioSelected} />}
          </View>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.payButton} onPress={handlePayment} disabled={loading}>
        <Text style={styles.payButtonText}>
          {loading ? 'Processing...' : `Pay Rs ${totalPrice || 0}`}
        </Text>
      </TouchableOpacity>

      <Text style={styles.secureText}>🔒 Your payment is secure</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  title: { fontSize: 28, fontWeight: 'bold', marginTop: 20, marginBottom: 16 },
  amountContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  amountLabel: { fontSize: 14, color: '#888' },
  amount: { fontSize: 32, fontWeight: 'bold', color: '#4CAF50', marginTop: 4 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  selectedMethod: { borderColor: '#4CAF50', backgroundColor: '#E8F5E9' },
  methodIcon: { fontSize: 24, marginRight: 12 },
  methodInfo: { flex: 1 },
  methodName: { fontSize: 16, color: '#333' },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#4CAF50' },
  payButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  payButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  secureText: { textAlign: 'center', color: '#888', fontSize: 14, marginTop: 12 },
});

export default PaymentScreen;
