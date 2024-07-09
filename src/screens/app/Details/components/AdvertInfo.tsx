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
import { useState } from 'react'

import { Avatar } from '@/components/Avatar'
import { Button } from '@/components/Button'
import { LabelTitle } from '@/components/LabelTitle'
import { PriceLabel } from '@/components/PriceLabel'
import { Tag } from '@/components/Tag'

interface AdvertInfoProps {
  isEdit?: boolean
}

export const AdvertInfo = ({ isEdit = false }: AdvertInfoProps) => {
  const paymentData = [
    'Boleto',
    'Pix',
    'Dinheiro',
    'Cartão de Crédito',
    'Depósito Bancário',
  ]

  const [isActive, setIsActive] = useState(false)

  const handleToggleActive = () => {
    setIsActive(!isActive)
  }

  return (
    <VStack flex={1}>
      {/* Image */}
      <HStack>
        <Image
          w={'$full'}
          h={280}
          source={{
            uri: 'https://cdn.awsli.com.br/600x1000/1392/1392737/produto/188276783/d93e5dc2bc.jpg',
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
              borderRadius={6}
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
              userPhoto="https://github.com/lamenkazu.png"
              avatarSize={24}
              borderWidth={1}
            />
            <Text fontSize={'$sm'} color={'$gray100'}>
              Erick Etiene
            </Text>
          </HStack>

          {/* Tag */}
          <HStack mt={24} mb={14}>
            <Tag title="Novo" variant="neutral" />
          </HStack>

          {/* Advert Title */}
          <HStack justifyContent="space-between">
            <Text flex={1} fontFamily={'$heading'} fontSize={'$xl'}>
              Bicicleta
            </Text>

            <PriceLabel />
          </HStack>

          {/* Advert Description */}
          <Text mt={18}>
            Cras congue cursus in tortor sagittis placerat nunc, tellus arcu.
            Vitae ante leo eget maecenas urna mattis cursus. Mauris metus amet
            nibh mauris mauris accumsan, euismod. Aenean leo nunc, purus iaculis
            in aliquam.
          </Text>

          {/* Advert Trade Info */}
          <HStack alignItems="baseline" gap={12}>
            <LabelTitle>Aceita troca?</LabelTitle>
            <Text fontSize="$sm">Sim</Text>
          </HStack>

          {/* Payment Methods */}
          <VStack>
            <LabelTitle mt={14}>Meios de pagamento:</LabelTitle>
            {paymentData.map((item) => (
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
                onPress={handleToggleActive}
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
