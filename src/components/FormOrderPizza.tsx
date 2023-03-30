import { useRoute, RouteProp, useNavigation } from '@react-navigation/native'
import { collection, doc, getDoc } from 'firebase/firestore'
import uuid from 'react-native-uuid'
import {
  HStack,
  Flex,
  FormControl,
  Input,
  Select,
  CheckIcon,
  Text,
  Radio,
  Pressable,
  TextArea
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
  const [service, setService] = useState('')
  const [size, setSize] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [calcHalf, setCalcHalf] = useState(0)
  const [halfPizzaName, setHalfPizzaName] = useState('')
  const [obs, setObs] = useState('')
  const [pizza, setPizza] = useState<PizzaResponse>({} as PizzaResponse)
  const {
    name: nameParams,
    photo_url,
    id,
    description,
    typeProduct
  } = route.params

  const { addToCart } = useCart()

  const pizzaRef = doc(db, 'Pizzas', id)
  async function getPizzaInfo() {
    return await getDoc(pizzaRef).then(response =>
      setPizza(response.data() as PizzaResponse)
    )
  }

  const arrayHalfPizza = [
    { name: 'Calabresa', value: '4.40' },
    { name: 'Frango C/Queijo', value: '2.35' }
  ]

  function calcPriceAmout(): number {
    if (typeProduct === 'Pizza') {
      if (service) {
        const priceSize = calcHalf ? calcHalf * quantity : 0

        return priceSize
      }
      const amount = size ? pizza.prices_sizes[size] * quantity : 0
      return amount
    } else {
      const amount = quantity * Number(pizza.uniquePrice)
      return amount
    }
  }

  function calcPriceSize(): number {
    if (typeProduct === 'Pizza') {
      if (service) {
        const priceSize = calcHalf
        return priceSize
      }
      const priceSize = size ? pizza.prices_sizes[size] : 0
      return priceSize
    } else {
      return Number(pizza.uniquePrice)
    }
  }

  function calcHalfPizza(price: string) {
    if (price) {
      const selectHalfInArray = arrayHalfPizza.find(
        (halfPizza: { name: string; value: string }) =>
          halfPizza.value === price
      )
      console.log(selectHalfInArray, 'hallllf')
      const newPizzaName = `1/2 ${nameParams} 1/2 ${selectHalfInArray?.name}`
      setHalfPizzaName(newPizzaName)
      console.log('new pizza name', newPizzaName)
      console.log(price)
      setService(price)
      const removeId = price.split('.').pop()
      setCalcHalf(Number(removeId))

      return Number(removeId)
    }
    setService('')
    return
  }

  function handleAddToCart(item: ProductProps): void {
    if (typeProduct === 'Pizza' && !size) {
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
    id: halfPizzaName ? uuid.v4() : id,
    name: halfPizzaName ? halfPizzaName : nameParams,
    photo_url,
    quantidade: quantity,
    price: calcPriceSize(),
    description,
    uniquePrice: calcHalf,
    observacao: obs
  }

  useEffect(() => {
    getPizzaInfo()
  }, [id])

  return (
    <>
      {typeProduct === 'Pizza' && (
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
      )}

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

          {typeProduct === 'Pizza' && (
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
                onValueChange={itemValue => calcHalfPizza(itemValue)}
              >
                <Select.Item label="Não" value="" />
                <Select.Item label="Bauru = R$30" value="1.30" />
                <Select.Item label="Frango C/Queijo = R$35" value="2.35" />
                <Select.Item label="Portuguesa = R$40" value="3.40" />
                <Select.Item label="Calabresa = R$40" value="4.40" />
                <Select.Item label="Mussarela = R$40" value="5.40" />
                <Select.Item label="4 Queijos = R$40" value="6.40" />
              </Select>
            </Flex>
          )}
        </HStack>
        <Flex w="100%">
          <FormControl.Label>
            <Text>Observação</Text>
          </FormControl.Label>
          <TextArea
            borderRadius={'10px'}
            bg="white"
            variant={'unstyled'}
            borderColor="gray.300"
            borderWidth={'1'}
            p="0.7rem"
            fontSize={'md'}
            focusOutlineColor="red"
            w="100%"
            onChangeText={value => setObs(value)}
            _focus={{ backgroundColor: '#fff' }}
            autoCompleteType={undefined}
          />
        </Flex>
        <Text mt="5" fontSize={'md'} fontWeight={'bold'}>
          Total: R$ {calcPriceAmout()}
        </Text>
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
            padding: 10,
            marginBottom: 40
          }}
        >
          <Text color={'white'}> Adicionar no Carrinho </Text>
        </TouchableOpacity>
      </>
    </>
  )
}
