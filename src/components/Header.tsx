import { MaterialIcons } from '@expo/vector-icons'
import { Box, Heading, Icon } from 'native-base'
import React from 'react'
import { TouchableOpacity } from 'react-native'

export default function Header() {
  return (
    <Box
      bg={'red.700'}
      paddingX="5%"
      width={'100%'}
      justifyContent={'center'}
      height="18%"
    >
      <Box
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems="center"
      >
        <Heading size={'md'} color="white">
          Olá, Cliente
        </Heading>
        <TouchableOpacity>
          <Icon as={MaterialIcons} name="logout" color="white" size={'lg'} />
        </TouchableOpacity>
      </Box>
    </Box>
  )
}
