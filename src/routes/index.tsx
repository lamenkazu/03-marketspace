import { Box, Spinner } from '@gluestack-ui/themed'
import { NavigationContainer } from '@react-navigation/native'
import { QueryClientProvider } from '@tanstack/react-query'

import { MarketspaceContextProvider } from '@/contexts/MarketspaceContext'
import { useAuth } from '@/hooks/useAuth'
import { queryClient } from '@/lib/react-query'

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
        {user.id ? (
          <QueryClientProvider client={queryClient}>
            <MarketspaceContextProvider>
              <AppRoutes />
            </MarketspaceContextProvider>
          </QueryClientProvider>
        ) : (
          <AuthRoutes />
        )}
      </NavigationContainer>
    </Box>
  )
}
