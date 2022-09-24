import { Product } from './CartStorageTypes'

export type SaveProductsCart = (product: Product) => Promise<void>
export type GetProductsCart = () => Promise<Product[]>
export type RemoveProduct = (id: number) => Promise<void>
