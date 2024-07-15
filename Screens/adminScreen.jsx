import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const AdminAddProductScreen = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);

  const handlePickImage = async () => {
    try {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });

      if (!pickerResult.cancelled) {
        setImage(pickerResult.uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const handleAddProduct = async () => {
    try {
      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('price', parseFloat(price));
      formData.append('description', description);
      formData.append('category', category);
      formData.append('image', {
        uri: image,
        type: 'image/*', // Accept any image type
        name: 'product_image',
      });

      const response = await fetch('https://pizza-shop-app.onrender.com/products/addProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          // Include any other headers as needed
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error adding product');
      }

      const data = await response.json();
      console.log('Product added:', data);
      Alert.alert('Success', 'Product added successfully');
      // Optionally, handle success message or navigation after adding product
    } catch (error) {
      console.error('Error adding product:', error);
      Alert.alert('Error', 'Failed to add product');
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
      <Button title="Pick Image" onPress={handlePickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
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

export default AdminAddProductScreen;
