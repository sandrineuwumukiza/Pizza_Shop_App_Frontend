import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { CommonActions } from '@react-navigation/native';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role to 'user'

  const signUp = async () => {
    try {
      const payload = { name, email, password, role };
      console.log("Sending payload:", payload);

      const response = await axios.post('https://pizza-shop-app.onrender.com/users/registerUser', payload);
      if (response.status === 201 || response.status === 200) { // Handle both 201 and 200 status codes
        Alert.alert('Registration Successful', 'You have successfully registered!');
        if (role === 'admin') {
          navigation.dispatch(
            CommonActions.navigate({
              name: 'AuthStack',
              params: {
                screen: 'Admin' // Replace 'LoginScreen' with your actual screen name
              }
            })
          );
        } else {
          navigation.dispatch(
            CommonActions.navigate({
              name: 'AuthStack',
              params: {
                screen: 'Checkout' 
              }
            })
          );
        }
      } else {
        console.error(`Unexpected response status: ${response.status}`);
        Alert.alert('Registration Failed', `Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
      if (error.response) {
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
        Alert.alert('Registration Failed', error.response.data.message || 'An error occurred');
      } else if (error.request) {
        console.error('Error request:', error.request);
        Alert.alert('Registration Failed', 'No response received from server.');
      } else {
        console.error('Error message:', error.message);
        Alert.alert('Registration Failed', error.message);
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
        <Text style={styles.welcomeText}>Create an Account</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />
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
        <Picker
          selectedValue={role}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setRole(itemValue)}
        >
          <Picker.Item label="user" value="user" />
          <Picker.Item label="admin" value="admin" />
        </Picker>
        <TouchableOpacity style={styles.button} onPress={signUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
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
  picker: {
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
});

export default SignUpScreen;
