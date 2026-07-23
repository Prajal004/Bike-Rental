import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import axiosClient from '../../api/axiosClient';

const AdminDashboardScreen = ({ navigation }) => {
  const [stats, setStats] = useState({
    pendingShops: 0,
    pendingBikes: 0,
    pendingRiders: 0,
    totalShops: 0,
    totalBikes: 0,
    totalUsers: 0,
    totalRentals: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axiosClient.get('/admin/stats');
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchStats();
  };

  const StatCard = ({ title, value, icon, color, onPress }) => (
    <TouchableOpacity 
      style={[styles.statCard, { borderLeftColor: color }]} 
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.statHeader}>
        <Text style={styles.statIcon}>{icon}</Text>
        <Text style={styles.statValue}>{value}</Text>
      </View>
      <Text style={styles.statTitle}>{title}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E63946" />
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>Admin Dashboard</Text>
        <Text style={styles.subtitle}>Manage your marketplace</Text>
      </View>

      <View style={styles.statsGrid}>
        <StatCard
          title="Pending Shops"
          value={stats.pendingShops}
          icon="🏪"
          color="#FF6B35"
          onPress={() => navigation.navigate('VerifyShops')}
        />
        <StatCard
          title="Pending Bikes"
          value={stats.pendingBikes}
          icon="🏍️"
          color="#F7931E"
          onPress={() => navigation.navigate('VerifyBikes')}
        />
        <StatCard
          title="Pending Riders"
          value={stats.pendingRiders}
          icon="👤"
          color="#4A90D9"
          onPress={() => navigation.navigate('VerifyRiders')}
        />
        <StatCard
          title="Total Shops"
          value={stats.totalShops}
          icon="🏪"
          color="#2ECC71"
        />
        <StatCard
          title="Total Bikes"
          value={stats.totalBikes}
          icon="🏍️"
          color="#9B59B6"
        />
        <StatCard
          title="Total Rentals"
          value={stats.totalRentals}
          icon="📋"
          color="#E74C3C"
        />
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon="👥"
          color="#3498DB"
        />
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('VerifyShops')}
        >
          <Text style={styles.actionIcon}>✅</Text>
          <Text style={styles.actionText}>Verify Shops</Text>
          {stats.pendingShops > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{stats.pendingShops}</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('VerifyBikes')}
        >
          <Text style={styles.actionIcon}>✅</Text>
          <Text style={styles.actionText}>Verify Bikes</Text>
          {stats.pendingBikes > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{stats.pendingBikes}</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('VerifyRiders')}
        >
          <Text style={styles.actionIcon}>✅</Text>
          <Text style={styles.actionText}>Verify Riders</Text>
          {stats.pendingRiders > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{stats.pendingRiders}</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.viewAllButton]}
          onPress={() => navigation.navigate('AllShops')}
        >
          <Text style={styles.actionIcon}>📋</Text>
          <Text style={styles.actionText}>View All Shops</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '46%',
    margin: '2%',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statIcon: {
    fontSize: 24,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  quickActions: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 8,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 8,
  },
  actionIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  actionText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  badge: {
    backgroundColor: '#E63946',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 12,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  viewAllButton: {
    backgroundColor: '#E63946',
  },
});

export default AdminDashboardScreen;
