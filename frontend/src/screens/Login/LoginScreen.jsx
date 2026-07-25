import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS } from '../../styles/theme';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (!result.success) {
      Alert.alert('Login Failed', result.message || 'Invalid email or password');
    }
  };

  return (
    <LinearGradient colors={['#B7E0EC', '#DCEFE2', '#FBE3BE']} locations={[0, 0.5, 1]} style={styles.bg}>
      <View style={styles.content}>
        <View style={styles.brand}>
          <Text style={styles.brandIcon}>🏍️</Text>
          <Text style={styles.word}>prajal</Text>
          <Text style={styles.tag}>RIDE THE VALLEY</Text>
        </View>

        <Text style={styles.subtitle}>Enter your email and password to continue</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="you@gmail.com"
          placeholderTextColor={COLORS.inkSoft}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
         
        <Text style={styles.label}>Password</Text>
        <View style={styles.pwRow}>
          <TextInput
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
            placeholder="Password"
            placeholderTextColor={COLORS.inkSoft}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPw}
          />
          <TouchableOpacity onPress={() => setShowPw(!showPw)} style={styles.eye}>
            <Text>{showPw ? '🙈' : '👁'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Text style={styles.forgot}>Forget password?</Text>
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator color={COLORS.pine} />
        ) : (
          <Button title="Login" variant="primary" onPress={handleLogin} />
        )}

        <Text style={styles.or}>— OR —</Text>

        <TouchableOpacity style={styles.social}>
          <Text style={styles.socialText}>🔵 Google email</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.social, { backgroundColor: '#3b5998', borderWidth: 0 }]}>
          <Text style={[styles.socialText, { color: '#fff' }]}>Facebook login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerLink}>Register, New Account</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  brand: { alignItems: 'center', marginBottom: 26 },
  brandIcon: { fontSize: 50, marginBottom: 6 },
  word: {
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.pine,
    fontStyle: 'italic',
    marginTop: 4,
  },
  tag: {
    fontSize: 10.5,
    fontWeight: '600',
    color: COLORS.pineSoft,
    letterSpacing: 2,
    marginTop: 2,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.ink,
    marginBottom: 16,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.inkSoft,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  input: {
    backgroundColor: COLORS.paper,
    borderWidth: 1.5,
    borderColor: COLORS.line,
    borderRadius: 12,
    padding: 14,
    color: COLORS.ink,
    marginBottom: 14,
  },
  pwRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  eye: { position: 'absolute', right: 14 },
  forgot: {
    fontSize: 12,
    color: COLORS.inkSoft,
    textAlign: 'right',
    marginBottom: 18,
  },
  or: {
    fontSize: 11.5,
    color: COLORS.inkSoft,
    textAlign: 'center',
    marginVertical: 16,
    letterSpacing: 1,
  },
  social: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: COLORS.line,
    borderRadius: 999,
    paddingVertical: 13,
    alignItems: 'center',
    marginBottom: 10,
  },
  socialText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: COLORS.ink,
  },
  registerLink: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.pine,
    textAlign: 'center',
    marginTop: 12,
    textDecorationLine: 'underline',
  },
});
