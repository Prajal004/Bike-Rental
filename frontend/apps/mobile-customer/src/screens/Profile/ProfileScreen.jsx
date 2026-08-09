import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: logout },
    ]);
  };

  const userRole = user?.role || 'customer';
  const isAdmin = userRole === 'admin';
  const isShopOwner = userRole === 'shop_owner';

  const getRoleDisplay = () => {
    if (isAdmin) return '👑 Admin';
    if (isShopOwner) return '🏪 Shop Owner';
    return '👤 Customer';
  };

  const MenuItem = ({ icon, title, onPress }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Text style={styles.menuIcon}>{icon}</Text>
      <Text style={styles.menuText}>{title}</Text>
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.fullName?.charAt(0) || 'U'}</Text>
        </View>
        <Text style={styles.name}>{user?.fullName || 'User'}</Text>
        <Text style={styles.email}>{user?.email || 'email@example.com'}</Text>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>{getRoleDisplay()}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <MenuItem icon="📋" title="My Orders" onPress={() => navigation.navigate('Orders')} />
        <MenuItem icon="🆘" title="SOS" onPress={() => navigation.navigate('SOS')} />
        <MenuItem icon="💰" title="Referral" onPress={() => navigation.navigate('Referral')} />
        <MenuItem icon="⚙️" title="Settings" onPress={() => Alert.alert('Settings', 'Coming soon!')} />
      </View>

      {isAdmin && (
        <TouchableOpacity style={styles.adminButton} onPress={() => Alert.alert('Admin', 'Go to Admin Panel')}>
          <Text style={styles.adminButtonText}>👑 Admin Panel</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>🚪 Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    backgroundColor: '#fff',
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { fontSize: 32, color: '#fff', fontWeight: 'bold' },
  name: { fontSize: 20, fontWeight: 'bold', marginTop: 8 },
  email: { fontSize: 14, color: '#888', marginTop: 2 },
  roleBadge: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#4CAF50',
    borderRadius: 12,
  },
  roleText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  section: {
    backgroundColor: '#fff',
    marginTop: 12,
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIcon: { fontSize: 20, marginRight: 12 },
  menuText: { flex: 1, fontSize: 16, color: '#333' },
  adminButton: {
    backgroundColor: '#9C27B0',
    padding: 14,
    marginTop: 12,
    marginHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  adminButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  logoutButton: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 12,
    marginHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E53935',
  },
  logoutText: { color: '#E53935', fontSize: 16, fontWeight: 'bold' },
});

export default ProfileScreen;
