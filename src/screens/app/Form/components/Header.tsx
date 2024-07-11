import { HStack, Icon, Text, View } from '@gluestack-ui/themed'
import ArrowLeft from 'phosphor-react-native/src/icons/ArrowLeft'
import { ComponentProps } from 'react'
import { TouchableOpacity } from 'react-native'

interface HeaderProps extends ComponentProps<typeof HStack> {
  title: string
  goBack: () => void
}

export const Header = ({ title, goBack }: HeaderProps) => {
  return (
    <HStack alignItems="flex-end" justifyContent="space-between" mb={36}>
      <TouchableOpacity onPress={goBack}>
        <Icon as={ArrowLeft} h={1} w={1} size={'xl'} />
      </TouchableOpacity>

      <Text fontFamily="$heading" fontSize="$xl">
        {title}
      </Text>

      <View />
    </HStack>
  )
}
