import { Box, Heading, HStack, Image, VStack, Text, Divider } from 'native-base'
import React from 'react'

import { TouchableOpacityProps, TouchableOpacity } from 'react-native'

export type ProductProps = {
  id: string
  photo_url: string
  name: string
  description: string
}
type Props = TouchableOpacityProps & {
  data?: ProductProps
}

export default function ItemPizza({ data, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack fontFamily={'heading'}>
        <Image
          source={{
            uri: 'https://wallpaperaccess.com/full/317501.jpg'
          }}
          alt="Alternate Text"
          size="lg"
          rounded="full"
          marginRight={6}
        />
        <VStack justifyContent={'center'}>
          <Heading size="sm">Pizza</Heading>
          <Text lineHeight={'20px'} numberOfLines={3} fontSize={14} width="55%">
            Mussarela, provolone, parmesão e gorgonzola
          </Text>
        </VStack>
      </HStack>
      <Divider my="4%" width={'65%'} alignSelf={'flex-end'} />
    </TouchableOpacity>
  )
}
