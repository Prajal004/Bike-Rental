import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';

import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import ShopStack from './ShopStack';
import AdminStack from './AdminStack';

import BikeDetailScreen from '../screens/MotorbikeDetail/BikeDetailScreen';
import LocationScreen from '../screens/LocationSelect/LocationScreen';
import OrderSummaryScreen from '../screens/OrderSummary/OrderSummaryScreen';
import PaymentScreen from '../screens/Payment/PaymentScreen';
import ConfirmationScreen from '../screens/OrderConfirmation/ConfirmationScreen';
import SOSScreen from '../screens/SOS/SOSScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { user, isAuthenticated } = useAuth();
  
  const userRole = user?.role || 'customer';
  const isShopOwner = userRole === 'shop_owner';
  const isAdmin = userRole === 'admin';

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <>
            <Stack.Screen name="Main" component={TabNavigator} />
            
            <Stack.Screen 
              name="BikeDetail" 
              component={BikeDetailScreen}
              options={{ headerShown: true, headerTitle: 'Bike Details' }}
            />
            <Stack.Screen 
              name="LocationSelect" 
              component={LocationScreen}
              options={{ headerShown: true, headerTitle: 'Select Location' }}
            />
            <Stack.Screen 
              name="OrderSummary" 
              component={OrderSummaryScreen}
              options={{ headerShown: true, headerTitle: 'Order Summary' }}
            />
            <Stack.Screen 
              name="Payment" 
              component={PaymentScreen}
              options={{ headerShown: true, headerTitle: 'Payment' }}
            />
            <Stack.Screen 
              name="Confirmation" 
              component={ConfirmationScreen}
              options={{ headerShown: true, headerTitle: 'Order Confirmed' }}
            />
            <Stack.Screen 
              name="SOS" 
              component={SOSScreen}
              options={{ headerShown: true, headerTitle: 'Emergency SOS' }}
            />

            {isShopOwner && (
              <Stack.Screen 
                name="Shop" 
                component={ShopStack}
                options={{ headerShown: false }}
              />
            )}

            {isAdmin && (
              <Stack.Screen 
                name="Admin" 
                component={AdminStack}
                options={{ headerShown: false }}
              />
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
