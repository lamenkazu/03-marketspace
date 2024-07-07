import { Box } from '@gluestack-ui/themed'
import { NavigationContainer } from '@react-navigation/native'

import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'

export const Routes = () => {
  return (
    <Box flex={1} bg="$gray600">
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </Box>
  )
}
