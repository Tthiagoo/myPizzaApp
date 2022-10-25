import {
  Badge,
  Divider,
  Heading,
  HStack,
  Pressable,
  Text,
  VStack
} from 'native-base'
import React, { Dispatch, SetStateAction, useState } from 'react'

type HeaderProps = {
  qntProd: number
  setTypeProduct: Dispatch<SetStateAction<string>>
  typeProduct: string
}

export default function HeaderListPizza({
  qntProd,
  typeProduct,
  setTypeProduct
}: HeaderProps) {
  return (
    <>
      <HStack justifyContent={'space-between'} px="5%" py="4%">
        <Heading color="#572D31" size="md" fontFamily={'heading'}>
          Cardápio
        </Heading>
        <Text>{qntProd} Produtos</Text>
      </HStack>
      <HStack w="100%" space={4} px="5%" mb="4%">
        <Pressable
          w="20%"
          h="10"
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
          h="10"
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
          h="10"
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
      <Divider my="1" w="90%" alignSelf={'center'} />
    </>
  )
}
