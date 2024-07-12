import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Images } from '../constants/images';

const ProductScreen = () => {
  const [datas, setDatas] = useState([]);
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
    fetch('https://pizza-shop-app.onrender.com/products/productList') 
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Oops, we haven't got JSON!");
        }
        return res.json();
      })
      .then((data) => {
        setDatas(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  

  const handleAddToCart = async (cartItem) => {
    try {
      const item = await AsyncStorage.getItem("CartItemType");
      let productList = item ? JSON.parse(item) : [];
      let checkForDuplicate = productList.filter(
        (item) => item.id === cartItem.id
      );
      if (checkForDuplicate.length < 1) {
        productList.push(cartItem);
      }
      await AsyncStorage.setItem("CartItemType", JSON.stringify(productList));
      console.log(productList, cartItem);
    } catch (error) {
      console.error(error);
    }
  };

  const windowWidth = Dimensions.get('window').width;

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
        <View style={styles.headerIcons}>
          <Ionicons name="cart-outline" size={24} color="#000" />
        </View>
      </View>
      <View style={styles.productContainer}>
        {datas.map((detail) => (
          <TouchableOpacity key={detail._id} style={styles.productDetails} >
             {detail.image && detail.image.url ? (
          <Image source={{ uri: detail.image.url }} style={styles.image} onError={(error) => console.log("Image load error:", error)} />
        ) : (
          <Text>No Image</Text>
        )}
            <Text style={styles.productTitle}>{detail.productName}</Text>
            <Text style={styles.productCategory}>{detail.category}</Text>
            <Text style={styles.productCategory}>{detail.description}</Text>
            <Text style={styles.productPrice}>${detail.price}</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(detail)}>
              <Text style={styles.addButtonText}>Add To Cart</Text>
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
  headingProduct: {
    alignItems: 'center',
    marginBottom: 16,
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'flex-end',
    marginBottom: -20,
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
    fontSize: 10,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  productCategory: {
    fontSize: 7,
    color: '#888',
  },
  productDescription: {
    fontSize: 5,
    color: '#666',
  },
  productPrice: {
    fontSize: 18,
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
  '@media screen and (min-width:200px) and (max-width:500px)': {
    productContainer: {
      flexDirection: 'column',
      padding: 0,
    },
    headingProduct: {
      marginLeft: 20,
    },
    headingText: {
      fontSize: 16,
    },
    buttonContainer: {
      marginTop: 2,
    },
  },
  '@media screen and (min-width:501px) and (max-width:1000px)': {
    productContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
  },
});

export default ProductScreen;
