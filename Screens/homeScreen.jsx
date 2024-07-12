import React, { useRef, useEffect } from 'react';
import { View, Text, Animated, ScrollView, StyleSheet, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CategoryCard from '../components/cartegoryCard';
import ProductCard from '../components/productCard';
import { Images } from '../constants/images';

const { width } = Dimensions.get('window');

const images = [
  Images.Frie,
  Images.Fried,
  Images.Win,
  Images.Fries,
  Images.Chips,
];

const HomeScreen = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const interval = useRef(null);

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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerIcons}>
          <Ionicons name="search-outline" size={24} color="#000" style={styles.icon} />  
        </View>
        <View>
          <Text style={styles.location}>Current location</Text>
          <Text style={styles.locationDetail}>Kigali, Rwanda</Text>
        </View>
        <View style={styles.headerIcons}>
          <Ionicons name="notifications-outline" size={24} color="#000" />
        </View>
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
            <TouchableOpacity style={styles.orderButton}>
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
      <View style={{marginLeft: 10,flex:1}}>
      <Text style={{color: 'white', justifyContent: 'center',alignItems: 'center'}}>CATEGORIES</Text>
      </View>
      <View style={styles.categories}>
        
        <CategoryCard title="Wine" imageSource={Images.Alcohol} />
        <CategoryCard title="Chicken" imageSource={Images.Fries} />
        <CategoryCard title="CockTail" imageSource={Images.Pizza} />
        <CategoryCard title="Burger" imageSource={Images.Fried} />
        <CategoryCard title="Pizza" imageSource={Images.Pizza} />
        <CategoryCard title="Coffee" imageSource={Images.Chips} />
        <CategoryCard title="Salad" imageSource={Images.Fries} />
      </View>
      <Text style={styles.featuredTitle}>Featured</Text>
      <View style={styles.featured}>
        <ProductCard title="McDonald - Kartasura" distance="1.2 km" time="15-20 minutes" rating="4.8" />
        <ProductCard title="Fore Coffee - Paragon" distance="1.2 km" time="15-20 minutes" rating="4.8" />
        <ProductCard title="McDonald - Kartasura" distance="1.2 km" time="15-20 minutes" rating="4.8" />
        <ProductCard title="Fore Coffee - Paragon" distance="1.2 km" time="15-20 minutes" rating="4.8" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    top: 15,
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
  bannerScroll: {
    marginVertical: 16,
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
  bannerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    marginVertical: 16,
    gap: 8,
  },
  featuredTitle: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  featured: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 4,
  },
});

export default HomeScreen;
