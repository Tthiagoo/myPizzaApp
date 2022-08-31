import { Box, HStack, Input, Text, Image, Icon, Pressable } from 'native-base'
import React from 'react'
import ImageLogin from '../../assets/imageLogin.png'
import { MaterialIcons } from '@expo/vector-icons'

import { Heading } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
export default function SignIn() {
  const [show, setShow] = React.useState(false)
  const navigation = useNavigation()
  return (
    <Box
      flex={1}
      bg={{
        linearGradient: {
          colors: ['red.500', 'red.900'],
          start: [0, 1],
          end: [1, 0]
        }
      }}
      padding="8%"
      safeAreaTop
      justifyContent={'center'}
    >
      <Image
        source={ImageLogin}
        alt="Alternate Text"
        size="2xl"
        resizeMode="contain"
        alignSelf={'center'}
      />
      <Heading color="white" paddingBottom={'10px'}>
        Login
      </Heading>

      <Input
        placeholderTextColor={'white'}
        color="muted.50"
        size="md"
        placeholder="e-mail"
        marginBottom={'5%'}
        borderColor="light.100"
        borderWidth={'0.3'}
        variant="unstyled"
      />

      <Input
        placeholderTextColor={'white'}
        type={show ? 'text' : 'password'}
        variant="unstyled"
        InputRightElement={
          <Pressable onPress={() => setShow(!show)}>
            <Icon
              as={
                <MaterialIcons name={show ? 'visibility' : 'visibility-off'} />
              }
              size={5}
              mr="2"
              color="muted.400"
            />
          </Pressable>
        }
        color="white"
        size="md"
        borderColor="muted.200"
        borderWidth={'0.3'}
        placeholder="senha"
        autoCorrect={false}
        autoCapitalize="none"
        marginBottom={'5%'}
      />
      <HStack marginBottom={'10px'} justifyContent={'space-between'}>
        <Text color="white">Cadastrar</Text>
        <Text color="white">Esqueci Senha</Text>
      </HStack>

      <TouchableOpacity
        onPress={() => navigation.navigate('UserTabRoutes')}
        activeOpacity={0.4}
        style={{
          borderRadius: 12,
          maxHeight: 50,
          minHeight: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#eb5360',
          flex: 1
        }}
      >
        <Text color={'white'}> Entrar </Text>
      </TouchableOpacity>
    </Box>
  )
}
