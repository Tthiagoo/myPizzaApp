import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
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
import React, { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { InputPrice } from '../components/itemPrice'
import { RootStackParamList } from './Order'

export default function RegisterPizza() {
  const navigation = useNavigation()
  const route = useRoute<RouteProp<RootStackParamList, 'order'>>()
  const { id, image: imageRoute, title, description, isAdd } = route.params

  const [image, setImage] = useState('')
  const [imageParamsRoute, setImageParamsRoute] = useState('')

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
      setImage(imageRoute)
    }
  }

  function handleGoBack() {
    navigation.goBack()
  }

  useEffect(() => {
    setParamsRoute()
  }, [])
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
                alt="pizza"
                w="100%"
                h="100%"
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
                variant={'unstyled'}
                borderColor="gray.300"
                borderWidth={'1'}
                p="0.9rem"
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
            <InputPrice size="P" />
            <InputPrice size="M" />
            <InputPrice size="G" />
          </Stack>
        </FormControl>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
