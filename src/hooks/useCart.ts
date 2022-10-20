import { GetCartStorage } from '../types/CartStorageTypes'
import { SaveProductsCart } from '../types/CartContextTypes'
import { getCartStorage, saveCartStorage } from '../storage/CartStorage'
import { OrderProps } from '../types/orderProps'

export const saveCart: SaveProductsCart = async (Product: OrderProps) => {
  try {
    const olCart = await getCartStorage()

    await saveCartStorage(...olCart, Product)
    console.log('oldCart')
    console.log(olCart)
  } catch {
    console.log('nao deu certo save cart')
  }
}
