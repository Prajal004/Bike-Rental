import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { COLORS } from '../../styles/colors';

export default function BrandScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.brandContainer}>
        <Text style={styles.brandIcon}>🏍️</Text>
        <Text style={styles.brandText}>prajal</Text>
        <Text style={styles.brandTag}>Rent a motorbike, easily</Text>
      </View>
      <TouchableOpacity
        style={styles.getStartedButton}
        onPress={() => navigation.replace('Login')}
      >
        <Text style={styles.getStartedText}>Get Started →</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E2019',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  brandContainer: {
    alignItems: 'center',
  },
  brandIcon: {
    fontSize: 80,
    marginBottom: 16,
  },
  brandText: {
    fontSize: 40,
    fontWeight: '700',
    color: COLORS.white,
    fontStyle: 'italic',
  },
  brandTag: {
    color: '#e7ddc9',
    fontSize: 16,
    marginTop: 8,
  },
  getStartedButton: {
    position: 'absolute',
    bottom: 60,
    backgroundColor: COLORS.brick,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 999,
  },
  getStartedText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
