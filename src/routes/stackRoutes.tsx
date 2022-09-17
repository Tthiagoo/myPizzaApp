import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { useAuth } from '../context/auth'
import Home from '../screens/Home'
import Order from '../screens/Order'
import { UserTabRoutes } from './tabRoutes'
import PizzaOrder from '../screens/Order'
import OrderDetail from '../screens/OrderDetail'
import RegisterPizza from '../screens/RegisterPizza'

const { Navigator, Screen, Group } = createNativeStackNavigator()

export function UserStackRoutes() {
  const { user } = useAuth()

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {user?.isAdmin ? (
        <Group>
          <Screen name="home" component={Home} />
          <Screen name="RegisterPizza" component={RegisterPizza} />

          <Screen name="order" component={PizzaOrder} />
        </Group>
      ) : (
        <Group>
          <Screen name="UserTabRoutes" component={UserTabRoutes} />
          <Screen name="order" component={PizzaOrder} />
          <Screen name="orderDetail" component={OrderDetail} />
        </Group>
      )}
    </Navigator>
  )
}
