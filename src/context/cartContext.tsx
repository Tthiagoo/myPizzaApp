import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { OrderProps } from '../types/orderProps'

interface UpdateProductAmount {
  productId: string
  quantidade: number
}

interface CartProviderProps {
  children: ReactNode
}

interface CartContextData {
  cart: Promise<OrderProps[]>

  addProduct: (productId: string, product: OrderProps) => Promise<void>
  removeProduct: (productId: string) => void
  updateProductAmount: ({ productId, quantidade }: UpdateProductAmount) => void
}

const CartContext = createContext<CartContextData>({} as CartContextData)

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const USER_COLLECTION = '@gopizza:product'

  const [cart, setCart] = useState<Promise<OrderProps[]>>(async () => {
    const storagedCart = await AsyncStorage.getItem(USER_COLLECTION)
    console.log('storaged')

    const oldCart = storagedCart
      ? (JSON.parse(storagedCart) as OrderProps[])
      : []
    return oldCart
  })

  const addProduct = async (productId: string, product: OrderProps) => {
    console.log('executou')
    try {
      console.log('chegou aqui try')
      console.log(product)
      console.log(cart)
      const productInCart = (await cart)?.find(
        product => product.id === productId
      )
      console.log(productInCart)
      console.log('chegou antes do in cart')
      if (productInCart) {
        console.log('chegou no product in cart')
        productInCart.quantidade += 1

        await AsyncStorage.setItem(
          USER_COLLECTION,
          JSON.stringify(...(await cart))
        )

        //setCart(await newCart)
      } else {
        console.log('chegou aqui no else')
        const newProduct = {
          ...product
        }
        console.log('chegou aqui no new cart')

        console.log('chegou aqui no pegou cart')

        await AsyncStorage.setItem(
          USER_COLLECTION,
          JSON.stringify({ ...cart, ...newProduct })
        )
        console.log('adicionado no cart')
        //setCart(newCart)
      }
    } catch {
      //console.log(product)
      console.log('nao funcionou a add do product')
    }
  }

  const removeProduct = async (productId: string) => {
    try {
      const productInCart = (await cart).find(
        product => product.id === productId
      )

      if (!productInCart) {
        console.log('Erro na remoção do produto')
      }

      const newCart = (await cart).filter(product => product.id !== productId)
      await AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(newCart))

      //setCart(newCart)
    } catch {
      console.log('Erro na remoção do produto')
    }
  }

  const updateProductAmount = async ({ productId }: UpdateProductAmount) => {
    try {
      const productInCart = (await cart)?.find(
        product => product.id === productId
      )

      if (productInCart) {
        productInCart.quantidade += 1
      }

      const newCart = [...(await cart)]
      await AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(newCart))

      //setCart(newCart)
    } catch {
      console.log('erro na alteração')
    }
  }

  return (
    <CartContext.Provider
      value={{
        addProduct,
        removeProduct,
        updateProductAmount,
        cart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => useContext(CartContext)
