import { Box, Button } from 'native-base'
import React, { useCallback, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Search from '../components/Search'
import Header from '../components/Header'

import HeaderListPizza from '../components/HeaderListPizza'
import MenuPizza from '../components/MenuPizza'
import { useAuth } from '../context/auth'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import {
  collection,
  query,
  orderBy,
  startAt,
  endAt,
  getDocs
} from 'firebase/firestore'
import { db } from '../config/firebase'
import { ProductProps } from '../types/product'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useCartContext } from '../context/cartContext'

export default function Home() {
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState<ProductProps[]>([])
  type RootStackParamList = {
    RegisterPizza: { isAdd: boolean }
  }
  const { user } = useAuth()

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  function handleNavigation() {
    navigation.navigate('RegisterPizza', { isAdd: true })
  }

  async function removeItemValue() {
    try {
      console.log('foi')
      await AsyncStorage.removeItem('@gopizza:product')
      await AsyncStorage.removeItem('@gopizza:users')
      await AsyncStorage.removeItem('@GoMarketplace:products')
      return true
    } catch (exception) {
      return false
    }
  }
  async function getMenuPizza(value: string) {
    const formattedValue = value.toLocaleLowerCase().trim()
    const userRef = collection(db, 'Pizzas')
    const usersDocReference = query(
      userRef,
      orderBy('name_insensitive'),
      startAt(formattedValue),
      endAt(`${formattedValue}\uf8ff`)
    )
    const querySnapshot = await getDocs(usersDocReference)
    const dataProducts = querySnapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    }) as ProductProps[]
    setProducts(dataProducts)
  }

  function handleSearch() {
    getMenuPizza(search)
  }

  useFocusEffect(
    useCallback(() => {
      getMenuPizza('')
    }, [])
  )
  return (
    <Box flex={1} bg="light.200">
      <Header />
      <Search onChangeText={setSearch} value={search} onSearch={handleSearch} />
      <HeaderListPizza qntProd={products.length} />
      <MenuPizza products={products} />
      {user?.isAdmin && (
        <Button
          bg={'red.700'}
          onPress={handleNavigation}
          w="80%"
          alignSelf={'center'}
          alignItems="center"
          m="2"
          h="6%"
          borderRadius="10"
          _pressed={{ bg: 'red.700', opacity: 0.6 }}
        >
          Cadastrar Produto
        </Button>
      )}
    </Box>
  )
}
