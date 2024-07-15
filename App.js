import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from './Screens/splashScreen';
import SignUpScreen from './Screens/signUpScreen';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './Screens/homeScreen';
import CartScreen from './Screens/cartScreen';
import CheckoutScreen from './Screens/checkOutScreen';
import LoginScreen from './Screens/loginScreen';
import PaymentScreen from './Screens/paymentScreen';
import { CartProvider } from './middleWare/cartContext';
import CartIconWithBadge from './components/cartBridge';
import ProductScreen from './Screens/productScreen';
import Cart from './Screens/cartItemScreen';
import AdminAddProductScreen from './Screens/adminScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabNavigator() {
  return (
    <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />, headerShown: false }} />
    <Tab.Screen name="Cart" component={CartScreen} options={{ tabBarIcon: ({ color, size }) => <CartIconWithBadge />, headerShown: false }} />
    <Tab.Screen name="Payment" component={PaymentScreen} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="wallet" color={color} size={size} />, headerShown: false }} />
    <Tab.Screen name="Product" component={ProductScreen} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="wallet" color={color} size={size} />, headerShown: false }} />
    {/* <Tab.Screen name="Admin" component={AdminAddProductScreen} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="wallet" color={color} size={size} />, headerShown: false }} /> */}
  </Tab.Navigator>
  );
}

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeTabs" component={HomeTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Payment" component={PaymentScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Product" component={ProductScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Admin" component={AdminAddProductScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ headerShown: false }} />
      
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
      {/* <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} options={{ headerShown: false }} /> */}
    </Stack.Navigator>
  );
}

function App() {
  return (
    <CartProvider>
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="HomeTabs" component={HomeTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="AuthStack" component={AuthStack} options={{ headerShown: false }} />
      {/* <Stack.Screen name="Product" component={ProductScreen} options={{ headerShown: false }} /> */}
    </Stack.Navigator>
    </NavigationContainer>
    </CartProvider>
  );
}

export default App;
