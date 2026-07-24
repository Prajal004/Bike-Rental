import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../../styles/theme';
import Button from '../../components/common/Button';

export default function SOSScreen({ navigation }) {
  const [active, setActive] = useState(false);

  const handleSOS = () => {
    Alert.alert(
      '🚨 Emergency SOS',
      'Are you sure? This will alert your emergency contacts.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'TRIGGER SOS',
          style: 'destructive',
          onPress: () => {
            setActive(true);
            Alert.alert('✅ SOS Triggered', 'Help is on the way!');
          }
        }
      ]
    );
  };

  const handleCancelSOS = () => {
    Alert.alert(
      'Cancel SOS',
      'Are you sure you want to cancel?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes, Cancel', onPress: () => setActive(false) }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Emergency SOS</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {active ? (
          <View style={styles.activeContainer}>
            <Text style={styles.activeIcon}>🚨</Text>
            <Text style={styles.activeTitle}>SOS ACTIVE</Text>
            <Text style={styles.activeSubtext}>Help is on the way!</Text>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelSOS}>
              <Text style={styles.cancelText}>Cancel SOS</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.sosButton} onPress={handleSOS}>
            <Text style={styles.sosIcon}>🆘</Text>
            <Text style={styles.sosText}>TRIGGER SOS</Text>
            <Text style={styles.sosSubtext}>Emergency Alert</Text>
          </TouchableOpacity>
        )}

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Emergency Contacts</Text>
          <Text style={styles.infoText}>
            Your emergency contacts will be notified when you trigger SOS.
          </Text>
          <TouchableOpacity style={styles.addContactButton}>
            <Text style={styles.addContactText}>+ Add Emergency Contacts</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.policeButton}>
          <Text style={styles.policeText}>📞 Call Police (100)</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.stone },
  header: { padding: 20, paddingTop: 44, backgroundColor: COLORS.pine },
  title: { fontSize: 24, fontWeight: '700', color: '#fff' },
  content: { padding: 16, flexGrow: 1 },
  sosButton: {
    backgroundColor: '#E63946',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    marginVertical: 20,
  },
  sosIcon: { fontSize: 60, marginBottom: 12 },
  sosText: { fontSize: 28, fontWeight: '700', color: '#fff' },
  sosSubtext: { fontSize: 16, color: '#fff', opacity: 0.8, marginTop: 4 },
  activeContainer: {
    backgroundColor: '#E63946',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    marginVertical: 20,
  },
  activeIcon: { fontSize: 60, marginBottom: 12 },
  activeTitle: { fontSize: 28, fontWeight: '700', color: '#fff' },
  activeSubtext: { fontSize: 16, color: '#fff', opacity: 0.8, marginTop: 4 },
  cancelButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 999,
    marginTop: 16,
  },
  cancelText: { color: '#E63946', fontSize: 16, fontWeight: '700' },
  infoCard: {
    backgroundColor: COLORS.paper,
    borderRadius: 16,
    padding: 16,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  infoTitle: { fontSize: 16, fontWeight: '700', color: COLORS.ink, marginBottom: 8 },
  infoText: { fontSize: 13, color: COLORS.inkSoft, lineHeight: 20 },
  addContactButton: {
    backgroundColor: COLORS.pine,
    padding: 12,
    borderRadius: 999,
    alignItems: 'center',
    marginTop: 12,
  },
  addContactText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  policeButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  policeText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});