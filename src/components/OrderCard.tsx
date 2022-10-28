import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Badge, Box, Flex, Heading, Image, Text } from 'native-base'
import React from 'react'
import { TouchableOpacityProps, TouchableOpacity } from 'react-native'
import { HistoryProps } from '../screens/OrderHistory'
import { ProductProps } from '../types/orderProps'
import { RootStackParamList } from '../types/StackRoutesParams'

type Props = TouchableOpacityProps & {
  dataOrderDetail: ProductProps
  index: number
  data: HistoryProps
  lenghtArrayHistory: number
  itemList: ProductProps[]
  priceTotal: number
}
export default function OrderCard({
  index,
  data,
  dataOrderDetail,
  lenghtArrayHistory,
  itemList,
  priceTotal,
  ...rest
}: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  function handleOpen() {
    navigation.navigate('orderDetail', { itemList, priceTotal })
  }

  return (
    <TouchableOpacity
      style={lenghtArrayHistory === 1 ? { width: '100%' } : { width: '50%' }}
      onPress={() => handleOpen()}
    >
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
            uri: dataOrderDetail.photo_url
          }}
          size="xl"
          rounded="full"
          alt="pizza"
        />
        <Heading color="#572D31" mt="4" size={'md'}>
          {data.date} - {data.hours}
        </Heading>
        <Text>R$ {data.priceTotal}</Text>
        <Badge
          mt="2"
          bg="#528F33"
          paddingX="4"
          paddingY={'5'}
          borderRadius={'10'}
        >
          <Text color="white">{data.status}</Text>
        </Badge>
      </Flex>
    </TouchableOpacity>
  )
}
