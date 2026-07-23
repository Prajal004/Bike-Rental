import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import motorbikeAPI from '../../api/motorbike.api';

const AddBikeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    brand: 'Honda',
    year: '',
    cc: '',
    pricePerDay: '',
    description: '',
    shopId: '',
    locationLat: '',
    locationLng: '',
  });

  const handleSubmit = async () => {
    if (!formData.name || !formData.pricePerDay) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await motorbikeAPI.addBike({
        ...formData,
        year: parseInt(formData.year),
        cc: parseInt(formData.cc),
        pricePerDay: parseFloat(formData.pricePerDay),
      });
      if (response.success) {
        Alert.alert('Success', 'Bike added successfully!', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to add bike');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add New Bike</Text>

      <View style={styles.form}>
        <Input
          label="Bike Name *"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          placeholder="e.g., Honda CB400"
        />

        <Input
          label="Brand"
          value={formData.brand}
          onChangeText={(text) => setFormData({ ...formData, brand: text })}
          placeholder="Honda"
        />

        <Input
          label="Year"
          value={formData.year}
          onChangeText={(text) => setFormData({ ...formData, year: text })}
          placeholder="2023"
          keyboardType="number-pad"
        />

        <Input
          label="CC"
          value={formData.cc}
          onChangeText={(text) => setFormData({ ...formData, cc: text })}
          placeholder="400"
          keyboardType="number-pad"
        />

        <Input
          label="Price Per Day (Rs) *"
          value={formData.pricePerDay}
          onChangeText={(text) => setFormData({ ...formData, pricePerDay: text })}
          placeholder="2800"
          keyboardType="number-pad"
        />

        <Input
          label="Description"
          value={formData.description}
          onChangeText={(text) => setFormData({ ...formData, description: text })}
          placeholder="Bike description"
          multiline
        />

        <Button title="Add Bike" onPress={handleSubmit} />
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
    marginBottom: 20,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
});

export default AddBikeScreen;
