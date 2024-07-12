import {
  ButtonGroup,
  HStack,
  Icon,
  Image,
  ScrollView,
  Spinner,
  Text,
  View,
  VStack,
} from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'
import PencilSimpleLine from 'phosphor-react-native/src/icons/PencilSimpleLine'
import Power from 'phosphor-react-native/src/icons/Power'
import TrashSimple from 'phosphor-react-native/src/icons/TrashSimple'
import { Alert } from 'react-native'

import { Avatar } from '@/components/Avatar'
import { Button } from '@/components/Button'
import { LabelTitle } from '@/components/LabelTitle'
import { PriceLabel } from '@/components/PriceLabel'
import { Tag } from '@/components/Tag'
import { ProductDTO } from '@/dtos/MarketspaceDTO'
import { useAuth } from '@/hooks/useAuth'
import { useMarketspace } from '@/hooks/useMarketspace'
import { api } from '@/lib/axios'
import { AppNavigationRoutesProp } from '@/routes/app.routes'

interface AdvertInfoProps {
  isEdit?: boolean
  isPreview?: boolean
  product: ProductDTO
  isLoading?: boolean
  setIsActive?: (visible: boolean) => void // Adicione esta prop
}

export const AdvertInfo = ({
  isEdit = false,
  isPreview = false,
  isLoading,
  product,
  setIsActive,
}: AdvertInfoProps) => {
  const {
    price,
    acceptTrade,
    description,
    images,
    isActive,
    isNew,
    name,
    paymentMethods,
    user,
    id,
  } = product

  const { user: loggedUser } = useAuth()
  const { deleteProduct, toggleVisibility } = useMarketspace()

  const { navigate } = useNavigation<AppNavigationRoutesProp>()

  const handleDelete = () => {
    Alert.alert(
      'Deletar anúncio?',
      'Esse anúncio será excluído permanentemente.',
      [
        {
          text: 'Não excluir',
          style: 'cancel',
        },
        {
          text: 'Excluir pra sempre',
          onPress: async () => {
            await deleteProduct(product)
            navigate('my-adverts')
          },
        },
      ],
    )
  }

  const handleChangeVisibility = async () => {
    await toggleVisibility(id!, !isActive)
    if (setIsActive) {
      setIsActive(!isActive)
    }
  }

  if (isLoading) {
    return <Spinner flex={1} />
  }

  return (
    <VStack flex={1}>
      {/* Image */}
      <HStack>
        <Image
          w={'$full'}
          h={280}
          source={
            isPreview
              ? {
                  uri: images[0].uri,
                }
              : {
                  uri: `${api.defaults.baseURL}/images/${images[0].uri}`,
                }
          }
          alt="imagem do produto"
          position={'relative'}
        />

        {!isActive ? (
          <>
            <View
              bg={'$gray100'}
              w={'$full'}
              h={280}
              position={'absolute'}
              zIndex={1}
              opacity={0.45}
            />
            <Text
              position={'absolute'}
              zIndex={2}
              w={'$full'}
              h={'$1/6'}
              textAlign="center"
              bottom={'50%'}
              top={'50%'}
              fontFamily="$heading"
              color="$gray700"
              fontSize={'$sm'}
            >
              {'Anúncio desativado'.toUpperCase()}
            </Text>
          </>
        ) : null}
      </HStack>

      {/* Info Content */}
      <ScrollView>
        <VStack flex={1} mt={18} pb={28} px={24}>
          {/* Profile */}
          <HStack gap={8}>
            <Avatar
              userPhoto={
                isPreview
                  ? `${api.defaults.baseURL}/images/${loggedUser.avatar}`
                  : `${api.defaults.baseURL}/images/${user?.avatar}`
              }
              avatarSize={24}
              borderWidth={1}
            />
            <Text fontSize={'$sm'} color={'$gray100'}>
              {isPreview ? loggedUser.name : user?.name}
            </Text>
          </HStack>

          {/* Tag */}
          <HStack mt={24} mb={14}>
            <Tag title={isNew ? 'Novo' : 'Usado'} variant="neutral" />
          </HStack>

          {/* Advert Title */}
          <HStack justifyContent="space-between">
            <Text flex={1} fontFamily={'$heading'} fontSize={'$xl'}>
              {name}
            </Text>

            <PriceLabel price={price} />
          </HStack>

          {/* Advert Description */}
          <Text mt={18}>{description}</Text>

          {/* Advert Trade Info */}
          <HStack alignItems="baseline" gap={12}>
            <LabelTitle>Aceita troca?</LabelTitle>
            <Text fontSize="$sm">{acceptTrade ? 'Sim' : 'Não'}</Text>
          </HStack>

          {/* Payment Methods */}
          <VStack>
            <LabelTitle mt={14}>Meios de pagamento:</LabelTitle>
            {paymentMethods.map((item) => (
              <HStack key={item.key} alignItems="center" gap={12} mb={10}>
                <Icon as={PencilSimpleLine} size={'md'} h={1} w={1} />
                <Text fontSize="$sm">{item.name}</Text>
              </HStack>
            ))}
          </VStack>

          {isEdit ? (
            <ButtonGroup flexDirection="column" mt={32}>
              <Button
                title={isActive ? 'Desativar anúncio' : 'Reativar anúncio'}
                ButtonIcon={Power}
                bg={isActive ? '$gray100' : '$bluelight'}
                onPress={handleChangeVisibility}
              />
              <Button
                title="Excluir anúncio"
                ButtonIcon={TrashSimple}
                bg={'$gray500'}
                color={'$gray200'}
                onPress={handleDelete}
              />
            </ButtonGroup>
          ) : null}
        </VStack>
      </ScrollView>
    </VStack>
  )
}
