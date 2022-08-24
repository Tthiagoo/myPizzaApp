import { Box, Center, Heading, Icon, Input, Text } from 'native-base'
import React from 'react'
import { KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { SimpleLineIcons, MaterialIcons } from '@expo/vector-icons'
import Search from '../components/Search'
import Header from '../components/Header'
import HeaderList from '../components/HeaderListPizza'
import HeaderListPizza from '../components/HeaderListPizza'
import MenuPizza from '../components/MenuPizza'

export default function Home() {
  return (
    <Box flex={1} bg="light.200">
      <Header />
      <Search />
      <HeaderListPizza />
      <MenuPizza />
    </Box>
  )
}
