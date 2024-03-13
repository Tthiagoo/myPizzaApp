import { User } from 'firebase/auth'
import { query, where, getDocs, collection, getDoc, doc } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { db } from '../../../config/firebase'

const USER_COLLECTION = '@gopizza:users'
const userRef = collection(db, 'Users')

export const setUserData = async (uid: string) => {
  const usersDocReference = query(userRef, where('uid', '==', uid))

  const docRef = doc(db, 'Users', 'SF')
  const docSnap = await getDoc(docRef)

  let userData
  const querySnapshot = await getDocs(usersDocReference)
  querySnapshot.forEach(async doc => {
    const loggedUser = doc.data() as User

    await AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(loggedUser))
    userData = doc.data() as User
    console.log(userData, 'dattttt')
  })
  console.log(userData)
  return userData
}
