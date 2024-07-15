 
// import { FlutterwaveInitV2 } from 'flutterwave-react-native'; 
import { closePaymentModal, useFlutterwave } from 'flutterwave-react-v3';
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native'; 

const UseComponents = () => {
  const fwConfig = {
    public_key: 'FLWPUBK_TEST-86ddb8b376c2a63e2f6f1495e2a8755c-X',
    tx_ref: `tx-${Date.now()}`,
    amount: 100,
    currency: 'RWF',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'user@gmail.com',
      phone_number: '070********',
      name: 'john doe',
    },
    customizations: {
      title: 'My store',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };
 
  const handlePayment = async () => {
    try {
      const response = await useFlutterwave(fwConfig);
      console.log(response);
      // closePaymentModal();
    } catch (error) {
      console.error(error);
    }
  };

  
  return (
    <View style={styles.container}>
      <Text>Hello Test user</Text>
      <Button title="Pay Now" onPress={handlePayment} />
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

export default UseComponents;
