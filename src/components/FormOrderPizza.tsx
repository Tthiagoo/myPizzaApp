import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRoute, RouteProp } from '@react-navigation/native'
import {
  HStack,
  Flex,
  FormControl,
  Input,
  Select,
  CheckIcon,
  Text
} from 'native-base'
import React, { useEffect, useState } from 'react'
import { ImageSourcePropType, TouchableOpacity } from 'react-native'
import { useCartContext } from '../context/cartContext'
import { saveCart } from '../hooks/useCart'
import { RootStackParamList } from '../screens/Order'
import { getCartStorage } from '../storage/CartStorage'
import { ProductProps } from './ItemPizza'

interface Product {
  id: string
  title: string
  image: string
  description: string
  size?: 'Pequena' | 'Medio' | 'Grande'
  quantidade: number
  meioSabor?: string
  price: string
}

export type RootRouteProps<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>
export default function FormOrderPizza() {
  const [quantidade, setQuantidade] = useState(0)
  //const { addProduct, cart } = useCartContext()
  const [myCart, setMyCart] = useState<Product[]>([])
  const [service, setService] = React.useState('none')
  const route = useRoute<RouteProp<RootStackParamList, 'order'>>()
  const { title, image, id, description } = route.params
  async function handleAddProduct(product: Product) {
    //await AsyncStorage.removeItem('@gopizza:users')
    //console.log('deu')

    await saveCart(product)
  }
  console.log('my cart')
  console.log(myCart)
  const NewProduct: Product = {
    title,
    image,
    id,
    quantidade: 5,
    price: '45',
    description
  }

  useEffect(() => {
    ;(async function () {
      const cart = await getCartStorage()
      console.log('deu certo')
      setMyCart(cart)
    })
  }, [])

  return (
    <>
      <HStack w="100%" mt="3" space={6}>
        <Flex w="25%">
          <FormControl.Label>
            <Text>Quantidade</Text>
          </FormControl.Label>
          <Input
            textAlign={'center'}
            keyboardType="numeric"
            borderRadius={'10px'}
            bg="white"
            variant={'unstyled'}
            borderColor="gray.300"
            borderWidth={'1'}
            p="1.3rem"
            fontSize={'md'}
            focusOutlineColor="red"
            w="100%"
            _focus={{ backgroundColor: '#fff' }}
          />
        </Flex>
        <Flex flex="1">
          <FormControl.Label>
            <Text>Meio Sabor?</Text>
          </FormControl.Label>
          <Select
            selectedValue={service}
            borderRadius={'10px'}
            bg="white"
            variant={'unstyled'}
            borderColor="gray.300"
            borderWidth={'1'}
            p="1.3rem"
            fontSize={'md'}
            w="100%"
            _selectedItem={{
              bg: 'green.200'
            }}
            onValueChange={itemValue => setService(itemValue)}
          >
            <Select.Item label="Não" value="none" />
            <Select.Item label="Bauru = R$45" value="ux" />
            <Select.Item label="Frango C/Queijo = R$45" value="web" />

            <Select.Item label="Portuguesa = R$45" value="uxx" />

            <Select.Item label="Calabresa = R$45" value="cross" />
            <Select.Item label="Mussarela = R$45" value="ui" />
            <Select.Item label="4 Queijos = R$45" value="backend" />
          </Select>
        </Flex>
      </HStack>
      <Text mt="5">Total: R$40.00</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          handleAddProduct(NewProduct)
        }}
        style={{
          borderRadius: 12,
          maxHeight: 60,
          minHeight: 60,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#528F33',
          flex: 1,
          marginTop: 14,
          padding: 10
        }}
      >
        <Text color={'white'}> Adicionar no Carrinho </Text>
      </TouchableOpacity>
    </>
  )
}
