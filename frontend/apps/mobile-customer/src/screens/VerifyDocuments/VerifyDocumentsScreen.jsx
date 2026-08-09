import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function VerifyDocumentsScreen() {
  const [documents, setDocuments] = useState({ license: null, citizenship: null });

  const handleUpload = (type) => {
    Alert.alert('Upload', `Upload ${type}`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Choose File', onPress: () => setDocuments({ ...documents, [type]: 'uploaded' }) },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Documents</Text>
      <Text style={styles.subtitle}>Upload your documents</Text>

      <TouchableOpacity style={styles.docBtn} onPress={() => handleUpload('license')}>
        <Text style={styles.docBtnText}>📄 Driving License {documents.license ? '✅' : ''}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.docBtn} onPress={() => handleUpload('citizenship')}>
        <Text style={styles.docBtnText}>📄 Citizenship {documents.citizenship ? '✅' : ''}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitBtn}>
        <Text style={styles.submitBtnText}>Submit for Verification</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#888', marginBottom: 20 },
  docBtn: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 16, marginBottom: 12, alignItems: 'center' },
  docBtnText: { fontSize: 16 },
  submitBtn: { backgroundColor: '#4CAF50', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  submitBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
