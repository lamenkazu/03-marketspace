import { HStack, Image, Text, View, VStack } from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'
import { ComponentProps } from 'react'
import { TouchableOpacity } from 'react-native'

import { ProductDTO } from '@/dtos/MarketspaceDTO'
import { api } from '@/lib/axios'
import { AppNavigationRoutesProp } from '@/routes/app.routes'

import { Avatar } from './Avatar'
import { Tag } from './Tag'

interface AdvertisingCardProps extends ComponentProps<typeof VStack> {
  data: ProductDTO
  isSelfAdvert: boolean
}

export const AdvertisingCard = ({
  data,
  isSelfAdvert,
  ...props
}: AdvertisingCardProps) => {
  const { navigate } = useNavigation<AppNavigationRoutesProp>()
  const handleGoToProductDetails = () => {
    if (isSelfAdvert) {
      navigate('my-advert-details', { id: '1' })
    } else {
      navigate('others-advert-details', { id: '1' })
    }
  }

  return (
    <TouchableOpacity
      style={{ width: '50%' }}
      onPress={handleGoToProductDetails}
    >
      <VStack {...props} mb={24}>
        <HStack
          justifyContent="space-between"
          position={'absolute'}
          zIndex={1}
          w={'$full'}
          p={3}
        >
          {!isSelfAdvert ? (
            <Avatar
              userPhoto={`${api.defaults.baseURL}/images/${data.user?.avatar}`}
              avatarSize={24}
              borderWidth={1}
              borderColor="$gray700"
            />
          ) : (
            <View w={24} h={24} />
          )}

          <Tag
            title={data.isNew ? 'Novo' : 'Usado'}
            variant={data.isNew ? 'new' : 'used'}
          />
        </HStack>

        <HStack>
          <Image
            w={'$full'}
            h={100}
            source={{
              uri: `${api.defaults.baseURL}/images/${data.images[0].uri}`,
            }}
            alt="imagem do produto"
            borderRadius={6}
            position={'relative'}
          />

          {data.isActive !== undefined && !data.isActive ? (
            <>
              <View
                bg={'$gray100'}
                w={'$full'}
                h={100}
                position={'absolute'}
                zIndex={1}
                borderRadius={6}
                opacity={0.45}
              />
              <Text
                position={'absolute'}
                zIndex={2}
                w={'$full'}
                bottom={0}
                mb={12}
                ml={8}
                fontFamily="$heading"
                color="$gray700"
                fontSize={11}
              >
                {'Anúncio desativado'.toUpperCase()}
              </Text>
            </>
          ) : null}
        </HStack>

        <VStack ml={3} mt={8}>
          <Text $base-color="$gray200" fontSize={'$sm'}>
            {data.name}
          </Text>

          <HStack alignItems="baseline" gap={3}>
            <Text $base-color="$gray100" fontSize={'$xs'}>
              R$
            </Text>

            <Text $base-color="$gray100" fontSize={'$md'} fontFamily="$heading">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(data.price / 100)}
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </TouchableOpacity>
  )
}
