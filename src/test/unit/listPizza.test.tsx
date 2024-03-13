import {
  Box,
  HStack,
  Input,
  Text,
  Image,
  Icon,
  Pressable,
  Button
} from 'native-base'
import { NativeBaseProvider } from 'native-base'
import { PIZZA_TYPES } from '../../utils/pizza_sizes'
import { RenderOptions, render } from '@testing-library/react-native'
import { ReactElement } from 'react'

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: NativeBaseProvider, ...options })

it('testando primeiro', () => {
  const { debug } = render(<Text />)
  debug()
})
