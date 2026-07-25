import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen({ navigation }) {
  const { user, logout, switchRole } = useAuth();
  const isShopOwner = user?.role === 'shop_owner';

  const handleLogout = () => {
    const confirmLogout = () => {
      logout();
    };

    if (Platform.OS === 'web') {
      if (window.confirm('Are you sure you want to logout?')) {
        confirmLogout();
      }
    } else {
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Logout', style: 'destructive', onPress: confirmLogout },
        ]
      );
    }
  };

  const handleSwitchRole = async () => {
    const newRole = isShopOwner ? 'customer' : 'shop_owner';
    Alert.alert(
      'Switch Role',
      `Switch to ${newRole === 'shop_owner' ? 'Shop Owner' : 'Customer'} mode?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Switch',
          onPress: async () => {
            const result = await switchRole(newRole);
            if (result.success) {
              Alert.alert('✅ Success', `Switched to ${newRole} mode`);
              // ✅ Force reload to update TabNavigator
              navigation.replace('Main');
            } else {
              Alert.alert('❌ Error', 'Failed to switch role');
            }
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.avatar}>👤</Text>
        <Text style={styles.name}>{user?.fullName || 'User'}</Text>
        <Text style={styles.email}>{user?.email || 'email@example.com'}</Text>
        <View style={[styles.roleBadge, { backgroundColor: isShopOwner ? '#4CAF50' : '#2196F3' }]}>
          <Text style={styles.roleText}>{isShopOwner ? '🏪 Shop Owner' : '👤 Customer'}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.switchButton} onPress={handleSwitchRole}>
          <Text style={styles.switchText}>
            {isShopOwner ? 'Switch to Customer Mode' : 'Switch to Shop Owner Mode'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Menu</Text>
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
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('VerifyDocuments')}>
          <Text style={styles.menuIcon}>📄</Text>
          <Text style={styles.menuText}>Verification Documents</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        {isShopOwner && (
          <>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('AddBike')}>
              <Text style={styles.menuIcon}>➕</Text>
              <Text style={styles.menuText}>Add Bike</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('MyBikes')}>
              <Text style={styles.menuIcon}>🏍️</Text>
              <Text style={styles.menuText}>My Bikes</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>🚪 Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: { fontSize: 64, marginBottom: 8 },
  name: { fontSize: 24, fontWeight: '700', color: '#1a1a1a' },
  email: { fontSize: 16, color: '#666' },
  roleBadge: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, marginTop: 8 },
  roleText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  section: { backgroundColor: '#fff', marginTop: 12, padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1a1a1a', marginBottom: 12 },
  switchButton: { backgroundColor: '#4CAF50', padding: 14, borderRadius: 8, alignItems: 'center' },
  switchText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIcon: { fontSize: 20, marginRight: 12 },
  menuText: { flex: 1, fontSize: 16, color: '#333' },
  menuArrow: { fontSize: 18, color: '#ccc' },
  logoutButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
    borderRadius: 8,
  },
  logoutText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
