import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { decrementQuantity, incrementQuantity, removeFromCart } from "../Redux/cartReducer"; // Ensure this path is correct
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
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderColor: "#D8D8D8",
    borderWidth: 1,
  },
  increaseButton: {
    backgroundColor: "#D8D8D8",
    padding: 7,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  deleteItemButton: { backgroundColor: "#E7E7E7", padding: 10, borderRadius: 5 },
  cartItemActions: { flexDirection: "row", gap: 10, padding: 10 },
  saveForLaterButton: {
    backgroundColor: "#E7E7E7",
    padding: 10,
    borderRadius: 5,
  },
  seeMoreButton: { backgroundColor: "#E7E7E7", padding: 10, borderRadius: 5 },
});

export default CartScreen;
