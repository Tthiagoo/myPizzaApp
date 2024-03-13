import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from '../screens/Home'
import Order from '../screens/Order'
import { UserTabRoutes } from './tabRoutes'
import PizzaOrder from '../screens/Order'
import OrderDetail from '../screens/OrderDetail'
import RegisterPizza from '../screens/RegisterPizza'
import RegisterUser from '../screens/RegisterUser'
import OrderHistory from '../screens/OrderHistory'
import { useStore } from '../modules/auth/store/authStore'

const { Navigator, Screen, Group } = createNativeStackNavigator()

export function UserStackRoutes() {
  const { user } = useStore()

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {user?.isAdmin ? (
        <Group>
          <Screen name="home" component={Home} />
          <Screen name="RegisterPizza" component={RegisterPizza} />
          <Screen name="order" component={PizzaOrder} />
          <Screen name="orders" component={OrderHistory} />
          <Screen name="orderDetail" component={OrderDetail} />
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
