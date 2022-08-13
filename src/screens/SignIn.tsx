import {
  Box,
  Button,
  Center,
  HStack,
  Input,
  VStack,
  Text,
  Image,
  Icon,
  Pressable
} from 'native-base'
import React from 'react'
import ImageLogin from '../../assets/imageLogin.png'

import { Heading } from 'native-base'
export default function SignIn() {
  const [show, setShow] = React.useState(false)
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
      width={'100%'}
      height="100%"
      justifyContent={'center'}
    >
      <Image
        source={ImageLogin}
        alt="Alternate Text"
        size="2xl"
        resizeMode="contain"
        alignSelf={'center'}
      />
      <Heading size="xl" color="white" paddingBottom={'10px'}>
        Login
      </Heading>
      <Input
        type={show ? 'text' : 'password'}
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
        placeholder="e-mail"
        autoCorrect={false}
        autoCapitalize="none"
        marginBottom={'5%'}
        variant="unstyled"
      />
      <Input
        color="muted.50"
        size="md"
        placeholder="senha"
        secureTextEntry
        marginBottom={'5%'}
        borderColor="light.100"
        borderWidth={'0.3'}
        variant="unstyled"
      />
      <HStack marginBottom={'10px'} justifyContent={'space-between'}>
        <Text color="white">Cadastrar</Text>
        <Text color="white">Esqueci Senha</Text>
      </HStack>
      <Button
        size="lg"
        borderRadius={'12px'}
        bg={'red.500'}
        maxH="56px"
        minH="56px"
      >
        Entrar
      </Button>
    </Box>
  )
}
