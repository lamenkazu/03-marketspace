import { Box, Spinner } from '@gluestack-ui/themed'
import { NavigationContainer } from '@react-navigation/native'

import { useAuth } from '@/hooks/useAuth'

import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'

export const Routes = () => {
  const { user, isUserStorageDataLoading } = useAuth()

  if (isUserStorageDataLoading) {
    return <Spinner bg={'$gray600'} flex={1} color={'$bluelight'} />
  }

  return (
    <Box flex={1} bg="$gray600">
      <NavigationContainer>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  )
}
