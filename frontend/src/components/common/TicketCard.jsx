import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../styles/colors';

export default function TicketCard({ top, bottom, style }) {
  return (
    <View style={[styles.ticket, style]}>
      <View style={styles.top}>{top}</View>
      <View style={styles.tear} />
      <View style={styles.bottom}>{bottom}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  ticket: {
    backgroundColor: COLORS.paper,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.line,
    position: 'relative',
  },
  top: { padding: 16 },
  tear: {
    borderTopWidth: 1.5,
    borderTopColor: COLORS.line,
    borderStyle: 'dashed',
    marginHorizontal: 18,
  },
  bottom: { padding: 16 },
});
