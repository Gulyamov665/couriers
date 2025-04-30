import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const HomeScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>🏠 Главная!</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});
