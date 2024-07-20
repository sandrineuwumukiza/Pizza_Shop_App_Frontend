import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }
    };

    loadUserData();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('https://pizza-shop-app.onrender.com/users/login', {
        email,
        password,
      });

      if (response.data.token) {
        const token = response.data.token;
        setToken(token);
        await AsyncStorage.setItem('token', token);

        const user = { email }; // Example: You can set other user details here
        setUser(user);
        await AsyncStorage.setItem('user', JSON.stringify(user));
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Failed to login:', error.response ? error.response.data : error.message);
    }
  };

  const register = async (name, email, password, role) => {
    try {
      const response = await axios.post('https://pizza-shop-app.onrender.com/users/registerUser', {
        name,
        email,
        password,
        role,
      });

      if (response.data.token) {
        const token = response.data.token;
        setToken(token);
        await AsyncStorage.setItem('token', token);

        const user = { name, email, role }; // Example: You can set other user details here
        setUser(user);
        await AsyncStorage.setItem('user', JSON.stringify(user));
      } else {
        throw new Error(response.data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Failed to register:', error.response ? error.response.data : error.message);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      setToken(null);
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Failed to logout:', error.response ? error.response.data : error.message);
    }
  };

  const isLoggedIn = token !== null;

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, register, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};
