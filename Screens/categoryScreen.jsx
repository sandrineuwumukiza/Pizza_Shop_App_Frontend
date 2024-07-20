// screens/CategoryScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import axios from 'axios';
import ProductCard from '../components/productCard';

const CategoryScreen = ({ route }) => {
  const { category } = route.params; // Retrieve category from params
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products based on category
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://pizza-shop-app.onrender.com/products/category/${category}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Products not found:', error);
      }
    };

    fetchProducts();
  }, [category]);
  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Category: {category}</Text>
      <View style={{}}>
      {products.map((product) => (
          <View style={styles.cardContainer} key={product._id}>
            <ProductCard product={product} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 4,
  }
});

export default CategoryScreen;
