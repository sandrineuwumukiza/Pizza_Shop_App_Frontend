// screens/OrderConfirmation.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrderConfirmation = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>Thank you for your purchase!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 24,
  },
});

export default OrderConfirmation;
