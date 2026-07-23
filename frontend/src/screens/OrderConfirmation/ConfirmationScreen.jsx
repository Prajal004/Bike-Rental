import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Button from '../../components/common/Button';
import rentalAPI from '../../api/rental.api';
import paymentAPI from '../../api/payment.api';

const ConfirmationScreen = ({ route, navigation }) => {
  const { rentalId } = route.params || {};
  const [rental, setRental] = useState(null);
  const [loading, setLoading] = useState(true);
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    if (rentalId) {
      fetchRentalDetails();
      fetchInvoice();
    }
  }, [rentalId]);

  const fetchRentalDetails = async () => {
    try {
      const response = await rentalAPI.getById(rentalId);
      if (response.success) {
        setRental(response.rental);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load rental details');
    } finally {
      setLoading(false);
    }
  };

  const fetchInvoice = async () => {
    try {
      const response = await paymentAPI.getInvoice(rentalId);
      if (response.success) {
        setInvoice(response.invoice);
      }
    } catch (error) {
      console.error('Invoice error:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#E63946" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.successContainer}>
        <Text style={styles.successIcon}>✅</Text>
        <Text style={styles.successTitle}>Order Confirmed!</Text>
        <Text style={styles.successSubtitle}>Your rental has been confirmed</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Order Details</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Order ID</Text>
          <Text style={styles.value}>{rental?.rentalId || 'N/A'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Status</Text>
          <View style={[styles.statusBadge, { backgroundColor: '#2ECC71' }]}>
            <Text style={styles.statusText}>CONFIRMED</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Bike</Text>
          <Text style={styles.value}>{rental?.motorcycle?.name || 'N/A'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Duration</Text>
          <Text style={styles.value}>{rental?.duration || 0} days</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Total</Text>
          <Text style={[styles.value, styles.totalPrice]}>Rs {rental?.totalPrice || 0}</Text>
        </View>
      </View>

      {invoice && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Payment Details</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Payment Method</Text>
            <Text style={styles.value}>{invoice.paymentMethod || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Transaction ID</Text>
            <Text style={styles.value}>{invoice.transactionId || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Paid At</Text>
            <Text style={styles.value}>
              {invoice.paidAt ? new Date(invoice.paidAt).toLocaleString() : 'N/A'}
            </Text>
          </View>
        </View>
      )}

      <View style={styles.actions}>
        <Button
          title="Track Order"
          onPress={() => navigation.navigate('Orders')}
          variant="secondary"
        />
        <Button
          title="Go Home"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  successIcon: {
    fontSize: 60,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: 8,
  },
  successSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  totalPrice: {
    fontSize: 18,
    color: '#E63946',
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  actions: {
    marginTop: 10,
    marginBottom: 30,
    gap: 10,
  },
});

export default ConfirmationScreen;
