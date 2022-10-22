import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
  ReactNode
} from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { ProductProps } from '../types/OrderProps'

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
  data: ProductProps[]
  addToCart(item: ProductProps): void
  increment(id: string): void
  decrement(id: string): void
  remove(id: string): void
  reseteCart(): void
}

const CartContext = createContext<CartContext | null>(null)

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [data, setData] = useState<ProductProps[]>([])

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const products = await AsyncStorage.getItem('@GoMarketplace:products')

      if (products) {
        setData([])
      }
    }

    loadProducts()
  }, [])

  const addToCart = useCallback(
    async (product: ProductProps) => {
      const productExists = data.find(p => p.id === product.id)

      const quantidade = productExists ? productExists.quantidade + 1 : 1

      if (productExists) {
        setData(
          data.map(p => (p.id === product.id ? { ...product, quantidade } : p))
        )
      } else {
        setData([...data, { ...product }])
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
      )
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
  const reseteCart = useCallback(async () => {
    setData([])

    await AsyncStorage.removeItem('@GoMarketplace:products')
  }, [data])

  const value = React.useMemo(
    () => ({ addToCart, increment, decrement, data, remove, reseteCart }),
    [data, addToCart, increment, decrement, remove, reseteCart]
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
