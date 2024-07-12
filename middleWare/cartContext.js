// middleWare/cartContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = async () => {
    const item = await AsyncStorage.getItem("CartItemType");
    if (item) {
      setCartItems(JSON.parse(item));
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const addItemToCart = async (item) => {
    const updatedCart = [...cartItems, item];
    setCartItems(updatedCart);
    await AsyncStorage.setItem("CartItemType", JSON.stringify(updatedCart));
  };

  const removeItemFromCart = async (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    await AsyncStorage.setItem("CartItemType", JSON.stringify(updatedCart));
  };

  const incrementItem = async (itemId) => {
    const updatedCart = cartItems.map(item =>
      item.id === itemId ? { ...item, count: (item.count || 1) + 1 } : item
    );
    setCartItems(updatedCart);
    await AsyncStorage.setItem("CartItemType", JSON.stringify(updatedCart));
  };

  const decrementItem = async (itemId) => {
    const updatedCart = cartItems.map(item =>
      item.id === itemId ? { ...item, count: (item.count || 1) - 1 } : item
    ).filter(item => item.count > 0);
    setCartItems(updatedCart);
    await AsyncStorage.setItem("CartItemType", JSON.stringify(updatedCart));
  };

  return (
    <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart, incrementItem, decrementItem }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
