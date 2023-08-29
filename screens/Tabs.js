import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons'
import Home from './Home';
import SearchScreen from './SearchScreen';
import { COLORS } from '../constants/index';
import Login from './Login';
import Profile from './Profile';
import UserContext from '../UserContext';

export default function Tabs() {
    const Tab = createBottomTabNavigator()
 return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: COLORS.gray2,
        tabBarShowLabel:false,
        headerShown:false,
        tabBarStyle: {
          height:60,
          elevation:0,
          position:'absolute'
          
        },
      }}
    >
      
        <Tab.Screen name="Home" component={Home} options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name={'home'}
              size={25}
              color={focused ? 'green' : 'black'}
            />
          )
        }}/>
        <Tab.Screen name="Search" component={SearchScreen} options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name={'search'}
              size={25}
              color={focused ? 'green' : 'black'}
            />
          )
        }} />
        <Tab.Screen name="Profile" component={Profile} options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name={'user'}
              size={25}
              color={focused ? 'green' : 'black'}
            />
          )
        }} />
      </Tab.Navigator>
  )
}
