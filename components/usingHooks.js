import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

const UsingHooks = () => {
  const config = {
    public_key: 'FLWPUBK_TEST-86ddb8b376c2a63e2f6f1495e2a8755c-X', // Replace with your actual public key
    tx_ref: `tx-${Date.now()}`, // Generate unique transaction reference
    amount: 100,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'user@gmail.com',
      phone_number: '070********',
      name: 'John Doe',
    },
    customizations: {
      title: 'My Payment Title',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handlePayment = () => {
    handleFlutterPayment({
      callback: (response) => {
        console.log(response); // Handle response
        closePaymentModal(); // Close the payment modal
      },
      onClose: () => {
        // Handle modal close
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text>Hello Test user</Text>
      <Button
        title="Payment with React hooks"
        onPress={handlePayment}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default UsingHooks;
