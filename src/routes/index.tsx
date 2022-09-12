import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignIn from '../screens/SignIn'
import Home from '../screens/Home'
import { UserTabRoutes } from './tabRoutes'
import PizzaOrder from '../screens/Order'
import OrderDetail from '../screens/OrderDetail'
import { useAuth } from '../context/auth'
import { UserStackRoutes } from './stackRoutes'

const { Navigator, Screen, Group } = createNativeStackNavigator()

export function Routes() {
  const { user } = useAuth()
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Screen name="Stack" component={UserStackRoutes} />
        ) : (
          <Screen name="login" component={SignIn} />
        )}
      </Navigator>
    </NavigationContainer>
  )
}
