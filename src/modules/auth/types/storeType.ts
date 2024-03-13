import { Auth } from 'firebase/auth'
import { User } from '../../../types/auth'

export interface IStoreAuth {
  user: User | null
  isLogging: boolean
  signIn: (email: string, password: string) => Promise<void>
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  setIsLogging: React.Dispatch<React.SetStateAction<boolean>>
  forgotPassword(auth: Auth, email: string): Promise<void>
  signOutAuth: () => Promise<void>
}
