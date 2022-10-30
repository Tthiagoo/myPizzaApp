import { useNavigation } from '@react-navigation/native'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import {
  Button,
  Flex,
  Heading,
  HStack,
  VStack,
  Text,
  FormControl
} from 'native-base'
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
import { useForm, Controller } from 'react-hook-form'

export default function RegisterUser() {
  const [loading, setLoading] = useState(Boolean)

  const navigation = useNavigation()
  const userRef = collection(db, 'Users')

  const schema = yup.object({
    name: yup
      .string()
      .required('Informe um nome')
      .min(4, 'Minimo de 4 digitos')
      .matches(/^[aA-zZ\s]+$/, 'Somente letras é aceito'),
    password: yup.string().required('Informe uma senha'),
    email: yup
      .string()
      .required('Informe um e-mail')
      .email('Digite um email valido'),
    cpf: yup
      .string()
      .required('Informe um cpf')
      .min(11, 'Informe um cpf valido')
      .matches(/^[0-9]+$/, 'Somente numeros'),
    apto: yup.string().required('Informe um apto'),
    bloco: yup.number().required('Informe um bloco')
  })

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<schemaTypeValidation>({ resolver: yupResolver(schema) })

  type schemaTypeValidation = yup.InferType<typeof schema>

  const handleUserRegistration = async (data: schemaTypeValidation) => {
    try {
      setLoading(true)
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )
      const user = res.user
      await addDoc(userRef, {
        uid: user.uid,
        name: data.name,
        email: data.email,
        apto: data.apto,
        bloco: data.bloco,
        cpf: data.cpf
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

      <FormControl>
        <VStack w="100%" mt="5" space={3}>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange } }) => (
              <Input
                onChangeText={onChange}
                errorMessage={errors.name?.message}
                placeholder="Nome"
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange } }) => (
              <Input
                onChangeText={onChange}
                errorMessage={errors.email?.message}
                placeholder="E-mail"
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                onChangeText={onChange}
                errorMessage={errors.password?.message}
                placeholder="Senha"
              />
            )}
          />
          <Controller
            control={control}
            name="cpf"
            render={({ field: { onChange } }) => (
              <Input
                onChangeText={onChange}
                errorMessage={errors.cpf?.message}
                placeholder="CPF"
              />
            )}
          />

          <HStack w="100%" space={3} paddingX="1" justifyContent="center">
            <Controller
              control={control}
              name="apto"
              render={({ field: { onChange } }) => (
                <Input
                  onChangeText={onChange}
                  errorMessage={errors.apto?.message}
                  w="50%"
                  placeholder="APTO"
                />
              )}
            />
            <Controller
              control={control}
              name="bloco"
              render={({ field: { onChange } }) => (
                <Input
                  onChangeText={onChange}
                  errorMessage={errors.bloco?.message}
                  w="50%"
                  placeholder="Bloco"
                />
              )}
            />
          </HStack>
          <Button
            onPress={handleSubmit(handleUserRegistration)}
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
      </FormControl>
    </Flex>
  )
}
