import { createContext, PropsWithChildren, useState } from 'react'

import { UserDTO } from '@/dtos/UserDTO'

export interface AuthContextDataProps {
  user: UserDTO
}

const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }
