import { ScrollView, Text, useToast, VStack } from '@gluestack-ui/themed'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import Logo from '@/assets/logo.svg'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Toast } from '@/components/Toast'
import { UserImageProps } from '@/contexts/AuthContext'
import { useAuth } from '@/hooks/useAuth'
import { AuthNavigatorProps } from '@/routes/auth.routes'
import { AppError } from '@/utils/AppError'

import { UserPhotoSelector } from './components/userPhotoSelector'

const PHOTO_SIZE = 88

const signUpSchema = z
  .object({
    name: z.string().min(1, 'Informe o nome.'),
    email: z.string().min(1, 'Informe o e-mail').email('E-mail inválido.'),
    phone: z.string().min(1, 'Informe o telefone.').min(11, 'Ex: 31900000000'),
    password: z
      .string()
      .min(1, 'Informe a senha')
      .min(6, 'A senha deve ter pelo menos 6 dígitos.'),
    confirmPassword: z
      .string()
      .min(1, 'Confirme a senha.')
      .min(6, 'A senha deve ter pelo menos 6 digitos'),
  })
  .superRefine((data, context) => {
    if (data.password !== data.confirmPassword) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmPassword'],
        message: 'As senhas devem ser iguais',
      })
    }
  })
type SignUpSchema = z.infer<typeof signUpSchema>

export const SignUp = () => {
  const { signUp, signIn } = useAuth()
  // Toast
  const toast = useToast()

  // Password Visible
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const handlePasswordVisible = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  // Navigation
  const { navigate } = useNavigation<AuthNavigatorProps>()
  const handleGoToSignIn = () => {
    navigate('signIn')
  }

  // Photo
  const [userPhoto, setUserPhoto] = useState({
    uri: '',
    name: '',
    type: '',
  } as UserImageProps)

  // Form
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: 'Erick',
      email: '333@mail.com',
      phone: '31999999999',
      password: 'kkkkkk',
      confirmPassword: 'kkkkkk',
    },
  })

  const handleSignUp = async ({
    name,
    email,
    phone,
    password,
  }: SignUpSchema) => {
    if (userPhoto.uri === '') {
      return toast.show({
        duration: 5000,
        placement: 'top',
        render: ({ id }) => {
          return (
            <Toast
              title="Envio de imagem é obrigatório"
              id={id}
              action="error"
            />
          )
        },
      })
    }

    try {
      await signUp({
        name,
        email,
        phone,
        password,
        userPhoto: userPhoto as unknown as Blob,
      })

      await signIn(email, password)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível conectar. Tente novamente.'

      toast.show({
        duration: 5000,
        placement: 'top',
        render: ({ id }) => {
          return <Toast title={title} id={id} action="error" />
        },
      })
    }
  }

  return (
    <ScrollView flex={1} bg="$gray600">
      <VStack
        px={48}
        alignItems="center"
        justifyContent="center"
        w={'$full'}
        borderBottomLeftRadius={24}
        borderBottomRightRadius={24}
        bg="$gray600"
      >
        {/* Header */}
        <Logo
          width={60}
          height={40}
          style={{ marginBottom: 20, marginTop: 72 }}
        />
        <Text color={'$gray100'} fontFamily="$heading" fontSize={'$xl'}>
          Boas Vindas!
        </Text>
        <Text textAlign="center" color="$gray200" fontSize={'$sm'}>
          Crie sua conta e use o espaço para comprar itens variados e vender
          seus produtos
        </Text>

        {/* ImagePicker */}
        <UserPhotoSelector
          PHOTO_SIZE={PHOTO_SIZE}
          userPhoto={userPhoto}
          setUserPhoto={setUserPhoto}
        />

        {/* Form */}
        <VStack mt={16} alignItems="center" w={'$full'} pb={20}>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                onChange={onChange}
                placeholder="Nome"
                errorMessage={errors.name?.message}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                keyType="email-address"
                placeholder="E-mail"
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                placeholder="Telefone"
                keyType="phone-pad"
                errorMessage={errors.phone?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                px={0}
                pl={16}
                onChange={onChange}
                placeholder="Senha"
                errorMessage={errors.password?.message}
                onPressPasswordEye={handlePasswordVisible}
                secureText={!isPasswordVisible}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                px={0}
                pl={16}
                placeholder="Confirmar senha"
                onChange={onChange}
                errorMessage={errors.confirmPassword?.message}
                secureText={!isPasswordVisible}
                onPressPasswordEye={handlePasswordVisible}
                onSubmit={handleSubmit(handleSignUp)}
                returnKeyType="send"
              />
            )}
          />

          <Button
            title="Criar"
            mt={24}
            bg="$gray100"
            isLoading={isSubmitting}
            onPress={handleSubmit(handleSignUp)}
          />

          <Text mt={54} fontSize={'$sm'} color={'$gray200'}>
            Já tem uma conta?
          </Text>

          <Button
            title="Ir para o login"
            mt={16}
            bg="$gray500"
            color={'$gray200'}
            onPress={handleGoToSignIn}
          />
        </VStack>
      </VStack>
    </ScrollView>
  )
}
