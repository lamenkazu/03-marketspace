import { Box, ButtonGroup } from '@gluestack-ui/themed'

import { Button } from '@/components/Button'

interface ActionsButtonGorupProps {
  handleCancel: () => void
  handleAdvance: () => void
  isSubmitting: boolean
}

export const ActionsButtonGorup = ({
  handleCancel,
  handleAdvance,
  isSubmitting,
}: ActionsButtonGorupProps) => {
  return (
    <Box bg={'$gray700'} h={90} alignItems="center" justifyContent="center">
      <ButtonGroup px={24}>
        <Button
          onPress={handleCancel}
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
          isLoading={isSubmitting}
        />
      </ButtonGroup>
    </Box>
  )
}
