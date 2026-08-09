import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { authAPI } from '../../api/auth';
import { COLORS } from '../../styles/colors';

export const RegisterForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const { fullName, email, phone, password } = formData;
    if (!fullName || !email || !phone || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      const response = await authAPI.register(formData);
      if (response.success) {
        Alert.alert('Success', 'Registration successful! Verify OTP.');
        onSuccess?.(response.userId);
      }
    } catch (error) {
      Alert.alert('Registration Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Full Name" value={formData.fullName} onChangeText={(text) => setFormData({ ...formData, fullName: text })} />
      <TextInput style={styles.input} placeholder="Email" value={formData.email} onChangeText={(text) => setFormData({ ...formData, email: text })} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Phone" value={formData.phone} onChangeText={(text) => setFormData({ ...formData, phone: text })} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Password" value={formData.password} onChangeText={(text) => setFormData({ ...formData, password: text })} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Register'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%' },
  input: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 14, marginBottom: 12, fontSize: 16 },
  button: { backgroundColor: COLORS.primary, padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
});

export default RegisterForm;
