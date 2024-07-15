import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ProductScreen = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  useEffect(() => {
    fetchProductList();
    fetchCartItems(); // Fetch cart items when component mounts
  }, []);

  const fetchProductList = async () => {
    try {
      const response = await fetch('https://pizza-shop-app.onrender.com/products/productList');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
      console.log('Product list:', data);
    } catch (error) {
      console.error('Error fetching product list:', error);
      // Handle error gracefully, e.g., show an alert or retry fetch
      Alert.alert('Error', 'Failed to fetch product list.');
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await fetch('https://pizza-shop-app.onrender.com/cart/viewCart');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCartItems(data.items); // Assuming cartItems is an array of items in viewCart response
      console.log('Cart items:', data.items);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      // Handle error gracefully, e.g., show an alert or retry fetch
      Alert.alert('Error', 'Failed to fetch cart items.');
    }
  };

  const handleAddToCart = async (id) => {
    try {
      const response = await fetch('https://pizza-shop-app.onrender.com/cart/addToCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log('Item added to cart:', result);
      fetchCartItems(); 
      Alert.alert('Success', 'Item added to cart successfully.');
    } catch (error) {
      console.error('Error adding item to cart:', error);
      Alert.alert('Error', 'Failed to add item to cart.');
    }
  };

  const windowWidth = Dimensions.get('window').width;

  const isInCart = (id) => {
    return cartItems.some(item => item.productId._id === id); // Assuming cartItems has productId field
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerIcons}>
          <Ionicons name="search-outline" size={24} color="#000" style={styles.icon} onPress={toggleSearch} />
          {searchVisible && (
            <TextInput
              style={styles.searchInput}
              placeholder="Search products..."
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
              onSubmitEditing={handleSearch}
            />
          )}
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
          <Ionicons name="cart-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.productContainer}>
        {products.map((product) => (
          <TouchableOpacity key={product._id} style={styles.productDetails}>
            {product.image && product.image.url ? (
              <Image source={{ uri: product.image.url }} style={styles.productImage} />
            ) : (
              <Text>No Image</Text>
            )}
            <Text style={styles.productTitle}>{product.productName}</Text>
            <Text style={styles.productCategory}>{product.category}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
            <Text style={styles.productPrice}>${product.price}</Text>
            <TouchableOpacity
              style={[styles.addButton, isInCart(product._id) && styles.disabledButton]}
              onPress={() => handleAddToCart(product._id)}
              disabled={isInCart(product._id)} // Disable button if product is already in cart
            >
              <Text style={styles.addButtonText}>{isInCart(product._id) ? 'In Cart' : 'Add To Cart'}</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 16,
  },
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 35,
  },
  productDetails: {
    width: 180,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  productImage: {
    height: 100,
    resizeMode: 'contain',
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  productCategory: {
    fontSize: 10,
    color: '#888',
  },
  productDescription: {
    fontSize: 10,
    color: '#666',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 8,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#aaa', // Adjust disabled button style as needed
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 8,
    marginRight: 16,
    width: 200,
  },
});

export default ProductScreen;






// // screens/OrderConfirmation.js
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const OrderConfirmation = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.message}>Thank you for your purchase!</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   message: {
//     fontSize: 24,
//   },
// });

// export default OrderConfirmation;
