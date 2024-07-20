
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../components/authContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please fill in both Email and Password.');
      return;
    }

    try {
      const response = await axios.post('https://pizza-shop-app.onrender.com/users/login', { email, password });

      if (response.status === 200) {
        const { token, user } = response.data;

        if (token && user) {
          await AsyncStorage.setItem('userToken', token);
          await AsyncStorage.setItem('userData', JSON.stringify(user));
          Alert.alert('Login Successful', 'You are successfully logged in.');
          login();
          navigation.navigate('HomeTabs');
        } else {
          Alert.alert('Login Failed', 'Unexpected response data.');
        }
      } else {
        Alert.alert('Login Failed', `Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.msg === 'User already exists') {
          Alert.alert('Login Failed', 'User already exists. Please try logging in.');
        } else {
          Alert.alert('Login Failed', error.response.data.message || 'An error occurred');
        }
      } else if (error.request) {
        Alert.alert('Login Failed', 'Network Error: Please check your internet connection.');
      } else {
        Alert.alert('Login Failed', error.message);
      }

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

    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.welcomeText}>Welcome!{'\n'}Please log in to continue.</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <View style={styles.signup}>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
            <Text style={styles.linkText}>Forgot password?</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.linkText}>
              Don't have an account?{' '}
              <TouchableOpacity onPress={() => navigation.navigate('AuthStack', { screen: 'SignUp' })}>
                <Text style={styles.signupText}>Sign Up</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </View>
    </View>

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

    justifyContent: 'center',
    padding: 20,
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  innerContainer: {
    top: 10,
    flex: 1,
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 24,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    color: '#000',
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  linkText: {
    textAlign: 'center',
    marginBottom: 10,
  },
  signupText: {
    color: '#4CAF50',
  },
});

export default LoginScreen;

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

