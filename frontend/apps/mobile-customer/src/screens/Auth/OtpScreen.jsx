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
import { useAuth } from '../../context/AuthContext';

export default function OTPScreen({ route, navigation }) {
  const { userId } = route.params || {};
  const { verifyOTP, resendOTP } = useAuth();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!otp || otp.length !== 6) {
      Alert.alert('Error', 'Please enter 6-digit OTP');
      return;
    }
    setLoading(true);
    const result = await verifyOTP(userId, otp);
    setLoading(false);
    if (result.success) {
      navigation.replace('Main');
    } else {
      Alert.alert('Verification Failed', result.message);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    const result = await resendOTP(userId);
    setLoading(false);
    Alert.alert('Success', result.message || 'OTP resent');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>Enter the 6-digit code</Text>

      <TextInput
        style={styles.otpInput}
        placeholder="000000"
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
        maxLength={6}
        textAlign="center"
      />

      <TouchableOpacity style={styles.button} onPress={handleVerify} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Verify</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={handleResend}>
        <Text style={styles.link}>Resend OTP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 30, textAlign: 'center' },
  otpInput: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 14, fontSize: 24, letterSpacing: 8, textAlign: 'center', marginBottom: 20 },
  button: { backgroundColor: '#4CAF50', padding: 16, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  link: { color: '#4CAF50', textAlign: 'center', marginTop: 16, fontSize: 14 },
});
