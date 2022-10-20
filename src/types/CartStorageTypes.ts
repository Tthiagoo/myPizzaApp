import { OrderProps } from './orderProps'

export type GetCartStorage = () => Promise<OrderProps[][]>
export type SaveCartStorage = (
  oldCart: OrderProps,
  plants: OrderProps
) => Promise<void>
