import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, StyleSheet
} from 'react-native';
import { COLORS, FONTS } from '../../styles/theme';

const MOCK_LOCATIONS = [
  'Satungal Station', 'Kalanki', 'New Road', 'Thamel', 'Baneshwor',
  'Koteshwor', 'Patan Durbar Square', 'Boudha', 'Jawalakhel', 'Balaju',
];

export default function LocationPickerScreen({ navigation, route }) {
  const { field } = route.params;
  const [query, setQuery] = useState('');

  const filtered = MOCK_LOCATIONS.filter((l) =>
    l.toLowerCase().includes(query.toLowerCase())
  );

  const select = (location) => {
    navigation.navigate('LocationSelect', { field, location });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.topbarTitle}>
          {field === 'pickup' ? 'Pickup Location' : 'Return Location'}
        </Text>
      </View>

      <View style={styles.searchWrap}>
        <TextInput
          style={styles.search}
          placeholder="Search location..."
          placeholderTextColor={COLORS.inkSoft}
          value={query}
          onChangeText={setQuery}
          autoFocus
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.result} onPress={() => select(item)}>
            <View style={styles.resultIcon}><Text>📍</Text></View>
            <Text style={styles.resultText}>{item}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No locations match "{query}"</Text>
        }
      />
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
  searchWrap: { padding: 16, paddingBottom: 4 },
  search: {
    backgroundColor: COLORS.paper,
    borderWidth: 1.5,
    borderColor: COLORS.line,
    borderRadius: 12,
    padding: 13,
    fontSize: 14,
    color: COLORS.ink,
  },
  result: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: COLORS.paper,
    borderRadius: 12,
    padding: 13,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  resultIcon: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: COLORS.stone,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultText: { fontSize: 13.5, fontWeight: '600', color: COLORS.ink },
  empty: {
    fontSize: 13,
    color: COLORS.inkSoft,
    textAlign: 'center',
    marginTop: 30,
  },
});