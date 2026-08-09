import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  TextInput,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

const SOSScreen = () => {
  const { user } = useAuth();
  const [active, setActive] = useState(false);
  const [contacts, setContacts] = useState([
    { name: '', phone: '', relation: '' },
  ]);

  const triggerSOS = () => {
    Alert.alert(
      '🚨 Emergency SOS',
      'Are you in danger? This will alert your emergency contacts.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'TRIGGER SOS', style: 'destructive', onPress: () => {
          setActive(true);
          Alert.alert('SOS Triggered!', 'Emergency contacts notified.');
        }},
      ]
    );
  };

  const cancelSOS = () => {
    Alert.alert('Cancel SOS', 'Are you sure?', [
      { text: 'No', style: 'cancel' },
      { text: 'Yes', onPress: () => setActive(false) },
    ]);
  };

  const addContact = () => {
    if (contacts.length < 5) {
      setContacts([...contacts, { name: '', phone: '', relation: '' }]);
    }
  };

  const updateContact = (index, field, value) => {
    const newContacts = [...contacts];
    newContacts[index][field] = value;
    setContacts(newContacts);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🆘 Emergency SOS</Text>

      {active ? (
        <View style={styles.activeContainer}>
          <Text style={styles.activeText}>🚨 SOS ACTIVE</Text>
          <Text style={styles.activeSubtext}>Help is on the way!</Text>
          <TouchableOpacity style={styles.cancelButton} onPress={cancelSOS}>
            <Text style={styles.cancelButtonText}>Cancel SOS</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.sosButton} onPress={triggerSOS}>
          <Text style={styles.sosButtonText}>🆘 TRIGGER SOS</Text>
        </TouchableOpacity>
      )}

      <View style={styles.contactsSection}>
        <Text style={styles.sectionTitle}>Emergency Contacts</Text>
        <Text style={styles.sectionSubtext}>These contacts will be notified</Text>

        {contacts.map((contact, index) => (
          <View key={index} style={styles.contactCard}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={contact.name}
              onChangeText={(text) => updateContact(index, 'name', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={contact.phone}
              onChangeText={(text) => updateContact(index, 'phone', text)}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Relation (e.g., Brother)"
              value={contact.relation}
              onChangeText={(text) => updateContact(index, 'relation', text)}
            />
          </View>
        ))}

        <TouchableOpacity style={styles.addButton} onPress={addContact}>
          <Text style={styles.addButtonText}>+ Add Contact</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Contacts</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.policeButton}>
        <Text style={styles.policeButtonText}>📞 Call Police (100)</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 20, marginBottom: 16 },
  sosButton: {
    backgroundColor: '#E53935',
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  sosButtonText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  activeContainer: {
    backgroundColor: '#E53935',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  activeText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  activeSubtext: { color: '#fff', fontSize: 14, marginTop: 4 },
  cancelButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginTop: 12,
  },
  cancelButtonText: { color: '#E53935', fontWeight: 'bold' },
  contactsSection: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  sectionSubtext: { fontSize: 14, color: '#888', marginBottom: 12 },
  contactCard: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    marginBottom: 6,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: { color: '#333', fontWeight: 'bold' },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: { color: '#fff', fontWeight: 'bold' },
  policeButton: {
    backgroundColor: '#1a1a2e',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  policeButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default SOSScreen;
