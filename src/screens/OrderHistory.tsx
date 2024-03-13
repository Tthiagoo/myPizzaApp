import { useFocusEffect } from '@react-navigation/native'

import {
  collection,
  query,
  orderBy,
  startAt,
  endAt,
  getDocs,
  where
} from 'firebase/firestore'
import { Box, Divider, FlatList, Flex, Heading, Text } from 'native-base'
import React, { useCallback, useEffect, useState } from 'react'
import OrderCard from '../components/OrderCard'
import { db } from '../config/firebase'

import { ProductProps } from '../types/orderProps'
import { useStore } from '../modules/auth/store/authStore'

export interface HistoryProps {
  userName: string
  id: string
  aptoUser: string
  date: string
  hours: string
  order: ProductProps[]
  status: string
  userId: string
  priceTotal: number
  payment: string
}

export default function OrderHistory() {
  const [history, setHistory] = useState<HistoryProps[]>([])
  const { user } = useStore()

  async function getMenuPizza() {
    const historyRef = collection(db, 'Orders')
    const usersDocReference = query(
      historyRef,
      where('userId', '==', user?.uid)
    )
    const historyDocReference = query(historyRef)
    const querySnapshot = user?.isAdmin
      ? await getDocs(historyDocReference)
      : await getDocs(usersDocReference)
    const dataProducts = querySnapshot.docs.map(doc => {
      return doc.data()
    }) as HistoryProps[]

    setHistory(dataProducts)
  }

  useFocusEffect(
    useCallback(() => {
      getMenuPizza().then(() => {
        console.log(history)
      })
    }, [])
  )
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
          Pedidos Feitos
        </Heading>
      </Flex>
      <FlatList
        data={history}
        renderItem={({ item, index }) => (
          <OrderCard
            id={item.id}
            index={index}
            data={item}
            dataOrderDetail={item.order[0]}
            itemList={item.order}
            lenghtArrayHistory={history.length}
            priceTotal={item.priceTotal}
            payment={item.payment}
          />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Divider />}
        ListEmptyComponent={<Text>Sem Pedidos Recentes</Text>}
      />
    </Flex>
  )
}
