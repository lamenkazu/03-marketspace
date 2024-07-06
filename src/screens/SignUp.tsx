import {
  Button,
  ButtonIcon,
  ButtonText,
  Center,
  EyeIcon,
  HStack,
  Image,
  Input,
  InputField,
  InputSlot,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'
import PencilSimpleLine from 'phosphor-react-native/src/icons/PencilSimpleLine'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'

import Avatar from '@/assets/avatar.png'
import Logo from '@/assets/logo.svg'
import { AuthNavigatorProps } from '@/routes/auth.routes'

export const SignUp = () => {
  const { navigate } = useNavigation<AuthNavigatorProps>()

  const handleGoToSignIn = () => {
    navigate('signIn')
  }

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handlePasswordVisible = () => {
    setIsPasswordVisible(!isPasswordVisible)
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

        <HStack alignItems="center" flex={1} pl={50}>
          <Image
            source={Avatar}
            alt="Foto do usuario"
            mt={32}
            borderRadius={999}
            borderWidth={3}
            borderColor="$bluelight"
            h={88}
            w={88}
            alignSelf="center"
          />

          <Button
            position="relative"
            top={'33%'}
            right={'10%'}
            h={40}
            w={40}
            borderRadius={'$full'}
            bg={'$bluelight'}
            onPress={() => console.log('click')}
          >
            {/* EditIcon is imported from 'lucide-react-native' */}
            <ButtonIcon as={PencilSimpleLine} />
          </Button>
        </HStack>

        <VStack mt={16} alignItems="center" w={'$full'} pb={20}>
          <Input
            mb={16}
            h={45}
            px={16}
            bg="$gray700"
            borderRadius={6}
            borderColor="transparent"
            $focus-borderColor="$bluelight"
          >
            <InputField placeholder="Nome" />
          </Input>
          <Input
            mb={16}
            h={45}
            px={16}
            bg="$gray700"
            borderRadius={6}
            borderColor="transparent"
            $focus-borderColor="$bluelight"
          >
            <InputField placeholder="E-mail" />
          </Input>
          <Input
            mb={16}
            h={45}
            px={16}
            bg="$gray700"
            borderRadius={6}
            borderColor="transparent"
            $focus-borderColor="$bluelight"
          >
            <InputField placeholder="Telefone" />
          </Input>

          <Input
            h={45}
            pl={16}
            mb={16}
            bg="$gray700"
            borderRadius={6}
            borderColor="transparent"
            $focus-borderColor="$bluelight"
          >
            <InputField
              flex={1}
              placeholder="Senha"
              bg="$gray700"
              secureTextEntry={isPasswordVisible}
            />
            <Center paddingHorizontal={10}>
              <InputSlot>
                <TouchableOpacity onPress={handlePasswordVisible}>
                  <EyeIcon />
                </TouchableOpacity>
              </InputSlot>
            </Center>
          </Input>

          <Input
            h={45}
            pl={16}
            bg="$gray700"
            borderRadius={6}
            borderColor="transparent"
            $focus-borderColor="$bluelight"
          >
            <InputField
              placeholder="Confirmar senha"
              bg="$gray700"
              secureTextEntry={isPasswordVisible}
            />
            <Center paddingHorizontal={10}>
              <InputSlot>
                <TouchableOpacity onPress={handlePasswordVisible}>
                  <EyeIcon />
                </TouchableOpacity>
              </InputSlot>
            </Center>
          </Input>

          <Button
            w={'$full'}
            bg="$gray100"
            borderRadius={6}
            size={'xl'}
            mt={24}
            onPress={() => console.log('uai')}
            $active-opacity={0.8}
          >
            <ButtonText
              fontFamily="$heading"
              fontSize={'$sm'}
              color={'$gray700'}
            >
              Criar
            </ButtonText>
          </Button>

          <Text mt={54} fontSize={'$sm'} color={'$gray200'}>
            Já tem uma conta?
          </Text>

          <Button
            w={'$full'}
            bg="$gray500"
            size={'xl'}
            borderRadius={6}
            mt={16}
            onPress={handleGoToSignIn}
            $active-opacity={0.8}
          >
            <ButtonText
              fontFamily="$heading"
              fontSize={'$sm'}
              color={'$gray200'}
            >
              Ir para o login
            </ButtonText>
          </Button>
        </VStack>
      </VStack>
    </ScrollView>
  )
}
