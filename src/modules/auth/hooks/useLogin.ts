import {
  Auth,
  User,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { useState } from 'react'
import { Alert } from 'react-native'
import { auth } from '../../../config/firebase'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { setUserData } from '../services/loginService'

const USER_COLLECTION = '@gopizza:users'

export const useLogin = () => {
  const [isLogging, setIsLogging] = useState(false)
  const [user, setUser] = useState<User | null>(null)

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

  return {
    user,
    isLogging,
    signIn,
    setUser,
    setIsLogging,
    forgotPassword,
    signOutAuth
  }
}
