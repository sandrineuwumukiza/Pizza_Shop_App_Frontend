import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const CategoryCard = ({ title, imageSource }) => {
  return (
    <TouchableOpacity style={styles.container}>
        <Image source={imageSource} style={styles.image} />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
    width:110,
    borderRadius:8,
    height:150,
    paddingTop: 3,
    // padding: 16,
    // borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  image: {
    width: 104,
    // borderRadius:10,
    height: 94,
    marginBottom: 8,
    resizeMode: 'contain', 
    borderRadius: 10
  },
  text: {
    fontSize: 14,
  },
});

export default CategoryCard;
