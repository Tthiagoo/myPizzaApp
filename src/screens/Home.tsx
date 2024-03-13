import { Box, Button, HStack, VStack } from 'native-base'
import React, { useCallback, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Search from '../components/Search'
import Header from '../components/Header'

import HeaderListPizza from '../components/HeaderListPizza'
import MenuPizza from '../components/MenuPizza'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import {
  collection,
  query,
  orderBy,
  startAt,
  endAt,
  getDocs,
  where
} from 'firebase/firestore'
import { db } from '../config/firebase'
import { ProductProps } from '../types/orderProps'
import { useStore } from '../modules/auth/store/authStore'

export default function Home() {
  const [search, setSearch] = useState('')
  const [typeProducts, setTypeProducts] = useState('Pizza')
  const [products, setProducts] = useState<ProductProps[]>([])
  type RootStackParamList = {
    RegisterPizza: { isAdd: boolean }
  }
  const { user } = useStore()

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  function handleNavigation() {
    navigation.navigate('RegisterPizza', { isAdd: true })
  }
  function handleNavigationOrder() {
    navigation.navigate('orders', { isAdd: true })
  }

  async function getMenuPizza(value: string) {
    const formattedValue = value.toLocaleLowerCase().trim()
    const userRef = collection(db, 'Pizzas')
    const usersDocReference = query(
      userRef,
      where('typeProduct', '==', typeProducts),
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
    }, [typeProducts])
  )
  return (
    <Box flex={1} bg="light.200">
      <Header />
      <Search onChangeText={setSearch} value={search} onSearch={handleSearch} />
      <HeaderListPizza
        typeProduct={typeProducts}
        setTypeProduct={setTypeProducts}
        qntProd={products.length}
      />
      <MenuPizza products={products} />
      {user?.isAdmin && (
        <HStack h="8%" alignItems="center" justifyContent={'center'}>
          <Button
            bg={'red.700'}
            onPress={handleNavigation}
            w="40%"
            alignSelf={'center'}
            alignItems="center"
            m="2"
            h="70%"
            borderRadius="10"
            _pressed={{ bg: 'red.700', opacity: 0.6 }}
          >
            Cadastrar Produto
          </Button>
          <Button
            bg={'#528F33'}
            onPress={handleNavigationOrder}
            w="40%"
            alignSelf={'center'}
            alignItems="center"
            m="2"
            h="70%"
            borderRadius="10"
            _pressed={{ bg: 'red.700', opacity: 0.6 }}
          >
            Fila de Pedidos
          </Button>
        </HStack>
      )}
    </Box>
  )
}
