import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { COLORS } from '../../styles/colors';

export const LocationPicker = ({ label, value, onSelect, locations }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.picker} onPress={() => setModalVisible(true)}>
        <Text style={value ? styles.selected : styles.placeholder}>
          {value || 'Select location'}
        </Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Location</Text>
            <FlatList
              data={locations}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.locationItem} onPress={() => { onSelect(item); setModalVisible(false); }}>
                  <Text style={styles.locationText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
            <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  label: { fontSize: 14, fontWeight: '600', color: COLORS.text, marginBottom: 4 },
  picker: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 14 },
  selected: { fontSize: 16, color: COLORS.text },
  placeholder: { fontSize: 16, color: COLORS.textHint },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: COLORS.white, borderRadius: 12, padding: 20, width: '80%', maxHeight: '60%' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  locationItem: { padding: 14, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  locationText: { fontSize: 16 },
  closeBtn: { marginTop: 12, padding: 12, backgroundColor: COLORS.primary, borderRadius: 8, alignItems: 'center' },
  closeBtnText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
});

export default LocationPicker;
