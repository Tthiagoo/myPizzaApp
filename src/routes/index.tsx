import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignIn from '../screens/SignIn'
import Home from '../screens/Home'
import { UserTabRoutes } from './tabRoutes'
import PizzaOrder from '../screens/Order'
import OrderDetail from '../screens/OrderDetail'

const { Navigator, Screen, Group } = createNativeStackNavigator()

export function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="login" component={SignIn} />
        <Screen name="UserTabRoutes" component={UserTabRoutes} />
        <Screen name="home" component={Home} />
        <Screen name="order" component={PizzaOrder} />
        <Screen name="orderDetail" component={OrderDetail} />
      </Navigator>
    </NavigationContainer>
  )
}
