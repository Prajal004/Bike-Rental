import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { COLORS } from '../../styles/colors';

export const DocumentUpload = ({ label, onUpload }) => {
  const [uploaded, setUploaded] = useState(false);

  const handleUpload = () => {
    Alert.alert('Upload Document', `Upload ${label}`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Choose File', onPress: () => { setUploaded(true); onUpload?.(label); } },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={[styles.uploadArea, uploaded && styles.uploaded]} onPress={handleUpload}>
        <Text style={styles.uploadText}>{uploaded ? '✅ Uploaded' : '📎 Tap to upload'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  label: { fontSize: 14, fontWeight: '600', color: COLORS.text, marginBottom: 4 },
  uploadArea: { borderWidth: 2, borderColor: COLORS.border, borderStyle: 'dashed', borderRadius: 8, padding: 20, alignItems: 'center' },
  uploaded: { borderColor: COLORS.success, borderStyle: 'solid' },
  uploadText: { fontSize: 16, color: COLORS.textSecondary },
});

export default DocumentUpload;
