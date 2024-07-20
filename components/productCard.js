import React, { useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductCard = ({ product }) => {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = async (product) => {
    try {
      const item = await AsyncStorage.getItem('CartItems');
      let cartItems = item ? JSON.parse(item) : [];
      
      const checkForDuplicate = cartItems.find(item => item._id === product._id);

      if (!checkForDuplicate) {
        const newProduct = {
          ...product,
          quantity: 1,
        };
        cartItems.push(newProduct);
        await AsyncStorage.setItem('CartItems', JSON.stringify(cartItems));
        setCartItems(cartItems);
        Alert.alert('Success', 'Product added to cart!');
      } else {
        Alert.alert('Info', 'Product already in cart.');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      Alert.alert('Error', 'Failed to add product to cart.');
    }
  };
  return (
    <TouchableOpacity style={styles.container} onPress={product.onPress}>
      <View style={styles.detailContainer}>
        {product.image && product.image.url ? (
          <Image source={{ uri: product.image.url }} style={styles.image} />
        ) : (
          <Text>No Image</Text>
        )}
        <View style={styles.details}>
          <Text style={styles.title}>{product.productName}</Text>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Text style={styles.price}>RWF {product.price}</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(product)}>
            <Text style={styles.addButtonText}>Add To Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  detailContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  details: {
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  description: {
    fontSize: 10,
    color: '#666',
    marginBottom: 5,
    textAlign: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default ProductCard;
