import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const MOCK_NOTIFICATIONS = [
  { id: '1', title: 'Booking Confirmed', message: 'Your booking for Honda CB Shine is confirmed.', date: '2 min ago' },
  { id: '2', title: 'Payment Successful', message: 'Payment of Rs 350 received.', date: '1 hour ago' },
];

export default function NotificationsScreen() {
  const [notifications] = useState(MOCK_NOTIFICATIONS);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.date}>{item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <FlatList data={notifications} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12 },
  title: { fontSize: 16, fontWeight: 'bold' },
  message: { fontSize: 14, color: '#666', marginTop: 4 },
  date: { fontSize: 12, color: '#999', marginTop: 4 },
});
