import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AppLoading from 'expo-app-loading'
import { NativeBaseProvider, Box } from 'native-base'
import { useFonts, DMSans_400Regular } from '@expo-google-fonts/dm-sans'
import { DMSerifDisplay_400Regular } from '@expo-google-fonts/dm-serif-display'
import { getDocs, collection } from 'firebase/firestore'
import { db } from './src/config/firebase'
import { Routes } from './src/routes'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { theme } from './src/theme/customTheme'
import { Loading } from './src/components/Loading'
import { AuthProvider } from './src/context/auth'
import { CartProvider } from './src/context/cartContext'

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

  /*const [tasks, setTaks] = useState([])
  useEffect(() => {
    async function getData() {
      const querySnapshot = await getDocs(collection(db, 'Tasks'))
      const newArray = querySnapshot.forEach(doc => {
        console.log(`${doc.id} => ${doc.data()}`)
      })
    }
    getData()
  }, [])*/
  return (
    <NativeBaseProvider config={config} theme={theme}>
      <AuthProvider>
        <CartProvider>
          <StatusBar style="light" translucent backgroundColor="transparent" />
          {fontsLoaded ? <Routes /> : <Loading />}
        </CartProvider>
      </AuthProvider>
    </NativeBaseProvider>
  )
}
