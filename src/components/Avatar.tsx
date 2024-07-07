import { Avatar as GluestackAvatar, AvatarImage } from '@gluestack-ui/themed'
import { Icon } from 'phosphor-react-native'
import { ComponentProps } from 'react'

import DefaultAvatar from '@/assets/avatar.png'

import { Button } from './Button'

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
      borderWidth={3}
      borderColor="$bluelight"
      {...props}
    >
      <AvatarImage
        source={userPhoto === '' ? DefaultAvatar : { uri: userPhoto }}
        alt="foto do usuario"
      />
      {hasButton && (
        <Button
          top={'33%'}
          left={'35%'}
          h={40}
          w={40}
          position="relative"
          borderRadius={'$full'}
          onPress={onPress}
          isButtonIcon
          size={'md'}
          Icon={Icon}
        />
      )}
    </GluestackAvatar>
  )
}
