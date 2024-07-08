import { Box, Center, Icon, Text } from '@gluestack-ui/themed'
import XCircle from 'phosphor-react-native/src/icons/XCircle'
import { ComponentProps } from 'react'

import { FontSize } from '@/@types/font'

export type TagVariants = 'new' | 'used' | 'neutral'
export type TagTitleVariants = 'Novo' | 'Usado'

const variantColors: Record<TagVariants, string> = {
  new: '$blue',
  used: '$gray200',
  neutral: '$gray500',
}

interface TagProps extends ComponentProps<typeof Box> {
  variant?: TagVariants
  title: TagTitleVariants
  textSize?: FontSize
  isFilter?: boolean
  isSelected?: boolean
}

export const Tag = ({
  title,
  textSize = '$2xs',
  variant = 'neutral',
  isFilter = false,
  isSelected = false,

  ...props
}: TagProps) => {
  return (
    <Box
      alignSelf="center"
      justifyContent="center"
      px={8}
      py={2}
      borderRadius={'$full'}
      bg={isSelected ? '$bluelight' : variantColors[variant]}
      {...props}
    >
      <Center flexDirection="row" justifyContent="center" gap={8}>
        <Text
          fontFamily="$heading"
          fontSize={textSize}
          alignSelf="center"
          color={isFilter && !isSelected ? '$gray300' : '$gray700'}
        >
          {title.toUpperCase()}
        </Text>
        {isSelected && (
          <Box
            width={14}
            height={14}
            alignItems="center"
            mt={1}
            justifyContent="center"
            borderRadius={'$full'}
            backgroundColor={'$gray700'}
          >
            <Icon as={XCircle} size={'lg'} color={'$bluelight'} />
          </Box>
        )}
      </Center>
    </Box>
  )
}
