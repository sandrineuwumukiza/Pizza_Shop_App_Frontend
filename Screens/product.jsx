import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/cartReducer";

const ProductListScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://pizza-shop-app.onrender.com/products/productList');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchCartItems = async () => {
      try {
        const item = await AsyncStorage.getItem("CartItems");
        const cartItems = item ? JSON.parse(item) : [];
        setCartItems(cartItems);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchProducts();
    fetchCartItems();
  }, []);

  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };

  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Product List</Text>
      <View style={styles.productList}>
        {products.map((product) => (
          <View key={product._id} style={styles.productContainer}>
            <Image source={{ uri: product.image.url }} style={styles.productImage} />
            <Text style={styles.productName}>{product.productName}</Text>
            <Text style={styles.productPrice}>RWF {product.price}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
            <Text style={styles.productCategory}>Category: {product.category}</Text>
            <Pressable
              onPress={() => addItemToCart(product)}
              style={styles.addToCartButton}
            >
              {addedToCart ? (
                <View>
                  <Text>Added to Cart</Text>
                </View>
              ) : (
                <Text>Add to Cart</Text>
              )}
            </Pressable>
            <Pressable
              style={styles.buyNowButton}
            >
              <Text>Buy Now</Text>
            </Pressable>
          </View>
        ))}
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
  productList: {
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
  productCategory: {
    fontSize: 14,
    color: '#4caf50',
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: "#FFC72C",
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  buyNowButton: {
    backgroundColor: "#FFAC1C",
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 10,
  },
});

export default ProductListScreen;
