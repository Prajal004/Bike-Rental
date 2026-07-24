import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView
} from 'react-native';
import { COLORS, FONTS } from '../../styles/theme';
import Button from '../../components/common/Button';

export default function LocationScreen({ navigation, route }) {
  const { bike, addons, totalPrice } = route.params || {};
  const [pickup, setPickup] = useState(null);
  const [dropoff, setDropoff] = useState(null);

  useEffect(() => {
    if (route.params?.field === 'pickup' && route.params?.location) {
      setPickup(route.params.location);
    }
    if (route.params?.field === 'return' && route.params?.location) {
      setDropoff(route.params.location);
    }
  }, [route.params?.field, route.params?.location]);

  const canContinue = pickup && dropoff;

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.topbarTitle}>Sewa Motor</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.bikeName}>{bike?.name || 'Honda Beat'} 2018</Text>
          <Text style={styles.bikeSub}>Rental prajal · ★ {bike?.rating || 4.6}</Text>
        </View>

        <View style={styles.card}>
          <TouchableOpacity
            style={styles.locRow}
            onPress={() => navigation.navigate('LocationPicker', { field: 'pickup' })}
          >
            <View style={styles.dotCol}>
              <View style={[styles.dot, { backgroundColor: COLORS.pineSoft }]} />
              <View style={styles.dashLine} />
            </View>
            <View style={styles.locText}>
              <Text style={styles.lbl}>PICK UP LOCATION *</Text>
              <Text style={[styles.val, !pickup && styles.placeholder]}>
                {pickup || 'Select pickup location'}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.locRow, { marginBottom: 0 }]}
            onPress={() => navigation.navigate('LocationPicker', { field: 'return' })}
          >
            <View style={[styles.dot, { backgroundColor: COLORS.brick }]} />
            <View style={styles.locText}>
              <Text style={styles.lbl}>RETURN LOCATION *</Text>
              <Text style={[styles.val, !dropoff && styles.placeholder]}>
                {dropoff || 'Select return location'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.lbl}>RENTAL DURATION *</Text>
          <Text style={styles.durationVal}>25 Jun 2026, 09:00 → 26 Jun 2026, 09:00</Text>
        </View>

        <Button
          label="Continue"
          disabled={!canContinue}
          onPress={() => navigation.navigate('Payment', { bike, addons, totalPrice, pickup, dropoff })}
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
  bikeName: { fontSize: 14.5, fontWeight: '600', color: COLORS.ink, marginBottom: 2 },
  bikeSub: { fontSize: 11, color: COLORS.inkSoft },
  locRow: { flexDirection: 'row', gap: 10, marginBottom: 14, alignItems: 'flex-start' },
  dotCol: { alignItems: 'center' },
  dot: { width: 9, height: 9, borderRadius: 4.5, marginTop: 5 },
  dashLine: { width: 1.5, height: 22, backgroundColor: COLORS.moss, opacity: 0.5, marginTop: 4 },
  locText: { flex: 1 },
  lbl: { fontSize: 10.5, fontWeight: '700', color: COLORS.inkSoft, letterSpacing: 0.3, marginBottom: 3 },
  val: { fontSize: 14, fontWeight: '600', color: COLORS.ink },
  placeholder: { color: COLORS.inkSoft, fontWeight: '400' },
  durationVal: { fontSize: 13, fontWeight: '600', color: COLORS.ink, marginTop: 4 },
});