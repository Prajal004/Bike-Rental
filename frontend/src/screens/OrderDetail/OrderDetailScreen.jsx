import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView, Alert
} from 'react-native';
import { COLORS, FONTS } from '../../styles/theme';
import Button from '../../components/common/Button';

export default function OrderDetailScreen({ navigation, route }) {
  const { order } = route.params || {};

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.topbarTitle}>Order Details</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.statusCard}>
          <Text style={styles.statusPill}>⏳ Waiting for confirmation</Text>
          <View style={styles.orderItem}>
            <Text style={styles.bikeName}>Honda Beat 2018</Text>
            <Text style={styles.shopName}>Prajal Motor</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>👤</Text>
            <View>
              <Text style={styles.infoLabel}>Prajal Shah</Text>
              <Text style={styles.infoSub}>prajal@example.com · 98XXXXXXXX</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📍</Text>
            <View>
              <Text style={styles.infoLabel}>Pick Up Location</Text>
              <Text style={styles.infoSub}>Satungal Station</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📍</Text>
            <View>
              <Text style={styles.infoLabel}>Return Location</Text>
              <Text style={styles.infoSub}>Satungal Station</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>🗓️</Text>
            <View>
              <Text style={styles.infoLabel}>Rental Duration</Text>
              <Text style={styles.infoSub}>25 Jun 2026 → 26 Jun 2026</Text>
            </View>
          </View>
        </View>

        <Button
          label="Contact the Rental Office"
          onPress={() => navigation.navigate('Chat')}
          variant="secondary"
          style={styles.button}
        />
        <Button
          label="Cancel Order"
          variant="danger"
          onPress={() => Alert.alert('Cancel Order', 'Are you sure?')}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.stone },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: COLORS.pine,
    paddingHorizontal: 18,
    paddingTop: 50,
    paddingBottom: 14,
  },
  back: { fontSize: 20, color: '#fff' },
  topbarTitle: { fontSize: 16, fontWeight: '600', color: '#fff' },
  content: { padding: 20 },
  statusCard: {
    backgroundColor: COLORS.paper,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  statusPill: {
    backgroundColor: '#F7E7CE',
    color: '#93611A',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    fontSize: 10.5,
    fontWeight: '700',
    alignSelf: 'flex-start',
  },
  orderItem: { marginTop: 14 },
  bikeName: { fontSize: 16, fontWeight: '700', color: COLORS.ink },
  shopName: { fontSize: 13, color: COLORS.inkSoft, marginTop: 2 },
  card: {
    backgroundColor: COLORS.paper,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  infoRow: { flexDirection: 'row', gap: 12, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: COLORS.line },
  infoIcon: { fontSize: 16, marginTop: 2 },
  infoLabel: { fontSize: 13, fontWeight: '600', color: COLORS.ink },
  infoSub: { fontSize: 11, color: COLORS.inkSoft, marginTop: 1 },
  button: { marginBottom: 10 },
});
