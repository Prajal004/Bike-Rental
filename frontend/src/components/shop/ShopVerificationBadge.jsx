import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ShopVerificationBadge = ({ status, size = 'medium' }) => {
  const getStatusInfo = () => {
    switch (status) {
      case 'verified':
        return { text: '✅ Verified', color: '#2ECC71' };
      case 'pending':
        return { text: '⏳ Pending', color: '#F39C12' };
      case 'rejected':
        return { text: '❌ Rejected', color: '#E63946' };
      default:
        return { text: '📝 Pending', color: '#999' };
    }
  };

  const info = getStatusInfo();

  return (
    <View style={[styles.badge, { backgroundColor: info.color }]}>
      <Text style={[styles.text, size === 'small' && styles.smallText]}>
        {info.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  text: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: 10,
  },
});

export default ShopVerificationBadge;
