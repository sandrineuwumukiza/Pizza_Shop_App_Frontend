import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Retrieve token from AsyncStorage
        const token = await AsyncStorage.getItem('token');

        if (!token) {
          setError('No token found');
          return;
        }

        // Make the API request with the token in the Authorization header
        const response = await axios.get('https://pizza-shop-app.onrender.com/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Set user data
        setUser(response.data);
      } catch (error) {
        // Handle errors
        console.error('Failed to fetch profile:', error.response ? error.response.data : error.message);
        setError(error.response ? error.response.data.msg : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View>
        <Text>No user data available</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Name: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Role: {user.role}</Text>
      {/* Display other profile information as needed */}
    </View>
  );
};

export default ProfileScreen;
