import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CustomerDetailsScreen from '../screens/CustomerDetailsScreen';
import ShopProfileScreen from '../screens/ShopProfileScreen';
import AddBikeScreen from '../screens/AddBikeScreen';
import MyBikesScreen from '../screens/MyBikesScreen';

const Stack = createStackNavigator();

const ShopStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="ShopProfile" component={ShopProfileScreen} options={{ title: 'My Shop' }} />
      <Stack.Screen name="CustomerDetails" component={CustomerDetailsScreen} options={{ title: 'Customer Details' }} />
      <Stack.Screen name="AddBike" component={AddBikeScreen} options={{ title: 'Add Bike' }} />
      <Stack.Screen name="MyBikes" component={MyBikesScreen} options={{ title: 'My Bikes' }} />
    </Stack.Navigator>
  );
};

export default ShopStack;
