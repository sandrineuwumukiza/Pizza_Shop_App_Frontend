import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';


const AddProductForm = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleAddProduct = async () => {
    try {
      const response = await fetch('https://pizza-shop-app.onrender.com/products/addProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName,
          price: parseFloat(price),
          description,
          category,
          // Add other fields as needed, such as image URL from Cloudinary
          // Make sure to handle image upload and obtain the URL before sending the request
        }),
      });
      const data = await response.json();
      console.log('Product added:', data);
      // Optionally, handle success message or navigation after adding product
    } catch (error) {
      console.error('Error adding product:', error);
      // Handle error scenario
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <Button title="Add Product" onPress={handleAddProduct} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default AddProductForm;
