import { useRoute, RouteProp } from '@react-navigation/native'
import { Box, Divider, FlatList, Flex, Heading, HStack } from 'native-base'
import React from 'react'
import OrderDetailCard from '../components/OrderDetailCard'
import { RootStackParamList } from '../types/StackRoutesParams'

export default function OrderDetail() {
  const route = useRoute<RouteProp<RootStackParamList, 'orderDetail'>>()

  return (
    <Flex flex="1" bg="light.200" alignItems={'center'}>
      <Flex
        safeAreaTop
        w="100%"
        h="15%"
        bg="red.700"
        alignItems={'center'}
        justifyContent="center"
        color="white"
      >
        <Heading size="md" color="white">
          Detalhes do Pedido
        </Heading>
      </Flex>
      <FlatList
        data={route.params.itemList}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <OrderDetailCard index={index} key={index} data={item} />
        )}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Divider />}
        paddingTop={2}
      />
      <Flex
        py={'4'}
        w="100%"
        bg="white"
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Heading size="sm">Total: R${route.params.priceTotal}</Heading>
      </Flex>
    </Flex>
  )
}
