import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../../styles/colors';

export const Layout = ({ children, title, showBack = false }) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {showBack && (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.backIcon}>←</Text>
              </TouchableOpacity>
            )}
            <Text style={styles.headerTitle}>🏍️ Bike Rental</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.headerIcon}>👤</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {title && <Text style={styles.pageTitle}>{title}</Text>}
          {children}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2026 Bike Rental Nepal</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.primaryDark },
  container: { flex: 1, backgroundColor: COLORS.white },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.primaryDark,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  backIcon: { color: COLORS.white, fontSize: 20 },
  headerTitle: { color: COLORS.white, fontSize: 18, fontWeight: 'bold' },
  headerIcon: { color: COLORS.white, fontSize: 22 },
  content: { flex: 1, paddingHorizontal: 16, paddingTop: 12 },
  pageTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.text, marginBottom: 16 },
  footer: {
    paddingVertical: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  footerText: { fontSize: 11, color: COLORS.textSecondary },
});

export default Layout;
