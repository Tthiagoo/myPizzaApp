import { RouteProp } from '@react-navigation/native'
import { ProductProps } from './orderProps'

export type RootStackParamList = {
  order: ProductProps
  RegisterPizza: { isAdd: boolean; PizzaProps: ProductProps }
  orderDetail: { itemList: ProductProps[]; priceTotal: number }
}

export type RootRouteProps<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>