import {
  ButtonGroup,
  HStack,
  Icon,
  Image,
  ScrollView,
  Text,
  View,
  VStack,
} from '@gluestack-ui/themed'
import PencilSimpleLine from 'phosphor-react-native/src/icons/PencilSimpleLine'
import Power from 'phosphor-react-native/src/icons/Power'
import TrashSimple from 'phosphor-react-native/src/icons/TrashSimple'

import { Avatar } from '@/components/Avatar'
import { Button } from '@/components/Button'
import { LabelTitle } from '@/components/LabelTitle'
import { PriceLabel } from '@/components/PriceLabel'
import { Tag } from '@/components/Tag'
import { ProductDTO } from '@/dtos/MarketspaceDTO'
import { useAuth } from '@/hooks/useAuth'
import { api } from '@/lib/axios'

interface AdvertInfoProps {
  isEdit?: boolean
  product: ProductDTO
}

export const AdvertInfo = ({
  isEdit = false,
  product: {
    price,
    acceptTrade,
    description,
    images,
    isActive,
    isNew,
    name,
    paymentMethods,
  },
}: AdvertInfoProps) => {
  const { user } = useAuth()

  return (
    <VStack flex={1}>
      {/* Image */}
      <HStack>
        <Image
          w={'$full'}
          h={280}
          source={{
            uri: images[0].uri,
          }}
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
              userPhoto={`${api.defaults.baseURL}/images/${user.avatar}`}
              avatarSize={24}
              borderWidth={1}
            />
            <Text fontSize={'$sm'} color={'$gray100'}>
              {user.name}
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
              <HStack key={item} alignItems="center" gap={12} mb={10}>
                <Icon as={PencilSimpleLine} size={'md'} h={1} w={1} />
                <Text fontSize="$sm">{item}</Text>
              </HStack>
            ))}
          </VStack>

          {isEdit ? (
            <ButtonGroup flexDirection="column" mt={32}>
              <Button
                title={isActive ? 'Desativar anúncio' : 'Reativar anúncio'}
                ButtonIcon={Power}
                bg={isActive ? '$gray100' : '$bluelight'}
                onPress={() => {}}
              />
              <Button
                title="Excluir anúncio"
                ButtonIcon={TrashSimple}
                bg={'$gray500'}
                color={'$gray200'}
              />
            </ButtonGroup>
          ) : null}
        </VStack>
      </ScrollView>
    </VStack>
  )
}
