import React, { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../../styles/theme';

const MOCK_FAVORITES = [];

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState(MOCK_FAVORITES);

  if (favorites.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Favorites</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>♡</Text>
          <Text style={styles.emptyTitle}>No favorites yet</Text>
          <Text style={styles.emptySubtext}>
            Tap the heart on any motorbike to save it here.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>
      </View>
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardImage}>
              <Text style={styles.bikeEmoji}>🏍️</Text>
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.cardName}>{item.name}</Text>
              <Text style={styles.cardPrice}>Rs {item.price}/day</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.stone },
  header: { padding: 20, paddingTop: 44, backgroundColor: COLORS.pine },
  title: { fontSize: 24, fontWeight: '700', color: '#fff' },
  list: { padding: 16 },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.paper,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  cardImage: {
    width: 60,
    height: 60,
    backgroundColor: COLORS.stone,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bikeEmoji: { fontSize: 30 },
  cardBody: { flex: 1, paddingLeft: 12, justifyContent: 'center' },
  cardName: { fontSize: 14, fontWeight: '600', color: COLORS.ink },
  cardPrice: { fontSize: 13, fontWeight: '700', color: COLORS.brick, marginTop: 2 },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: { fontSize: 60, marginBottom: 16 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: COLORS.ink },
  emptySubtext: { fontSize: 14, color: COLORS.inkSoft, textAlign: 'center', marginTop: 4 },
});