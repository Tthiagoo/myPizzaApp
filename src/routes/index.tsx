import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignIn from '../screens/SignIn'
import Home from '../screens/Home'
import { UserTabRoutes } from './tabRoutes'

const { Navigator, Screen, Group } = createNativeStackNavigator()

export function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="login" component={SignIn} />
        <Screen name="UserTabRoutes" component={UserTabRoutes} />
      </Navigator>
    </NavigationContainer>
  )
}
