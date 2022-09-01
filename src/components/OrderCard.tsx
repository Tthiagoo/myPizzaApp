import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Badge, Box, Flex, Heading, Image, Text } from 'native-base'
import React from 'react'
import { TouchableOpacityProps, TouchableOpacity } from 'react-native'

import { OrderProps } from '../screens/OrderHistory'
import { RootStackParamList } from './MenuPizza'

type Props = TouchableOpacityProps & {
  index: number
  data: OrderProps
}
export default function OrderCard({ index, data, ...rest }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  function handleOpen(id: string) {
    navigation.navigate('orderDetail', { id })
  }
  return (
    <TouchableOpacity style={{ width: '50%' }} onPress={() => handleOpen('1')}>
      <Flex
        flexDirection={'column'}
        alignItems="center"
        w="100%"
        p="15px"
        justifyContent={'center'}
        borderRightColor="gray.300"
        borderRightWidth={index % 2 > 0 ? 0 : '1px'}
      >
        <Image
          source={{
            uri: data.image
          }}
          size="xl"
          rounded="full"
          alt="pizza"
        />
        <Heading color="#572D31" mt="4" size={'md'}>
          04/07 - 18:00
        </Heading>
        <Text>Apto 100 Bl 2 • R$ 100</Text>
        <Badge
          mt="2"
          bg="#528F33"
          paddingX="4"
          paddingY={'5'}
          borderRadius={'10'}
        >
          <Text color="white">Pronto</Text>
        </Badge>
      </Flex>
    </TouchableOpacity>
  )
}
