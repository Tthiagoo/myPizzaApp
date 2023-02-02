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
import { Alert } from 'react-native'
import CartItem from '../components/CartItem'
import { db } from '../config/firebase'
import { useAuth } from '../context/auth'

import { useCart } from '../context/newCartContext'

export default function Carrinho() {
  const [loading, setLoading] = useState(Boolean)
  const { data, reseteCart } = useCart()
  const { user } = useAuth()
  const cartTotal = useMemo(() => {
    const total = data.reduce((accumulator, product) => {
      const productSubTotal = product.price * product.quantidade

      return accumulator + productSubTotal
    }, 0)

    return total
  }, [data])
  const newDate = new Date()
  const date = new Date().getDate()

  const month = new Date().getMonth() + 1

  const hours = new Date().getHours() //Current Hours
  const min = new Date().getMinutes()
  const newMin = (newDate.getMinutes() < 10 ? '0' : '') + newDate.getMinutes()
  const newHour = (newDate.getHours() < 10 ? '0' : '') + newDate.getHours()
  console.log(user?.apto || user?.bloco)
  console.log('teste user')
  async function handleAddOrder() {
    setLoading(true)
    const orderRef = collection(db, 'Orders')
    await addDoc(orderRef, {
      id: uuid.v4(),
      userName: user?.name,
      userId: user?.uid,
      date: `${date}/${month}`,
      aptoUser: `Apto ${user?.apto} bl ${user?.bloco}`,
      hours: `${newHour}:${newMin}`,
      status: 'Preparando',
      order: data,
      priceTotal: cartTotal
    })
      .then(async () => {
        setLoading(false)
        reseteCart()
        Alert.alert('', 'Pedido concluido com sucesso')
      })
      .catch(err => {
        console.log(err)
      })
  }
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
          isLoading={loading}
          isLoadingText="Finalizar Pedido"
          onPress={handleAddOrder}
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
