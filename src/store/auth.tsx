import React, { createContext, useContext, ReactNode } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { Auth } from 'firebase/auth'

import { User } from '../types/auth'
import { useLogin } from '../modules/auth/hooks/useLogin'

type AuthContextData = {
  signIn: (email: string, password: string) => Promise<void>
  user: User | null
  isLogging: boolean
  loadUserStorageData: () => Promise<void>
  signOutAuth: () => Promise<void>
  forgotPassword(auth: Auth, email: string): Promise<void>
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const {
    user,
    setUser,
    signIn,
    isLogging,

    forgotPassword,
    signOutAuth
  } = useLogin()

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signIn,
        isLogging,

        signOutAuth,
        forgotPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useStore() {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider }
