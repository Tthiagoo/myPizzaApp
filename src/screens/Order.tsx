import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import {
  ArrowBackIcon,
  Image,
  Flex,
  Heading,
  FormControl,
  KeyboardAvoidingView,
  ScrollView
} from 'native-base'

import React, { useState } from 'react'
import { Platform, TouchableOpacity } from 'react-native'
import FormOrderPizza from '../components/FormOrderPizza'
import RadioRow from '../components/RadioRow'

interface PizzaOrderProps {
  img: string
  title: string
  description: string
}

export type RootStackParamList = {
  order: PizzaOrderProps
}

export type RootRouteProps<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>

export default function PizzaOrder() {
  const route = useRoute<RouteProp<RootStackParamList, 'order'>>()
  const { ...rest } = route.params
  console.log(rest)
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }
  return (
    <KeyboardAvoidingView
      flex="1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView bg="light.200">
        <Flex bg="red.700" height={'200'} safeAreaTop>
          <ArrowBackIcon
            size="8"
            mt="8%"
            ml="5%"
            color="white"
            onPress={handleGoBack}
          />
        </Flex>
        <Image
          alt="pizza"
          rounded={'full'}
          size="2xl"
          top={'-120px'}
          source={require('../../assets/pizza2.png')}
          alignSelf="center"
        />
        <FormControl px="20px" top="-85px" h="330">
          <Heading alignSelf={'center'} mb="25px">
            Magherita
          </Heading>

          <RadioRow />

          <FormOrderPizza />
        </FormControl>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
