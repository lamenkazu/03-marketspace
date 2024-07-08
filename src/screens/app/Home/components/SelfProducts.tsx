import {
  Button,
  ButtonIcon,
  ButtonText,
  HStack,
  Icon,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import ArrowRight from 'phosphor-react-native/src/icons/ArrowRight'
import Tag from 'phosphor-react-native/src/icons/Tag'

export const SelfProducts = () => {
  return (
    <HStack
      bg={'$bluelightopacity'}
      h={66}
      alignItems="center"
      justifyContent="space-between"
      px={16}
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

      <Button variant={'link'} justifyContent="center" gap={8}>
        <ButtonText fontFamily="$heading">Meus anúncios</ButtonText>
        <ButtonIcon as={ArrowRight} h={16} w={16} />
      </Button>
    </HStack>
  )
}
