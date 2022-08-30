import { HStack, VStack, Radio, Text } from 'native-base'
import React, { useState } from 'react'

export default function RadioRow() {
  const [value, setValue] = useState('1')
  return (
    <>
      <Text>Selecione um tamanho</Text>
      <Radio.Group
        defaultValue="1"
        name="myRadioGroup"
        accessibilityLabel="Pick your favorite number"
        value={value}
        onChange={nextValue => {
          setValue(nextValue)
        }}
      >
        <HStack w="100%" mt="4%" space={4} justifyContent="space-between">
          <VStack
            bgColor={value == '1' ? 'green.50' : 'white'}
            flex="1"
            padding={'10px'}
            justifyContent={'center'}
            alignItems="center"
            borderRadius={'10px'}
            borderWidth={1}
            borderColor={value == '1' ? 'green.500' : 'gray.300'}
          >
            <Radio
              value="1"
              my={1}
              colorScheme="green"
              accessibilityLabel="Radio"
            />
            <Text fontWeight={'bold'}>Pequena</Text>
          </VStack>

          <VStack
            bg="white"
            flex="1"
            justifyContent={'center'}
            alignItems="center"
            borderRadius={'10px'}
          >
            <Radio
              value="2"
              my={1}
              colorScheme="green"
              accessibilityLabel="Radio"
            />
            <Text fontWeight={'bold'}>Media</Text>
          </VStack>
          <VStack
            bg="white"
            flex="1"
            justifyContent={'center'}
            alignItems="center"
            borderRadius={'10px'}
          >
            <Radio
              value="3"
              my={1}
              colorScheme="green"
              accessibilityLabel="Radio"
            />
            <Text fontWeight={'bold'}>Grande</Text>
          </VStack>
        </HStack>
      </Radio.Group>
    </>
  )
}
