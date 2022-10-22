import { Heading, HStack, Text, VStack, Image } from 'native-base'
import React from 'react'

import { ProductProps } from '../types/orderProps'

interface Props {
  index: number
  data: ProductProps
}
export default function OrderDetailCard({ index, data, ...rest }: Props) {
  return (
    <HStack w="340" px="4" py="1" marginY="2" justifyContent="space-between">
      <VStack w="60%" space={1}>
        <Heading size="sm">{data.name}</Heading>
        <Text color="gray.500">{data.description}</Text>

        <HStack space={4}>
          <Text fontWeight={'bold'}>R$ {data.price}</Text>
          <Text>Quantidade: {data.quantidade}</Text>
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
  )
}
