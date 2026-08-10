import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import HomeScreen from '../screens/Home/HomeScreen';
import OrderHistoryScreen from '../screens/Order/OrderHistoryScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import SOSScreen from '../screens/SOS/SOSScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#999',
        tabBarLabelStyle: { fontSize: 10, fontWeight: '500' },
        tabBarStyle: { height: 60, paddingBottom: 8, paddingTop: 4 },
        tabBarIcon: ({ focused, color }) => {
          const icons = {
            Home: focused ? '🏠' : '🏠',
            Orders: focused ? '📋' : '📋',
            SOS: focused ? '🆘' : '🆘',
            Profile: focused ? '👤' : '👤',
          };
          return <Text style={{ fontSize: 20 }}>{icons[route.name]}</Text>;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Orders" component={OrderHistoryScreen} />
      <Tab.Screen name="SOS" component={SOSScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
