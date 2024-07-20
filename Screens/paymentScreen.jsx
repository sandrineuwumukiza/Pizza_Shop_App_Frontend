import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useNavigation } from '@react-navigation/native';

const PaymentScreen = () => {
  const navigation = useNavigation();

  const handlePayment = async () => {
    try {
      const paymentUrl = 'https://sandbox-flw-web-v3.herokuapp.com/pay/vix48y0hjsqq';
      const redirectUrl = 'app://https://github.com/Flutterwave/React-Native?tab=readme-ov-file';

      
      const result = await WebBrowser.openAuthSessionAsync(paymentUrl, redirectUrl);

      if (result.type === 'success') {
        
        console.log('Payment successful:', result.url);
       
        navigation.navigate('HomeTabs', {screen: 'Home'});
      } else {
        console.log('Payment failed or was canceled');
      }
    } catch (error) {
      console.error('An error occurred during payment:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Payment Screen</Text>
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

export default PaymentScreen;
