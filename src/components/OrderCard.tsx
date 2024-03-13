import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where
} from 'firebase/firestore'
import { Badge, Box, Flex, Heading, Image, Text } from 'native-base'
import React, { useEffect, useState } from 'react'
import { TouchableOpacityProps, TouchableOpacity, Alert } from 'react-native'
import { db } from '../config/firebase'

import { HistoryProps } from '../screens/OrderHistory'
import { ProductProps } from '../types/orderProps'
import { RootStackParamList } from '../types/StackRoutesParams'

type Props = TouchableOpacityProps & {
  id: string
  dataOrderDetail: ProductProps
  index: number
  data: HistoryProps
  lenghtArrayHistory: number
  itemList: ProductProps[]
  priceTotal: number
  payment: string
}
export default function OrderCard({
  id,
  index,
  data,
  dataOrderDetail,
  lenghtArrayHistory,
  itemList,
  priceTotal,
  payment,
  ...rest
}: Props) {
  const { user } = useStore()
  const [statusOrder, setStatusOrder] = useState(
    'Preparando' || 'Pronto' || 'Entregue'
  )

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const colorsStatus = {
    Preparando: '#788533',
    Pronto: '#8f3333',
    Entregue: '#528F33'
  }
  const OrderRef = collection(db, 'Orders')

  function handleOpen() {
    navigation.navigate('orderDetail', { itemList, priceTotal, payment })
  }

  async function getDocId() {
    const OrderDocReference = query(OrderRef, where('id', '==', id))
    const querySnapshot = await getDocs(OrderDocReference)
    const result = querySnapshot.docs.map(doc => doc.id)

    return result[0]
  }

  async function handleChangeStatus() {
    if (data.status === 'Entregue') {
      Alert.alert('O Pedido ja foi entregue')
      return
    }
    const status = statusOrder === 'Preparando' ? 'Pronto' : 'Entregue'

    const docId = await getDocId()
    const docRef = doc(db, 'Orders', docId)
    const userData = {
      status
    }
    try {
      Alert.alert('Pedido', 'Deseja alterar o status do pedido?', [
        {
          text: 'Não',
          style: 'cancel'
        },
        {
          text: 'Sim',
          onPress: async () => {
            await updateDoc(docRef, userData).then(() => {
              Alert.alert('Pedido', 'Alteração concluida')
              setStatusOrder(status)
            })
          }
        }
      ])
    } catch (err: any) {
      Alert.alert(err)
    }
  }

  useEffect(() => {
    setStatusOrder(data.status)
  }, [])

  return (
    <Flex
      flexDirection={'column'}
      alignItems="center"
      w="100%"
      p="7px"
      marginTop={'10px'}
      mb="15px"
      style={lenghtArrayHistory === 1 ? { width: '100%' } : { width: '50%' }}
      justifyContent={'center'}
      borderRightColor="gray.300"
      borderRightWidth={index % 2 > 0 ? 0 : '1px'}
    >
      <TouchableOpacity
        onPress={() => handleOpen()}
        style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}
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
          {user?.isAdmin
            ? `${data.userName} | R$ ${data.priceTotal}`
            : `${data.date} - ${data.hours}`}
        </Heading>
        <Text mt="2">
          {user?.isAdmin
            ? `${data.aptoUser} | ${data.date} | ${data.hours}`
            : `R$ ${data.priceTotal}`}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleChangeStatus()}
        disabled={!user?.isAdmin || statusOrder === 'Entregue'}
      >
        <Badge
          mt="2"
          bg={colorsStatus[statusOrder]}
          paddingX="4"
          paddingY={'5'}
          borderRadius={'10'}
        >
          <Text color="white">{statusOrder}</Text>
        </Badge>
      </TouchableOpacity>
    </Flex>
  )
}
