import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect
} from 'react'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  Auth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where
} from 'firebase/firestore'

import { auth } from '../config/firebase'
import { db } from '../config/firebase'
import { User } from '../types/auth'

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
  const [user, setUser] = useState<User | null>(null)
  const [isLogging, setIsLogging] = useState(false)

  const userRef = collection(db, 'Users')
  const USER_COLLECTION = '@gopizza:users'

  const setUserData = async (uid: string) => {
    const usersDocReference = query(userRef, where('uid', '==', uid))
    const querySnapshot = await getDocs(usersDocReference)
    querySnapshot.forEach(async doc => {
      const loggedUser = doc.data() as User

      setUser(loggedUser)

      await AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(loggedUser))
    })
  }

  async function signIn(email: string, password: string) {
    if (!email || !password) {
      setIsLogging(false)
      return Alert.alert('Login', 'Informe o e-mail e a senha.')
    }
    setIsLogging(true)
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user
        console.log(userCredential)
        setUserData(user.uid)

        setIsLogging(false)
      })

      .catch(() => {
        setIsLogging(false)

        Alert.alert(
          'Login',
          'Não foi possível buscar os dados de perfil do usuário.'
        )
      })
      .catch(error => {
        const { code } = error
        setIsLogging(false)
        if (code === 'auth/user-not-found' || code === 'auth/wrong-password') {
          return Alert.alert('Login', 'E-mail e/ou senha inválida.')
        } else {
          return Alert.alert('Login', 'Não foi possível realizar o login.')
        }
      })
  }

  async function loadUserStorageData() {
    setIsLogging(true)

    const storedUser = await AsyncStorage.getItem(USER_COLLECTION)

    if (storedUser) {
      const userData = JSON.parse(storedUser) as User

      setUser(userData)
    }

    setIsLogging(false)
  }

  async function signOutAuth() {
    await signOut(auth)

    await AsyncStorage.removeItem(USER_COLLECTION)
    await AsyncStorage.removeItem('@GoMarketplace:products')
    setUser(null)
  }
  async function forgotPassword(auth: Auth, email: string) {
    if (!email) {
      return Alert.alert('Redefinir senha', 'Informe o email')
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert(
          'Redefinir senha',
          'Enviamos um link no seu email para redefinir sua senha'
        )
      })
      .catch(() => {
        Alert.alert('Redefinir senha', 'Não foi possivel redefinir sua senha')
      })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        isLogging,
        loadUserStorageData,
        signOutAuth,
        forgotPassword,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }
