import { Text } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

interface LabelTitleProps extends ComponentProps<typeof Text> {}

export const LabelTitle = ({ children, ...props }: LabelTitleProps) => {
  return (
    <Text fontSize={'$sm'} mt={28} fontFamily={'$heading'} pb={12} {...props}>
      {children}
    </Text>
  )
}
