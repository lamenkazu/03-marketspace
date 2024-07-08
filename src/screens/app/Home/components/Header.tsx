import { HStack, Text } from '@gluestack-ui/themed'
import Plus from 'phosphor-react-native/src/icons/Plus'

import { Avatar } from '@/components/Avatar'
import { Button } from '@/components/Button'

export const Header = () => {
  return (
    <HStack gap={10} alignItems="center" justifyContent="space-between">
      <Avatar userPhoto="https://github.com/lamenkazu.png" avatarSize={45} />
      <Text flex={1} color={'$gray100'}>
        Boas vindas,{' '}
        <Text color={'$gray100'} fontFamily="$heading">
          Erick!
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
      />
    </HStack>
  )
}
