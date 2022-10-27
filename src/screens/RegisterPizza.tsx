import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import { db, storage } from '../config/firebase'
import {
  Image,
  ArrowBackIcon,
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  HStack,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  Stack,
  Text,
  TextArea,
  Badge,
  Pressable
} from 'native-base'

import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Alert, Platform, TouchableOpacity } from 'react-native'
import { InputPrice, InputPriceUnique } from '../components/itemPrice'

import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { RootStackParamList } from '../types/StackRoutesParams'

export default function RegisterPizza() {
  const navigation = useNavigation()
  const route = useRoute<RouteProp<RootStackParamList, 'order'>>()

  const {
    id,
    photo_url,
    name: title,
    description: detalhes,
    prices_sizes,
    uniquePrice: priceUnique
  } = route.params

  const [image, setImage] = useState('')

  const [name, setName] = useState('')
  const [typeProduct, setTypeProduct] = useState('Pizza')
  const [description, setDescription] = useState('')
  const [priceSizeP, setPriceSizeP] = useState('')
  const [priceSizeM, setPriceSizeM] = useState('')
  const [priceSizeG, setPriceSizeG] = useState('')
  const [uniquePrice, setUniquePrice] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handlePickerImage() {
    //const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 4]
    })

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  function handleGoBack() {
    navigation.goBack()
  }

  useEffect(() => {
    if (id) {
      setImage(photo_url)
      setName(title)
      setDescription(detalhes)
      setPriceSizeP(prices_sizes?.p)
      setPriceSizeM(prices_sizes?.m)
      setPriceSizeG(prices_sizes?.g)
      setUniquePrice(priceUnique)
    }
  }, [id])

  async function handleDelete() {
    Alert.alert(
      'Deseja Deletar o produto?',
      '',
      [
        {
          text: 'OK',
          onPress: async () => {
            await deleteDoc(doc(db, 'Pizzas', id))
              .then(() => {
                Alert.alert('Delete', 'Produto excluido com sucesso')
                navigation.navigate('home')
              })
              .catch(err => {
                console.log(err)
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

  async function handleAdd() {
    if (!name.trim()) {
      return Alert.alert('Cadastro', 'Informe o nome da pizza.')
    }

    if (!description.trim()) {
      return Alert.alert('Cadastro', 'Informe a descrição da pizza.')
    }

    if (!image) {
      return Alert.alert('Cadastro', 'Selecione a imagem da pizza.')
    }
    if (typeProduct === 'Pizza') {
      if (!priceSizeP || !priceSizeM || !priceSizeG) {
        return Alert.alert(
          'Cadastro',
          'Informe o preço de todos os tamanhos da pizza.'
        )
      }
    }

    setIsLoading(true)
    const fileName = new Date().getTime()
    const storageRef = ref(storage, `/pizzas/${fileName}.png`)
    const userRef = collection(db, 'Pizzas')

    const response = await fetch(image)
    const blob = await response.blob()

    const uploadTask = uploadBytesResumable(storageRef, blob)

    uploadTask.on(
      'state_changed',
      snapshot => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
      },
      err => console.log(err),
      async () => {
        const photo_url = await getDownloadURL(uploadTask.snapshot.ref)
        await addDoc(userRef, {
          name,
          name_insensitive: name.toLowerCase().trim(),
          description,
          prices_sizes: {
            p: priceSizeP,
            m: priceSizeM,
            g: priceSizeG
          },
          photo_url: photo_url,
          photo_path: storageRef.fullPath,
          typeProduct,
          uniquePrice
        })
          .then(() => {
            setIsLoading(false)
            Alert.alert('Cadastro', 'Cadastro concluido com sucesso')
            navigation.navigate('home')
          })
          .catch(function (error) {
            console.log(
              'There has been a problem with your fetch operation: ' +
                error.message
            )

            throw error
          })
        // download url
      }
    )

    console.log('chegou aqui')
  }

  async function handleUpdate() {
    if (!name.trim()) {
      return Alert.alert('Cadastro', 'Informe o nome da pizza.')
    }

    if (!description.trim()) {
      return Alert.alert('Cadastro', 'Informe a descrição da pizza.')
    }

    if (!image) {
      return Alert.alert('Cadastro', 'Selecione a imagem da pizza.')
    }

    if (!priceSizeP || !priceSizeM || !priceSizeG) {
      return Alert.alert(
        'Cadastro',
        'Informe o preço de todos os tamanhos da pizza.'
      )
    }
    setIsLoading(true)
    const fileName = new Date().getTime()
    const storageRef = ref(storage, `/pizzas/${fileName}.png`)
    const userRef = doc(db, 'Pizzas', id)

    const response = await fetch(image)
    const blob = await response.blob()

    const uploadTask = uploadBytesResumable(storageRef, blob)

    uploadTask.on(
      'state_changed',
      snapshot => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
      },
      err => console.log(err),
      async () => {
        const photo_url = await getDownloadURL(uploadTask.snapshot.ref)
        await updateDoc(userRef, {
          name,
          name_insensitive: name.toLowerCase().trim(),
          description,
          prices_sizes: {
            p: priceSizeP,
            m: priceSizeM,
            g: priceSizeG
          },
          photo_url: photo_url,
          photo_path: storageRef.fullPath
        })
          .then(() => {
            setIsLoading(false)
            Alert.alert('Update', 'Atulização concluida com sucesso')
            navigation.navigate('home')
          })
          .catch(function (error) {
            console.log(
              'There has been a problem with your fetch operation: ' +
                error.message
            )

            throw error
          })
        // download url
      }
    )

    console.log('chegou aqui')
  }

  return (
    <KeyboardAvoidingView
      flex="1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Flex
        safeAreaTop
        w="100%"
        h="15%"
        bg="red.700"
        alignItems={'center'}
        justifyContent="center"
        flexDirection={'row'}
        color="white"
      >
        <Heading size="md" color="white">
          Cadastrar Produto
        </Heading>
        {id && (
          <Box ml="4">
            <TouchableOpacity style={{ padding: 7 }} onPress={handleDelete}>
              <Text color={'white'}>Deletar</Text>
            </TouchableOpacity>
          </Box>
        )}
      </Flex>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HStack mt="8" space={7} justifyContent={'center'}>
          <Flex
            borderColor={'black'}
            h="160px"
            w="160px"
            borderRadius={'full'}
            borderStyle={'dashed'}
            borderWidth={image ? '0' : '1'}
            alignItems={'center'}
            justifyContent="center"
            textAlign={'center'}
          >
            {image ? (
              <Image
                w="100%"
                h="100%"
                alt="pizza"
                rounded={'full'}
                source={{ uri: image }}
                alignSelf="center"
              />
            ) : (
              <Text textAlign={'center'}>Nenhuma foto carregada</Text>
            )}
          </Flex>
          <Button
            bg={'red.700'}
            w="28%"
            alignSelf={'center'}
            alignItems="center"
            h="35%"
            borderRadius="10"
            _pressed={{ bg: 'red.700', opacity: 0.6 }}
            onPress={handlePickerImage}
          >
            Carregar
          </Button>
        </HStack>

        <FormControl>
          <Stack space={5} p="5">
            <Stack>
              <FormControl.Label>Nome</FormControl.Label>
              <Input
                borderRadius={'10px'}
                bg="white"
                type={'text'}
                variant={'unstyled'}
                borderColor="gray.300"
                borderWidth={'1'}
                p="0.9rem"
                value={name}
                onChangeText={setName}
                fontSize={'md'}
                w="100%"
                _focus={{ backgroundColor: '#fff', borderColor: 'white' }}
              />
            </Stack>
            <Stack>
              <FormControl.Label>Detalhes</FormControl.Label>
              <TextArea
                h={20}
                fontSize={'md'}
                borderRadius={'10px'}
                w="100%"
                value={description}
                onChangeText={setDescription}
                autoCompleteType={undefined}
                borderColor="gray.300"
                variant={'unstyled'}
                backgroundColor="white"
                p="0.9rem"
              />
            </Stack>
          </Stack>
          <Stack px="5" mb="6">
            <Text>Tipo de Produto</Text>

            <HStack w="100%" mt="2" space={4}>
              <Pressable
                w="20%"
                h="12"
                onPress={() => {
                  setTypeProduct('Pizza')
                }}
              >
                <Badge
                  w="100%"
                  h="100%"
                  bg={typeProduct == 'Pizza' ? '#528F33' : 'gray.400'}
                  borderRadius={'10'}
                >
                  <Text color="white">Pizza</Text>
                </Badge>
              </Pressable>
              <Pressable
                w="30%"
                h="12"
                onPress={() => {
                  setTypeProduct('Sobremesa')
                }}
              >
                <Badge
                  w="100%"
                  h="100%"
                  bg={typeProduct == 'Sobremesa' ? '#528F33' : 'gray.400'}
                  borderRadius={'10'}
                >
                  <Text color="white">Sobremesa</Text>
                </Badge>
              </Pressable>

              <Pressable
                w="23%"
                h="12"
                onPress={() => {
                  setTypeProduct('Bebida')
                }}
              >
                <Badge
                  w="100%"
                  h="100%"
                  bg={typeProduct == 'Bebida' ? '#528F33' : 'gray.400'}
                  borderRadius={'10'}
                >
                  <Text color="white">Bebida</Text>
                </Badge>
              </Pressable>
            </HStack>
          </Stack>

          <Stack px="5" space={2} paddingBottom={3}>
            {typeProduct === 'Pizza' ? (
              <>
                <Text>Tamanhos e Preços</Text>
                <InputPrice
                  size="P"
                  onChangeText={setPriceSizeP}
                  value={priceSizeP}
                />
                <InputPrice
                  size="M"
                  onChangeText={setPriceSizeM}
                  value={priceSizeM}
                />
                <InputPrice
                  size="G"
                  onChangeText={setPriceSizeG}
                  value={priceSizeG}
                />
              </>
            ) : (
              <>
                <Text>Preço</Text>
                <InputPriceUnique
                  onChangeText={setUniquePrice}
                  value={uniquePrice}
                />
              </>
            )}
          </Stack>
        </FormControl>
        <Button
          bg={'red.700'}
          w="80%"
          isLoading={isLoading}
          alignSelf={'center'}
          alignItems="center"
          h="7%"
          marginBottom={'30px'}
          borderRadius="10"
          _pressed={{ bg: 'red.700', opacity: 0.6 }}
          onPress={id ? handleUpdate : handleAdd}
        >
          {id ? 'Editar Produto' : 'Salvar Produto'}
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
