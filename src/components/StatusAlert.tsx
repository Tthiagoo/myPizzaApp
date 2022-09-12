import { VStack, HStack, IconButton, CloseIcon, Text, Alert } from 'native-base'
import React from 'react'

interface Props {
  type: string
  text: string
}

export default function AlertStatus({ type, text }: Props) {
  return (
    <Alert
      maxWidth="100%"
      alignSelf="center"
      flexDirection="row"
      w="100%"
      status={type}
    >
      <VStack space={2} flexShrink={1} w="100%">
        <HStack flexShrink={1} space={2} justifyContent="space-between">
          <HStack space={2} flexShrink={1}>
            <Alert.Icon mt="1" />
            <Text fontSize="md" color="coolGray.800">
              {text}
            </Text>
          </HStack>
          <IconButton
            variant="unstyled"
            _focus={{
              borderWidth: 0
            }}
            icon={<CloseIcon size="3" />}
            _icon={{
              color: 'coolGray.600'
            }}
          />
        </HStack>
      </VStack>
    </Alert>
  )
}
