import { useNavigation } from '@react-navigation/native'
import {
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
import React from 'react'
import { Platform } from 'react-native'
import { InputPrice } from '../components/itemPrice'

export default function RegisterPizza() {
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
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
            borderWidth="1"
            alignItems={'center'}
            justifyContent="center"
            textAlign={'center'}
          >
            <Text textAlign={'center'}>Nenhuma foto carregada</Text>
          </Flex>
          <Button
            bg={'red.700'}
            w="28%"
            alignSelf={'center'}
            alignItems="center"
            h="35%"
            borderRadius="10"
            _pressed={{ bg: 'red.700', opacity: 0.6 }}
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
