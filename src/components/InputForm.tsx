import {
  FormControl,
  IInputProps,
  Input as NativeInput,
  Text
} from 'native-base'
import React from 'react'

type Props = IInputProps & {
  errorMessage?: string | null
}

export default function Input({
  errorMessage = null,
  isInvalid,
  ...rest
}: Props) {
  const invalid = !!errorMessage || isInvalid
  return (
    <>
      <NativeInput
        placeholderTextColor={'white'}
        color="muted.50"
        size="md"
        isInvalid={invalid}
        marginBottom={'5%'}
        borderColor="light.100"
        borderWidth={'0.3'}
        variant="unstyled"
        _focus={{
          borderColor: 'white',
          backgroundColor: '#ffffff3e'
        }}
        {...rest}
        _invalid={{
          borderWidth: 2,
          borderColor: 'red.500'
        }}
      />

      <Text
        marginTop="-8px"
        marginBottom={'8px'}
        display={invalid ? 'flex' : 'none'}
        color="red.500"
      >
        {errorMessage}
      </Text>
    </>
  )
}
