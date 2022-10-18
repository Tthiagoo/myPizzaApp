export type ProductProps = {
  id: string
  photo_url: string
  name: string
  description: string
  isAdd?: boolean
  prices_sizes: {
    p: string
    m: string
    g: string
  }
}
