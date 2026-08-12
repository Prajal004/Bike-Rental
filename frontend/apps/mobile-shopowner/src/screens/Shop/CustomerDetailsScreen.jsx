import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomerDetailsScreen = ({ route, navigation }) => {
  const { customer } = route.params || {};
  
  // Mock customer data with documents
  const [customerData, setCustomerData] = useState({
    id: customer?.id || '1',
    name: customer?.name || 'Ram K.',
    email: customer?.email || 'ram@email.com',
    phone: customer?.phone || '98XXXXXXXX',
    license: 'license_ram.pdf',
    citizenship: 'citizenship_ram.pdf',
    verified: true,
  });

  const viewDocument = (docName, docType) => {
    Alert.alert(
      '📄 Document View',
      `${docType}: ${docName}\n\n(File viewer will open here)`,
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Customer Info */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>👤 Customer Information</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{customerData.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{customerData.email}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{customerData.phone}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Status</Text>
          <Text style={[styles.value, styles.verified]}>
            {customerData.verified ? '✅ Verified' : '⏳ Pending'}
          </Text>
        </View>
      </View>

      {/* ✅ Customer Documents (Shop Owner View Only) */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📄 Customer Documents</Text>
        <Text style={styles.note}>
          View customer's documents for verification
        </Text>

        {/* Driving License */}
        <TouchableOpacity
          style={styles.docItem}
          onPress={() => viewDocument(customerData.license, 'Driving License')}
        >
          <View style={styles.docIcon}>
            <Ionicons name="document-text" size={24} color="#4CAF50" />
          </View>
          <View style={styles.docInfo}>
            <Text style={styles.docName}>Driving License</Text>
            <Text style={styles.docStatus}>✅ Uploaded</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#888" />
        </TouchableOpacity>

        {/* Citizenship */}
        <TouchableOpacity
          style={styles.docItem}
          onPress={() => viewDocument(customerData.citizenship, 'Citizenship')}
        >
          <View style={styles.docIcon}>
            <Ionicons name="document-text" size={24} color="#2196F3" />
          </View>
          <View style={styles.docInfo}>
            <Text style={styles.docName}>Citizenship</Text>
            <Text style={styles.docStatus}>✅ Uploaded</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#888" />
        </TouchableOpacity>

        <View style={styles.verifiedBadge}>
          <Text style={styles.verifiedText}>
            ✅ Documents verified by Admin
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.buttonPrimary}>
          <Text style={styles.buttonText}>📞 Contact Customer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSecondary}>
          <Text style={styles.buttonTextSecondary}>📋 View Rental History</Text>
        </TouchableOpacity>
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
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
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  label: {
    fontSize: 14,
    color: '#888',
  },
  value: {
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  verified: {
    color: '#4CAF50',
  },
  note: {
    fontSize: 13,
    color: '#888',
    marginBottom: 12,
  },
  docItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  docIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  docInfo: {
    flex: 1,
  },
  docName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  docStatus: {
    fontSize: 12,
    color: '#4CAF50',
  },
  verifiedBadge: {
    marginTop: 12,
    padding: 10,
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    alignItems: 'center',
  },
  verifiedText: {
    fontSize: 13,
    color: '#4CAF50',
    fontWeight: '600',
  },
  actions: {
    marginTop: 8,
    gap: 10,
  },
  buttonPrimary: {
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonSecondary: {
    backgroundColor: '#f5f5f5',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonTextSecondary: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CustomerDetailsScreen;
