import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = ({ navigation }) => {
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

  const handleRemoveFromCart = async (productId) => {
    try {
      const updatedCartItems = cartItems.filter(item => item._id !== productId);
      setCartItems(updatedCartItems);
      await AsyncStorage.setItem("CartItems", JSON.stringify(updatedCartItems));
      Alert.alert('Success', 'Product removed from cart!');
    } catch (error) {
      console.error('Error removing product from cart:', error);
      Alert.alert('Error', 'Failed to remove product from cart.');
    }
  };

  const handleCheckout = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        navigation.navigate('AuthStack', { screen: 'Checkout' });
      } else {
        navigation.navigate('HomeTabs', { screen: 'Login' });
      }
    } catch (error) {
      console.error('Error retrieving user token:', error);
      // Handle error as needed
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      <View style={styles.cartList}>
        {cartItems.length === 0 ? (
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
        ) : (
          cartItems.map(product => (
            <View key={product._id} style={styles.productContainer}>
              <Image source={{ uri: product.image.url }} style={styles.productImage} />
              <Text style={styles.productName}>{product.productName}</Text>
              <Text style={styles.productPrice}>RWF {product.price}</Text>
              <Text style={styles.productDescription}>{product.description}</Text>
              <TouchableOpacity
                style={styles.removeFromCartButton}
                onPress={() => handleRemoveFromCart(product._id)}
              >
                <Text style={styles.removeFromCartButtonText}>Remove from Cart</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
        {cartItems.length > 0 && (
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={handleCheckout}
          >
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
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
  removeFromCartButton: {
    backgroundColor: '#ff5722',
    padding: 10,
    marginTop: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  removeFromCartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  checkoutButton: {
    backgroundColor: '#2196f3',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 20,
  },
  checkoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

});

export default CartScreen;
