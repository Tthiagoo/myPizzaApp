import { useRoute, RouteProp } from '@react-navigation/native'
import uuid from 'react-native-uuid'
import { collection, addDoc } from 'firebase/firestore'
import {
  Box,
  Button,
  Divider,
  FlatList,
  Flex,
  Heading,
  HStack,
  Text,
  VStack
} from 'native-base'
import React, { useState } from 'react'
import { Alert } from 'react-native'
import OrderDetailCard from '../components/OrderDetailCard'
import { db } from '../config/firebase'

import { useCart } from '../store/newCartContext'
import { RootStackParamList } from '../types/StackRoutesParams'

export default function OrderDetail() {
  const [loading, setLoading] = useState(Boolean)

  const { user } = useStore()
  const { reseteCart } = useCart()
  const route = useRoute<RouteProp<RootStackParamList, 'orderDetail'>>()

  const date = new Date().getDate()

  const month = new Date().getMonth() + 1

  const hours = new Date().getHours() //Current Hours
  const min = new Date().getMinutes()

  async function handleAddOrder() {
    Alert.alert(
      'Deseja refazer o pedido?',
      '',
      [
        {
          text: 'OK',
          onPress: async () => {
            setLoading(true)
            const orderRef = collection(db, 'Orders')
            await addDoc(orderRef, {
              id: uuid.v4(),
              userId: user?.uid,
              userName: user?.name,
              date: `${date}/${month}`,
              aptoUser: `Apto ${user?.apto} bl ${user?.bloco}`,
              hours: `${hours}:${min}`,
              status: 'Preparando',
              order: route.params.itemList,
              priceTotal: route.params.priceTotal,
              payment: route.params.payment
            })
              .then(async () => {
                setLoading(false)
                reseteCart()
                Alert.alert('', 'Pedido Refeito com sucesso')
              })
              .catch(err => {
                console.log(err)
              })
          }
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ],
      { cancelable: false }
    )
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
        justifyContent={'space-around'}
        alignItems={'center'}
        flexDirection="row"
      >
        {user?.isAdmin ? (
          <HStack alignItems={'center'}>
            <Heading size="sm">Total: R${route.params.priceTotal} - </Heading>
            <Heading size="sm">{route.params.payment}</Heading>
          </HStack>
        ) : (
          <VStack alignItems={'center'}>
            <Heading size="sm">Total: R${route.params.priceTotal}</Heading>
            <Heading size="sm">{route.params.payment}</Heading>
          </VStack>
        )}

        {!user?.isAdmin && (
          <Button
            isLoading={loading}
            isLoadingText="Refazendo Pedido"
            onPress={handleAddOrder}
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
            <Text color={'white'}> Refazer Pedido </Text>
          </Button>
        )}
      </Flex>
    </Flex>
  )
}
