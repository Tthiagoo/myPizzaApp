import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { FlatList, Text } from 'native-base'
import React from 'react'

import { ProductProps } from '../types/orderProps'

import ItemPizza from './ItemPizza'
import { useStore } from '../modules/auth/store/authStore'

export type RootStackParamList = {
  order: { id: string }
  orderDetail: { id: string }
  RegisterPizza: { isAdd: boolean }
}

interface NewProd {
  products: ProductProps[]
}

export default function MenuPizza({ products }: NewProd) {
  const { user } = useStore()

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  function handleOpen(item: ProductProps) {
    navigation.navigate(user?.isAdmin ? 'RegisterPizza' : 'order', item)
  }

  return (
    <FlatList
      paddingX={'5%'}
      marginTop={'10px'}
      data={products}
      renderItem={({ item, index }) => (
        <ItemPizza key={index} data={item} onPress={() => handleOpen(item)} />
      )}
      keyExtractor={item => item.id}
      ListEmptyComponent={<Text>Nenhuma pizza encontrada</Text>}
    />
  )
}
