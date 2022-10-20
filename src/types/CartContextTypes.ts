import { OrderProps } from './orderProps'

export type SaveProductsCart = (product: OrderProps) => Promise<void>
export type GetProductsCart = () => Promise<OrderProps[]>
export type RemoveProduct = (id: number) => Promise<void>
