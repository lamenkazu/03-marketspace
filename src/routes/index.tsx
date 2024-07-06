import { Box } from '@gluestack-ui/themed'
import { NavigationContainer } from '@react-navigation/native'

import { AuthRoutes } from './auth.routes'

export const Routes = () => {
  return (
    <Box flex={1} bg="gray600">
      <NavigationContainer>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  )
}
