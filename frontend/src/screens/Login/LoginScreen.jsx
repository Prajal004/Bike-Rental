import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { COLORS } from '../../styles/colors';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('prajal@example.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      navigation.navigate('OtpVerification', { userId: result.userId });
    } else {
      Alert.alert('Login Failed', result.message || 'Invalid credentials');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('../../../assets/images/login-bg.jpg')}
        style={styles.container}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          {/* Brand */}
          <View style={styles.brandContainer}>
            <Text style={styles.brandIcon}>🏍️</Text>
            <Text style={styles.brandText}>prajal</Text>
            <Text style={styles.brandTag}>Ride the valley</Text>
          </View>

          <Text style={styles.subtitle}>Enter your email and password to continue</Text>

          {/* Form */}
          <View style={styles.form}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="you@gmail.com"
              placeholderTextColor="#cddccf"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="Password"
                placeholderTextColor="#cddccf"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <TouchableOpacity style={styles.eyeIcon}>
                <Text style={styles.eyeText}>👁</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotText}>Forget password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.loginButtonText}>
                {loading ? 'Loading...' : 'Login'}
              </Text>
            </TouchableOpacity>

            <Text style={styles.orText}>— OR —</Text>

            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialText}>🔵 Google email</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
              <Text style={[styles.socialText, styles.facebookText]}>Facebook login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerLink}>Register, New Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0E2019',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 80,
    backgroundColor: 'rgba(14,32,25,0.3)',
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 28,
  },
  brandIcon: {
    fontSize: 58,
    marginBottom: 6,
  },
  brandText: {
    fontFamily: 'Fraunces_700Bold',
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.white,
    fontStyle: 'italic',
  },
  brandTag: {
    color: '#e7ddc9',
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  subtitle: {
    color: '#efe9da',
    fontSize: 14,
    marginBottom: 18,
  },
  form: {
    position: 'relative',
    zIndex: 2,
  },
  label: {
    color: '#dfeacb',
    fontSize: 11.5,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    marginBottom: 6,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: COLORS.white,
    marginBottom: 14,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    marginBottom: 0,
  },
  eyeIcon: {
    position: 'absolute',
    right: 14,
    top: 14,
  },
  eyeText: {
    fontSize: 14,
    opacity: 0.85,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: -6,
    marginBottom: 18,
  },
  forgotText: {
    color: '#efe4cd',
    fontSize: 12,
  },
  loginButton: {
    backgroundColor: COLORS.brick,
    borderRadius: 999,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#9C4A2E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 16,
    elevation: 8,
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  orText: {
    color: '#cdbfa0',
    textAlign: 'center',
    fontSize: 11.5,
    marginVertical: 16,
    letterSpacing: 1,
  },
  socialButton: {
    backgroundColor: COLORS.paper,
    borderRadius: 999,
    padding: 13,
    alignItems: 'center',
    marginBottom: 10,
  },
  facebookButton: {
    backgroundColor: '#3b5998',
  },
  socialText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: COLORS.ink,
  },
  facebookText: {
    color: COLORS.white,
  },
  registerLink: {
    color: COLORS.white,
    textAlign: 'center',
    marginTop: 14,
    fontSize: 13,
    textDecorationLine: 'underline',
  },
});
