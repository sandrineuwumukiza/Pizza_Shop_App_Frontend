// components/CartIconWithBadge.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CartContext from '../middleWare/cartContext';

const CartIconWithBadge = () => {
  const { cartItems } = useContext(CartContext);
  const itemCount = cartItems.reduce((count, item) => count + (item.count || 1), 0);

  return (
    <View style={styles.container}>
      <Ionicons name="cart-outline" size={28} color="#000" />
      {itemCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{itemCount}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -10,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default CartIconWithBadge;
