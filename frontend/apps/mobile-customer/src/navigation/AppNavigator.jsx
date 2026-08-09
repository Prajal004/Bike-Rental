import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';

import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';

// Screens
import BikeDetailScreen from '../screens/Home/BikeDetailScreen';
import BookingScreen from '../screens/Booking/BookingScreen';
import PaymentScreen from '../screens/Payment/PaymentScreen';
import OrderDetailScreen from '../screens/Order/OrderDetailScreen';
import SOSScreen from '../screens/SOS/SOSScreen';
import ReferralScreen from '../screens/Referral/ReferralScreen';
import ShopRegistrationScreen from '../screens/Shop/ShopRegistrationScreen';
import ShopProfileScreen from '../screens/Shop/ShopProfileScreen';
import VerifyDocumentsScreen from '../screens/VerifyDocuments/VerifyDocumentsScreen';
import NotificationsScreen from '../screens/Notifications/NotificationsScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <>
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen name="BikeDetail" component={BikeDetailScreen} options={{ headerShown: true, title: 'Bike Details' }} />
          <Stack.Screen name="Booking" component={BookingScreen} options={{ headerShown: true, title: 'Booking' }} />
          <Stack.Screen name="Payment" component={PaymentScreen} options={{ headerShown: true, title: 'Payment' }} />
          <Stack.Screen name="OrderDetail" component={OrderDetailScreen} options={{ headerShown: true, title: 'Order Details' }} />
          <Stack.Screen name="SOS" component={SOSScreen} options={{ headerShown: true, title: 'SOS' }} />
          <Stack.Screen name="Referral" component={ReferralScreen} options={{ headerShown: true, title: 'Referral' }} />
          <Stack.Screen name="ShopRegistration" component={ShopRegistrationScreen} options={{ headerShown: true, title: 'Register Shop' }} />
          <Stack.Screen name="ShopProfile" component={ShopProfileScreen} options={{ headerShown: true, title: 'My Shop' }} />
          <Stack.Screen name="VerifyDocuments" component={VerifyDocumentsScreen} options={{ headerShown: true, title: 'Verify Documents' }} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ headerShown: true, title: 'Notifications' }} />
        </>
      )}
    </Stack.Navigator>
  );
}
