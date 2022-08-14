import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignIn from '../screens/SignIn'
import Home from '../screens/Home'

const { Navigator, Screen, Group } = createNativeStackNavigator()

export function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="login" component={SignIn} />
        <Screen name="home" component={Home} />
      </Navigator>
    </NavigationContainer>
  )
}
