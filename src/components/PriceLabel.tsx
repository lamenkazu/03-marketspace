import { HStack, Text } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

import { FontSize } from '@/@types/font'
import { formatPrice } from '@/utils/PriceFormat'

interface PriceLabelProps extends ComponentProps<typeof HStack> {
  size?: FontSize
  price: number
}

export const PriceLabel = ({
  size = '$xl',
  price,
  ...props
}: PriceLabelProps) => {
  return (
    <HStack alignItems="baseline" gap={4} {...props}>
      <Text color={'$bluelight'} fontFamily={'$heading'} fontSize="$sm">
        R$
      </Text>
      <Text color={'$bluelight'} fontFamily={'$heading'} fontSize={size}>
        {formatPrice(price / 100)}
      </Text>
    </HStack>
  )
}
