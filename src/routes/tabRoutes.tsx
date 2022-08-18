import React, { useEffect, useState } from 'react'
import { Platform } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from '../screens/Home'
import SinfIn from '../screens/SignIn'
//import { BottomMenu } from '../components/BottomMenu'
import SignIn from '../screens/SignIn'

const { Navigator, Screen } = createBottomTabNavigator()

export function UserTabRoutes() {
  const [notifications, setNotifications] = useState('0')

  return (
    <Navigator
      screenOptions={{
        // tabBarActiveTintColor: COLORS.SECONDARY_900,
        //tabBarInactiveTintColor: COLORS.SECONDARY_400,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0
        }
      }}
    >
      <Screen name="home" component={Home} />

      <Screen name="orders" component={SignIn} />
    </Navigator>
  )
}
