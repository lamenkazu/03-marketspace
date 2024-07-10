import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { UserDTO } from '@/dtos/UserDTO'
import { api } from '@/lib/axios'
import {
  getAuthToken,
  removeAuthToken,
  saveAuthToken,
} from '@/storage/authToken'
import { getUser, removeUser, saveUser } from '@/storage/user'

interface AuthTokenStorageProps {
  userData: UserDTO
  token: string
  refreshToken?: string
}

export interface AuthContextDataProps {
  user: UserDTO
  isUserStorageDataLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isUserStorageDataLoading, setIsUserStorageDataLoading] = useState(true)

  const userAndTokenUpdate = ({ userData, token }: AuthTokenStorageProps) => {
    api.defaults.headers.common.Authorization = `Bearer ${token}`

    setUser(userData) // Atualiza estado do usuario para ser usado na aplicação.
  }

  const userAndTokenSave = async ({
    userData,
    token,
    refreshToken,
  }: AuthTokenStorageProps) => {
    setIsUserStorageDataLoading(true)

    if (refreshToken) {
      await saveUser(userData) // Salva o usuário no Async Storage para armazenamento da informação.
      await saveAuthToken({ token, refreshToken }) // Salva o token do usuário no Async Storage.
    }

    setIsUserStorageDataLoading(false)
  }

  const signIn = async (email: string, password: string) => {
    const { data } = await api.post('/sessions', { email, password })

    if (data.user && data.token && data.refresh_token) {
      await userAndTokenSave({
        userData: data.user,
        token: data.token,
        refreshToken: data.refresh_token,
      })
      userAndTokenUpdate({
        userData: data.user,
        token: data.token,
      })
    }
  }

  const signOut = useCallback(async () => {
    setIsUserStorageDataLoading(true)

    await removeUser()
    await removeAuthToken()

    setUser({} as UserDTO)

    setIsUserStorageDataLoading(false)
  }, [])

  useEffect(() => {
    const loadUserData = async () => {
      setIsUserStorageDataLoading(true)

      const userData = await getUser()
      const { token } = await getAuthToken()

      if (userData && token) {
        userAndTokenUpdate({ userData, token })
      }

      setIsUserStorageDataLoading(false)
    }

    loadUserData()
  }, [])

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut)

    return () => {
      subscribe()
    }
  }, [signOut])

  return (
    <AuthContext.Provider
      value={{ user, isUserStorageDataLoading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }
