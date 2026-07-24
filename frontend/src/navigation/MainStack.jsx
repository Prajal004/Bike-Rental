import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import BikeDetailScreen from '../screens/MotorbikeDetail/BikeDetailScreen';
import LocationScreen from '../screens/LocationSelect/LocationScreen';
import LocationPickerScreen from '../screens/LocationSelect/LocationPickerScreen';
import PaymentScreen from '../screens/Payment/PaymentScreen';
import ConfirmationScreen from '../screens/OrderConfirmation/ConfirmationScreen';
import ChatScreen from '../screens/Chat/ChatScreen';
import OrderSummaryScreen from '../screens/OrderSummary/OrderSummaryScreen';
import OrderDetailScreen from '../screens/OrderDetail/OrderDetailScreen';
import SOSScreen from '../screens/SOS/SOSScreen';
import VerifyDocumentsScreen from '../screens/VerifyDocuments/VerifyDocumentsScreen';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
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
    </Stack.Navigator>
  );
}
