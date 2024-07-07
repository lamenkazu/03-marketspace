import {
  HStack,
  Image,
  ScrollView,
  Text,
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
  VStack,
} from '@gluestack-ui/themed'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import PencilSimpleLine from 'phosphor-react-native/src/icons/PencilSimpleLine'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import Avatar from '@/assets/avatar.png'
import Logo from '@/assets/logo.svg'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { AuthNavigatorProps } from '@/routes/auth.routes'

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
  // Toast
  const toast = useToast()

  // Navigation
  const { navigate } = useNavigation<AuthNavigatorProps>()
  const handleGoToSignIn = () => {
    navigate('signIn')
  }

  // Photo
  const [userPhoto, setUserPhoto] = useState('')
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

      const { fileSize, uri } = selectedPhoto.assets[0]

      if (uri && fileSize) {
        const fileSizeInMb = fileSize / 1024 / 1024

        if (fileSizeInMb > 5) {
          return toast.show({
            duration: 1800,
            placement: 'top',
            render: ({ id }) => {
              const toastId = 'toast-' + id
              return (
                <Toast
                  mt={50}
                  nativeID={toastId}
                  action="success"
                  variant="accent"
                >
                  <VStack w={'$72'}>
                    <ToastTitle>Imagem muito grande!</ToastTitle>
                    <ToastDescription>Ecolha uma de até 5MB </ToastDescription>
                  </VStack>
                </Toast>
              )
            },
          })
        }

        setUserPhoto(uri)
      }

      toast.show({
        duration: 1800,
        placement: 'top',
        render: ({ id }) => {
          const toastId = 'toast-' + id
          return (
            <Toast mt={50} nativeID={toastId} action="success" variant="accent">
              <VStack w={'$72'}>
                <ToastTitle>Foto atualizada!</ToastTitle>
              </VStack>
            </Toast>
          )
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
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  })

  // Password Visible
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const handlePasswordVisible = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const handleSignUp = async (data: SignUpSchema) => {
    console.log(data)
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

        {/* Image Picker */}
        <HStack alignItems="center" flex={1} pl={50}>
          <Image
            source={userPhoto === '' ? Avatar : { uri: userPhoto }}
            alt="Foto do usuario"
            mt={32}
            borderRadius={999}
            borderWidth={3}
            borderColor="$bluelight"
            h={PHOTO_SIZE}
            w={PHOTO_SIZE}
            alignSelf="center"
          />

          <Button
            top={'33%'}
            right={'12%'}
            h={40}
            w={40}
            position="relative"
            borderRadius={'$full'}
            onPress={handleSelectUserPhoto}
            isButtonIcon
            size={'md'}
            Icon={PencilSimpleLine}
          />
        </HStack>

        {/* Form */}
        <VStack mt={16} alignItems="center" w={'$full'} pb={20}>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange } }) => (
              <Input
                onChange={onChange}
                placeholder="Nome"
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange } }) => (
              <Input
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
            render={({ field: { onChange } }) => (
              <Input
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
            render={({ field: { onChange } }) => (
              <Input
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
            render={({ field: { onChange } }) => (
              <Input
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
