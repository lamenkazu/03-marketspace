import {
  HStack,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import PencilSimpleLine from 'phosphor-react-native/src/icons/PencilSimpleLine'

import { Avatar } from './Avatar'
import { LabelTitle } from './LabelTitle'
import { PriceLabel } from './PriceLabel'
import { Tag } from './Tag'

export const AdvertInfo = () => {
  const paymentData = [
    'Boleto',
    'Pix',
    'Dinheiro',
    'Cartão de Crédito',
    'Depósito Bancário',
  ]
  return (
    <VStack flex={1}>
      {/* Image */}
      <Image
        w={'$full'}
        h={280}
        source={{
          uri: 'https://cdn.awsli.com.br/600x1000/1392/1392737/produto/188276783/d93e5dc2bc.jpg',
        }}
        alt="imagem do produto"
        position={'relative'}
      />

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
            <Text>Erick Etiene</Text>
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
            <LabelTitle>Meios de pagamento:</LabelTitle>
            {paymentData.map((item) => (
              <HStack key={item} alignItems="center" gap={12} mb={10}>
                <Icon as={PencilSimpleLine} size={'md'} h={1} w={1} />
                <Text fontSize="$sm">{item}</Text>
              </HStack>
            ))}
          </VStack>
        </VStack>
      </ScrollView>
    </VStack>
  )
}
