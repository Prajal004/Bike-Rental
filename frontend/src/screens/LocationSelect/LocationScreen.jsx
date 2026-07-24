import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../styles/colors';

export default function LocationScreen({ navigation }) {
  const [pickup, setPickup] = useState('Select pickup location');
  const [returnLoc, setReturnLoc] = useState('Select return location');

  const selectPickup = () => {
    setPickup('Satungal Station');
  };

  const selectReturn = () => {
    setReturnLoc('Satungal Station');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.ink} />
        </TouchableOpacity>
        <Text style={styles.topbarTitle}>Sewa Motor</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.bikeName}>Honda Beat 2018</Text>
          <Text style={styles.bikeSub}>Rental prajal · ★ 4.6</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.locRow}>
            <View>
              <View style={styles.locDot} />
              <View style={styles.locLine} />
            </View>
            <View style={styles.locText}>
              <Text style={styles.locLabel}>PICK UP LOCATION *</Text>
              <TouchableOpacity onPress={selectPickup}>
                <Text style={styles.locValue}>{pickup}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.locRow, styles.locRowLast]}>
            <View style={styles.locDotEnd} />
            <View style={styles.locText}>
              <Text style={styles.locLabel}>RETURN LOCATION *</Text>
              <TouchableOpacity onPress={selectReturn}>
                <Text style={styles.locValue}>{returnLoc}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.durationLabel}>RENTAL DURATION *</Text>
          <Text style={styles.durationText}>25 Jun 2026, 09:00 → 26 Jun 2026, 09:00</Text>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('Payment')}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.stone,
  },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 44,
    paddingBottom: 14,
    backgroundColor: COLORS.stone,
  },
  topbarTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.ink,
  },
  content: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: COLORS.paper,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.line,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 3,
  },
  bikeName: {
    fontSize: 14.5,
    fontWeight: '600',
    color: COLORS.ink,
    marginBottom: 2,
  },
  bikeSub: {
    fontSize: 11,
    color: COLORS.inkSoft,
  },
  locRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  locRowLast: {
    marginBottom: 0,
  },
  locDot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: COLORS.pineSoft,
    marginTop: 5,
    marginRight: 10,
  },
  locDotEnd: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: COLORS.brick,
    marginTop: 5,
    marginRight: 10,
  },
  locLine: {
    width: 1.5,
    height: 22,
    marginLeft: 4,
    borderWidth: 0,
    borderLeftWidth: 1.5,
    borderColor: COLORS.moss,
    borderStyle: 'dashed',
  },
  locText: {
    flex: 1,
  },
  locLabel: {
    fontSize: 10.5,
    color: COLORS.inkSoft,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  locValue: {
    fontSize: 14,
    color: COLORS.ink,
    fontWeight: '600',
    marginTop: 2,
  },
  durationLabel: {
    fontSize: 10.5,
    color: COLORS.inkSoft,
    fontWeight: '700',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  durationText: {
    fontSize: 13,
    color: COLORS.ink,
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: COLORS.pine,
    borderRadius: 999,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#16342A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 6,
  },
  continueButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
});
