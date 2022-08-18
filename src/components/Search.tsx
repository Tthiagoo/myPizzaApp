import { AntDesign } from '@expo/vector-icons'
import { Box, Button, IconButton, Input } from 'native-base'
import React from 'react'

export default function Search() {
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
        w="80%"
        _focus={{ backgroundColor: 'white', borderColor: 'white' }}
        marginRight="3%"
      />
      <IconButton
        bg="#528F33"
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
