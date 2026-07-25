import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';

// ✅ Customer Screens
import BikeDetailScreen from '../screens/MotorbikeDetail/BikeDetailScreen';
import LocationScreen from '../screens/LocationSelect/LocationScreen';
import LocationPickerScreen from '../screens/LocationSelect/LocationPickerScreen';
import OrderSummaryScreen from '../screens/OrderSummary/OrderSummaryScreen';
import PaymentScreen from '../screens/Payment/PaymentScreen';
import ConfirmationScreen from '../screens/OrderConfirmation/ConfirmationScreen';
import OrderDetailScreen from '../screens/OrderDetail/OrderDetailScreen';
import ChatScreen from '../screens/Chat/ChatScreen';
import SOSScreen from '../screens/SOS/SOSScreen';
import VerifyDocumentsScreen from '../screens/VerifyDocuments/VerifyDocumentsScreen';

// ✅ Shop Owner Screens
import ShopRegistrationScreen from '../screens/Shop/ShopRegistrationScreen';
import ShopProfileScreen from '../screens/Shop/ShopProfileScreen';
import AllShopsScreen from '../screens/Shop/AllShopsScreen';
import ShopDetailScreen from '../screens/Shop/ShopDetailScreen';
import AddBikeScreen from '../screens/Bike/AddBikeScreen';
import MyBikesScreen from '../screens/Bike/MyBikesScreen';

// ✅ Admin Screens
import AdminDashboardScreen from '../screens/Admin/AdminDashboardScreen';
import VerifyShopsScreen from '../screens/Admin/VerifyShopsScreen';
import VerifyBikesScreen from '../screens/Admin/VerifyBikesScreen';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Tabs */}
      <Stack.Screen name="Tabs" component={TabNavigator} />
      
      {/* ===== CUSTOMER SCREENS ===== */}
      <Stack.Screen name="MotorbikeDetail" component={BikeDetailScreen} />
      <Stack.Screen name="LocationSelect" component={LocationScreen} />
      <Stack.Screen name="LocationPicker" component={LocationPickerScreen} />
      <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="OrderConfirmation" component={ConfirmationScreen} />
      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="SOS" component={SOSScreen} />
      <Stack.Screen name="VerifyDocuments" component={VerifyDocumentsScreen} />

      {/* ===== SHOP OWNER SCREENS ===== */}
      <Stack.Screen name="ShopRegistration" component={ShopRegistrationScreen} />
      <Stack.Screen name="ShopProfile" component={ShopProfileScreen} />
      <Stack.Screen name="AllShops" component={AllShopsScreen} />
      <Stack.Screen name="ShopDetail" component={ShopDetailScreen} />
      <Stack.Screen name="AddBike" component={AddBikeScreen} />
      <Stack.Screen name="MyBikes" component={MyBikesScreen} />

      {/* ===== ADMIN SCREENS ===== */}
      <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
      <Stack.Screen name="VerifyShops" component={VerifyShopsScreen} />
      <Stack.Screen name="VerifyBikes" component={VerifyBikesScreen} />
    </Stack.Navigator>
  );
}
