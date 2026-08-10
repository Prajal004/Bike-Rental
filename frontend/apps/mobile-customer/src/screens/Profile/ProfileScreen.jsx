import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,  // ✅ Import TouchableOpacity
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { COLORS } from '../../styles/colors';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.fullName || user?.name || 'User');
  const [phone, setPhone] = useState(user?.phone || '98XXXXXXXX');
  const [documents, setDocuments] = useState({
    license: null,
    citizenship: null,
  });

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: logout },
    ]);
  };

  const handleSaveProfile = () => {
    Alert.alert('Success', 'Profile updated!');
    setIsEditing(false);
  };

  const handleUploadDocument = (type) => {
    Alert.alert('Upload Document', `Upload ${type}`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Choose File', onPress: () => {
        setDocuments({ ...documents, [type]: 'uploaded' });
        Alert.alert('Success', `${type} uploaded!`);
      }},
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.userName}>{name}</Text>
        <Text style={styles.userEmail}>{user?.email || 'email@example.com'}</Text>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>👤 Customer</Text>
        </View>
      </View>

      {/* Edit Profile */}
      {isEditing ? (
        <View style={styles.editContainer}>
          <Text style={styles.sectionTitle}>Edit Profile</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <View style={styles.editActions}>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSaveProfile}>
              <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setIsEditing(false)}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity style={styles.editProfileBtn} onPress={() => setIsEditing(true)}>
          <Text style={styles.editProfileBtnText}>✏️ Edit Profile</Text>
        </TouchableOpacity>
      )}

      {/* Documents Upload */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📄 Documents</Text>
        
        <TouchableOpacity
          style={[styles.docBtn, documents.license && styles.docUploaded]}
          onPress={() => handleUploadDocument('Driving License')}
        >
          <Text style={styles.docBtnText}>
            🪪 Driving License {documents.license ? '✅' : ''}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.docBtn, documents.citizenship && styles.docUploaded]}
          onPress={() => handleUploadDocument('Citizenship')}
        >
          <Text style={styles.docBtnText}>
            📄 Citizenship {documents.citizenship ? '✅' : ''}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Menu Items */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Orders')}>
          <Text style={styles.menuIcon}>📋</Text>
          <Text style={styles.menuText}>My Orders</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('SOS')}>
          <Text style={styles.menuIcon}>🆘</Text>
          <Text style={styles.menuText}>SOS</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Referral')}>
          <Text style={styles.menuIcon}>💰</Text>
          <Text style={styles.menuText}>Referral</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.menuIcon}>⚙️</Text>
          <Text style={styles.menuText}>Settings</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutBtnText}>🚪 Logout</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>© 2026 Bike Rental Nepal</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#fff', padding: 24, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#eee' },
  avatarContainer: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#4CAF50', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  avatarText: { fontSize: 36, color: '#fff', fontWeight: 'bold' },
  userName: { fontSize: 20, fontWeight: 'bold', color: '#222' },
  userEmail: { fontSize: 14, color: '#888', marginTop: 4 },
  roleBadge: { backgroundColor: '#E8F5E9', paddingHorizontal: 16, paddingVertical: 4, borderRadius: 12, marginTop: 8 },
  roleText: { color: '#4CAF50', fontSize: 14, fontWeight: 'bold' },
  editProfileBtn: { backgroundColor: '#fff', padding: 14, marginTop: 12, marginHorizontal: 16, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#eee' },
  editProfileBtnText: { color: '#4CAF50', fontSize: 16, fontWeight: 'bold' },
  editContainer: { backgroundColor: '#fff', padding: 16, margin: 16, borderRadius: 8, borderWidth: 1, borderColor: '#eee' },
  section: { backgroundColor: '#fff', marginTop: 12, paddingHorizontal: 16, paddingVertical: 8, marginHorizontal: 16, borderRadius: 8, borderWidth: 1, borderColor: '#eee' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginVertical: 8, color: '#222' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 12 },
  editActions: { flexDirection: 'row', gap: 12 },
  saveBtn: { flex: 1, backgroundColor: '#4CAF50', padding: 12, borderRadius: 8, alignItems: 'center' },
  saveBtnText: { color: '#fff', fontWeight: 'bold' },
  cancelBtn: { flex: 1, backgroundColor: '#E53935', padding: 12, borderRadius: 8, alignItems: 'center' },
  cancelBtnText: { color: '#fff', fontWeight: 'bold' },
  docBtn: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 14, marginBottom: 8, alignItems: 'center' },
  docUploaded: { borderColor: '#4CAF50', backgroundColor: '#E8F5E9' },
  docBtnText: { fontSize: 16 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  menuIcon: { fontSize: 20, marginRight: 12 },
  menuText: { flex: 1, fontSize: 16, color: '#333' },
  menuArrow: { fontSize: 18, color: '#ccc' },
  logoutBtn: { backgroundColor: '#fff', padding: 16, margin: 16, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#E53935' },
  logoutBtnText: { color: '#E53935', fontSize: 16, fontWeight: 'bold' },
  footer: { textAlign: 'center', color: '#888', fontSize: 12, padding: 20 },
});
