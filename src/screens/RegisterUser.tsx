import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import {
  Button,
  Flex,
  Heading,
  HStack,
  VStack,
  Text,
  FormControl,
  Select
} from 'native-base'
import React, { useEffect, useState } from 'react'
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { auth, db } from '../config/firebase'
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where
} from 'firebase/firestore'
import { Alert } from 'react-native'
import Input from '../components/InputForm'
import { useForm, Controller } from 'react-hook-form'
import { schema } from '../schemas/yupSchema'
import { RootStackParamList } from '../types/StackRoutesParams'
import { useAuth } from '../context/auth'

export default function RegisterUser() {
  const [loading, setLoading] = useState(Boolean)
  const [blocoUser, setBloco] = useState('1')

  const route = useRoute<RouteProp<RootStackParamList, 'RegisterUser'>>()
  const { isNewUser } = route.params
  const { user, setUser } = useAuth()
  const userRef = collection(db, 'Users')
  console.log('user vindo do context do register', user)
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<schemaTypeValidation>({
    resolver: yupResolver(schema),
    shouldUnregister: false,
    defaultValues: {
      name: user?.name,
      email: user?.email,
      password: user?.password,
      cpf: user?.cpf,
      apto: user?.apto
    }
  })

  type schemaTypeValidation = yup.InferType<typeof schema>

  async function getUserApto(data: schemaTypeValidation) {
    const usersDocReference = query(userRef, where('apto', '==', data.apto))
    const querySnapshot = await getDocs(usersDocReference)
    const result = querySnapshot.docs.map(doc => doc.data())

    const findBloco = result.filter(({ bloco }) => bloco === blocoUser)
    return findBloco
  }

  async function getDocId() {
    const usersDocReference = query(userRef, where('uid', '==', user?.uid))
    const querySnapshot = await getDocs(usersDocReference)
    const result = querySnapshot.docs.map(doc => doc.id)
    console.log('result', result[0])
    return result[0]
  }

  async function UpdateUser(data: schemaTypeValidation) {
    const docId = await getDocId()

    const docRef = doc(db, 'Users', docId)
    const userData = {
      uid: user?.uid,
      name: data.name,
      email: data.email,
      password: data.password,
      apto: data.apto,
      bloco: blocoUser,
      cpf: data.cpf
    }
    try {
      setLoading(true)
      await updateDoc(docRef, userData).then(() => {
        setLoading(false)
        Alert.alert('Alteração', 'Alteração concluida com sucesso')
        setUser(userData)
      })
    } catch (err: any) {
      Alert.alert(err)
    }
  }

  async function AddUser(data: schemaTypeValidation) {
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
        password: data.password,
        apto: data.apto,
        bloco: blocoUser,
        cpf: data.cpf
      }).then(() => {
        setLoading(false)
        Alert.alert('Cadastro', 'Cadastro concluido com sucesso')
      })
    } catch (err) {
      setLoading(false)
      Alert.alert('Cadastro', 'Email já em uso')
    }
  }

  const handleUserRegistration = async (data: schemaTypeValidation) => {
    const result = await getUserApto(data)
    if (!user) {
      const findCpf = result.find(({ cpf }) => cpf === data.cpf)
      if (findCpf) {
        Alert.alert('Cadastro', 'CPF ja cadastrado')
        return
      }
    }

    if (result?.length == 5) {
      Alert.alert('Cadastro', 'Limite de 5 CPF por apartamento atingido')
      return
    }

    if (user) {
      UpdateUser(data)
    } else {
      AddUser(data)
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
      <Heading color="white">
        {isNewUser ? 'Faça seu cadastro' : 'Altere seus dados'}
      </Heading>

      <FormControl>
        <VStack w="100%" mt="5" space={3}>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange } }) => (
              <Input
                defaultValue={user?.name}
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
                isDisabled={user?.email ? true : false}
                defaultValue={user?.email}
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
                defaultValue={user?.password}
                isDisabled={user?.email ? true : false}
                errorMessage={errors.password?.message}
                placeholder={'senha'}
              />
            )}
          />
          <Controller
            control={control}
            name="cpf"
            render={({ field: { onChange } }) => (
              <Input
                keyboardType="numeric"
                onChangeText={onChange}
                defaultValue={user?.cpf}
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
                  keyboardType="numeric"
                  onChangeText={onChange}
                  defaultValue={user?.apto}
                  errorMessage={errors.apto?.message}
                  w="50%"
                  placeholder="APTO"
                />
              )}
            />

            <Select
              selectedValue={blocoUser}
              variant={'unstyled'}
              borderWidth={'0.3'}
              borderColor="light.100"
              size="md"
              color="white"
              defaultValue={user?.bloco}
              w="140px"
              _selectedItem={{
                bg: 'green.200'
              }}
              onValueChange={itemValue => setBloco(itemValue)}
            >
              <Select.Item label="Bloco 1" value="1" />
              <Select.Item label="Bloco 2" value="2" />
              <Select.Item label="Bloco 3" value="3" />
              <Select.Item label="Bloco 4" value="4" />
              <Select.Item label="Bloco 5" value="5" />
              <Select.Item label="Bloco 6" value="6" />
              <Select.Item label="Bloco 7" value="7" />
            </Select>
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
            <Text color={'white'}> {user ? 'Alterar' : 'Cadastrar'} </Text>
          </Button>
        </VStack>
      </FormControl>
    </Flex>
  )
}
