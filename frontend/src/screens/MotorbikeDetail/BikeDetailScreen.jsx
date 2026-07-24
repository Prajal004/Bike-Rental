import React, { useState, useMemo } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Dimensions
} from 'react-native';
import { COLORS, FONTS } from '../../styles/theme';
import Button from '../../components/common/Button';
import BikeIcon from '../../components/motorbike/BikeIcon';
import { ADDONS } from '../../constants/addons';

const { width } = Dimensions.get('window');

export default function BikeDetailScreen({ navigation, route }) {
  const bike = route.params?.bike || { name: 'Honda Beat', price: 280, rating: 4.6 };
  const [selectedAddons, setSelectedAddons] = useState(['helmet']);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const addonsTotal = useMemo(
    () => selectedAddons.reduce((sum, id) => sum + (ADDONS.find(a => a.id === id)?.price || 0), 0),
    [selectedAddons]
  );
  const totalPrice = bike.price + addonsTotal;

  const toggleAddon = (id) => {
    setSelectedAddons(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.back}>←</Text></TouchableOpacity>
        <Text style={styles.topbarTitle}>Detail</Text>
      </View>

      <ScrollView>
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
          <View style={styles.titleRow}>
            <Text style={styles.name}>{bike.name} 2018</Text>
            <View style={styles.availPill}><Text style={styles.availText}>● Available today</Text></View>
          </View>
          <Text style={styles.ratingRow}>★ {bike.rating} · 150 reviews · Rental prajal</Text>

          <Text style={styles.sectionLabel}>SPECIFICATIONS</Text>
          <View style={styles.specGrid}>
            {[['110cc', 'Engine'], ['2018', 'Year'], ['Auto', 'Transmission'], ['Petrol', 'Fuel']].map(([v, l]) => (
              <View key={l} style={styles.specItem}>
                <Text style={styles.specValue}>{v}</Text>
                <Text style={styles.specLabel}>{l}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionLabel}>ADD-ONS</Text>
          {ADDONS.map((addon) => {
            const selected = selectedAddons.includes(addon.id);
            return (
              <TouchableOpacity key={addon.id} style={[styles.addonRow, selected && styles.addonSelected]} onPress={() => toggleAddon(addon.id)}>
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
          <TouchableOpacity><Text style={styles.link}>See reviews ›</Text></TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.stickyBottom}>
        <View>
          <Text style={styles.priceBig}>Rs {totalPrice}<Text style={styles.priceSuffix}> total price</Text></Text>
          {addonsTotal > 0 && <Text style={styles.priceBreakdown}>Rs {bike.price} + Rs {addonsTotal} add-ons</Text>}
        </View>
        <Button label="Order now" variant="brick" onPress={() => navigation.navigate('LocationSelect', { bike, addons: selectedAddons, totalPrice })} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.stone },
  topbar: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: COLORS.pine, paddingHorizontal: 18, paddingTop: 50, paddingBottom: 14 },
  back: { fontSize: 20, color: '#fff' },
  topbarTitle: { fontSize: 16, fontWeight: '600', color: '#fff' },
  galleryPage: { height: 220, backgroundColor: '#EFE9DB', alignItems: 'center', justifyContent: 'center' },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 5, marginTop: -18, marginBottom: 8 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#c9c2ae' },
  dotOn: { backgroundColor: COLORS.pine },
  body: { padding: 20 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 21, fontWeight: '700', color: COLORS.ink },
  availPill: { backgroundColor: '#DFEADD', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  availText: { fontSize: 10, fontWeight: '600', color: COLORS.pine },
  ratingRow: { fontSize: 12, color: COLORS.inkSoft, marginTop: 4, marginBottom: 18 },
  sectionLabel: { fontSize: 11, fontWeight: '600', color: COLORS.inkSoft, letterSpacing: 0.5, marginBottom: 10 },
  specGrid: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  specItem: { flex: 1, backgroundColor: COLORS.stone, borderRadius: 12, paddingVertical: 12, alignItems: 'center' },
  specValue: { fontSize: 13, fontWeight: '700', color: COLORS.ink },
  specLabel: { fontSize: 9.5, color: COLORS.inkSoft, marginTop: 2 },
  addonRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 13, borderWidth: 1.5, borderColor: COLORS.line, borderRadius: 12, marginBottom: 8, backgroundColor: COLORS.paper },
  addonSelected: { borderColor: COLORS.pine, backgroundColor: '#EEF3EC' },
  addonLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  addonIcon: { fontSize: 17 },
  addonName: { fontSize: 13.5, fontWeight: '600', color: COLORS.ink },
  addonRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  addonPrice: { fontSize: 12, color: COLORS.inkSoft },
  checkbox: { width: 20, height: 20, borderRadius: 6, borderWidth: 1.5, borderColor: COLORS.line, alignItems: 'center', justifyContent: 'center' },
  checkboxOn: { backgroundColor: COLORS.pine, borderColor: COLORS.pine },
  checkMark: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  prepared: { fontSize: 12, color: COLORS.inkSoft, marginTop: 14, marginBottom: 12 },
  link: { fontSize: 13, fontWeight: '700', color: COLORS.pine },
  stickyBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 18, backgroundColor: COLORS.paper, borderTopWidth: 1, borderTopColor: COLORS.line },
  priceBig: { fontSize: 19, fontWeight: '700', color: COLORS.ink },
  priceSuffix: { fontSize: 10.5, color: COLORS.inkSoft },
  priceBreakdown: { fontSize: 10.5, color: COLORS.inkSoft, marginTop: 2 },
});