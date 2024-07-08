import { HStack, Text } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

import { FontSize } from '@/@types/font'

interface PriceLabelProps extends ComponentProps<typeof HStack> {
  size?: FontSize
}

export const PriceLabel = ({ size = '$xl', ...props }: PriceLabelProps) => {
  return (
    <HStack alignItems="baseline" gap={4} {...props}>
      <Text color={'$bluelight'} fontFamily={'$heading'} fontSize="$sm">
        R$
      </Text>
      <Text color={'$bluelight'} fontFamily={'$heading'} fontSize={size}>
        120,00
      </Text>
    </HStack>
  )
}
