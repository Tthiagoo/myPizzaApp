import { Box, Image } from 'native-base'
import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import { OrderProps } from '../screens/OrderHistory'

type Props = TouchableOpacityProps & {
  index: number
  data: OrderProps
}
export default function OrderCard({ index, data, ...rest }: Props) {
  return (
    <Box>
      <Image source={{ uri: data.image }} />
    </Box>
  )
}
