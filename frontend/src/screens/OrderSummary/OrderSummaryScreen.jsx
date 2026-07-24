import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView, Alert
} from 'react-native';
import { COLORS, FONTS } from '../../styles/theme';
import Button from '../../components/common/Button';
import { ADDONS } from '../../constants/addons';

export default function OrderSummaryScreen({ navigation, route }) {
  const { bike, addons = [], totalPrice } = route.params || {};

  const addonsList = addons.map(id => ADDONS.find(a => a.id === id)).filter(Boolean);

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.topbarTitle}>Order Summary</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.bikeName}>{bike?.name || 'Honda Beat'}</Text>
          <Text style={styles.bikePrice}>Rs {bike?.price || 280}/day</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Rental Duration</Text>
          <Text style={styles.durationText}>25 Jun 2026, 09:00 → 26 Jun 2026, 09:00</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Add-ons</Text>
          {addonsList.length > 0 ? (
            addonsList.map((a) => (
              <View key={a.id} style={styles.addonRow}>
                <Text style={styles.addonName}>{a.icon} {a.name}</Text>
                <Text style={styles.addonPrice}>{a.price === 0 ? 'Free' : `+Rs ${a.price}`}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noAddons}>No add-ons selected</Text>
          )}
        </View>

        <View style={[styles.card, styles.totalCard]}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalPrice}>Rs {totalPrice || 0}</Text>
          </View>
        </View>

        <Button
          label="Confirm Booking"
          onPress={() => navigation.navigate('Payment', { bike, addons, totalPrice })}
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
  card: {
    backgroundColor: COLORS.paper,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  bikeName: { fontSize: 18, fontWeight: '700', color: COLORS.ink },
  bikePrice: { fontSize: 16, fontWeight: '600', color: COLORS.brick, marginTop: 4 },
  sectionTitle: { fontSize: 14, fontWeight: '600', color: COLORS.ink, marginBottom: 8 },
  durationText: { fontSize: 13, color: COLORS.inkSoft },
  addonRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: COLORS.line },
  addonName: { fontSize: 13, color: COLORS.ink },
  addonPrice: { fontSize: 13, fontWeight: '600', color: COLORS.ink },
  noAddons: { fontSize: 13, color: COLORS.inkSoft, fontStyle: 'italic' },
  totalCard: { backgroundColor: COLORS.pine, borderColor: COLORS.pine },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between' },
  totalLabel: { fontSize: 18, fontWeight: '700', color: '#fff' },
  totalPrice: { fontSize: 18, fontWeight: '700', color: '#fff' },
});
