export default {
  expo: {
    // Existing plugins and configurations
    plugins: ['expo-image-picker'],

    // Add deep linking configuration
    scheme: 'app', 

    // Android configuration
    android: {
      package: 'com.example.ecommerce',
    },

    // iOS configuration
    ios: {
      bundleIdentifier: 'com.example.ecommerce',
    },
  },
};
