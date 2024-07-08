import { Text, VStack } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

interface SectionProps extends ComponentProps<typeof VStack> {
  title: string
}

export const Section = ({ title, children, ...props }: SectionProps) => {
  return (
    <VStack {...props}>
      <Text fontSize={'$sm'} color={'$gray300'} mb={12}>
        {title}
      </Text>
      {children}
    </VStack>
  )
}
