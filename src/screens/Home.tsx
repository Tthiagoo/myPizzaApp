import { Box, Button } from 'native-base'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Search from '../components/Search'
import Header from '../components/Header'

import HeaderListPizza from '../components/HeaderListPizza'
import MenuPizza from '../components/MenuPizza'
import { useAuth } from '../context/auth'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export default function Home() {
  type RootStackParamList = {
    RegisterPizza: { isAdd: boolean }
  }
  const { user } = useAuth()

  console.log(user?.isAdmin ? 'é admin' : 'nao é')
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  function handleNavigation() {
    navigation.navigate('RegisterPizza', { isAdd: true })
  }

  return (
    <Box flex={1} bg="light.200">
      <Header />
      <Search />
      <HeaderListPizza />
      <MenuPizza />
      {user?.isAdmin && (
        <Button
          bg={'red.700'}
          onPress={handleNavigation}
          w="80%"
          alignSelf={'center'}
          alignItems="center"
          m="2"
          h="6%"
          borderRadius="10"
          _pressed={{ bg: 'red.700', opacity: 0.6 }}
        >
          Cadastrar Pizza
        </Button>
      )}
    </Box>
  )
}
