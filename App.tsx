import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'

import { NativeBaseProvider, Box } from 'native-base'
import { useFonts, DMSans_400Regular } from '@expo-google-fonts/dm-sans'
import { DMSerifDisplay_400Regular } from '@expo-google-fonts/dm-serif-display'

import { Routes } from './src/routes'

import { LinearGradient } from 'expo-linear-gradient'
import { theme } from './src/theme/customTheme'
import { Loading } from './src/components/Loading'
import { AuthProvider } from './src/store/auth'
import { CartProvider } from './src/store/newCartContext'

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 }
}

const config = {
  dependencies: {
    'linear-gradient': LinearGradient
  }
}

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSerifDisplay_400Regular
  })

  return (
    <NativeBaseProvider
      config={config}
      theme={theme}
      initialWindowMetrics={inset}
    >
      <AuthProvider>
        <CartProvider>
          <StatusBar style="light" translucent backgroundColor="transparent" />
          {fontsLoaded ? <Routes /> : <Loading />}
        </CartProvider>
      </AuthProvider>
    </NativeBaseProvider>
  )
}
