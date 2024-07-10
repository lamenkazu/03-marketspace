import { HStack, Text } from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'
import Plus from 'phosphor-react-native/src/icons/Plus'
import { ComponentProps } from 'react'

import { Avatar } from '@/components/Avatar'
import { Button } from '@/components/Button'
import { useAuth } from '@/hooks/useAuth'
import { api } from '@/lib/axios'
import { AppNavigationRoutesProp } from '@/routes/app.routes'

interface HeaderProps extends ComponentProps<typeof HStack> {}

export const Header = ({ ...props }: HeaderProps) => {
  const { navigate } = useNavigation<AppNavigationRoutesProp>()
  const handleGoToNewAdvert = () => {
    navigate('new')
  }

  const { user } = useAuth()

  return (
    <HStack
      gap={10}
      alignItems="center"
      justifyContent="space-between"
      {...props}
    >
      <Avatar
        userPhoto={`${api.defaults.baseURL}/images/${user.avatar}`}
        avatarSize={45}
      />
      <Text flex={1} color={'$gray100'}>
        Boas vindas,{' '}
        <Text color={'$gray100'} fontFamily="$heading">
          {user.name}!
        </Text>
      </Text>
      <Button
        flex={1}
        ButtonIcon={Plus}
        title="Criar anuncio"
        w={139}
        h={42}
        size="sm"
        bg={'$gray100'}
        onPress={handleGoToNewAdvert}
      />
    </HStack>
  )
}
