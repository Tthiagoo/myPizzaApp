import { useNavigation } from '@react-navigation/native'
import { Button, Flex, Heading, HStack, Input, VStack, Text } from 'native-base'
import React, { useState } from 'react'
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { auth, db } from '../config/firebase'
import { addDoc, collection } from 'firebase/firestore'
import { Alert } from 'react-native'

export default function RegisterUser() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpf, setCpf] = useState('')
  const [apto, setApto] = useState('')
  const [bloco, setBloco] = useState('')

  const [loading, setLoading] = useState(Boolean)

  const navigation = useNavigation()
  const userRef = collection(db, 'Users')

  const handleUserRegistration = async () => {
    try {
      setLoading(true)
      const res = await createUserWithEmailAndPassword(auth, email, password)
      const user = res.user
      await addDoc(userRef, {
        uid: user.uid,
        name,
        authProvider: 'local',
        email,
        apto,
        bloco,
        cpf
      }).then(() => {
        setLoading(false)
        Alert.alert('Cadastro', 'Cadastro concluido com sucesso')
        navigation.navigate('login')
      })
    } catch (err) {
      setLoading(false)
      Alert.alert(String(err))
    }
  }
  return (
    <Flex
      flex={1}
      bg={{
        linearGradient: {
          colors: ['red.600', 'red.900'],
          start: [0, 1],
          end: [1, 0]
        }
      }}
      padding="10%"
      safeAreaTop
      alignItems="center"
      justifyContent="center"
    >
      <Heading color="white">Faça seu cadastro</Heading>
      <VStack w="100%" mt="5" space={3}>
        <Input
          placeholderTextColor={'white'}
          color="muted.50"
          size="md"
          placeholder="Nome"
          marginBottom={'5%'}
          borderColor="light.100"
          borderWidth={'0.3'}
          variant="unstyled"
          onChangeText={setName}
        />
        <Input
          placeholderTextColor={'white'}
          color="muted.50"
          size="md"
          placeholder="E-mail"
          marginBottom={'5%'}
          borderColor="light.100"
          borderWidth={'0.3'}
          variant="unstyled"
          onChangeText={setEmail}
        />
        <Input
          placeholderTextColor={'white'}
          color="muted.50"
          size="md"
          placeholder="Senha"
          marginBottom={'5%'}
          borderColor="light.100"
          borderWidth={'0.3'}
          variant="unstyled"
          onChangeText={setPassword}
        />
        <Input
          placeholderTextColor={'white'}
          color="muted.50"
          size="md"
          placeholder="CPF"
          marginBottom={'5%'}
          borderColor="light.100"
          borderWidth={'0.3'}
          variant="unstyled"
          onChangeText={setCpf}
        />
        <HStack w="100%" space={3} paddingX="1" justifyContent="center">
          <Input
            placeholderTextColor={'white'}
            color="muted.50"
            size="md"
            w="50%"
            placeholder="APTO"
            marginBottom={'5%'}
            borderColor="light.100"
            borderWidth={'0.3'}
            variant="unstyled"
            onChangeText={setApto}
          />
          <Input
            placeholderTextColor={'white'}
            color="muted.50"
            size="md"
            w="50%"
            placeholder="Bloco"
            marginBottom={'5%'}
            borderColor="light.100"
            borderWidth={'0.3'}
            variant="unstyled"
            onChangeText={setBloco}
          />
        </HStack>
        <Button
          onPress={handleUserRegistration}
          isLoading={loading}
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
          <Text color={'white'}> Cadastar </Text>
        </Button>
      </VStack>
    </Flex>
  )
}
