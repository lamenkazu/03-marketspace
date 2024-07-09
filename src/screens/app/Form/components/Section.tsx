import { Text, VStack } from '@gluestack-ui/themed'
import { ComponentProps, PropsWithChildren } from 'react'

interface SectionProps
  extends PropsWithChildren,
    ComponentProps<typeof VStack> {
  title: string
  subtitle?: string
}

export const Section = ({
  title,
  subtitle,
  children,
  ...props
}: SectionProps) => {
  return (
    <VStack mb={32} {...props}>
      <VStack pb={16}>
        <Text fontSize={'$md'} fontFamily={'$heading'} pb={subtitle ? 4 : 0}>
          {title}
        </Text>
        {subtitle && (
          <Text fontSize="$sm" color="$gray300">
            {subtitle}
          </Text>
        )}
      </VStack>

      {children}
    </VStack>
  )
}
