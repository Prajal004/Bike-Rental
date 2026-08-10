import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';  // ✅ TouchableOpacity imported
import { useAuth } from '../../hooks/useAuth';
import { COLORS } from '../../styles/colors';

export default function SettingsScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: logout },
    ]);
  };

  const handleChangePassword = () => {
    Alert.alert('Change Password', 'Feature coming soon!');
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure? This action cannot be undone!',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => Alert.alert('Account Deleted') },
      ]
    );
  };

  const SettingItem = ({ icon, title, subtitle, onPress, right }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingLeft}>
        <Text style={styles.settingIcon}>{icon}</Text>
        <View>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {right || <Text style={styles.settingArrow}>›</Text>}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>⚙️ Settings</Text>

      {/* Profile Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👤 Profile</Text>
        <SettingItem
          icon="👤"
          title={user?.fullName || user?.name || 'User'}
          subtitle={user?.email || 'email@example.com'}
          onPress={() => navigation.navigate('Profile')}
        />
        <SettingItem
          icon="🔑"
          title="Change Password"
          onPress={handleChangePassword}
        />
      </View>

      {/* Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎨 Preferences</Text>
        <SettingItem
          icon="🔔"
          title="Notifications"
          right={
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#ddd', true: '#4CAF50' }}
            />
          }
        />
        <SettingItem
          icon="🌙"
          title="Dark Mode"
          right={
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#ddd', true: '#4CAF50' }}
            />
          }
        />
        <SettingItem
          icon="🌐"
          title="Language"
          subtitle={language}
          onPress={() => Alert.alert('Language', 'English, Nepali')}
        />
      </View>

      {/* Documents */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📄 Documents</Text>
        <SettingItem
          icon="🪪"
          title="Driving License"
          subtitle="Uploaded ✅"
          onPress={() => Alert.alert('License', 'View license details')}
        />
        <SettingItem
          icon="📄"
          title="Citizenship"
          subtitle="Not uploaded"
          onPress={() => Alert.alert('Citizenship', 'Upload citizenship')}
        />
      </View>

      {/* Support */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🆘 Support</Text>
        <SettingItem
          icon="❓"
          title="Help & Support"
          onPress={() => Alert.alert('Support', 'Contact: support@bikerental.com')}
        />
        <SettingItem
          icon="📋"
          title="Terms & Conditions"
          onPress={() => Alert.alert('Terms', 'Terms and conditions here')}
        />
        <SettingItem
          icon="🔒"
          title="Privacy Policy"
          onPress={() => Alert.alert('Privacy', 'Privacy policy here')}
        />
      </View>

      {/* Danger Zone */}
      <View style={styles.dangerSection}>
        <Text style={styles.dangerTitle}>⚠️ Danger Zone</Text>
        <TouchableOpacity style={styles.dangerBtn} onPress={handleDeleteAccount}>
          <Text style={styles.dangerBtnText}>🗑️ Delete Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutBtnText}>🚪 Logout</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>© 2026 Bike Rental Nepal</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
  section: { backgroundColor: '#fff', borderRadius: 12, marginBottom: 12, paddingHorizontal: 16, paddingVertical: 8, borderWidth: 1, borderColor: '#eee' },
  sectionTitle: { fontSize: 14, fontWeight: '600', color: '#888', marginVertical: 8 },
  settingItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  settingLeft: { flexDirection: 'row', alignItems: 'center' },
  settingIcon: { fontSize: 20, marginRight: 12 },
  settingTitle: { fontSize: 16, color: '#333' },
  settingSubtitle: { fontSize: 12, color: '#888' },
  settingArrow: { fontSize: 18, color: '#ccc' },
  dangerSection: { backgroundColor: '#fff', borderRadius: 12, marginBottom: 12, padding: 16, borderWidth: 1, borderColor: '#E53935' },
  dangerTitle: { fontSize: 14, fontWeight: 'bold', color: '#E53935', marginBottom: 12 },
  dangerBtn: { backgroundColor: '#fee2e2', padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  dangerBtnText: { color: '#E53935', fontSize: 16, fontWeight: 'bold' },
  logoutBtn: { backgroundColor: '#E53935', padding: 14, borderRadius: 8, alignItems: 'center' },
  logoutBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  footer: { textAlign: 'center', color: '#888', fontSize: 12, padding: 20 },
});
