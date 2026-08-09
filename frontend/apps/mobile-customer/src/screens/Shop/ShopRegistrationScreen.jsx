import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function ShopRegistrationScreen({ navigation }) {
  const [formData, setFormData] = useState({
    shopName: '',
    address: '',
    phone: '',
    email: '',
    description: '',
  });

  const handleSubmit = () => {
    Alert.alert('Success', 'Shop registered! Waiting for verification.');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Shop</Text>
      <TextInput style={styles.input} placeholder="Shop Name" value={formData.shopName} onChangeText={(text) => setFormData({ ...formData, shopName: text })} />
      <TextInput style={styles.input} placeholder="Address" value={formData.address} onChangeText={setFormData} />
      <TextInput style={styles.input} placeholder="Phone" value={formData.phone} onChangeText={setFormData} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Email" value={formData.email} onChangeText={setFormData} keyboardType="email-address" />
      <TextInput style={[styles.input, styles.textArea]} placeholder="Description" value={formData.description} onChangeText={setFormData} multiline />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Register Shop</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 16 },
  textArea: { height: 100, textAlignVertical: 'top' },
  button: { backgroundColor: '#4CAF50', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
