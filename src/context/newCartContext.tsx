import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
  ReactNode
} from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { OrderProps } from '../types/orderProps'

interface CartState {
  id: string
  title: string
  image_url: string
  price: number
  quantity: number
}

interface CartProviderProps {
  children: ReactNode
}

interface CartContext {
  data: OrderProps[]
  addToCart(item: OrderProps): void
  increment(id: string): void
  decrement(id: string): void
  remove(id: string): void
}

const CartContext = createContext<CartContext | null>(null)

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [data, setData] = useState<OrderProps[]>([])

  useEffect(() => {
    console.log('primeiro')
    console.log(data)
    async function loadProducts(): Promise<void> {
      const products = await AsyncStorage.getItem('@GoMarketplace:products')
      console.log('products')
      console.log(products)
      if (products) {
        setData([])
      }
    }

    loadProducts()
  }, [])

  const addToCart = useCallback(
    async (product: OrderProps) => {
      const productExists = data.find(p => p.id === product.id)

      const quantidade = productExists ? productExists.quantidade + 1 : 1

      if (productExists) {
        console.group('console do addTo cart se exist')
        console.log(data)
        console.group()
        setData(
          data.map(p => (p.id === product.id ? { ...product, quantidade } : p))
        )
      } else {
        setData([...data, { ...product }])
        console.log(data)
        console.table(data)
      }

      await AsyncStorage.setItem(
        '@GoMarketplace:products',
        JSON.stringify(data)
      )
    },
    [data]
  )

  const increment = useCallback(
    async (id: string) => {
      setData(
        data.map(product =>
          product.id === id
            ? { ...product, quantidade: product.quantidade + 1 }
            : product
        )
      )

      await AsyncStorage.setItem(
        '@GoMarketplace:products',
        JSON.stringify(data)
      ).then(() => {
        console.log('data após incre')
        console.log(data)
      })
    },
    [data]
  )

  const decrement = useCallback(
    async (id: string) => {
      setData(
        data.map(product =>
          product.id === id
            ? { ...product, quantidade: product.quantidade - 1 }
            : product
        )
      )

      await AsyncStorage.setItem(
        '@GoMarketplace:products',
        JSON.stringify(data)
      )
    },
    [data]
  )

  const remove = useCallback(
    async (id: string) => {
      setData(data.filter(product => product.id !== id))

      await AsyncStorage.setItem(
        '@GoMarketplace:products',
        JSON.stringify(data)
      )
    },
    [data]
  )

  const value = React.useMemo(
    () => ({ addToCart, increment, decrement, data, remove }),
    [data, addToCart, increment, decrement, remove]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContext {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`)
  }

  return context
}
