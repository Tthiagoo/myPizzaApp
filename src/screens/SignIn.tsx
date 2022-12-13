import {
  Box,
  HStack,
  Input,
  Text,
  Image,
  Icon,
  Pressable,
  Button
} from 'native-base'
import React, { useEffect, useState } from 'react'
import ImageLogin from '../../assets/imageLogin.png'
import { MaterialIcons } from '@expo/vector-icons'

import { Heading } from 'native-base'

import { useAuth } from '../context/auth'

import { useNavigation } from '@react-navigation/native'

import { auth } from '../config/firebase'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/StackRoutesParams'
export default function SignIn() {
  const [show, setShow] = React.useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  function navigateToRegister() {
    navigation.navigate('RegisterUser', { isNewUser: true })
  }

  const { signIn, isLogging, loadUserStorageData, forgotPassword } = useAuth()

  function handleSignIn() {
    signIn(email, password)
      .then(() => {
        navigation.navigate('Stack')
      })
      .catch(error => {
        console.log(error)
      })
  }
  function handleForgotPassword() {
    forgotPassword(auth, email)
  }

  useEffect(() => {
    loadUserStorageData()
  }, [])

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
        onChangeText={setEmail}
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
        onChangeText={setPassword}
      />
      <HStack marginBottom={'10px'} justifyContent={'space-between'}>
        <Text color="white" onPress={navigateToRegister}>
          Cadastrar
        </Text>
        <Text color="white" onPress={handleForgotPassword}>
          Esqueci Senha
        </Text>
      </HStack>

      <Button
        onPress={handleSignIn}
        isLoading={isLogging}
        _pressed={{ opacity: 0.6 }}
        style={{
          borderRadius: 12,
          maxHeight: 50,
          minHeight: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#e73b49',
          flex: 1
        }}
      >
        <Text color={'white'}> Entrar </Text>
      </Button>
    </Box>
  )
}
