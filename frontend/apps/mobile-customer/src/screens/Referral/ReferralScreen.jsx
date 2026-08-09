import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

const ReferralScreen = () => {
  const { user } = useAuth();
  const [code, setCode] = useState('');
  const referralCode = user?.referralCode || 'BIKE2026';

  const copyCode = () => {
    Alert.alert('Copied!', `Code: ${referralCode}`);
  };

  const applyCode = () => {
    if (!code.trim()) {
      Alert.alert('Error', 'Please enter a referral code');
      return;
    }
    Alert.alert('Success', 'Referral code applied! You get Rs 100 off.');
    setCode('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💰 Refer & Earn</Text>

      <View style={styles.walletCard}>
        <Text style={styles.walletLabel}>Wallet Balance</Text>
        <Text style={styles.walletBalance}>Rs {user?.walletBalance || 0}</Text>
      </View>

      <View style={styles.codeCard}>
        <Text style={styles.codeLabel}>Your Referral Code</Text>
        <View style={styles.codeContainer}>
          <Text style={styles.codeText}>{referralCode}</Text>
          <TouchableOpacity style={styles.copyButton} onPress={copyCode}>
            <Text style={styles.copyButtonText}>Copy</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.codeInfo}>
          Share this code. Friends get Rs 100 off, you earn Rs 50!
        </Text>
      </View>

      <View style={styles.applyCard}>
        <Text style={styles.applyLabel}>Have a referral code?</Text>
        <View style={styles.applyContainer}>
          <TextInput
            style={styles.applyInput}
            placeholder="Enter referral code"
            value={code}
            onChangeText={setCode}
          />
          <TouchableOpacity style={styles.applyButton} onPress={applyCode}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Total Referrals</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>Rs 0</Text>
          <Text style={styles.statLabel}>Credits Earned</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 20, marginBottom: 16 },
  walletCard: {
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  walletLabel: { color: '#fff', fontSize: 14, opacity: 0.8 },
  walletBalance: { color: '#fff', fontSize: 32, fontWeight: 'bold', marginTop: 4 },
  codeCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  codeLabel: { fontSize: 14, color: '#888', marginBottom: 8 },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
  },
  codeText: { flex: 1, fontSize: 18, fontWeight: 'bold', color: '#4CAF50', letterSpacing: 2 },
  copyButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 4,
  },
  copyButtonText: { color: '#fff', fontWeight: 'bold' },
  codeInfo: { fontSize: 12, color: '#888', marginTop: 8 },
  applyCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  applyLabel: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
  applyContainer: { flexDirection: 'row' },
  applyInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    marginRight: 8,
  },
  applyButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
  },
  applyButtonText: { color: '#fff', fontWeight: 'bold' },
  statsCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: { alignItems: 'center' },
  statNumber: { fontSize: 20, fontWeight: 'bold', color: '#4CAF50' },
  statLabel: { fontSize: 12, color: '#888', marginTop: 2 },
  statDivider: { width: 1, backgroundColor: '#eee' },
});

export default ReferralScreen;
