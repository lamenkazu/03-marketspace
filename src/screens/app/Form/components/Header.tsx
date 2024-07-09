import { HStack, Icon, Text, View } from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'
import ArrowLeft from 'phosphor-react-native/src/icons/ArrowLeft'
import { ComponentProps } from 'react'
import { TouchableOpacity } from 'react-native'

import { AppNavigationRoutesProp } from '@/routes/app.routes'

interface HeaderProps extends ComponentProps<typeof HStack> {
  title: string
}

export const Header = ({ title }: HeaderProps) => {
  const { goBack } = useNavigation<AppNavigationRoutesProp>()
  const handleGoBack = () => {
    goBack()
  }

  return (
    <HStack alignItems="flex-end" justifyContent="space-between" mb={36}>
      <TouchableOpacity onPress={handleGoBack}>
        <Icon as={ArrowLeft} h={1} w={1} size={'xl'} />
      </TouchableOpacity>

      <Text fontFamily="$heading" fontSize="$xl">
        {title}
      </Text>

      <View />
    </HStack>
  )
}
