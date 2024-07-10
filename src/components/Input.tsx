import {
  AlertCircleIcon,
  Center,
  EyeIcon,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  Input as GluestackInput,
  InputField,
  InputSlot,
  Text,
} from '@gluestack-ui/themed'
import { ComponentProps } from 'react'
import {
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  TouchableOpacity,
} from 'react-native'

interface InputProps extends ComponentProps<typeof GluestackInput> {
  errorMessage?: string | null
  placeholder: string
  prefix?: string
  onChange: (...event: string[]) => void
  onPressPasswordEye?: () => void
  secureText?: boolean
  keyType?: KeyboardTypeOptions
  onSubmit?: () => void
  returnKeyType?: ReturnKeyTypeOptions
  value?: string
}

export const Input = ({
  errorMessage = null,
  isInvalid,
  prefix,
  value,
  placeholder,
  onSubmit,
  onChange,
  onPressPasswordEye,
  returnKeyType = 'default',
  secureText,
  keyType = 'default',
  ...props
}: InputProps) => {
  const invalid = !!errorMessage || isInvalid
  const isPassword = !!onPressPasswordEye

  return (
    <FormControl w={'$full'} isInvalid={invalid}>
      <FormControlError>
        <FormControlErrorIcon as={AlertCircleIcon} />
        <FormControlErrorText>{errorMessage}</FormControlErrorText>
      </FormControlError>

      <GluestackInput
        mb={16}
        h={45}
        px={16}
        isInvalid={invalid}
        borderRadius={6}
        bg="$gray700"
        borderColor="transparent"
        borderWidth={0}
        $focus-borderColor="$bluelight"
        $invalid-borderWidth={1}
        $invalid-borderColor="$red700"
        {...props}
      >
        <Center>{prefix && <Text w={'auto'}>{prefix}</Text>}</Center>
        <InputField
          flex={1}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor="$gray400"
          secureTextEntry={secureText}
          keyboardType={keyType}
          onSubmitEditing={onSubmit}
          returnKeyType={returnKeyType}
          fontFamily="$body"
          value={value}
        />

        {isPassword && (
          <Center>
            <TouchableOpacity
              style={{
                height: '100%',
                justifyContent: 'center',
                paddingRight: 15,
                paddingLeft: 25,
              }}
              onPress={onPressPasswordEye}
            >
              <InputSlot>
                <EyeIcon />
              </InputSlot>
            </TouchableOpacity>
          </Center>
        )}
      </GluestackInput>
    </FormControl>
  )
}
