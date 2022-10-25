import { MaterialIcons } from '@expo/vector-icons'
import { Box, Heading, Icon } from 'native-base'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useAuth } from '../context/auth'

export default function Header() {
  const { signOutAuth, user } = useAuth()

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
          Olá, {user?.name}
        </Heading>
        <TouchableOpacity onPress={signOutAuth}>
          <Icon as={MaterialIcons} name="logout" color="white" size={'lg'} />
        </TouchableOpacity>
      </Box>
    </Box>
  )
}
