import { useNavigation } from '@react-navigation/native'
import { Button, Flex, Heading, HStack, VStack, Text } from 'native-base'
import React, { useState } from 'react'
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { auth, db } from '../config/firebase'
import { addDoc, collection } from 'firebase/firestore'
import { Alert } from 'react-native'
import Input from '../components/InputForm'

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
    if (!name.trim()) {
      return Alert.alert('Cadastro', 'Informe o seu da nome.')
    }

    if (!email.trim()) {
      return Alert.alert('Cadastro', 'Informe o seu e-mail')
    }

    if (!password) {
      return Alert.alert('Cadastro', 'Informe a sua senha')
    }
    if (!cpf.trim()) {
      return Alert.alert('Cadastro', 'Informe o seu CPF')
    }
    if (!apto.trim()) {
      return Alert.alert('Cadastro', 'Informe o seu apartamento.')
    }

    if (!bloco) {
      return Alert.alert('Cadastro', 'Informe o seu bloco')
    }

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
        <Input onChangeText={setName} placeholder="Nome" />
        <Input placeholder="E-mail" onChangeText={setEmail} />
        <Input placeholder="Senha" onChangeText={setPassword} />
        <Input placeholder="CPF" onChangeText={setCpf} />
        <HStack w="100%" space={3} paddingX="1" justifyContent="center">
          <Input w="50%" placeholder="APTO" onChangeText={setApto} />
          <Input w="50%" placeholder="Bloco" onChangeText={setBloco} />
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
