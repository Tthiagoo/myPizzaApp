import { create } from 'zustand'
import { IStoreAuth } from '../types/storeType'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { auth, db } from '../../../config/firebase'
import { setUserData } from '../services/loginService'
import { Alert } from 'react-native'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
export const useStore = create<IStoreAuth>((set, get) => {
  const auth = getAuth()
  const USER_COLLECTION = '@gopizza:users'
  return {
    user: {},
    isLogging: false,

    signIn: async (email, password) => {
      set({ isLogging: true })
      signInWithEmailAndPassword(auth, email, password)
        .then(async userCredential => {
          const user = userCredential.user.uid
          const docRef = doc(db, 'Users', user)
          const docSnap = await getDoc(docRef)

          console.log(docSnap.data())
          await AsyncStorage.setItem(
            USER_COLLECTION,
            JSON.stringify(docSnap.data())
          )
          // docSnap.data() will be undefined in this case

          set({ isLogging: false })
          set({ user: docSnap.data() })
        })
        .catch(() => {
          Alert.alert(
            'Login',
            'Não foi possível buscar os dados de perfil do usuário.'
          )
        })
    }
  }
})
