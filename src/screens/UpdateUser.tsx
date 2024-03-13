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
  Select,
  Badge
} from 'native-base'
import React, { useState } from 'react'
import { deleteUser, getAuth } from 'firebase/auth'
import { auth, db } from '../config/firebase'
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where
} from 'firebase/firestore'

import { Alert, TouchableOpacity } from 'react-native'
import Input from '../components/InputForm'
import { useForm, Controller } from 'react-hook-form'
import { schema, schemaUpdate } from '../schemas/yupSchema'

import { useStore } from '../modules/auth/store/authStore'

export default function UpdateUser() {
  const [loading, setLoading] = useState(Boolean)
  const [blocoUser, setBloco] = useState('1')
  const auth = getAuth()

  const userLogged = auth!.currentUser

  const { user, setUser, signOutAuth } = useStore()

  const userRef = collection(db, 'Users')

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<schemaTypeValidation>({
    resolver: yupResolver(schemaUpdate),
    shouldUnregister: false,
    defaultValues: {
      name: user?.name,
      email: user?.email,

      cpf: user?.cpf,
      apto: user?.apto
    }
  })

  type schemaTypeValidation = yup.InferType<typeof schemaUpdate>

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

    return result[0]
  }

  async function UpdateUser(data: schemaTypeValidation) {
    const docId = await getDocId()

    const docRef = doc(db, 'Users', docId)
    const userData = {
      uid: user?.uid,
      name: data.name,
      email: data.email,

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

    UpdateUser(data)
  }

  function handleDeleteUser() {
    Alert.alert(
      'Deseja excluir seu perfil?',
      '',
      [
        {
          text: 'OK',
          onPress: async () => {
            await deleteUser(userLogged)
              .then(() => {
                Alert.alert('', 'Usuario excluido com sucesso')
                signOutAuth()
              })
              .catch(err => {
                Alert.alert(err.message)
              })
          }
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ],
      { cancelable: false }
    )
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
      <HStack space={'3'} alignItems={'center'} justifyContent="center">
        <Heading size={'md'} color="white">
          {'Altere seus dados'}
        </Heading>
        <TouchableOpacity onPress={handleDeleteUser}>
          <Badge borderRadius={'7px'} alignSelf="center" colorScheme={'red'}>
            Excluir Perfil
          </Badge>
        </TouchableOpacity>
      </HStack>

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
                isDisabled={true}
                defaultValue={user?.email}
                errorMessage={errors.email?.message}
                placeholder="E-mail"
              />
            )}
          />

          <Input
            isDisabled={true}
            errorMessage={errors.password?.message}
            placeholder={'Senha'}
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
            <Text color={'white'}> {'Alterar'} </Text>
          </Button>
        </VStack>
      </FormControl>
    </Flex>
  )
}
