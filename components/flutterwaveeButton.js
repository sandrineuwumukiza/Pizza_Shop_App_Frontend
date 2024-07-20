import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FlutterWaveInit } from 'flutterwave-react-v3';

const FlutterWaveButton = (props) => {
  const { text, callback, onClose, ...config } = props;

  const handlePress = () => {
    FlutterWaveInit(config)
      .then((response) => callback(response))
      .catch((error) => console.error(error));
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ff7f50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default FlutterWaveButton;
