import {
  Heading,
  HStack,
  Text,
  VStack,
  Image,
  CheckIcon,
  MinusIcon,
  AddIcon,
  View,
  Box,
  CloseIcon
} from 'native-base'
import React, { useMemo } from 'react'

import Swipeable from 'react-native-gesture-handler/Swipeable'
import { Feather } from '@expo/vector-icons'

import { Animated, TouchableOpacity } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { OrderProps } from '../types/orderProps'
import { useCart } from '../context/newCartContext'
import formatValue from '../utils/formatValue'

interface Props {
  index: number
  data: OrderProps
}
export default function CartItem({ index, data, ...rest }: Props) {
  const { increment, decrement, data: products, remove } = useCart()

  function handleIncrement(id: string): void {
    console.log(id)
    increment(id)
  }

  function handleDecrement(id: string): void {
    console.log(id)
    decrement(id)
  }
  function handleRemove(id: string): void {
    console.log(id)
    remove(id)
  }

  const cartTotal = useMemo(() => {
    const total = products.reduce((accumulator, product) => {
      const productSubTotal = product.price * product.quantidade

      return accumulator + productSubTotal
    }, 0)

    return total
  }, [products])

  /*const RenderRight = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-50, 0.5],
      outputRange: [1, 0.1]
    })

    const Style = {
      transform: [
        {
          scale
        }
      ]
    }

    return (
      <View
        style={{
          width: 80,
          backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Animated.Text style={[Style, { color: '#fff', fontWeight: '600' }]}>
          Delete
        </Animated.Text>
      </View>
    )
  }*/

  return (
    <Swipeable
      renderRightActions={() => (
        <Animated.View>
          <View style={{ flex: 1 }}>
            <Box>aloooooooooooooo</Box>
          </View>
        </Animated.View>
      )}
    >
      <HStack w="340" px="3" py="1" marginY="2" justifyContent="space-between">
        <TouchableOpacity onPress={() => handleRemove(data.id)}>
          <CloseIcon color="red.500" size="5" />
        </TouchableOpacity>

        <VStack w="60%" space={1}>
          <Heading size="sm">{data.name}</Heading>
          <Text color="gray.500">{data.description}</Text>
          <HStack space={'5'}>
            <Text fontWeight={'bold'}>{`R$ ${
              data.price * data.quantidade
            }`}</Text>
            <HStack space={2}>
              <TouchableOpacity onPress={() => handleDecrement(data.id)}>
                <MinusIcon size="6" mt="0.5" color="red.500" />
              </TouchableOpacity>

              <Text>{data.quantidade}</Text>
              <TouchableOpacity onPress={() => handleIncrement(data.id)}>
                <AddIcon size="22px" mt="0.5" color="red.500" />
              </TouchableOpacity>
            </HStack>
          </HStack>
        </VStack>
        <Image
          source={{
            uri: `${data.photo_url}`
          }}
          size="md"
          rounded="md"
          alt="pizza"
        />
      </HStack>
    </Swipeable>
  )
}
