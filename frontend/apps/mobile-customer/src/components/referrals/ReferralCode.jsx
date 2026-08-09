import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { COLORS } from '../../styles/colors';

export const ReferralCode = ({ code }) => {
  const handleCopy = () => {
    Alert.alert('Copied!', `Referral code: ${code}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Your Referral Code</Text>
      <View style={styles.codeContainer}>
        <Text style={styles.code}>{code || 'BIKE2026'}</Text>
        <TouchableOpacity style={styles.copyBtn} onPress={handleCopy}>
          <Text style={styles.copyBtnText}>Copy</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.info}>Share this code to earn rewards!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: COLORS.white, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border },
  label: { fontSize: 14, color: COLORS.textSecondary, marginBottom: 8 },
  codeContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  code: { fontSize: 24, fontWeight: 'bold', color: COLORS.primary },
  copyBtn: { backgroundColor: COLORS.primary, padding: 8, borderRadius: 6 },
  copyBtnText: { color: COLORS.white, fontWeight: 'bold' },
  info: { fontSize: 12, color: COLORS.textSecondary, marginTop: 8 },
});

export default ReferralCode;
