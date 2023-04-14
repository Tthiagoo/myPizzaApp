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
import React, { useMemo, useState } from 'react'

import Swipeable from 'react-native-gesture-handler/Swipeable'
import { Feather } from '@expo/vector-icons'

import { Animated, TouchableOpacity } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { ProductProps } from '../types/orderProps'
import { useCart } from '../context/newCartContext'
import formatValue from '../utils/formatValue'

interface Props {
  index: number
  data: ProductProps
}
export default function CartItem({ index, data, ...rest }: Props) {
  function formatPrice(): string | number {
    const price = data.price * data.quantidade
    if (price.toString().includes('.')) {
      const priceWith0 = parseFloat(price.toString() + '0').toFixed(2)
      console.log('price0', priceWith0)

      return priceWith0
    }
    return price
  }

  const { increment, decrement, data: products, remove } = useCart()

  function handleIncrement(id: string): void {
    increment(id)
  }

  function handleDecrement(id: string): void {
    decrement(id)

    if (data.quantidade < 2) {
      return remove(id)
    }
  }
  function handleRemove(id: string): void {
    remove(id)
  }

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
          {data.observacao && (
            <Text mt="0.3rem" color="gray.500">
              <Text fontWeight={'bold'}>Obervação: </Text>
              {data.observacao}
            </Text>
          )}

          <HStack space={'5'}>
            <Text fontWeight={'bold'}>{`R$ ${formatPrice()}`}</Text>
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
