import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import DocumentUpload from '../../components/rider/DocumentUpload';
import riderAPI from '../../api/rider.api';

const RiderVerificationScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    licenseNumber: '',
    licenseExpiry: '',
    citizenshipNumber: '',
  });
  const [licenseImage, setLicenseImage] = useState(null);
  const [citizenshipImage, setCitizenshipImage] = useState(null);

  const handleSubmit = async () => {
    if (!formData.fullName || !formData.phone || !formData.licenseNumber) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    if (!licenseImage) {
      Alert.alert('Error', 'Please upload license image');
      return;
    }

    setLoading(true);
    try {
      const response = await riderAPI.submitVerification({
        ...formData,
        licenseImage,
        citizenshipImage,
      });
      
      if (response.success) {
        Alert.alert(
          'Success',
          'Verification submitted! Please wait for admin approval.',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Rider Verification</Text>
      <Text style={styles.subtitle}>
        Submit your documents to get verified
      </Text>

      <View style={styles.form}>
        <Input
          label="Full Name *"
          value={formData.fullName}
          onChangeText={(text) => setFormData({ ...formData, fullName: text })}
          placeholder="Enter your full name"
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
          label="Address"
          value={formData.address}
          onChangeText={(text) => setFormData({ ...formData, address: text })}
          placeholder="Your address"
        />

        <Input
          label="License Number *"
          value={formData.licenseNumber}
          onChangeText={(text) => setFormData({ ...formData, licenseNumber: text })}
          placeholder="Driving license number"
        />

        <Input
          label="License Expiry Date"
          value={formData.licenseExpiry}
          onChangeText={(text) => setFormData({ ...formData, licenseExpiry: text })}
          placeholder="YYYY-MM-DD"
        />

        <Input
          label="Citizenship Number"
          value={formData.citizenshipNumber}
          onChangeText={(text) => setFormData({ ...formData, citizenshipNumber: text })}
          placeholder="Citizenship number"
        />

        <DocumentUpload
          label="Driving License Image *"
          onUpload={setLicenseImage}
          value={licenseImage}
        />

        <DocumentUpload
          label="Citizenship Image"
          onUpload={setCitizenshipImage}
          value={citizenshipImage}
        />

        <Button title="Submit Verification" onPress={handleSubmit} />
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
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
});

export default RiderVerificationScreen;
