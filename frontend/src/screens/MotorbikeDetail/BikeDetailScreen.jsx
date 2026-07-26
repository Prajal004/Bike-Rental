import React, { useState, useMemo } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Dimensions, Alert
} from 'react-native';
import { COLORS } from '../../styles/colors';
import BikeIcon from '../../components/motorbike/BikeIcon';
import { ADDONS } from '../../constants/addons';

const { width } = Dimensions.get('window');

export default function BikeDetailScreen({ navigation, route }) {
  const bike = route.params?.bike || route.params?.item || { 
    name: 'Honda Beat', 
    price: 280, 
    rating: 4.6,
    cc: 125
  };
  
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const bikePrice = typeof bike.price === 'number' ? bike.price : 280;
  const bikeRating = typeof bike.rating === 'number' ? bike.rating : 4.0;

  const addonsTotal = useMemo(
    () => selectedAddons.reduce((sum, id) => sum + (ADDONS.find(a => a.id === id)?.price || 0), 0),
    [selectedAddons]
  );
  const totalPrice = bikePrice + addonsTotal;

  const toggleAddon = (id) => {
    setSelectedAddons(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // ✅ Reviews show function
  const showReviews = () => {
    Alert.alert(
      '📝 Reviews & Ratings',
      `⭐ Overall Rating: ${bikeRating} / 5\n📊 150 Reviews\n\n` +
      '★★★★★ "Best bike ever!" - John\n' +
      '★★★★★ "Amazing ride!" - Sarah\n' +
      '★★★★☆ "Highly recommend!" - Mike\n' +
      '★★★★★ "Perfect for touring!" - Ram\n' +
      '★★★★☆ "Good value for money" - Sita',
      [{ text: 'Close' }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.topbarTitle}>Detail Motor</Text>
      </View>

      <ScrollView style={{ flex: 1 }}>
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}
          onScroll={(e) => setGalleryIndex(Math.round(e.nativeEvent.contentOffset.x / width))}
          scrollEventThrottle={16}>
          {[0, 1, 2].map((i) => (
            <View key={i} style={[styles.galleryPage, { width }]}>
              <BikeIcon color={bike.color || '#3E7360'} size={200} />
            </View>
          ))}
        </ScrollView>
        <View style={styles.dots}>
          {[0, 1, 2].map((i) => <View key={i} style={[styles.dot, galleryIndex === i && styles.dotOn]} />)}
        </View>

        <View style={styles.body}>
          <Text style={styles.name}>{bike.name} 2018</Text>
          <Text style={styles.ratingRow}>★ {bikeRating} · 150 reviews · Rental prajal</Text>

          <Text style={styles.sectionLabel}>ADD-ONS</Text>
          {ADDONS.map((addon) => {
            const selected = selectedAddons.includes(addon.id);
            return (
              <TouchableOpacity 
                key={addon.id} 
                style={[styles.addonRow, selected && styles.addonSelected]} 
                onPress={() => toggleAddon(addon.id)}
              >
                <View style={styles.addonLeft}>
                  <Text style={styles.addonIcon}>{addon.icon}</Text>
                  <Text style={styles.addonName}>{addon.name}</Text>
                </View>
                <View style={styles.addonRight}>
                  <Text style={styles.addonPrice}>{addon.price === 0 ? 'Free' : `+Rs ${addon.price}`}</Text>
                  <View style={[styles.checkbox, selected && styles.checkboxOn]}>
                    {selected && <Text style={styles.checkMark}>✓</Text>}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}

          <Text style={styles.prepared}>Prepared by <Text style={{ fontWeight: 'bold', color: COLORS.ink }}>Sewa Motor</Text></Text>

          <TouchableOpacity onPress={showReviews} style={styles.reviewLink}>
            <Text style={styles.link}>See reviews ›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.stickyBottom}>
        <View>
          <Text style={styles.priceBig}>Rs. {totalPrice}</Text>
          <Text style={styles.priceSuffix}>Total price</Text>
          {addonsTotal > 0 && (
            <Text style={styles.priceBreakdown}>+ Rs {addonsTotal} add-ons</Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => {
            navigation.navigate('LocationSelect', { bike, addons: selectedAddons, totalPrice });
          }}
        >
          <Text style={styles.orderButtonText}>Order now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1ECE2' },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#16342A',
    paddingHorizontal: 18,
    paddingTop: 50,
    paddingBottom: 14,
  },
  back: { fontSize: 20, color: '#fff' },
  topbarTitle: { fontSize: 16, fontWeight: '600', color: '#fff' },
  galleryPage: { height: 220, backgroundColor: '#EFE9DB', alignItems: 'center', justifyContent: 'center' },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 5, marginTop: -18, marginBottom: 8 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#c9c2ae' },
  dotOn: { backgroundColor: '#16342A' },
  body: { padding: 20 },
  name: { fontSize: 21, fontWeight: '700', color: '#1B2A22' },
  ratingRow: { fontSize: 12, color: '#6B7A70', marginTop: 4, marginBottom: 18 },
  sectionLabel: { fontSize: 11, fontWeight: '600', color: '#6B7A70', letterSpacing: 0.5, marginBottom: 10 },
  addonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 13,
    borderWidth: 1.5,
    borderColor: '#E4DDCC',
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#FFFCF6',
  },
  addonSelected: { borderColor: '#16342A', backgroundColor: '#EEF3EC' },
  addonLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  addonIcon: { fontSize: 17 },
  addonName: { fontSize: 13.5, fontWeight: '600', color: '#1B2A22' },
  addonRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  addonPrice: { fontSize: 12, color: '#6B7A70' },
  checkbox: { width: 20, height: 20, borderRadius: 6, borderWidth: 1.5, borderColor: '#E4DDCC', alignItems: 'center', justifyContent: 'center' },
  checkboxOn: { backgroundColor: '#16342A', borderColor: '#16342A' },
  checkMark: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  prepared: { fontSize: 12, color: '#6B7A70', marginTop: 14, marginBottom: 12 },
  reviewLink: { paddingVertical: 4 },
  link: { fontSize: 13, fontWeight: '700', color: '#16342A' },
  stickyBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    backgroundColor: '#FFFCF6',
    borderTopWidth: 1,
    borderTopColor: '#E4DDCC',
  },
  priceBig: { fontSize: 19, fontWeight: '700', color: '#1B2A22' },
  priceSuffix: { fontSize: 10.5, color: '#6B7A70', fontWeight: '500' },
  priceBreakdown: { fontSize: 10.5, color: '#6B7A70', marginTop: 2 },
  orderButton: {
    backgroundColor: '#9C4A2E',
    paddingHorizontal: 28,
    paddingVertical: 13,
    borderRadius: 999,
    alignItems: 'center',
    shadowColor: '#9C4A2E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 16,
    elevation: 8,
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});
