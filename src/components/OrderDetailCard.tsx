import { Heading, HStack, Text, VStack, Image } from 'native-base'
import React from 'react'

import { ProductProps } from '../types/orderProps'

interface Props {
  index: number
  data: ProductProps
  payment?: string
}
export default function OrderDetailCard({
  index,
  data,

  ...rest
}: Props) {
  console.log(data)
  return (
    <HStack w="340" px="4" py="1" marginY="2" justifyContent="space-between">
      <VStack w="60%" space={1}>
        <Heading size="sm">{data.name}</Heading>
        <Text color="gray.500">{data.description}</Text>

        <HStack space={3}>
          <Text fontWeight={'bold'}>R$ {data.price}</Text>
          <Text>Quantidade: {data.quantidade}</Text>
        </HStack>
        {data.observacao && (
          <Text mt="0.3rem" color="gray.500">
            <Text fontWeight={'bold'}>Obervação: </Text>
            {data.observacao}
          </Text>
        )}
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
