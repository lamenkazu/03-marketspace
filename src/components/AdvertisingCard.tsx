import { HStack, Image, Text, VStack } from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'
import { ComponentProps } from 'react'
import { TouchableOpacity } from 'react-native'

import { AppNavigationRoutesProp } from '@/routes/app.routes'

import { Avatar } from './Avatar'
import { Tag, TagTitleVariants, TagVariants } from './Tag'

interface AdvertisingCardProps extends ComponentProps<typeof VStack> {
  tagVariant: TagVariants
  tagTitle: TagTitleVariants
}

export const AdvertisingCard = ({
  tagVariant,
  tagTitle,
  ...props
}: AdvertisingCardProps) => {
  const { navigate } = useNavigation<AppNavigationRoutesProp>()
  const handleGoToProductDetails = () => {
    navigate('details', { id: '1' })
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
          <Avatar
            userPhoto="https://github.com/lamenkazu.png"
            avatarSize={24}
            borderWidth={1}
            borderColor="$gray700"
          />

          <Tag title={tagTitle} variant={tagVariant} />
        </HStack>

        <Image
          w={'$full'}
          h={100}
          source={{
            uri: 'https://cdn.awsli.com.br/600x1000/1392/1392737/produto/188276783/d93e5dc2bc.jpg',
          }}
          alt="imagem do produto"
          borderRadius={6}
          position={'relative'}
        />

        <VStack ml={3} mt={8}>
          <Text $base-color="$gray200" fontSize={'$sm'}>
            Tênis{' '}
          </Text>

          <HStack alignItems="baseline" gap={3}>
            <Text $base-color="$gray100" fontSize={'$xs'}>
              R$
            </Text>

            <Text $base-color="$gray100" fontSize={'$md'} fontFamily="$heading">
              59,90
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </TouchableOpacity>
  )
}
