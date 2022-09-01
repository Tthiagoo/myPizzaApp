import { Divider, Heading, HStack, Text, VStack } from 'native-base'
import React from 'react'

export default function HeaderListPizza() {
  return (
    <>
      <HStack justifyContent={'space-between'} p="5%">
        <Heading color="#572D31" size="md" fontFamily={'heading'}>
          Cardápio
        </Heading>
        <Text>5 Pizzas</Text>
      </HStack>
      <Divider my="1" w="90%" alignSelf={'center'} />
    </>
  )
}
