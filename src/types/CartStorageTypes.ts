export interface Product {
  id: string
  title: string
  description: string
  size?: 'Pequena' | 'Medio' | 'Grande'
  quantidade: number
  meioSabor?: string
  price: string
  image: string
}

export type GetCartStorage = () => Promise<Product[]>
export type SaveCartStorage = (plants: Product) => Promise<void>
