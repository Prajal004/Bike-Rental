import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AdminDashboardScreen from '../screens/Admin/AdminDashboardScreen';
import VerifyShopsScreen from '../screens/Admin/VerifyShopsScreen';
import VerifyBikesScreen from '../screens/Admin/VerifyBikesScreen';

const Stack = createStackNavigator();

const AdminStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} options={{ title: 'Admin Dashboard' }} />
      <Stack.Screen name="VerifyShops" component={VerifyShopsScreen} options={{ title: 'Verify Shops' }} />
      <Stack.Screen name="VerifyBikes" component={VerifyBikesScreen} options={{ title: 'Verify Bikes' }} />
    </Stack.Navigator>
  );
};

export default AdminStack;
