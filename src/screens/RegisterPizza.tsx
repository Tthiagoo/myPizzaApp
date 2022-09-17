import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  HStack,
  Input,
  ScrollView,
  Stack,
  Text,
  TextArea
} from 'native-base'
import React from 'react'

export default function RegisterPizza() {
  return (
    <Flex flex="1" bg="light.200" alignItems={'center'}>
      <ScrollView p="0">
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
        <HStack mt="8" space={7} borderColor="red.500" borderWidth={'1'}>
          <Flex
            borderColor={'blue.500'}
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

          <Stack px="5" space={2}>
            <Text>Tamanhos e Preços</Text>
            <HStack>
              <Flex
                borderWidth={1}
                borderColor="gray.300"
                justifyContent="center"
                alignItems={'center'}
                px={4}
                bgColor="white"
              >
                P
              </Flex>
              <Input
                h="100%"
                borderBottomLeftRadius={'0px'}
                borderTopLeftRadius={'0px'}
                borderLeftColor="none"
                borderLeftStyle={'none'}
                borderBottomRightRadius={'10px'}
                borderTopRightRadius={'10px'}
                bg="white"
                variant={'unstyled'}
                borderColor="gray.300"
                borderWidth={'1'}
                p="0.9rem"
                fontSize={'md'}
                w="80%"
                _focus={{ backgroundColor: '#fff', borderColor: 'white' }}
              />
            </HStack>
            <HStack>
              <Flex
                borderWidth={1}
                borderColor="gray.300"
                justifyContent="center"
                alignItems={'center'}
                px={4}
                bgColor="white"
              >
                P
              </Flex>
              <Input
                h="100%"
                borderBottomLeftRadius={'0px'}
                borderTopLeftRadius={'0px'}
                borderLeftColor="none"
                borderLeftStyle={'none'}
                borderBottomRightRadius={'10px'}
                borderTopRightRadius={'10px'}
                bg="white"
                variant={'unstyled'}
                borderColor="gray.300"
                borderWidth={'1'}
                p="0.9rem"
                fontSize={'md'}
                w="80%"
                _focus={{ backgroundColor: '#fff', borderColor: 'white' }}
              />
            </HStack>
          </Stack>
        </FormControl>
      </ScrollView>
    </Flex>
  )
}
