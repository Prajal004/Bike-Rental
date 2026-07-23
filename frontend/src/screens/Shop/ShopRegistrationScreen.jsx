import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { useAuth } from '../../context/AuthContext';
import shopAPI from '../../api/shop.api';

const ShopRegistrationScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    shopName: '',
    address: '',
    phone: user?.phone || '',
    email: user?.email || '',
    description: '',
    latitude: '',
    longitude: '',
  });

  const handleSubmit = async () => {
    if (!formData.shopName || !formData.address || !formData.phone) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await shopAPI.registerShop(formData);
      if (response.success) {
        Alert.alert('Success', 'Shop registered! Waiting for verification.', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Register Shop</Text>
      <Text style={styles.subtitle}>Start your rental business</Text>

      <View style={styles.form}>
        <Input
          label="Shop Name *"
          value={formData.shopName}
          onChangeText={(text) => setFormData({ ...formData, shopName: text })}
          placeholder="Enter shop name"
        />

        <Input
          label="Address *"
          value={formData.address}
          onChangeText={(text) => setFormData({ ...formData, address: text })}
          placeholder="Shop address"
        />

        <Input
          label="Phone *"
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
          placeholder="Phone number"
          keyboardType="phone-pad"
        />

        <Input
          label="Email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Input
          label="Description"
          value={formData.description}
          onChangeText={(text) => setFormData({ ...formData, description: text })}
          placeholder="Describe your shop"
          multiline
        />

        <Input
          label="Latitude"
          value={formData.latitude}
          onChangeText={(text) => setFormData({ ...formData, latitude: text })}
          placeholder="27.7172"
          keyboardType="decimal-pad"
        />

        <Input
          label="Longitude"
          value={formData.longitude}
          onChangeText={(text) => setFormData({ ...formData, longitude: text })}
          placeholder="85.3240"
          keyboardType="decimal-pad"
        />

        <Button title="Register Shop" onPress={handleSubmit} />
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
});

export default ShopRegistrationScreen;
