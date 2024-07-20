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
