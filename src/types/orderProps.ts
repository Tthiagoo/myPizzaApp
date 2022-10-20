export interface OrderProps {
  id: string
  idUser: string | undefined
  name: string
  photo_url: string
  description: string
  size?: 'Pequena' | 'Medio' | 'Grande'
  quantidade: number
  meioSabor?: string
  price: string
}
