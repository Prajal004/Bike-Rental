import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

const Loader = ({ message = 'Loading...', fullScreen = true }) => {
  return (
    <View style={[styles.container, fullScreen && styles.fullScreen]}>
      <ActivityIndicator size="large" color="#E63946" />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  fullScreen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  message: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
});

export default Loader;
