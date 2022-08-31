import { Box, Icon } from 'native-base'
import React from 'react'
import {
  MaterialCommunityIcons,
  AntDesign,
  Entypo,
  FontAwesome,
  MaterialIcons
} from '@expo/vector-icons'

type Props = {
  name?: string
  color: string
  notifications?: string | undefined
}

export default function BottomMenu({ name, color }: Props) {
  return <Icon as={FontAwesome} name={name} color={color} size={'lg'} />
}
