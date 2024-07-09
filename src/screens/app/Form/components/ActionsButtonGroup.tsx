import { Box, ButtonGroup } from '@gluestack-ui/themed'

import { Button } from '@/components/Button'
export const ActionsButtonGorup = () => {
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
        <Button bg="$gray100" title="Avançar" w={'50%'} px={0} />
      </ButtonGroup>
    </Box>
  )
}
