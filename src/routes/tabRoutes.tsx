import React, { useEffect, useState } from 'react'
import { Platform } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from '../screens/Home'
import SinfIn from '../modules/auth/views/SignIn'
//import { BottomMenu } from '../components/BottomMenu'
import SignIn from '../modules/auth/views/SignIn'
import OrderHistory from '../screens/OrderHistory'
import BottomMenu from '../components/BottomMenu'
import Carrinho from '../screens/Carrinho'

const { Navigator, Screen } = createBottomTabNavigator()

export function UserTabRoutes() {
  const [notifications, setNotifications] = useState('0')

  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: '#572D31',
        tabBarInactiveTintColor: '#572d3134',
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0
        }
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <BottomMenu name="home" color={color} />
        }}
      />

      <Screen
        name="orders"
        component={OrderHistory}
        options={{
          tabBarIcon: ({ color }) => <BottomMenu name="history" color={color} />
        }}
      />
      <Screen
        name="Cart"
        component={Carrinho}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomMenu name="shopping-cart" color={color} />
          )
        }}
      />
    </Navigator>
  )
}
