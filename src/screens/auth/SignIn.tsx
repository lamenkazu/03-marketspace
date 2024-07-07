import { ScrollView, Text, VStack } from '@gluestack-ui/themed'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import Logo from '@/assets/logo.svg'
import Marketspace from '@/assets/marketspace.svg'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { AuthNavigatorProps } from '@/routes/auth.routes'

const signInSchema = z.object({
  email: z.string().min(1, 'Informe o e-mail').email('E-mail inválido.'),
  password: z
    .string()
    .min(1, 'Informe a senha')
    .min(6, 'A senha deve ter pelo menos 6 dígitos.'),
})
type SignInSchema = z.infer<typeof signInSchema>

export const SignIn = () => {
  // Navigation
  const { navigate } = useNavigation<AuthNavigatorProps>()
  const handleGoToSignUp = () => {
    navigate('signUp')
  }

  // Password Visible
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const handlePasswordVisible = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  // Form
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSignIn = async (data: SignInSchema) => {
    console.log(data)
  }

  return (
    <ScrollView flex={1} bg="$white">
      <VStack
        px={48}
        alignItems="center"
        justifyContent="center"
        w={'$full'}
        h={650}
        borderBottomLeftRadius={24}
        borderBottomRightRadius={24}
        bg="$gray600"
      >
        <Logo width={96} height={64} style={{ marginBottom: 20 }} />
        <Marketspace width={193} height={28} />
        <Text color="$gray300" fontSize={'$sm'}>
          Seu espaço de compra e venda
        </Text>

        <VStack mt={76} alignItems="center" w={'$full'}>
          <Text mb={16} fontSize={'$sm'} color="$gray200">
            Acesse sua conta
          </Text>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange } }) => (
              <Input
                keyType="email-address"
                placeholder="E-mail"
                onChange={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                px={0}
                pl={16}
                placeholder="Senha"
                onChange={onChange}
                errorMessage={errors.password?.message}
                onPressPasswordEye={handlePasswordVisible}
                secureText={!isPasswordVisible}
                onSubmit={handleSubmit(handleSignIn)}
                returnKeyType="send"
              />
            )}
          />

          <Button
            title="Entrar"
            mt={32}
            isLoading={isSubmitting}
            onPress={handleSubmit(handleSignIn)}
          />
        </VStack>
      </VStack>

      <VStack alignItems="center" px={48} pb={20}>
        <Text mt={54} fontSize={'$sm'} color={'$gray200'}>
          Ainda não tem acesso?
        </Text>

        <Button
          title="Criar uma conta"
          mt={16}
          bg="$gray500"
          color={'$gray200'}
          onPress={handleGoToSignUp}
        />
      </VStack>
    </ScrollView>
  )
}
