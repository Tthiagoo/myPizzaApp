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
  Box
} from 'native-base'
import React from 'react'
import { OrderProps } from '../screens/OrderHistory'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { Feather } from '@expo/vector-icons'

import { Animated } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

export interface OrderDetailProp {
  id: string
  title: string
  description: string
  price: string
  image: string
}
interface Props {
  index: number
  data: OrderDetailProp
}
export default function CartItem({ index, data, ...rest }: Props) {
  const RenderRight = (progress, dragX) => {
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
  }

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
      <HStack w="340" px="4" py="1" marginY="2" justifyContent="space-between">
        <VStack w="60%" space={1}>
          <Heading size="sm">{data.title}</Heading>
          <Text color="gray.500">{data.description}</Text>
          <HStack space={'5'}>
            <Text fontWeight={'bold'}>{data.price}</Text>
            <HStack space={2}>
              <MinusIcon size="5" mt="0.5" color="red.500" />
              <Text>4</Text>
              <AddIcon size="5" mt="0.5" color="red.500" />
            </HStack>
          </HStack>
        </VStack>
        <Image
          source={{
            uri: `${data.image}`
          }}
          size="md"
          rounded="md"
          alt="pizza"
        />
      </HStack>
    </Swipeable>
  )
}
