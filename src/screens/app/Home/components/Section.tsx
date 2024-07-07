import { Text, VStack } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

interface SectionProps extends ComponentProps<typeof VStack> {
  title: string
}

export const Section = ({ title, children }: SectionProps) => {
  return (
    <VStack>
      <Text>{title}</Text>
      {children}
    </VStack>
  )
}
