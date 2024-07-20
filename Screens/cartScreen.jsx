import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const [productInCart, setProductInCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigation = useNavigation();

  const GetCart = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('CartItems');
      setProductInCart(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GetCart();
  }, []);

  const removeItemInCart = async (productId) => {
    try {
      const jsonValue = await AsyncStorage.getItem('CartItems');
      let productList = jsonValue != null ? JSON.parse(jsonValue) : [];
      productList = productList.filter((item) => item._id !== productId);
      await AsyncStorage.setItem('CartItems', JSON.stringify(productList));
      GetCart();
    } catch (error) {
      console.error(error);
    }
  };

  const incrementProducts = async (productId) => {
    try {
      const jsonValue = await AsyncStorage.getItem('CartItems');
      let productList = jsonValue != null ? JSON.parse(jsonValue) : [];

      productList = productList.map((item) => {
        if (item._id === productId) {
          item.quantity = (item.quantity || 1) + 1;
        }
        return item;
      });

      await AsyncStorage.setItem('CartItems', JSON.stringify(productList));
      GetCart();
    } catch (error) {
      console.error(error);
    }
  };

  const decrementProduct = async (productId) => {
    try {
      const jsonValue = await AsyncStorage.getItem('CartItems');
      let productList = jsonValue != null ? JSON.parse(jsonValue) : [];

      productList = productList.map((item) => {
        if (item._id === productId) {
          item.quantity = (item.quantity || 1) - 1;
          if (item.quantity < 1) {
            removeItemInCart(productId);
            return null;
          }
        }
        return item;
      }).filter(item => item !== null);

      await AsyncStorage.setItem('CartItems', JSON.stringify(productList));
      GetCart();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const calculatedTotal = productInCart.reduce((ack, item) => ack + (item.quantity || 1) * item.price, 0);
    setTotal(calculatedTotal);
  }, [productInCart]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>MY CART</Text>
      <FlatList
        data={productInCart}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productContainer} key={item._id}>
            <Image source={{ uri: item.image.url }} style={styles.productImage} />
            <Text style={styles.productName}>{item.productName}</Text>
            <Text style={styles.productPrice}>RWF {item.price}</Text>
            <View style={styles.quantityControl}>
              <TouchableOpacity onPress={() => decrementProduct(item._id)} style={styles.buttons}>
              <Text>-</Text>
              </TouchableOpacity>
              <Text>{item.quantity || 1}</Text>
              <TouchableOpacity onPress={() => incrementProducts(item._id) } style={styles.buttons}><Text>+</Text></TouchableOpacity>
            </View>
             <Text>Amount: RWF {(item.quantity || 1) * item.price}</Text>
            <TouchableOpacity
              style={styles.removeToCartButton}
              onPress={() => removeItemInCart(item._id)}
            >
              <Text style={styles.removeToCartButtonText}>Remove Product From Cart</Text>
            </TouchableOpacity>
           
          </View>
        )}
      />
      <View style={styles.totalContainer}>
        <Text>Total Amount: RWF {total.toFixed(2)}</Text>
        <TouchableOpacity
              style={styles.removeToCartButton}
              onPress={() => navigation.navigate('MainStack', {screen: 'Checkout'})}
            >
              <Text style={styles.removeToCartButtonText}>Place Order</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.removeToCartButton}
              onPress={() => navigation.navigate('MainStack', {screen: 'Product'})}
            >
              <Text style={styles.removeToCartButtonText}>Explore More Product</Text>
            </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  cartItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#888',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  removeToCartButton: { backgroundColor: '#4caf50', padding: 10, marginTop: 10, borderRadius: 4, alignItems: 'center' },
  removeToCartButtonText: { color: '#fff', fontWeight: 'bold' },
  productContainer: { backgroundColor: '#fff', padding: 16, marginBottom: 16, borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 },
  productImage: { width: '100%', height: 200, borderRadius: 8 },
  productName: { fontSize: 18, fontWeight: 'bold', marginVertical: 8 },
  productPrice: { fontSize: 16, color: '#888' },
  productDescription: { fontSize: 14, color: '#666', marginVertical: 8 },
  productCategory: { fontSize: 14, color: '#4caf50', fontWeight: 'bold' },
  buttons: {backgroundColor: '#FDF0F3', padding: 10,alignItems: 'center', borderRadius: 2 }
});

export default CartScreen;
