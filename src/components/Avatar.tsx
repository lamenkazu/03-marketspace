import {
  Avatar as GluestackAvatar,
  AvatarImage,
  Button,
  ButtonIcon,
} from '@gluestack-ui/themed'
import { Icon } from 'phosphor-react-native'
import { ComponentProps } from 'react'

import DefaultAvatar from '@/assets/avatar.png'

interface AvatarProps extends ComponentProps<typeof GluestackAvatar> {
  userPhoto: string
  avatarSize: number
  Icon?: Icon
  iconSize?: number
  hasButton?: boolean
  onPress?: () => void
}

export const Avatar = ({
  userPhoto,
  avatarSize,
  Icon,
  iconSize = 40,
  hasButton = false,
  onPress,
  ...props
}: AvatarProps) => {
  return (
    <GluestackAvatar
      h={avatarSize}
      w={avatarSize}
      borderRadius="$full"
      borderWidth={2}
      borderColor="$bluelight"
      {...props}
    >
      <AvatarImage
        source={userPhoto === '' ? DefaultAvatar : { uri: userPhoto }}
        alt="foto do usuario"
      />
      {hasButton && (
        <Button
          position="relative"
          top={'33%'}
          left={'35%'}
          borderRadius={'$full'}
          h={40}
          w={40}
          onPress={onPress}
          bg={'$bluelight'}
        >
          <ButtonIcon as={Icon} color={'$gray700'} size="md" h={1} w={1} />
        </Button>
      )}
    </GluestackAvatar>
  )
}
