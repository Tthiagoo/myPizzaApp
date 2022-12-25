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
import RegisterUser from '../screens/RegisterUser'
import { getAuth } from 'firebase/auth'
import UpdateUser from '../screens/UpdateUser'

const { Navigator, Screen, Group } = createNativeStackNavigator()

export function Routes() {
  const { user } = useAuth()
  const auth = getAuth()

  const userLogged = auth!.currentUser
  console.log('user logged', userLogged)
  console.log('user', user)
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        {user && userLogged ? (
          <Group>
            <Screen name="Stack" component={UserStackRoutes} />
            <Screen name="UpdateUser" component={UpdateUser} />
          </Group>
        ) : (
          <Group>
            <Screen name="login" component={SignIn} />
            <Screen name="RegisterUser" component={RegisterUser} />
          </Group>
        )}
      </Navigator>
    </NavigationContainer>
  )
}
