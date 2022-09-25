import { Box, Heading, HStack, Image, VStack, Text, Divider } from 'native-base'
import React from 'react'

import {
  TouchableOpacityProps,
  TouchableOpacity,
  ImageSourcePropType
} from 'react-native'

export type ProductProps = {
  id: string
  image: string
  title: string
  description: string
  isAdd?: boolean
}
type Props = TouchableOpacityProps & {
  data: ProductProps
}

export default function ItemPizza({ data, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack fontFamily={'heading'} h="auto">
        <Image
          source={{
            uri: `${data.image}`
          }}
          alt="Alternate Text"
          size="lg"
          rounded="full"
          marginRight={6}
        />
        <VStack justifyContent={'center'} h="auto" maxW="60%">
          <Heading size="sm" color="#572D31">
            {data?.title}
          </Heading>
          <Text lineHeight={'20px'} numberOfLines={10} fontSize={14}>
            {data.description}
          </Text>
        </VStack>
      </HStack>
      <Divider my="4%" width={'65%'} alignSelf={'flex-end'} />
    </TouchableOpacity>
  )
}
