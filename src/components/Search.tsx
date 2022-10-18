import { AntDesign } from '@expo/vector-icons'
import { Box, Button, IconButton, Input } from 'native-base'
import React from 'react'
import { TextInputProps } from 'react-native'

type Props = TextInputProps & {
  onSearch: () => void
}

export default function Search({ onSearch, ...rest }: Props) {
  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      width="100%"
      marginTop="-7%"
    >
      <Input
        bg={'white'}
        variant={'rounded'}
        {...rest}
        w="80%"
        _focus={{ backgroundColor: 'white', borderColor: 'white' }}
        marginRight="3%"
      />
      <IconButton
        bg="#528F33"
        onPress={onSearch}
        colorScheme="indigo"
        variant={'solid'}
        _icon={{
          as: AntDesign,
          name: 'search1'
        }}
      />
    </Box>
  )
}
