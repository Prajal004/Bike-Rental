import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const SearchBar = ({ onSearch, onFilter }) => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const brands = ['All', 'Honda', 'Yamaha', 'TVS', 'Royal Enfield'];

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="🔍 Search bikes..."
        value={query}
        onChangeText={(text) => {
          setQuery(text);
          onSearch(text);
        }}
      />
      
      <View style={styles.filterContainer}>
        {brands.map((brand) => (
          <TouchableOpacity
            key={brand}
            style={[
              styles.filterButton,
              activeFilter === brand ? styles.filterActive : styles.filterInactive
            ]}
            onPress={() => {
              setActiveFilter(brand);
              onFilter(brand === 'All' ? '' : brand);
            }}
          >
            <Text style={activeFilter === brand ? styles.filterTextActive : styles.filterTextInactive}>
              {brand}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  filterActive: {
    backgroundColor: '#4CAF50',
  },
  filterInactive: {
    backgroundColor: '#f0f0f0',
  },
  filterTextActive: {
    color: '#fff',
  },
  filterTextInactive: {
    color: '#333',
  },
});

export default SearchBar;
