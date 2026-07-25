import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ShopRegistrationScreen from '../screens/Shop/ShopRegistrationScreen';
import AllShopsScreen from '../screens/Shop/AllShopsScreen';
import ShopDetailScreen from '../screens/Shop/ShopDetailScreen';
import ShopProfileScreen from '../screens/Shop/ShopProfileScreen';
import AddBikeScreen from '../screens/Bike/AddBikeScreen';
import MyBikesScreen from '../screens/Bike/MyBikesScreen';

const Stack = createStackNavigator();

const ShopStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="AllShops" component={AllShopsScreen} options={{ title: 'Shops' }} />
      <Stack.Screen name="ShopDetail" component={ShopDetailScreen} options={{ title: 'Shop Details' }} />
      <Stack.Screen name="ShopRegistration" component={ShopRegistrationScreen} options={{ title: 'Register Shop' }} />
      <Stack.Screen name="ShopProfile" component={ShopProfileScreen} options={{ title: 'My Shop' }} />
      <Stack.Screen name="AddBike" component={AddBikeScreen} options={{ title: 'Add Bike' }} />
      <Stack.Screen name="MyBikes" component={MyBikesScreen} options={{ title: 'My Bikes' }} />
    </Stack.Navigator>
  );
};

export default ShopStack;
