import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useFlutterwave } from 'flutterwave-react-v3';
import { WebView } from 'expo-web-browser'

// Define generateTransactionRef before using it
const generateTransactionRef = (length) => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return `flw_tx_ref_${result}`;
};

const UseComponents = () => {
  const handleOnRedirect = (data) => {
    console.log(data); // Handle WebView redirect here if needed
  };

  // Now, generateTransactionRef is defined before it's used here
  const handlePayment = useFlutterwave({
    tx_ref: generateTransactionRef(10),
    authorization: 'FLWPUBK_TEST-86ddb8b376c2a63e2f6f1495e2a8755c-X',
    customer: {
      email: 'customer-email@example.com',
    },
    amount: 2000,
    currency: 'RWF',
    payment_options: 'mobilemoney',
    redirect_url: '', // Add your redirect URL here if needed
    callback: (response) => {
      console.log(response); // Handle payment response here
    },
    onclose: () => {},
    customizations: {
      title: 'My Payment Title',
      description: 'Payment for items in cart',
      logo: 'https://www.example.com/logo.png',
    },
  });

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://github.com/Flutterwave/React-Native?tab=readme-ov-file' }} // Replace with your WebView source
        style={{ flex: 1, width: '100%' }} // Adjust styles as needed
        onNavigationStateChange={(navState) => {
          handleOnRedirect(navState); // Handle WebView navigation state changes
        }}
      />
      <View style={styles.paymentButtonContainer}>
        <Text>Hello Test user</Text>
        <Button title="Pay Now" onPress={handlePayment} />
      </View>
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
  paymentButtonContainer: {
    marginTop: 20,
  },
});

export default UseComponents;
