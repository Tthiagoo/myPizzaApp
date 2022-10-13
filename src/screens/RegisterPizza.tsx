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
  TextArea
} from 'native-base'

import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where
} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Alert, Platform } from 'react-native'
import { InputPrice } from '../components/itemPrice'
import { ProductProps } from '../types/product'
import { RootStackParamList } from './Order'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'

type PizzaResponse = ProductProps & {
  photo_path: string
  prices_sizes: {
    p: string
    m: string
    g: string
  }
}

export default function RegisterPizza() {
  const navigation = useNavigation()
  const route = useRoute<RouteProp<RootStackParamList, 'order'>>()

  const {
    id,
    image: imageRoute,
    title,
    description: detalhes,
    isAdd
  } = route.params

  const [image, setImage] = useState('')
  const [imgUrl, setImgUrl] = useState(null)
  const [progresspercent, setProgresspercent] = useState(0)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [priceSizeP, setPriceSizeP] = useState('')
  const [priceSizeM, setPriceSizeM] = useState('')
  const [priceSizeG, setPriceSizeG] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [photoPath, setPhotoPath] = useState('')

  console.log(image)
  async function handlePickerImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4]
      })

      if (!result.cancelled) {
        setImage(result.uri)
      }
    }
  }

  function setParamsRoute() {
    if (id) {
      console.log('foi')
      console.log(title)
      setImage(imageRoute)
      setName(title)
      setDescription(detalhes)
    }
  }

  function handleGoBack() {
    navigation.goBack()
  }

  useEffect(() => {
    setParamsRoute()
  }, [id])

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

    if (!priceSizeP || !priceSizeM || !priceSizeG) {
      return Alert.alert(
        'Cadastro',
        'Informe o preço de todos os tamanhos da pizza.'
      )
    }
    setIsLoading(true)
    const fileName = new Date().getTime()
    const storageRef = ref(storage, `/pizzas/${fileName}.png`)

    const response = await fetch(image)
    const blob = await response.blob()

    const uploadTask = uploadBytesResumable(storageRef, blob)
    const photo_url = await getDownloadURL(uploadTask.snapshot.ref)

    const userRef = collection(db, 'Pizzas')

    return await addDoc(userRef, {
      name,
      name_insensitive: name.toLowerCase().trim(),
      description,
      prices_sizes: {
        p: priceSizeP,
        m: priceSizeM,
        g: priceSizeG
      },
      photo_url,
      photo_path: storageRef.fullPath
    })
      .then(() => {
        Alert.alert('Cadastro', 'Cadastro concluido com sucesso')
        navigation.navigate('home')
      })
      .catch(function (error) {
        console.log(
          'There has been a problem with your fetch operation: ' + error.message
        )

        throw error
      })
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
        color="white"
      >
        <Heading size="md" color="white">
          Cadastrar Pizza
        </Heading>
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

          <Stack px="5" space={2} paddingBottom={3}>
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
          </Stack>
        </FormControl>
        <Button
          bg={'red.700'}
          w="80%"
          alignSelf={'center'}
          alignItems="center"
          h="7%"
          marginBottom={'20px'}
          borderRadius="10"
          _pressed={{ bg: 'red.700', opacity: 0.6 }}
          onPress={handleAdd}
        >
          Salvar Produto
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
