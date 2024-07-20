import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';

const CheckoutScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const item = await AsyncStorage.getItem("CartItems");
        const cartItems = item ? JSON.parse(item) : [];
        setCartItems(cartItems);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, product) => total + product.price, 0);
  };

  const handlePayment = async () => {
    try {
      const paymentUrl = 'https://sandbox-flw-web-v3.herokuapp.com/pay/vix48y0hjsqq';
      const redirectUrl = 'app://https://github.com/Flutterwave/React-Native?tab=readme-ov-file';

      const result = await WebBrowser.openAuthSessionAsync(paymentUrl, redirectUrl);

      if (result.type === 'success') {
        console.log('Payment successful:', result.url);
        navigation.navigate('HomeTabs', { screen: 'Home' });
      } else {
        console.log('Payment failed or was canceled');
      }
    } catch (error) {
      console.error('An error occurred during payment:', error);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      await AsyncStorage.removeItem("CartItems");
      setCartItems([]);
      Alert.alert('Success', 'Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      Alert.alert('Error', 'Failed to place order.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <View style={styles.cartList}>
        {cartItems.length === 0 ? (
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
        ) : (
          <>
            {cartItems.map(product => (
              <View key={product._id} style={styles.productContainer}>
                <Image source={{ uri: product.image.url }} style={styles.productImage} />
                <Text style={styles.productName}>{product.productName}</Text>
                <Text style={styles.productPrice}>RWF {product.price}</Text>
                <Text style={styles.productDescription}>{product.description}</Text>
              </View>
            ))}
            <Text style={styles.totalAmount}>Total Amount: RWF {calculateTotalAmount()}</Text>
            <TouchableOpacity
              style={styles.placeOrderButton}
              onPress={handlePayment}
            >
              <Text style={styles.placeOrderButtonText}>Pay</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    textAlign: 'center',
    backgroundColor: '#4caf50',
    color: '#fff',
  },
  cartList: {
    padding: 16,
  },
  productContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  productPrice: {
    fontSize: 16,
    color: '#888',
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 8,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
  placeOrderButton: {
    backgroundColor: '#2196f3',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 20,
  },
  placeOrderButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default CheckoutScreen;
