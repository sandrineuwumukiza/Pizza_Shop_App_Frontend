import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from "react-redux";
import store from './store';
import SplashScreen from './Screens/splashScreen';
import SignUpScreen from './Screens/signUpScreen';
import HomeScreen from './Screens/homeScreen';
import CartScreen from './Screens/cartScreen';
import CheckoutScreen from './Screens/checkOutScreen';
import CategoryScreen from './Screens/categoryScreen';
import LoginScreen from './Screens/loginScreen';
import PaymentScreen from './Screens/paymentScreen';
import { CartProvider } from './middleWare/cartContext';
import CartIconWithBadge from './components/cartBridge';
import ProductScreen from './Screens/productScreen';
import Cart from './Screens/cartItemScreen';
import AdminAddProductScreen from './Screens/adminScreen';
import ProfileScreen from './Screens/profileScreen';
import { AuthProvider, AuthContext } from './components/authContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabNavigator() {
  const { isLoggedIn } = React.useContext(AuthContext);

  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />, 
          headerShown: false 
        }} 
      />
      <Tab.Screen 
        name="Cart" 
        component={CartScreen} 
        options={{ 
          tabBarIcon: ({ color, size }) => <CartIconWithBadge />, 
          headerShown: false 
        }} 
      />
      <Tab.Screen 
        name="Product" 
        component={ProductScreen} 
        options={{ 
          tabBarIcon: ({ color, size }) => <Ionicons name="wallet" color={color} size={size} />, 
          headerShown: false 
        }} 
      />
      {isLoggedIn ? (
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{ 
            tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} />, 
            headerShown: false 
          }} 
        />
      ) : (
        <Tab.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ 
            tabBarIcon: ({ color, size }) => <Ionicons name="log-in" color={color} size={size} />, 
            headerShown: false 
          }} 
        />
      )}
    </Tab.Navigator>
  );
}

function MainStack() {
  const { user } = React.useContext(AuthContext);

  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeTabs" component={HomeTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Category" component={CategoryScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Product" component={ProductScreen} options={{ headerShown: false }} />
      {user?.role === 'admin' && (
        <Stack.Screen name="Admin" component={AdminAddProductScreen} options={{ headerShown: false }} />
      )}
      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function App() {
  const { isLoggedIn } = React.useContext(AuthContext);

  return (
    <Provider store={store}>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {isLoggedIn ? (
              <Stack.Screen name="MainStack" component={MainStack} options={{ headerShown: false }} />
            ) : (
              <>
                <Stack.Screen name="HomeTabs" component={HomeTabNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="AuthStack" component={AuthStack} options={{ headerShown: false }} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </Provider>
  );
}

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
