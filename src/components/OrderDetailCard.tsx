import { Heading, HStack, Text, VStack, Image } from 'native-base'
import React from 'react'
import { OrderProps } from '../screens/OrderHistory'

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
export default function OrderDetailCard({ index, data, ...rest }: Props) {
  return (
    <HStack w="340" px="4" py="1" marginY="2" justifyContent="space-between">
      <VStack w="60%" space={1}>
        <Heading size="sm">{data.title}</Heading>
        <Text color="gray.500">{data.description}</Text>
        <Text fontWeight={'bold'}>{data.price}</Text>
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
  )
}
