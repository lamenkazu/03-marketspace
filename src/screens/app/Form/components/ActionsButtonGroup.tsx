import { Box, ButtonGroup } from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'

import { Button } from '@/components/Button'
import { AppNavigationRoutesProp } from '@/routes/app.routes'
export const ActionsButtonGorup = () => {
  const { navigate } = useNavigation<AppNavigationRoutesProp>()
  const handleAdvance = () => {
    navigate('preview')
  }

  return (
    <Box bg={'$gray700'} h={90} alignItems="center" justifyContent="center">
      <ButtonGroup px={24}>
        <Button
          title="Cancelar"
          bg="$gray500"
          color={'$gray200'}
          w={'50%'}
          px={0}
        />
        <Button
          onPress={handleAdvance}
          bg="$gray100"
          title="Avançar"
          w={'50%'}
          px={0}
        />
      </ButtonGroup>
    </Box>
  )
}
