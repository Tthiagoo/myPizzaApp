import AsyncStorage from '@react-native-async-storage/async-storage'
import { GetCartStorage, SaveCartStorage } from '../types/CartStorageTypes'
import { OrderProps } from '../types/orderProps'
const USER_COLLECTION = '@gopizza:users'

export const getCartStorage: GetCartStorage = async () => {
  const data = await AsyncStorage.getItem(USER_COLLECTION)

  if (!data) {
    return []
  }

  const plants = JSON.parse(data) as OrderProps[]

  return plants
}

export const saveCartStorage: SaveCartStorage = async (
  oldCart: OrderProps,
  Product: OrderProps
) => {
  await AsyncStorage.setItem(
    USER_COLLECTION,
    JSON.stringify({ ...oldCart, Product })
  )
}
