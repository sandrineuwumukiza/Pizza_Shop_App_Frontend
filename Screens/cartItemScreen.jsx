import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, TextInput, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Cart = () => {
  const [productInCart, setProductInCart] = useState([]);
  const [itemNumber] = useState(1);
  const [Total, setTotal] = useState(0);
  const navigation = useNavigation();

  const GetCart = async () => {
    const item = await AsyncStorage.getItem("CartItemType");
    if (item) {
      setProductInCart(JSON.parse(item));
    }
  };

  useEffect(() => {
    GetCart();
  }, []);

  const removeItemInCart = async (ItemId) => {
    const item = await AsyncStorage.getItem("CartItemType");
    let ProductList = JSON.parse(item) || [];
    let productRemaining = ProductList.filter((item) => item.id !== ItemId);
    await AsyncStorage.setItem("CartItemType", JSON.stringify(productRemaining));
    GetCart();
  };

  const incrementProducts = async (ItemId) => {
    const item = await AsyncStorage.getItem("CartItemType");
    let ProductList = JSON.parse(item) || [];
    let getNewList = [];

    for (let item of ProductList) {
      if (item.id === ItemId) {
        item.count = (item.count || 1) + 1;
      }
      getNewList.push(item);
    }
    await AsyncStorage.setItem("CartItemType", JSON.stringify(getNewList));
    GetCart();
  };

  const decrementProduct = async (ItemId) => {
    const item = await AsyncStorage.getItem("CartItemType");
    let ProductList = JSON.parse(item) || [];
    let getNewList = [];

    for (let item of ProductList) {
      if (item.id === ItemId) {
        if ((item.count || 1) === 1) {
          removeItemInCart(ItemId);
          return;
        }
        item.count = (item.count || 1) - 1;
      }
      getNewList.push(item);
    }
    await AsyncStorage.setItem("CartItemType", JSON.stringify(getNewList));
    GetCart();
  };

  useEffect(() => {
    const calculatedTotal = productInCart.reduce((ack, item) => ack + (item.count || 1) * item.price, 0);
    setTotal(calculatedTotal);
  }, [productInCart]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.myCart}>
        <Text style={styles.heading}>MY CART</Text>
      </View>
      <View style={styles.displayInCart}>
        {productInCart.map((detail) => (
          <View style={styles.displayContainer} key={detail._id}>
            <View style={styles.cartContent1}>
              <Image source={{ uri: detail.image.url }} style={styles.productImage} />
            </View>
            <View style={styles.cartContent2}>
              <Text style={styles.productTitle}>{detail.title}</Text>
              <Text style={styles.productPrice}>${detail.price}</Text>
              <TextInput style={styles.quantityControl} value={String(detail.count || itemNumber)} editable={false} />
              <View style={styles.buttonContainer}>
                <Button title="-" onPress={() => decrementProduct(detail.id)} />
                <Button title="+" onPress={() => incrementProducts(detail.id)} />
                <Button title="Delete" onPress={() => removeItemInCart(detail.id)} />
              </View>
              <Text style={styles.amountText}>Amount: ${((detail.count || 1) * detail.price).toFixed(2)}</Text>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.deliveryDetails}>
        <Text style={styles.deliveryText}>Delivery</Text>
        <Button title="Express" />
        <Text style={styles.subTotal}>SubTotal: ${Total.toFixed(2)}</Text>
        <Button title="Proceed to Checkout" onPress={() => navigation.navigate('Checkout')} />
        <Button title="Continue Shopping" onPress={() => navigation.navigate('ProductList')} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'rgba(245, 245, 245, 0.769)',
  },
  myCart: {
    borderBottomWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    marginBottom: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  displayInCart: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  displayContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
    marginBottom: 10,
    paddingBottom: 10,
  },
  cartContent1: {
    marginRight: 10,
  },
  productImage: {
    width: 200,
    height: 200,
  },
  cartContent2: {
    flex: 1,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#888',
    marginVertical: 8,
  },
  quantityControl: {
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
    padding: 5,
    width: 40,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  deliveryDetails: {
    borderRadius: 10,
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  deliveryText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default Cart;
