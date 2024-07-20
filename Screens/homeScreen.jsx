import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Animated, ScrollView, StyleSheet, ImageBackground, TouchableOpacity, Dimensions, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CategoryCard from '../components/cartegoryCard';
import ProductCard from '../components/productCard'
import { Images } from '../constants/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width } = Dimensions.get('window');

const images = [
  Images.Frie,
  Images.Fried,
  Images.Win,
  Images.Fries,
  Images.Chips,
];

const categories = [
  { title: 'Wine', imageSource: Images.Alcohol },
  { title: 'Alcohol', imageSource: Images.Alcohols },
  // { title: 'Juice', imageSource: Images.Juice },
  { title: 'Fruits', imageSource: Images.Fruits },
  { title: 'Soft drinks and Juice', imageSource: Images.Juice },
  { title: 'Coffee', imageSource: Images.Coffee },
  { title: 'Food', imageSource: Images.Fries },
];

const HomeScreen = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const interval = useRef(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let currentIndex = 0;
    interval.current = setInterval(() => {
      currentIndex += 1;
      if (currentIndex >= images.length) {
        currentIndex = 0;
      }
      scrollViewRef.current.scrollTo({ x: currentIndex * width, animated: true });
    }, 1000);

    return () => clearInterval(interval.current);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://pizza-shop-app.onrender.com/products/productList');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.location}>Current location</Text>
          <Text style={styles.locationDetail}>Kigali, Rwanda</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('AuthStack', { screen: 'Login' })}>
          <Ionicons name="person-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ paddingTop: 80 }}>
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name="search-outline" size={24} color="#000" style={styles.icon} />
          </View>
          <TextInput style={styles.textInput} placeholder='Search' />
        </View>
        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          style={styles.bannerScroll}
        >
          {images.map((image, index) => (
            <ImageBackground key={index} source={image} style={styles.banner}>
              <TouchableOpacity style={styles.orderButton} onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={styles.orderButtonText}>Order now</Text>
              </TouchableOpacity>
            </ImageBackground>
          ))}
        </Animated.ScrollView>
        <View style={styles.indicatorContainer}>
          {images.map((_, index) => {
            const opacity = scrollX.interpolate({
              inputRange: [
                (index - 1) * width,
                index * width,
                (index + 1) * width
              ],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp'
            });
            return (
              <Animated.View
                key={index}
                style={[styles.indicator, { opacity }]}
              />
            );
          })}
        </View>
        <View style={styles.categoriesContainer}>
          <Text style={styles.categoriesTitle}>CATEGORIES</Text>
          <View style={styles.categories}>
            {categories.map((category, index) => (
              <CategoryCard key={index} title={category.title} imageSource={category.imageSource} navigation={navigation}/>
            ))}
          </View>
        </View>
        <Text style={styles.featuredTitle}>Featured Products</Text>
        <View style={styles.featured}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF0F3',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  location: {
    fontSize: 14,
    color: '#888',
  },
  locationDetail: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bannerScroll: {
    marginTop: 10,
  },
  banner: {
    width: width - 32,
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: '#4caf50',
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 250,
  },
  orderButton: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 4,
  },
  orderButtonText: {
    color: '#4caf50',
    fontWeight: 'bold',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  indicator: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#4caf50',
    marginHorizontal: 4,
  },
  categoriesContainer: {
    marginHorizontal: 16,
  },
  categoriesTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  featuredTitle: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    // paddingHorizontal: 16,
    padding: 25,
    marginBottom: 8,
  },
  featured: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 4,
    marginTop: 20,
  },
  inputContainer: {
    backgroundColor: 'white',
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    margin: 20,
  },
  iconContainer: {
    marginHorizontal: 15
  },
  textInput: {
    flex: 1,
  }
});

export default HomeScreen;
