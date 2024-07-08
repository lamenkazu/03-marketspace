import {
  Button as GluestackButton,
  ButtonSpinner,
  ButtonText,
  Center,
  HStack,
  Icon,
} from '@gluestack-ui/themed'
import { Icon as PhosphorIcon } from 'phosphor-react-native'
import { ComponentProps } from 'react'

interface ButtonProps extends ComponentProps<typeof GluestackButton> {
  title?: string
  color?: string
  isLoading?: boolean
  isButtonIcon?: boolean
  ButtonIcon?: PhosphorIcon
}

export const Button = ({
  title,
  color = '$gray700',
  isLoading = false,
  isButtonIcon = false,
  ButtonIcon,
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
      ) : (
        <HStack alignItems="center" gap={8} paddingHorizontal={12}>
          {ButtonIcon && (
            <Icon size={'sm'} color={'$gray700'} as={ButtonIcon} />
          )}
          <ButtonText fontFamily="$heading" fontSize={'$sm'} color={color}>
            {title}
          </ButtonText>
        </HStack>
      )}
    </GluestackButton>
  )
}
