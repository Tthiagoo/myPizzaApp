export interface ProductProps {
  id: string
  idUser?: string | undefined
  name: string
  photo_url: string
  description: string
  quantidade: number
  meioSabor?: string
  price: number
  aptoUser?: string
  status?: string
  prices_sizes?: {
    p: string
    m: string
    g: string
  }
  uniquePrice?: number
  typeProduct?: string
  nameHalfPizza?: string
}
