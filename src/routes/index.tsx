import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignIn from '../modules/auth/views/SignIn'

import { UserStackRoutes } from './stackRoutes'
import RegisterUser from '../screens/RegisterUser'
import { getAuth } from 'firebase/auth'
import UpdateUser from '../screens/UpdateUser'
import { useStore } from '../modules/auth/store/authStore'

const { Navigator, Screen, Group } = createNativeStackNavigator()

export function Routes() {
  const { user } = useStore()
  const auth = getAuth()

  console.log(user)
  const userLogged = auth!.currentUser

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
