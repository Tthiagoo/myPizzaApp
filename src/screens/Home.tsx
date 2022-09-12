import { Box, Button } from 'native-base'
import React from 'react'
import { KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { SimpleLineIcons, MaterialIcons } from '@expo/vector-icons'
import Search from '../components/Search'
import Header from '../components/Header'
import HeaderList from '../components/HeaderListPizza'
import HeaderListPizza from '../components/HeaderListPizza'
import MenuPizza from '../components/MenuPizza'
import { useAuth } from '../context/auth'

export default function Home() {
  const { user } = useAuth()
  return (
    <Box flex={1} bg="light.200">
      <Header />
      <Search />
      <HeaderListPizza />
      <MenuPizza />
      {user?.isAdmin ?? (
        <Button
          bg={'red.700'}
          w="80%"
          alignSelf={'center'}
          alignItems="center"
          m="2"
          h="6%"
          borderRadius="10"
        >
          Cadastrar Pizza
        </Button>
      )}
    </Box>
  )
}
