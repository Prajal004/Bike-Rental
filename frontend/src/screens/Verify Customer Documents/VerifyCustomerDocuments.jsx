import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView, Alert, Image, SafeAreaView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../styles/colors';
import Button from '../../components/common/Button';

export default function VerifyCustomerDocuments({ navigation }) {
  const [license, setLicense] = useState(null);
  const [citizenship, setCitizenship] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async (type) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Needed', 'Please allow access to your photos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      if (type === 'license') setLicense(result.assets[0].uri);
      else setCitizenship(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!license || !citizenship) {
      Alert.alert('Error', 'Please upload both documents');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('✅ Success', 'Customer documents submitted!');
      navigation.goBack();
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.ink} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Customer Verification</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Verify Your Identity</Text>
        <Text style={styles.subtitle}>Upload your documents to get verified</Text>

        <View style={styles.card}>
          <Text style={styles.label}>📄 Driving License</Text>
          <TouchableOpacity style={styles.uploadArea} onPress={() => pickImage('license')}>
            {license ? (
              <Image source={{ uri: license }} style={styles.uploadImage} />
            ) : (
              <View style={styles.uploadPlaceholder}>
                <Text style={styles.uploadIcon}>📷</Text>
                <Text style={styles.uploadText}>Tap to upload license</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>🪪 Citizenship</Text>
          <TouchableOpacity style={styles.uploadArea} onPress={() => pickImage('citizenship')}>
            {citizenship ? (
              <Image source={{ uri: citizenship }} style={styles.uploadImage} />
            ) : (
              <View style={styles.uploadPlaceholder}>
                <Text style={styles.uploadIcon}>📷</Text>
                <Text style={styles.uploadText}>Tap to upload citizenship</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <Button
          label={loading ? 'Submitting...' : 'Submit for Verification'}
          onPress={handleSubmit}
          disabled={loading}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 44,
    paddingBottom: 12,
    backgroundColor: '#fff',
  },
  headerTitle: { fontSize: 18, fontWeight: '600', color: COLORS.ink },
  content: { padding: 16 },
  title: { fontSize: 24, fontWeight: '700', color: COLORS.ink, marginTop: 8 },
  subtitle: { fontSize: 14, color: COLORS.inkSoft, marginBottom: 20 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 16 },
  label: { fontSize: 16, fontWeight: '600', color: COLORS.ink, marginBottom: 8 },
  uploadArea: {
    borderWidth: 2,
    borderColor: COLORS.line,
    borderStyle: 'dashed',
    borderRadius: 12,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    overflow: 'hidden',
  },
  uploadImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  uploadPlaceholder: { alignItems: 'center' },
  uploadIcon: { fontSize: 40, marginBottom: 8 },
  uploadText: { color: '#999', fontSize: 14 },
});