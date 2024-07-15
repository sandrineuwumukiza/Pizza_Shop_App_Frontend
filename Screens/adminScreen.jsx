import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';

const AddProduct = () => {
  const navigation = useNavigation();

  const [error, setError] = useState('');
  const [image, setImage] = useState(null);
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  const validateForm = () => {
    let newErrors = {};

    if (!image || !productName || !description || !price || !category) {
      newErrors.error = 'Please fill all fields';
    }

    if (isNaN(price) || Number(price) <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmitProduct = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post('https://pizza-shop-app.onrender.com/products/addProduct', {
        image,
        productName,
        description,
        price: Number(price),
        category,
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Product added successfully', [
          { text: 'OK', onPress: () => navigation.navigate('HomeTabNavigator', {screen: 'Product'}) },
        ]);

        setImage(null);
        setProductName('');
        setDescription('');
        setPrice('');
        setCategory('');
      } else {
        Alert.alert('Error', 'Failed to add product');
      }
    } catch (error) {
      console.error('Internal server error', error);
      Alert.alert('Error', 'Internal server error. Please try again later.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <View style={{ width: '100%' }}>
        <TouchableOpacity onPress={pickImage} style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }}>
          <Text>{image ? 'Change Image' : 'Choose Image'}</Text>
        </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={{ width: 100, height: 100, marginBottom: 10 }} />}
        <TextInput
          placeholder="Product Name"
          value={productName}
          onChangeText={(text) => setProductName(text)}
          style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }}
        />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
          style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }}
        />
        <TextInput
          placeholder="Price"
          value={price}
          onChangeText={(text) => setPrice(text)}
          keyboardType="numeric"
          style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }}
        />
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }}
        >
          <Picker.Item label="Select Category" value="" />
          <Picker.Item label="Food" value="Food" />
          <Picker.Item label="Fruits" value="Fruits" />
          <Picker.Item label="Alcohol" value="Alcohol" />
          <Picker.Item label="Juice" value="Juice" />
          <Picker.Item label="Soft drinks and Juice" value="Soft drinks and Juice" />
          <Picker.Item label="Coffee" value="Coffee" />
          <Picker.Item label="Wine" value="Wine" />
        </Picker>
        {error && <Text style={{ color: 'red' }}>{error}</Text>}
        <Pressable
          onPress={handleSubmitProduct}
          style={{
            backgroundColor: '#45AB49',
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text style={{ color: 'white', fontSize: 18 }}>Add Product</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AddProduct;
