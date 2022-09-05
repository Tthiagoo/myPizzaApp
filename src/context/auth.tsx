import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect
} from 'react'
import { Alert } from 'react-native'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  UserCredential
} from 'firebase/auth'
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where
} from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { auth } from '../config/firebase'
import { db } from '../config/firebase'
type User = {
  id: string
  name: string
  isAdmin: boolean
  test: string
}

type AuthContextData = {
  signIn: (email: string, password: string) => Promise<void>
  user: User | null
}

type AuthProviderProps = {
  children: ReactNode
}

const USER_COLLECTION = '@gopizza:users'

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLogging, setIsLogging] = useState(false)

  const userRef = collection(db, 'Users')
  const USER_COLLECTION = '@gopizza:users'

  const setUserData = async (uid: string) => {
    const usersDocReference = query(userRef)
    const querySnapshot = await getDocs(usersDocReference)
    querySnapshot.forEach(async doc => {
      if (doc.id.replace('}', '') === uid) {
        const loggedUser = doc.data() as User
        setUser(loggedUser)
        await AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(user))
      }
    })
  }

  async function signIn(email: string, password: string) {
    if (!email || !password) {
      return Alert.alert('Login', 'Informe o e-mail e a senha.')
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user
        console.log(user.email)

        setUserData(user.uid)
        // ...
      })

      .catch(() =>
        Alert.alert(
          'Login',
          'Não foi possível buscar os dados de perfil do usuário.'
        )
      )
      .catch(error => {
        const { code } = error

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
      console.log(userData)
      setUser(userData)
    }

    setIsLogging(false)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn
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
