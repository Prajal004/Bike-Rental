import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView, Alert, Image, SafeAreaView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../styles/colors';
import Button from '../../components/common/Button';

export default function VerifyShopDocuments({ navigation }) {
  const [registration, setRegistration] = useState(null);
  const [pan, setPan] = useState(null);
  const [shopImage, setShopImage] = useState(null);
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
      if (type === 'registration') setRegistration(result.assets[0].uri);
      else if (type === 'pan') setPan(result.assets[0].uri);
      else setShopImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!registration) {
      Alert.alert('Error', 'Please upload shop registration document');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('✅ Success', 'Shop documents submitted!');
      navigation.goBack();
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.ink} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shop Verification</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Verify Your Shop</Text>
        <Text style={styles.subtitle}>Upload your shop documents to get verified</Text>

        <View style={styles.card}>
          <Text style={styles.label}>📄 Shop Registration Certificate *</Text>
          <TouchableOpacity style={styles.uploadArea} onPress={() => pickImage('registration')}>
            {registration ? (
              <Image source={{ uri: registration }} style={styles.uploadImage} />
            ) : (
              <View style={styles.uploadPlaceholder}>
                <Text style={styles.uploadIcon}>📷</Text>
                <Text style={styles.uploadText}>Tap to upload registration</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>📄 PAN/VAT Certificate</Text>
          <TouchableOpacity style={styles.uploadArea} onPress={() => pickImage('pan')}>
            {pan ? (
              <Image source={{ uri: pan }} style={styles.uploadImage} />
            ) : (
              <View style={styles.uploadPlaceholder}>
                <Text style={styles.uploadIcon}>📷</Text>
                <Text style={styles.uploadText}>Tap to upload PAN</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>🏪 Shop Image</Text>
          <TouchableOpacity style={styles.uploadArea} onPress={() => pickImage('shop')}>
            {shopImage ? (
              <Image source={{ uri: shopImage }} style={styles.uploadImage} />
            ) : (
              <View style={styles.uploadPlaceholder}>
                <Text style={styles.uploadIcon}>📷</Text>
                <Text style={styles.uploadText}>Tap to upload shop image</Text>
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