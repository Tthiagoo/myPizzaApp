import { Divider, Heading, HStack, Text, VStack } from 'native-base'
import React from 'react'

type HeaderProps = {
  qntProd: number
}

export default function HeaderListPizza<Number>({ qntProd }: HeaderProps) {
  return (
    <>
      <HStack justifyContent={'space-between'} p="5%">
        <Heading color="#572D31" size="md" fontFamily={'heading'}>
          Cardápio
        </Heading>
        <Text>{qntProd} Produtos</Text>
      </HStack>
      <Divider my="1" w="90%" alignSelf={'center'} />
    </>
  )
}
