import {
  Box,
  Button,
  Divider,
  FlatList,
  Flex,
  Heading,
  Text
} from 'native-base'
import React, { useMemo } from 'react'
import CartItem from '../components/CartItem'

import { useCart } from '../context/newCartContext'

export default function Carrinho() {
  const { increment, decrement, data } = useCart()
  const cartTotal = useMemo(() => {
    const total = data.reduce((accumulator, product) => {
      const productSubTotal = product.price * product.quantidade

      return accumulator + productSubTotal
    }, 0)

    return total
  }, [data])
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
          Carrinho
        </Heading>
      </Flex>
      <Flex
        flexDirection="row"
        py={'2'}
        w="100%"
        bg="#eeeeee"
        justifyContent={'space-around'}
        alignItems={'center'}
        borderBottomColor="gray.300"
        borderBottomWidth={1}
        shadow={1}
      >
        <Heading size="sm">Total: R$ {`${cartTotal}`}</Heading>
        <Button
          _pressed={{ opacity: 0.6 }}
          w="auto"
          style={{
            borderRadius: 12,
            maxHeight: 50,
            minHeight: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#528F33'
          }}
        >
          <Text color={'white'}> Finalizar Pedido </Text>
        </Button>
      </Flex>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <CartItem index={index} key={index} data={item} />
        )}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Divider />}
        paddingTop={2}
      />
    </Flex>
  )
}
