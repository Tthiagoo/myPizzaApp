import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NativeBaseProvider, Box } from 'native-base'

import { getDocs, collection } from 'firebase/firestore'
import { db } from './src/config/firebase'
import { Routes } from './src/routes'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'

const config = {
  dependencies: {
    'linear-gradient': LinearGradient
  }
}

export default function App() {
  const [tasks, setTaks] = useState([])
  useEffect(() => {
    async function getData() {
      const querySnapshot = await getDocs(collection(db, 'Tasks'))
      const newArray = querySnapshot.forEach(doc => {
        console.log(`${doc.id} => ${doc.data()}`)
      })
    }
    getData()
  }, [])
  return (
    <NativeBaseProvider config={config}>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <Routes />
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
