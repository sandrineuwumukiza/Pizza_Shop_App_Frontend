import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const API_URL = 'https://pizza-shop-app.onrender.com/users/login';

  const login = async () => {
    if (!email || !password) {
      alert('Please fill in both Email and Password.');
      return;
    }
    else{
      alert("You are successfully logged in")
    }

    try {
      const response = await axios.post(API_URL, { email, password });
      await AsyncStorage.setItem('userToken', response.data.token);

      const role = response.data.role; // Adjust as per your API response structure

      if (role === 'admin') {
        navigation.navigate('AuthStack',{ screen: 'Admin'});
      } else {
        navigation.navigate('AuthStack', { screen: 'Checkout'}) ;
      }

    } catch (error) {
      if (error.response) {
        console.error('Server Error:', error.response.data);
        console.error('Status Code:', error.response.status);
        alert('Login Failed: Please check your credentials and try again.');
      } else if (error.request) {
        console.error('No Response Received:', error.request);
        alert('Network Error: Please check your internet connection.');
      } else {
        console.error('Error Message:', error.message);
        alert('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack('HomeScreen')}>
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
        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={styles.buttonText}>LogIn</Text>
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
  signup: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
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
