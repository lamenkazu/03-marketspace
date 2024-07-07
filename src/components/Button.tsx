import {
  Button as GluestackButton,
  ButtonIcon,
  ButtonSpinner,
  ButtonText,
  Center,
} from '@gluestack-ui/themed'
import { Icon } from 'phosphor-react-native'
import { ComponentProps } from 'react'

interface ButtonProps extends ComponentProps<typeof GluestackButton> {
  title?: string
  color?: string
  isLoading?: boolean
  isButtonIcon?: boolean
  Icon?: Icon
}

export const Button = ({
  title,
  color = '$gray700',
  isLoading = false,
  isButtonIcon = false,
  Icon,
  onPress,
  ...props
}: ButtonProps) => {
  return (
    <GluestackButton
      borderRadius={6}
      $active-opacity={0.8}
      onPress={onPress}
      w={'$full'}
      bg="$bluelight"
      size={'xl'}
      isDisabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Center>
          <ButtonSpinner mr="$1" color={color} />
        </Center>
      ) : isButtonIcon ? (
        <ButtonIcon as={Icon} />
      ) : (
        <ButtonText fontFamily="$heading" fontSize={'$sm'} color={color}>
          {title}
        </ButtonText>
      )}
    </GluestackButton>
  )
}
