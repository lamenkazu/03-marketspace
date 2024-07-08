import {
  Button,
  ButtonIcon,
  ButtonText,
  HStack,
  Icon,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'
import ArrowRight from 'phosphor-react-native/src/icons/ArrowRight'
import Tag from 'phosphor-react-native/src/icons/Tag'

import { AppNavigationRoutesProp } from '@/routes/app.routes'

export const SelfProducts = () => {
  const { navigate } = useNavigation<AppNavigationRoutesProp>()

  const handleGoToMyAdverts = () => {
    navigate('my-adverts')
  }

  return (
    <HStack
      bg={'$bluelightopacity'}
      h={66}
      alignItems="center"
      justifyContent="space-between"
      px={22}
      borderRadius={6}
    >
      <HStack alignItems="center" gap={16}>
        <Icon as={Tag} size={'xl'} color={'$blue'} />

        <VStack>
          <Text fontSize={'$xl'} fontFamily="$heading">
            4
          </Text>
          <Text fontSize={'$xs'} color={'$gray200'}>
            anúncios ativos
          </Text>
        </VStack>
      </HStack>

      <Button
        onPress={handleGoToMyAdverts}
        variant={'link'}
        justifyContent="center"
        gap={8}
      >
        <ButtonText color={'$blue'} fontSize={'$xs'} fontFamily="$heading">
          Meus anúncios
        </ButtonText>
        <ButtonIcon color={'$blue'} mt={3} as={ArrowRight} h={16} w={16} />
      </Button>
    </HStack>
  )
}
