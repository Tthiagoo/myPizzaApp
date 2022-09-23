import { HStack, VStack, Radio, Text, Pressable } from 'native-base'
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
          <Pressable
            display={'flex'}
            flexDirection="column"
            bgColor={value == '1' ? 'green.50' : 'white'}
            flex="1"
            p={'10px'}
            justifyContent={'center'}
            alignItems="center"
            borderWidth={1}
            borderRadius={'10px'}
            borderColor={value == '1' ? 'green.500' : 'gray.300'}
            onPress={() => {
              setValue('1')
            }}
          >
            <Radio value="1" colorScheme="green" accessibilityLabel="Radio" />
            <Text fontWeight={'bold'}>Pequena</Text>
          </Pressable>
          <Pressable
            display={'flex'}
            flexDirection="column"
            bgColor={value == '2' ? 'green.50' : 'white'}
            flex="1"
            p={'10px'}
            justifyContent={'center'}
            alignItems="center"
            borderWidth={1}
            borderRadius={'10px'}
            borderColor={value == '2' ? 'green.500' : 'gray.300'}
            onPress={() => {
              setValue('2')
            }}
          >
            <Radio value="2" colorScheme="green" accessibilityLabel="Radio" />
            <Text fontWeight={'bold'}>Medio</Text>
          </Pressable>
          <Pressable
            display={'flex'}
            flexDirection="column"
            bgColor={value == '3' ? 'green.50' : 'white'}
            flex="1"
            p={'10px'}
            justifyContent={'center'}
            alignItems="center"
            borderWidth={1}
            borderRadius={'10px'}
            borderColor={value == '3' ? 'green.500' : 'gray.300'}
            onPress={() => {
              setValue('3')
            }}
          >
            <Radio value="3" colorScheme="green" accessibilityLabel="Radio" />
            <Text fontWeight={'bold'}>Grande</Text>
          </Pressable>
        </HStack>
      </Radio.Group>
    </>
  )
}
