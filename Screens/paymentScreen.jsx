import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const PaymentScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment</Text>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>Big Mac: $6.30</Text>
        <Text style={styles.summaryText}>Double McSpicy: $7.50</Text>
        <Text style={styles.totalText}>Total: $13.80</Text>
      </View>
      <Button title="Pay with PayPal" onPress={() => alert('Payment successful!')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  summary: {
    marginVertical: 16,
  },
  summaryText: {
    fontSize: 18,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentScreen;
