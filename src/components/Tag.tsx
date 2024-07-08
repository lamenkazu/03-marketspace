import { Box, Text } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

export type TagVariants = 'new' | 'used' | 'neutral'
export type TagTitleVariants = 'Novo' | 'Usado'

interface TagProps extends ComponentProps<typeof Box> {
  variant?: TagVariants
  title: TagTitleVariants
}

const variantColors: Record<TagVariants, string> = {
  new: '$blue',
  used: '$gray200',
  neutral: '$gray500',
}

export const Tag = ({ title, variant = 'neutral', ...props }: TagProps) => {
  return (
    <Box
      alignSelf="center"
      px={8}
      py={2}
      borderRadius={'$full'}
      bg={variantColors[variant]}
    >
      <Text color={'$gray700'} fontSize={'$2xs'}>
        {title.toUpperCase()}
      </Text>
    </Box>
  )
}
