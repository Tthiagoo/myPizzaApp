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
  ScrollView,
  KeyboardAvoidingView
} from 'native-base'

import React from 'react'

export default function PizzaOrder() {
  return (
    <KeyboardAvoidingView flex={1} bg="light.200">
      <ScrollView borderColor="black" borderWidth={3}>
        <Flex width="100%" height={'40%'} bg="red.700">
          <ArrowBackIcon size="6" mt="8%" ml="5%" color="white" />
        </Flex>
        <Image
          alt="pizza"
          rounded={'full'}
          size="2xl"
          top={'-30%'}
          source={require('../../assets/pizza2.png')}
          alignSelf="center"
        />
        <Heading alignSelf={'center'} top="-13%">
          Magherita
        </Heading>

        <Box h="40%">
          <Text ml="3%">Selecione um tamanho</Text>
          <Radio.Group
            defaultValue="1"
            name="myRadioGroup"
            accessibilityLabel="Pick your favorite number"
          >
            <HStack w="100%" mt="4%" justifyContent="space-around">
              <Flex
                bg="light.300"
                w="25%"
                justifyContent={'center'}
                alignItems="center"
                borderRadius={'10px'}
              >
                <Radio value="1" my={1}>
                  <Text>First</Text>
                </Radio>
              </Flex>

              <Flex
                bg="light.300"
                w="25%"
                h="100%"
                justifyContent={'center'}
                alignItems="center"
                borderRadius={'10px'}
              >
                <Radio value="2" my={1}>
                  <Text>First</Text>
                </Radio>
              </Flex>
              <Flex
                bg="light.300"
                w="25%"
                h="100%"
                justifyContent={'center'}
                alignItems="center"
                borderRadius={'10px'}
              >
                <Radio value="3" my={1}>
                  <Text>First</Text>
                </Radio>
              </Flex>
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
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
