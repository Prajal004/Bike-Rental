import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import Button from '../../components/common/Button';
import paymentAPI from '../../api/payment.api';

const PaymentScreen = ({ route, navigation }) => {
  const { rentalId, total } = route.params || {};
  const [selectedMethod, setSelectedMethod] = useState('esewa');
  const [loading, setLoading] = useState(false);

  const paymentMethods = [
    { id: 'esewa', name: 'eSewa Wallet', icon: '💰' },
    { id: 'khalti', name: 'Khalti Wallet', icon: '💳' },
    { id: 'fonepay', name: 'Fonepay QR', icon: '📱' },
    { id: 'cash', name: 'Cash on Pickup', icon: '💵' },
  ];

  const handlePayment = async () => {
    setLoading(true);
    try {
      let response;
      switch (selectedMethod) {
        case 'esewa':
          response = await paymentAPI.initiateEsewa(rentalId);
          break;
        case 'khalti':
          response = await paymentAPI.initiateKhalti(rentalId);
          break;
        case 'fonepay':
          response = await paymentAPI.initiateFonepay(rentalId);
          break;
        case 'cash':
          response = { success: true, message: 'Pay at pickup' };
          break;
        default:
          throw new Error('Invalid payment method');
      }

      if (response.success) {
        Alert.alert('Success', 'Payment initiated!', [
          { text: 'OK', onPress: () => navigation.navigate('Confirmation', { rentalId }) }
        ]);
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Payment</Text>

      <View style={styles.amountContainer}>
        <Text style={styles.amountLabel}>Total Amount</Text>
        <Text style={styles.amount}>Rs {total || 0}</Text>
      </View>

      <View style={styles.methodsContainer}>
        <Text style={styles.sectionTitle}>Select Payment Method</Text>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.methodCard,
              selectedMethod === method.id && styles.selectedMethod,
            ]}
            onPress={() => setSelectedMethod(method.id)}
          >
            <Text style={styles.methodIcon}>{method.icon}</Text>
            <View style={styles.methodInfo}>
              <Text style={styles.methodName}>{method.name}</Text>
            </View>
            <View style={styles.radioButton}>
              {selectedMethod === method.id && <View style={styles.radioSelected} />}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Button
        title="Pay Now"
        onPress={handlePayment}
        loading={loading}
        style={styles.button}
      />

      <Text style={styles.secureText}>
        🔒 Your money is safe and secure
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: 20,
    marginBottom: 16,
  },
  amountContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  amountLabel: {
    fontSize: 14,
    color: '#666',
  },
  amount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#E63946',
    marginTop: 4,
  },
  methodsContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 8,
  },
  selectedMethod: {
    borderColor: '#E63946',
    backgroundColor: '#fff5f5',
  },
  methodIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  methodInfo: {
    flex: 1,
  },
  methodName: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E63946',
  },
  button: {
    marginBottom: 12,
  },
  secureText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    marginBottom: 20,
  },
});

export default PaymentScreen;
