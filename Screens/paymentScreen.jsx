// PaymentScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import axios from 'axios';

const PaymentScreen = () => {
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        'https://api.flutterwave.com/v3/charges?type=mobile_bank_transfer',
        {
          amount: amount,
          currency: 'RWF',
          payment_method: 'mobilemoney',
          tx_ref: `tx-${Date.now()}`,
          redirect_url: 'https://www.pexels.com/search/vegetables/',
          customer: {
            email: email,
            name: name,
            phone_number: phone,
          },
          customizations: {
            title: 'Pizza shop app',
            description: 'Shop app',
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`, 
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response.data);

      
    } catch (error) {
      console.error('Payment Error:', error.message);
   
    }
  };

  return (
    <View style={styles.container}>
      <Text>Enter Payment Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
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
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
});

export default PaymentScreen;
