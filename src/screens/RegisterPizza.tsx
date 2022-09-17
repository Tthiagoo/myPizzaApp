import { Box, Button, Flex, Heading, HStack, Text } from 'native-base'
import React from 'react'

export default function RegisterPizza() {
  return (
    <Flex flex="1" bg="light.200" alignItems={'center'}>
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
    </Flex>
  )
}
