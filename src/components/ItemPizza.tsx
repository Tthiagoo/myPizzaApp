import { Box, Heading, HStack, Image, VStack, Text, Divider } from 'native-base'
import React from 'react'

import {
  TouchableOpacityProps,
  TouchableOpacity,
  ImageSourcePropType
} from 'react-native'
import { ProductProps } from '../types/orderProps'

type Props = TouchableOpacityProps & {
  data: ProductProps
}

export default function ItemPizza({ data, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack fontFamily={'heading'} h="auto">
        <Image
          source={{
            uri: `${data.photo_url}`
          }}
          alt="Alternate Text"
          size="lg"
          rounded="full"
          marginRight={6}
        />
        <VStack justifyContent={'center'} h="auto" maxW="60%">
          <Heading size="sm" color="#572D31">
            {data?.name}
          </Heading>
          <Text lineHeight={'20px'} numberOfLines={10} fontSize={14}>
            {data.description}
          </Text>
          <Text
            mt="5px"
            lineHeight={'20px'}
            numberOfLines={10}
            fontSize={14}
            fontWeight="bold"
          >
            {data.uniquePrice
              ? `R$:${data.uniquePrice},00`
              : `R$:${data.prices_sizes?.p},00 ~ ${data.prices_sizes?.g},00`}
          </Text>
        </VStack>
      </HStack>
      <Divider my="4%" width={'65%'} alignSelf={'flex-end'} />
    </TouchableOpacity>
  )
}
