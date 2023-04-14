import AsyncStorage from '@react-native-async-storage/async-storage'

import { addDoc, collection } from 'firebase/firestore'
import uuid from 'react-native-uuid'
import {
  Box,
  Button,
  Divider,
  FlatList,
  Flex,
  Heading,
  Text
} from 'native-base'
import React, { useMemo, useState } from 'react'

import CartItem from '../components/CartItem'

import { useAuth } from '../context/auth'

import { useCart } from '../context/newCartContext'
import { ModalPayment } from '../components/ModalPayment'

export default function Carrinho() {
  const [loading, setLoading] = useState(Boolean)
  const [modalVisible, setModalVisible] = useState(false)

  const { data } = useCart()

  const cartTotal = useMemo(() => {
    const total = data.reduce((accumulator, product) => {
      const productSubTotal = product.price * product.quantidade

      return accumulator + productSubTotal
    }, 0)
    if (total.toString().includes('.')) {
      const priceWith0 = parseFloat(total.toString() + '0').toFixed(2)
      console.log('price0', priceWith0)

      return priceWith0
    }
    return total
  }, [data])

  function openPayment() {
    setModalVisible(true)
  }
  return (
    <>
      <ModalPayment visible={modalVisible} setVisible={setModalVisible} />
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
            isLoading={loading}
            isLoadingText="Forma de Pagamento"
            onPress={() => openPayment()}
            isDisabled={data.length === 0}
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
            <Text color={'white'}> Forma de Pagamento </Text>
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
    </>
  )
}
