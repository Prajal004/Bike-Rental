import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { authAPI } from '../../api/auth';

export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
  });
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
        Alert.alert('Success', 'Registration successful! Please verify OTP.', [
          { text: 'OK', onPress: () => navigation.navigate('OTP', { userId: response.userId }) },
        ]);
      }
    } catch (error) {
      Alert.alert('Registration Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join the ride!</Text>

      <TextInput style={styles.input} placeholder="Full Name" value={formData.fullName} onChangeText={(text) => setFormData({ ...formData, fullName: text })} />
      <TextInput style={styles.input} placeholder="Email" value={formData.email} onChangeText={setFormData} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Phone" value={formData.phone} onChangeText={setFormData} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Password" value={formData.password} onChangeText={setFormData} secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Register</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 30, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 14, marginBottom: 14, fontSize: 16 },
  button: { backgroundColor: '#4CAF50', padding: 16, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  link: { color: '#4CAF50', textAlign: 'center', marginTop: 16, fontSize: 14 },
});
