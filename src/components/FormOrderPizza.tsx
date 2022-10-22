import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native'
import { collection, doc, getDoc } from 'firebase/firestore'
import {
  HStack,
  Flex,
  FormControl,
  Input,
  Select,
  CheckIcon,
  Text,
  Radio,
  Pressable
} from 'native-base'
import React, { useEffect, useState } from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import { db } from '../config/firebase'
import { useAuth } from '../context/auth'
import { useCart } from '../context/newCartContext'

import { ProductProps } from '../types/orderProps'
import { RootStackParamList } from '../types/StackRoutesParams'
import { PIZZA_TYPES } from '../utils/pizza_sizes'

export type RootRouteProps<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>

type PizzaResponse = ProductProps & {
  prices_sizes: {
    [key: string]: number
  }
}

export default function FormOrderPizza() {
  const route = useRoute<RouteProp<RootStackParamList, 'order'>>()
  const navigation = useNavigation()
  const [service, setService] = React.useState('none')
  const [size, setSize] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [pizza, setPizza] = useState<PizzaResponse>({} as PizzaResponse)
  const { name, photo_url, id, description } = route.params

  const { addToCart } = useCart()
  const { user } = useAuth()

  const pizzaRef = doc(db, 'Pizzas', id)
  async function getPizzaInfo() {
    return await getDoc(pizzaRef).then(response =>
      setPizza(response.data() as PizzaResponse)
    )
  }
  console.log(quantity)

  const amount = size ? pizza.prices_sizes[size] * quantity : 0
  const priceSize = size ? pizza.prices_sizes[size] : 0

  function handleAddToCart(item: ProductProps): void {
    if (!size) {
      return Alert.alert('Pedido', 'Selecione o tamanho da pizza.')
    }

    if (!quantity) {
      return Alert.alert('Pedido', 'Informe a quantidade.')
    }
    addToCart(item)
    Alert.alert('Pedido', 'Produto adicionado no carrinho')
    navigation.navigate('home')
  }

  const NewProduct: ProductProps = {
    id,
    name,
    photo_url,
    quantidade: quantity,
    price: priceSize,
    description
  }

  useEffect(() => {
    getPizzaInfo()
  }, [id])

  return (
    <>
      <>
        <Text>Selecione um tamanho</Text>
        <Radio.Group
          defaultValue="1"
          name="myRadioGroup"
          accessibilityLabel="Pick your favorite number"
          value={size}
          onChange={nextValue => {
            setSize(nextValue)
          }}
        >
          <HStack w="100%" mt="4%" space={4} justifyContent="space-between">
            {PIZZA_TYPES.map(item => (
              <Pressable
                key={item.id}
                display={'flex'}
                flexDirection="column"
                bgColor={size == item.id ? 'green.50' : 'white'}
                flex="1"
                p={'10px'}
                justifyContent={'center'}
                alignItems="center"
                borderWidth={1}
                borderRadius={'10px'}
                borderColor={size == item.id ? 'green.500' : 'gray.300'}
                onPress={() => {
                  setSize(item.id)
                }}
              >
                <Radio
                  value={item.id}
                  colorScheme="green"
                  accessibilityLabel="Radio"
                />
                <Text fontWeight={'bold'}>{item.name}</Text>
              </Pressable>
            ))}
          </HStack>
        </Radio.Group>
      </>
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
              onChangeText={value => setQuantity(Number(value))}
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
        <Text mt="5">Total: R$ {amount}</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            handleAddToCart(NewProduct)
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
    </>
  )
}
