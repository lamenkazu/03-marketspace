import {
  Button,
  ButtonText,
  EyeIcon,
  Input,
  InputField,
  InputSlot,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { TouchableOpacity } from 'react-native'

import Logo from '@/assets/logo.svg'
import Marketspace from '@/assets/marketspace.svg'

export const SignIn = () => {
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
            h={45}
            px={16}
            bg="$gray700"
            borderRadius={6}
            borderColor="transparent"
            $focus-borderColor="$bluelight"
          >
            <InputField placeholder="Senha" bg="$gray700" secureTextEntry />
            <InputSlot>
              <TouchableOpacity>
                <EyeIcon />
              </TouchableOpacity>
            </InputSlot>
          </Input>

          <Button
            w={'$full'}
            bg="$bluelight"
            size={'xl'}
            mt={32}
            onPress={() => console.log('uai')}
            $active-opacity={0.8}
          >
            <ButtonText
              fontFamily="$heading"
              fontSize={'$sm'}
              color={'$gray700'}
            >
              Entrar
            </ButtonText>
          </Button>
        </VStack>
      </VStack>

      <VStack alignItems="center" px={48} pb={20}>
        <Text mt={54} fontSize={'$sm'}>
          Ainda não tem acesso?
        </Text>

        <Button
          w={'$full'}
          bg="$gray500"
          size={'xl'}
          mt={16}
          onPress={() => console.log('ok')}
          $active-opacity={0.8}
        >
          <ButtonText fontFamily="$heading" fontSize={'$sm'} color={'$gray200'}>
            Criar uma conta
          </ButtonText>
        </Button>
      </VStack>
    </ScrollView>
  )
}
