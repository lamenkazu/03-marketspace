import { Box } from '@gluestack-ui/themed'
import { NavigationContainer } from '@react-navigation/native'

import { useAuth } from '@/hooks/useAuth'

import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'

export const Routes = () => {
  const { user } = useAuth()

  return (
    <Box flex={1} bg="$gray600">
      <NavigationContainer>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  )
}
