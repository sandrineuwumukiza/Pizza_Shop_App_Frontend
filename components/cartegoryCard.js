// components/CategoryCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const CategoryCard = ({ title, imageSource, navigation }) => {
  
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('MainStack', {
        screen: 'Category',
        params: { category: title }
      })}
    >
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 100,
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    textAlign: 'center',
    padding: 10,
  },
});

export default CategoryCard;
