import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import * as Location from 'expo-location';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import sosAPI from '../../api/sos.api';

const SOSScreen = () => {
  const [loading, setLoading] = useState(false);
  const [activeSOS, setActiveSOS] = useState(null);
  const [location, setLocation] = useState(null);
  const [contacts, setContacts] = useState([
    { name: '', phone: '', relation: '' },
  ]);

  useEffect(() => {
    getLocation();
    checkActiveSOS();
  }, []);

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location access is required for SOS');
      return;
    }
    const loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords);
  };

  const checkActiveSOS = async () => {
    try {
      const response = await sosAPI.getActive();
      if (response.hasActiveSOS) {
        setActiveSOS(response.sos);
      }
    } catch (error) {
      console.error('Error checking SOS:', error);
    }
  };

  const handleTriggerSOS = async () => {
    if (!location) {
      Alert.alert('Error', 'Unable to get location');
      return;
    }

    Alert.alert(
      'Emergency SOS',
      'Are you in danger? This will alert your emergency contacts.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'TRIGGER SOS',
          style: 'destructive',
          onPress: triggerSOS,
        },
      ]
    );
  };

  const triggerSOS = async () => {
    setLoading(true);
    try {
      const response = await sosAPI.trigger({
        lat: location.latitude,
        lng: location.longitude,
        address: 'Current Location',
      });
      if (response.success) {
        Alert.alert('SOS Triggered!', 'Emergency contacts notified.');
        setActiveSOS(response.sosId);
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to trigger SOS');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSOS = async () => {
    Alert.alert(
      'Cancel SOS',
      'Are you sure you want to cancel the alert?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              await sosAPI.cancel(activeSOS);
              setActiveSOS(null);
              Alert.alert('SOS Cancelled');
            } catch (error) {
              Alert.alert('Error', 'Failed to cancel SOS');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  if (loading) return <Loader />;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Emergency SOS</Text>

      {activeSOS ? (
        <View style={styles.activeContainer}>
          <Text style={styles.activeText}>🚨 SOS ACTIVE</Text>
          <Text style={styles.activeSubtext}>Help is on the way!</Text>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancelSOS}
          >
            <Text style={styles.cancelButtonText}>Cancel SOS</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.sosButton}
          onPress={handleTriggerSOS}
        >
          <Text style={styles.sosButtonText}>🆘 TRIGGER SOS</Text>
          <Text style={styles.sosSubtext}>Emergency Alert</Text>
        </TouchableOpacity>
      )}

      <View style={styles.contactsSection}>
        <Text style={styles.sectionTitle}>Emergency Contacts</Text>
        <Text style={styles.sectionSubtitle}>
          These contacts will be notified in case of emergency
        </Text>

        {contacts.map((contact, index) => (
          <View key={index} style={styles.contactCard}>
            <Input
              label="Name"
              value={contact.name}
              onChangeText={(text) => {
                const newContacts = [...contacts];
                newContacts[index].name = text;
                setContacts(newContacts);
              }}
              placeholder="Contact name"
            />
            <Input
              label="Phone"
              value={contact.phone}
              onChangeText={(text) => {
                const newContacts = [...contacts];
                newContacts[index].phone = text;
                setContacts(newContacts);
              }}
              placeholder="Phone number"
              keyboardType="phone-pad"
            />
            <Input
              label="Relation"
              value={contact.relation}
              onChangeText={(text) => {
                const newContacts = [...contacts];
                newContacts[index].relation = text;
                setContacts(newContacts);
              }}
              placeholder="e.g., Brother"
            />
          </View>
        ))}

        <Button
          title="Add Contact"
          variant="secondary"
          onPress={() => setContacts([...contacts, { name: '', phone: '', relation: '' }])}
        />

        <Button
          title="Save Contacts"
          onPress={() => Alert.alert('Success', 'Contacts saved!')}
        />
      </View>

      <TouchableOpacity style={styles.policeButton}>
        <Text style={styles.policeButtonText}>📞 Call Police (100)</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: 20,
    marginBottom: 20,
  },
  sosButton: {
    backgroundColor: '#E63946',
    padding: 40,
    borderRadius: 16,
    alignItems: 'center',
    marginVertical: 20,
  },
  sosButtonText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  sosSubtext: {
    color: '#fff',
    fontSize: 16,
    marginTop: 8,
  },
  activeContainer: {
    backgroundColor: '#E63946',
    padding: 30,
    borderRadius: 16,
    alignItems: 'center',
    marginVertical: 20,
  },
  activeText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  activeSubtext: {
    color: '#fff',
    fontSize: 16,
    marginTop: 8,
  },
  cancelButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  cancelButtonText: {
    color: '#E63946',
    fontWeight: 'bold',
    fontSize: 16,
  },
  contactsSection: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  contactCard: {
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  policeButton: {
    backgroundColor: '#457B9D',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  policeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SOSScreen;
