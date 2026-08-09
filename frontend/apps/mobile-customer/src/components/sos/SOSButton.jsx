import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { COLORS } from '../../styles/colors';

export const SOSButton = ({ onTrigger }) => {
  const [active, setActive] = useState(false);

  const handlePress = () => {
    Alert.alert('Emergency SOS', 'Are you in danger?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'TRIGGER SOS', style: 'destructive', onPress: () => { setActive(true); onTrigger?.(); } },
    ]);
  };

  const handleCancel = () => {
    Alert.alert('Cancel SOS', 'Are you sure?', [
      { text: 'No', style: 'cancel' },
      { text: 'Yes', onPress: () => setActive(false) },
    ]);
  };

  if (active) {
    return (
      <View style={styles.activeContainer}>
        <Text style={styles.activeText}>🚨 SOS ACTIVE</Text>
        <Text style={styles.activeSub}>Help is on the way!</Text>
        <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
          <Text style={styles.cancelBtnText}>Cancel SOS</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>🆘 TRIGGER SOS</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: { backgroundColor: COLORS.danger, padding: 24, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: COLORS.white, fontSize: 20, fontWeight: 'bold' },
  activeContainer: { backgroundColor: COLORS.danger, padding: 24, borderRadius: 12, alignItems: 'center' },
  activeText: { color: COLORS.white, fontSize: 24, fontWeight: 'bold' },
  activeSub: { color: COLORS.white, fontSize: 16, marginTop: 4 },
  cancelBtn: { backgroundColor: COLORS.white, padding: 12, borderRadius: 8, marginTop: 12 },
  cancelBtnText: { color: COLORS.danger, fontSize: 16, fontWeight: 'bold' },
});

export default SOSButton;
