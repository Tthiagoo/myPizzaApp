import { RouteProp } from '@react-navigation/native'
import { ProductProps } from './product'

export type RootStackParamList = {
  order: ProductProps
  RegisterPizza: { isAdd: boolean; PizzaProps: ProductProps }
}

export type RootRouteProps<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>
