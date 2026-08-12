import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import BikeCard from '../../components/bikes/BikeCard';

const HomeScreen = ({ navigation }) => {
  const [bikes, setBikes] = useState([
    { id: 1, name: 'Honda CB Shine', brand: 'Honda', cc: 125, price: 350, available: true },
    { id: 2, name: 'Yamaha FZ', brand: 'Yamaha', cc: 150, price: 400, available: true },
    { id: 3, name: 'TVS Apache', brand: 'TVS', cc: 160, price: 380, available: false },
  ]);
  const [filteredBikes, setFilteredBikes] = useState(bikes);

  const handleSearch = (query) => {
    const filtered = bikes.filter(bike =>
      bike.name.toLowerCase().includes(query.toLowerCase()) ||
      bike.brand.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBikes(filtered);
  };

  const handleFilter = (brand) => {
    if (!brand) {
      setFilteredBikes(bikes);
    } else {
      const filtered = bikes.filter(bike => bike.brand === brand);
      setFilteredBikes(filtered);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} onFilter={handleFilter} />
      <FlatList
        data={filteredBikes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <BikeCard 
            bike={item} 
            onPress={() => navigation.navigate('BikeDetail', { id: item.id })}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  list: { paddingHorizontal: 16, paddingBottom: 16 },
});

export default HomeScreen;
