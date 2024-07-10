import { ScrollView, Text, useToast, VStack } from '@gluestack-ui/themed'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import PencilSimpleLine from 'phosphor-react-native/src/icons/PencilSimpleLine'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import Logo from '@/assets/logo.svg'
import { Avatar } from '@/components/Avatar'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Toast } from '@/components/Toast'
import { useAuth } from '@/hooks/useAuth'
import { api } from '@/lib/axios'
import { AuthNavigatorProps } from '@/routes/auth.routes'
import { AppError } from '@/utils/AppError'

const PHOTO_SIZE = 88

interface UserImageProps {
  uri: string
  name: string
  type: string
}

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
  const { signIn } = useAuth()
  // Toast
  const toast = useToast()

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
  const handleSelectUserPhoto = async () => {
    try {
      const selectedPhoto = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // tipo de conteudo que quer selecionar da galeria do usuario
        quality: 1, // qualidade da imagem vai de 0 a 1
        aspect: [4, 4], // Aspecto da imagem. No caso, 4 por 4 é uma imagem quadrada, poderia ser 3/4 e dai em diante.
        allowsEditing: true, // Permite o usuário editar a imagem após selecionar ela.
      })

      if (selectedPhoto.canceled) {
        return // Se o usuario cancelar a seleção de foto, nada deve ser feito.
      }

      const { fileSize, uri, fileName, mimeType } = selectedPhoto.assets[0]

      if (uri && fileSize) {
        const fileSizeInMb = fileSize / 1024 / 1024

        if (fileSizeInMb > 5) {
          return toast.show({
            duration: 1800,
            placement: 'top',
            render: ({ id }) => {
              return (
                <Toast
                  title="Imagem muito grande!"
                  subtitle="Ecolha uma de até 5MB"
                  id={id}
                  action="error"
                />
              )
            },
          })
        }

        setUserPhoto({
          uri,
          name: fileName!,
          type: mimeType!,
        })
      }

      toast.show({
        duration: 1800,
        placement: 'top',
        render: ({ id }) => {
          return <Toast title="Foto atualizada!" id={id} action="success" />
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

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

  // Password Visible
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const handlePasswordVisible = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

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
          return <Toast title="É obrigatório." id={id} action="error" />
        },
      })
    }
    try {
      const userForm = new FormData()

      userForm.append('avatar', userPhoto as unknown as Blob)
      userForm.append('name', name)
      userForm.append('email', email)
      userForm.append('tel', phone)
      userForm.append('password', password)

      await api.post('/users', userForm, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
        <Avatar
          mt={32}
          userPhoto={userPhoto.uri}
          avatarSize={PHOTO_SIZE}
          hasButton
          Icon={PencilSimpleLine}
          onPress={handleSelectUserPhoto}
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
                keyType="numeric"
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
