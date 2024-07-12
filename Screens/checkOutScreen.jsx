// // screens/CheckoutScreen.js
// import React, { useState } from 'react';
// import { View, Text, Button, StyleSheet, Alert } from 'react-native';
// import { CardField, useStripe } from '@stripe/stripe-react-native';
// import { useNavigation } from '@react-navigation/native';

// const CheckoutScreen = () => {
//   const [email, setEmail] = useState('');
//   const [amount, setAmount] = useState(''); // Assuming you're passing the amount to be paid
//   const { confirmPayment } = useStripe();
//   const navigation = useNavigation();

//   const handlePayment = async () => {
//     try {
//       // Create a PaymentIntent on your backend and retrieve the client secret
//       const response = await fetch('https://your-backend-url/create-payment-intent', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ amount, currency: 'usd' }), // Adjust the currency as needed
//       });
//       const { clientSecret } = await response.json();

//       const { error, paymentIntent } = await confirmPayment(clientSecret, {
//         type: 'Card',
//         billingDetails: { email },
//       });

//       if (error) {
//         Alert.alert('Payment failed', error.message);
//       } else if (paymentIntent) {
//         Alert.alert('Payment Successful', 'Your payment was processed successfully.');
//         navigation.navigate('OrderConfirmation'); // Navigate to a confirmation screen
//       }
//     } catch (error) {
//       Alert.alert('Payment Error', 'An error occurred while processing the payment.');
//       console.error(error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Checkout</Text>
//       <CardField
//         postalCodeEnabled={true}
//         placeholders={{
//           number: '4242 4242 4242 4242',
//         }}
//         cardStyle={styles.card}
//         style={styles.cardContainer}
//         onCardChange={(cardDetails) => {
//           console.log('cardDetails', cardDetails);
//         }}
//       />
//       <Button title="Pay Now" onPress={handlePayment} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   card: {
//     backgroundColor: '#FFFFFF',
//     textColor: '#000000',
//   },
//   cardContainer: {
//     height: 50,
//     marginVertical: 30,
//   },
// });

// export default CheckoutScreen;
