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
  const [size, setSize] = useState('p')
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
    { name: 'Calabresa e Mussarela ', value: { g: '45', p: '15', m: '30' } },
    { name: 'Frango e Mussarela ', value: { p: '20', m: '40', g: '60' } },
    { name: 'Portuguesa', value: { m: '40', p: '20', g: '60' } },
    { name: 'Mussarela', value: { m: '30', g: '40', p: '20' } },
    { name: '4 Queijos', value: { m: '50', g: '75', p: '30' } },
    { name: 'Atum', value: { p: '35', g: '80', m: '50' } },
    { name: 'Bauru', value: { g: '60', m: '40', p: '30' } },
    { name: 'Hot Dog', value: { g: '80', m: '50', p: '30' } }
  ]

  function calcPriceAmout(): number | string {
    if (typeProduct === 'Pizza' && size && quantity) {
      if (service) {
        const priceSize = calcHalf ? calcHalf * quantity : 0
        if (priceSize.toString().includes('.')) {
          const priceWith0 = parseFloat(priceSize.toString() + '0').toFixed(2)
          console.log('price0', priceWith0)

          return priceWith0
        } else {
          console.log('caiu aquiiiiii')
          return priceSize
        }
      } else {
        console.log('caiu no else')
        const amount = size ? pizza.prices_sizes[size] * quantity : 0
        return amount
      }
    } else {
      const amount = quantity * Number(pizza.uniquePrice)
      return amount
    }
  }

  /*function calcPriceSize(): number {
    if (typeProduct === 'Pizza' && size && quantity) {
      if (service) {
        const priceSize = calcHalf
        return priceSize
      }

      const priceSize = size ? pizza.prices_sizes[size] : 0
      return priceSize
    } else {
      return Number(pizza.uniquePrice)
    }
  }*/

  function calcHalfPizza(price: string, name: string) {
    if (price) {
      const newPizzaName = `1/2 ${nameParams} 1/2 ${name}`
      setHalfPizzaName(newPizzaName)
      console.log('new pizza name', newPizzaName)
      console.log(price)
      const dividePrice = pizza.prices_sizes[size] / 2 + Number(price) / 2
      console.log(pizza.prices_sizes[size] / 2, Number(price) / 2)
      console.log(dividePrice, 'divde')

      setCalcHalf(dividePrice)

      return Number(price)
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
    price: Number(calcPriceAmout()),
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
                    console.log('foii')
                    setService('')
                    setCalcHalf(0)
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
              >
                <Select.Item
                  label="Não"
                  value=""
                  onPress={() => setService('')}
                />
                {arrayHalfPizza.map((option, index) => (
                  <Select.Item
                    key={index}
                    label={`${option.name} - R$ ${option.value[size]}`}
                    value={`${index}.${option.value[size]}`}
                    onPress={() => {
                      setService(`${index}.${option.value[size]}`)
                      calcHalfPizza(option.value[size], option.name)
                    }}
                  />
                ))}
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
          Total: R$ {size && quantity ? calcPriceAmout() : 0}
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
