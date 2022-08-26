import {
  Box,
  CheckIcon,
  ArrowBackIcon,
  Circle,
  Image,
  Flex,
  Heading,
  HStack,
  VStack,
  Text,
  Radio,
  FormControl,
  Input,
  WarningOutlineIcon,
  KeyboardAvoidingView,
  ScrollView
} from 'native-base'

import React from 'react'
import { Platform } from 'react-native'
export default function PizzaOrder() {
  return (
    <KeyboardAvoidingView
      flex="1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView bg="light.200">
        <Flex bg="red.700" height={'200'} safeAreaTop>
          <ArrowBackIcon size="6" mt="8%" ml="5%" color="white" />
        </Flex>
        <Image
          alt="pizza"
          rounded={'full'}
          size="2xl"
          top={'-120px'}
          source={require('../../assets/pizza2.png')}
          alignSelf="center"
        />
        <Flex px="20px" bg="blue.100" top="-100px" h="400">
          <Heading alignSelf={'center'}>Magherita</Heading>
          <Text>Selecione um tamanho</Text>
          <Radio.Group
            defaultValue="1"
            name="myRadioGroup"
            accessibilityLabel="Pick your favorite number"
          >
            <HStack w="100%" mt="4%" justifyContent="space-between">
              <VStack
                bg="light.300"
                w="25%"
                padding={'10px'}
                justifyContent={'center'}
                alignItems="center"
                borderRadius={'10px'}
              >
                <Radio value="1" my={1} accessibilityLabel="Radio" />
                <Text>Pequena</Text>
              </VStack>

              <VStack
                bg="light.300"
                w="25%"
                justifyContent={'center'}
                alignItems="center"
                borderRadius={'10px'}
              >
                <Radio value="1" my={1} accessibilityLabel="Radio" />
                <Text>Media</Text>
              </VStack>
              <VStack
                bg="light.300"
                w="25%"
                justifyContent={'center'}
                alignItems="center"
                borderRadius={'10px'}
              >
                <Radio value="1" my={1} accessibilityLabel="Radio" />
                <Text fontWeight={'bold'}>Grande</Text>
              </VStack>
            </HStack>
            <HStack w="100%">
              <Box alignItems="center">
                <FormControl.Label>
                  <Text>Password</Text>
                </FormControl.Label>
                <Input />
              </Box>
            </HStack>
          </Radio.Group>
        </Flex>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
