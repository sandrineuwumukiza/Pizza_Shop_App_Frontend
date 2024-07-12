import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, TextInput, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CartContext from '../middleWare/cartContext';
import { Images } from '../constants/images';

const CartScreen = () => {
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
    let productRemaining = ProductList.filter((item) => item._id !== ItemId);
    await AsyncStorage.setItem("CartItemType", JSON.stringify(productRemaining));
    GetCart();
  };

  const incrementProducts = async (ItemId) => {
    const item = await AsyncStorage.getItem("CartItemType");
    let ProductList = JSON.parse(item) || [];
    let getNewList = [];

    for (let item of ProductList) {
      if (item._id === ItemId) {
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
      if (item._id === ItemId) {
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
       <View style={styles.header}>
        <View style={styles.headerIcons}>
          <Ionicons name="search-outline" size={24} color="#000" style={styles.icon} />  
        </View>
        <View>
          <Text style={styles.location}>Shopping Cart</Text>
        </View>
        <View style={styles.headerIcons}>
          <Ionicons name="cart-outline" size={28} color="#000" />
          <View style={styles.myCart}><Text style={{alignSelf:'center'}}>0</Text></View>
        </View>
      </View>
      <View style={styles.displayInCart}>
        {productInCart.map((detail) => (
          <View style={styles.displayContainer} key={detail._id}>
            <View style={styles.cartContent1}>
              {/* <Image source={Images.Fried} style={styles.productImage} /> */}
              <Image source={{ uri: detail.image.url }} style={styles.productImage} />
            </View>
            <View style={styles.cartContent2}>
              <Text style={styles.productTitle}>{detail.productName}</Text>
              <Text style={styles.productPrice}>${detail.price}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.smallButton} onPress={() => decrementProduct(detail._id)}>
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <TextInput style={styles.quantityControl} value={String(detail.count || itemNumber)} editable={false} />
                <TouchableOpacity style={styles.smallButton} onPress={() => incrementProducts(detail._id)}>
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallButton} onPress={() => removeItemInCart(detail._id)}>
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.amountText}>Amount: ${((detail.count || 1) * detail.price).toFixed(2)}</Text>
            </View>
          </View>
        ))}
        <View style={styles.deliveryDetails}>
        <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('AuthStack', {screen: 'CheckoutScreen',})}>
          <Text style={styles.buttonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.enjoyButton} onPress={() => navigation.navigate('HomeTabNavigator', {screen: 'ProductScreen',})}>
          <Text style={styles.buttonText}>Enjoy Our Food</Text>
        </TouchableOpacity>
      </View>
      </View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop:20,
    padding: 10,
    backgroundColor: 'rgba(245, 245, 245, 0.769)',
  },
  myCart: {
    // borderBottomWidth: 1,
    // borderColor: '#000',
    // alignItems: 'center',
    marginLeft: 16,
    position:'absolute',
    borderRadius:100,
    width:20,
    height:20,
    backgroundColor:'red'
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
  location: {
    fontSize: 14,
    color: '#888',
  },
  locationDetail: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  displayInCart: {
    // borderWidth: 1,
    // borderColor: '#000',
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  displayContainer: {
    flexDirection: 'row',
    backgroundColor:'gray',
    gap:8,
    // borderBottomWidth: 1,
    // borderColor: '#000',
    marginBottom: 10,
    paddingBottom: 10,
  },
  cartContent1: {
    marginRight: 10,
  },
  productImage: {
    width: 100,
    height: 100,
  },
  cartContent2: {
    flex: 1,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 16,
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
    alignItems: 'center', 
    marginBottom: 8,
  },
  smallButton: {
    backgroundColor: '#DDDDDD',
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
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
  checkoutButton: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  enjoyButton: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
});

export default CartScreen;
// import React, { useState, useEffect, useContext } from 'react';
// import { View, Text, Image, Button, StyleSheet, TextInput, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import CartIconWithBadge from '../components/cartBridge';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import CartContext from '../middleWare/cartContext';
// import { Images } from '../constants/images';

// const CartScreen = () => {
//   const { cartItems, addToCart, removeFromCart, incrementItem, decrementItem } = useContext(CartContext);
//   const [Total, setTotal] = useState(0);
//   const navigation = useNavigation();

//   useEffect(() => {
//     const calculatedTotal = cartItems.reduce((ack, item) => ack + (item.count || 1) * item.price, 0);
//     setTotal(calculatedTotal);
//   }, [cartItems]);

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//        <View style={styles.header}>
//         <View style={styles.headerIcons}>
//           <Ionicons name="search-outline" size={24} color="#000" style={styles.icon} />  
//         </View>
//         <View>
//           <Text style={styles.location}>Shopping Cart</Text>
//         </View>
//         <CartIconWithBadge />
//         {/* <View style={styles.headerIcons}>
//           <Ionicons name="cart-outline" size={28} color="#000" />
//           <View style={styles.myCart}><Text style={{ alignSelf: 'center' }}>{cartItems.length}</Text></View>
//         </View> */}
//       </View>
//       <View style={styles.displayInCart}>
//       {cartItems.map((detail) => (
//           <View style={styles.displayContainer} key={detail.id}>
//             <View style={styles.cartContent1}>
//               <Image source={Images.Fried} style={styles.productImage} />
//               {/* <Image source={{ uri: detail.image }} style={styles.productImage} /> */}
//             </View>
//             <View style={styles.cartContent2}>
//               <Text style={styles.productTitle}>{detail.title}</Text>
//               <Text style={styles.productPrice}>${detail.price}</Text>
//               <View style={styles.buttonContainer}>
//                 <TouchableOpacity style={styles.smallButton} onPress={() => decrementItem(detail.id)}>
//                   <Text style={styles.buttonText}>-</Text>
//                 </TouchableOpacity>
//                 <TextInput style={styles.quantityControl} value={String(detail.count || 1)} editable={false} />
//                 <TouchableOpacity style={styles.smallButton} onPress={() => incrementItem(detail.id)}>
//                   <Text style={styles.buttonText}>+</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.smallButton} onPress={() => removeFromCart(detail.id)}>
//                   <Text style={styles.buttonText}>Delete</Text>
//                 </TouchableOpacity>
//               </View>
//               <Text style={styles.amountText}>Amount: ${((detail.count || 1) * detail.price).toFixed(2)}</Text>
//             </View>
//           </View>
//         ))}

//         <View style={styles.deliveryDetails}>
//         <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('Checkout')}>
//           <Text style={styles.buttonText}>Proceed to Checkout</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.enjoyButton} onPress={() => navigation.navigate('ProductScreen')}>
//           <Text style={styles.buttonText}>Enjoy Our Food</Text>
//         </TouchableOpacity>
//       </View>
//       </View>
      
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingTop:20,
//     padding: 10,
//     backgroundColor: 'rgba(245, 245, 245, 0.769)',
//   },
//   myCart: {
//     // borderBottomWidth: 1,
//     // borderColor: '#000',
//     // alignItems: 'center',
//     marginLeft: 16,
//     position:'absolute',
//     borderRadius:100,
//     width:20,
//     height:20,
//     backgroundColor:'red'
//   },
//   header: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     backgroundColor: '#f8f8f8',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   headerIcons: {
//     flexDirection: 'row',
//   },
//   icon: {
//     marginRight: 16,
//   },
//   location: {
//     fontSize: 14,
//     color: '#888',
//   },
//   locationDetail: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   displayInCart: {
//     // borderWidth: 1,
//     // borderColor: '#000',
//     borderRadius: 10,
//     padding: 10,
//     backgroundColor: 'white',
//     marginBottom: 20,
//   },
//   displayContainer: {
//     flexDirection: 'row',
//     backgroundColor:'gray',
//     gap:8,
//     // borderBottomWidth: 1,
//     // borderColor: '#000',
//     marginBottom: 10,
//     paddingBottom: 10,
//   },
//   cartContent1: {
//     marginRight: 10,
//   },
//   productImage: {
//     width: 100,
//     height: 100,
//   },
//   cartContent2: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   productTitle: {
//     fontSize: 16,
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
//     alignItems: 'center', 
//     marginBottom: 8,
//   },
//   smallButton: {
//     backgroundColor: '#DDDDDD',
//     padding: 8,
//     borderRadius: 5,
//     marginHorizontal: 5,
//   },
//   buttonText: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#333',
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
//   checkoutButton: {
//     backgroundColor: '#4caf50',
//     padding: 15,
//     borderRadius: 10,
//     marginVertical: 10,
//     width: '80%',
//     alignItems: 'center',
//   },
//   enjoyButton: {
//     backgroundColor: '#4caf50',
//     padding: 15,
//     borderRadius: 10,
//     marginVertical: 10,
//     width: '80%',
//     alignItems: 'center',
//   },
// });

// export default CartScreen;
