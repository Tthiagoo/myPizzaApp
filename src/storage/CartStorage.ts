import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  GetCartStorage,
  Product,
  SaveCartStorage
} from '../types/CartStorageTypes'
const USER_COLLECTION = '@gopizza:users'

export const getCartStorage: GetCartStorage = async () => {
  const data = await AsyncStorage.getItem(USER_COLLECTION)
  console.log('data')
  console.log(data)
  if (!data) {
    return []
  }
  console.log('plants')
  const plants = JSON.parse(data) as Product[]
  console.log(plants)

  return plants
}

export const saveCartStorage: SaveCartStorage = async (Product: Product) => {
  await AsyncStorage.setItem(
    USER_COLLECTION,
    JSON.stringify({
      ...Product
    })
  )
}
