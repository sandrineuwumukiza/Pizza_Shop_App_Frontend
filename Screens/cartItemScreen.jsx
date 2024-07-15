import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import React from "react";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {decrementQuantity,incrementQuantity,removeFromCart,} from "../Redux/cartReducer"; // Ensure this path is correct
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleIncreaseQuantity = (item) => {
    dispatch(incrementQuantity(item));
  };

  const handleDecreaseQuantity = (item) => {
    dispatch(decrementQuantity(item));
  };

  const handleDeleteItem = (item) => {
    dispatch(removeFromCart(item));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <Pressable style={styles.searchBox}>
          <AntDesign style={styles.searchIcon} name="search1" size={22} color="black" />
          <TextInput placeholder="Search Amazon.in" style={styles.searchInput} />
        </Pressable>
        <Feather name="mic" size={24} color="black" />
      </View>

      <View style={styles.subtotalContainer}>
        <Text style={styles.subtotalText}>Subtotal: </Text>
        <Text style={styles.subtotalAmount}>{total}</Text>
      </View>
      <Text style={styles.emiDetails}>EMI details Available</Text>

      <Pressable
        onPress={() => navigation.navigate("Confirm")}
        style={styles.proceedButton}
      >
        <Text>Proceed to Buy ({cart.length}) items</Text>
      </Pressable>

      <Text style={styles.divider} />

      <View style={styles.cartItemsContainer}>
        {cart?.map((item, index) => (
          <View style={styles.cartItem} key={index}>
            <Pressable style={styles.cartItemPressable}>
              <View>
                <Image
                  style={styles.cartItemImage}
                  source={{ uri: item?.image }}
                />
              </View>

              <View>
                <Text numberOfLines={3} style={styles.cartItemTitle}>
                  {item?.title}
                </Text>
                <Text style={styles.cartItemPrice}>{item?.price}</Text>
                <Image
                  style={styles.cartItemPrimeImage}
                  source={{
                    uri: "https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png",
                  }}
                />
                <Text style={styles.inStock}>In Stock</Text>
              </View>
            </Pressable>

            <View style={styles.quantityControl}>
              {item?.quantity > 1 ? (
                <Pressable
                  onPress={() => handleDecreaseQuantity(item)}
                  style={styles.decreaseButton}
                >
                  <AntDesign name="minus" size={24} color="black" />
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => handleDeleteItem(item)}
                  style={styles.deleteButton}
                >
                  <AntDesign name="delete" size={24} color="black" />
                </Pressable>
              )}

              <Pressable style={styles.quantityDisplay}>
                <Text>{item?.quantity}</Text>
              </Pressable>

              <Pressable
                onPress={() => handleIncreaseQuantity(item)}
                style={styles.increaseButton}
              >
                <Feather name="plus" size={24} color="black" />
              </Pressable>
            </View>

            <Pressable
              onPress={() => handleDeleteItem(item)}
              style={styles.deleteItemButton}
            >
              <Text>Delete</Text>
            </Pressable>

            <View style={styles.cartItemActions}>
              <Pressable style={styles.saveForLaterButton}>
                <Text>Save For Later</Text>
              </Pressable>

              <Pressable style={styles.seeMoreButton}>
                <Text>See More Like this</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: { marginTop: 55, flex: 1, backgroundColor: "white" },
  searchContainer: {
    backgroundColor: "#00CED1",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 7,
    gap: 10,
    backgroundColor: "white",
    borderRadius: 3,
    height: 38,
    flex: 1,
  },
  searchIcon: { paddingLeft: 10 },
  searchInput: { flex: 1 },
  subtotalContainer: { padding: 10, flexDirection: "row", alignItems: "center" },
  subtotalText: { fontSize: 18, fontWeight: "400" },
  subtotalAmount: { fontSize: 20, fontWeight: "bold" },
  emiDetails: { marginHorizontal: 10 },
  proceedButton: {
    backgroundColor: "#FFC72C",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
  },
  divider: {
    height: 1,
    borderColor: "#D0D0D0",
    borderWidth: 1,
    marginTop: 16,
  },
  cartItemsContainer: { marginHorizontal: 10 },
  cartItem: {
    backgroundColor: "white",
    marginVertical: 10,
    borderBottomColor: "#F0F0F0",
    borderWidth: 2,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  cartItemPressable: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cartItemImage: { width: 140, height: 140, resizeMode: "contain" },
  cartItemTitle: { width: 150, marginTop: 10 },
  cartItemPrice: { fontSize: 20, fontWeight: "bold", marginTop: 6 },
  cartItemPrimeImage: { width: 30, height: 30, resizeMode: "contain" },
  inStock: { color: "green" },
  quantityControl: {
    marginTop: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  decreaseButton: {
    backgroundColor: "#D8D8D8",
    padding: 7,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  deleteButton: {
    backgroundColor: "#D8D8D8",
    padding: 7,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  quantityDisplay: {
    backgroundColor: "white",
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
  increaseButton: {
    backgroundColor: "#D8D8D8",
    padding: 7,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  deleteItemButton: {
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: "#C0C0C0",
    borderWidth: 0.6,
  },
  cartItemActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
  },
  saveForLaterButton: {
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: "#C0C0C0",
    borderWidth: 0.6,
  },
  seeMoreButton: {
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: "#C0C0C0",
    borderWidth: 0.6,
  },
});




// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, Button, StyleSheet, TextInput, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

// const Cart = () => {
//   const [productInCart, setProductInCart] = useState([]);
//   const [itemNumber] = useState(1);
//   const [Total, setTotal] = useState(0);
//   const navigation = useNavigation();

//   const GetCart = async () => {
//     const item = await AsyncStorage.getItem("CartItemType");
//     if (item) {
//       setProductInCart(JSON.parse(item));
//     }
//   };

//   useEffect(() => {
//     GetCart();
//   }, []);

//   const removeItemInCart = async (ItemId) => {
//     const item = await AsyncStorage.getItem("CartItemType");
//     let ProductList = JSON.parse(item) || [];
//     let productRemaining = ProductList.filter((item) => item.id !== ItemId);
//     await AsyncStorage.setItem("CartItemType", JSON.stringify(productRemaining));
//     GetCart();
//   };

//   const incrementProducts = async (ItemId) => {
//     const item = await AsyncStorage.getItem("CartItemType");
//     let ProductList = JSON.parse(item) || [];
//     let getNewList = [];

//     for (let item of ProductList) {
//       if (item.id === ItemId) {
//         item.count = (item.count || 1) + 1;
//       }
//       getNewList.push(item);
//     }
//     await AsyncStorage.setItem("CartItemType", JSON.stringify(getNewList));
//     GetCart();
//   };

//   const decrementProduct = async (ItemId) => {
//     const item = await AsyncStorage.getItem("CartItemType");
//     let ProductList = JSON.parse(item) || [];
//     let getNewList = [];

//     for (let item of ProductList) {
//       if (item.id === ItemId) {
//         if ((item.count || 1) === 1) {
//           removeItemInCart(ItemId);
//           return;
//         }
//         item.count = (item.count || 1) - 1;
//       }
//       getNewList.push(item);
//     }
//     await AsyncStorage.setItem("CartItemType", JSON.stringify(getNewList));
//     GetCart();
//   };

//   useEffect(() => {
//     const calculatedTotal = productInCart.reduce((ack, item) => ack + (item.count || 1) * item.price, 0);
//     setTotal(calculatedTotal);
//   }, [productInCart]);

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.myCart}>
//         <Text style={styles.heading}>MY CART</Text>
//       </View>
//       <View style={styles.displayInCart}>
//         {productInCart.map((detail) => (
//           <View style={styles.displayContainer} key={detail._id}>
//             <View style={styles.cartContent1}>
//               <Image source={{ uri: detail.image.url }} style={styles.productImage} />
//             </View>
//             <View style={styles.cartContent2}>
//               <Text style={styles.productTitle}>{detail.title}</Text>
//               <Text style={styles.productPrice}>${detail.price}</Text>
//               <TextInput style={styles.quantityControl} value={String(detail.count || itemNumber)} editable={false} />
//               <View style={styles.buttonContainer}>
//                 <Button title="-" onPress={() => decrementProduct(detail.id)} />
//                 <Button title="+" onPress={() => incrementProducts(detail.id)} />
//                 <Button title="Delete" onPress={() => removeItemInCart(detail.id)} />
//               </View>
//               <Text style={styles.amountText}>Amount: ${((detail.count || 1) * detail.price).toFixed(2)}</Text>
//             </View>
//           </View>
//         ))}
//       </View>
//       <View style={styles.deliveryDetails}>
//         <Text style={styles.deliveryText}>Delivery</Text>
//         <Button title="Express" />
//         <Text style={styles.subTotal}>SubTotal: ${Total.toFixed(2)}</Text>
//         <Button title="Proceed to Checkout" onPress={() => navigation.navigate('Checkout')} />
//         <Button title="Continue Shopping" onPress={() => navigation.navigate('ProductList')} />
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: 'rgba(245, 245, 245, 0.769)',
//   },
//   myCart: {
//     borderBottomWidth: 1,
//     borderColor: '#000',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   displayInCart: {
//     borderWidth: 1,
//     borderColor: '#000',
//     borderRadius: 10,
//     padding: 10,
//     backgroundColor: 'white',
//     marginBottom: 20,
//   },
//   displayContainer: {
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderColor: '#000',
//     marginBottom: 10,
//     paddingBottom: 10,
//   },
//   cartContent1: {
//     marginRight: 10,
//   },
//   productImage: {
//     width: 200,
//     height: 200,
//   },
//   cartContent2: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   productTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   productPrice: {
//     fontSize: 16,
//     color: '#888',
//     marginVertical: 8,
//   },
//   quantityControl: {
//     borderWidth: 1,
//     borderColor: '#000',
//     textAlign: 'center',
//     padding: 5,
//     width: 40,
//     marginBottom: 8,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   amountText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   deliveryDetails: {
//     borderRadius: 10,
//     padding: 20,
//     backgroundColor: 'white',
//     alignItems: 'center',
//   },
//   deliveryText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   subTotal: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginVertical: 10,
//   },
// });

// export default Cart;
