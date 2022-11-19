import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Badge, Box, Heading, HStack, Icon } from 'native-base'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useAuth } from '../context/auth'

export default function Header() {
  const { signOutAuth, user } = useAuth()
  const navigation = useNavigation()
  function navigateToRegister() {
    navigation.navigate('RegisterUser')
  }
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
        <HStack space={3} alignItems="center">
          <Heading size={'md'} color="white">
            Olá, {user?.name}
          </Heading>
          <TouchableOpacity onPress={navigateToRegister}>
            <Badge
              variant={'outline'}
              borderRadius={'7px'}
              borderColor="white"
              alignSelf="center"
              _text={{
                fontSize: 12,
                color: 'white'
              }}
            >
              Editar Perfil
            </Badge>
          </TouchableOpacity>
        </HStack>

        <TouchableOpacity onPress={signOutAuth}>
          <Icon as={MaterialIcons} name="logout" color="white" size={'lg'} />
        </TouchableOpacity>
      </Box>
    </Box>
  )
}
