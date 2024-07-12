import { Box, HStack, Icon, useStyled, VStack } from '@gluestack-ui/themed'
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import ArrowLeft from 'phosphor-react-native/src/icons/ArrowLeft'
import WhatsappLogo from 'phosphor-react-native/src/icons/WhatsappLogo'
import { useCallback, useEffect, useState } from 'react'
import { BackHandler, Linking, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '@/components/Button'
import { PriceLabel } from '@/components/PriceLabel'
import { ProductDTO } from '@/dtos/MarketspaceDTO'
import { useMarketspace } from '@/hooks/useMarketspace'
import { AppNavigationRoutesProp } from '@/routes/app.routes'
import { AdvertInfo } from '@/screens/app/Details/components/AdvertInfo'

interface RouteParams {
  id: string
}

export const EMPTY_DATA = {
  acceptTrade: true,
  images: [{ uri: 'https://github.com/lamenkazu.png', name: '', type: '' }],
  isNew: false,
  name: '',
  paymentMethods: [],
  description: '',
  isActive: true,
  price: 0,
  id: '',
  userId: '',
} as ProductDTO

export const OthersAdvertDetails = () => {
  // Data
  const [isLoading, setIsLoading] = useState(true)
  const [productData, setProductData] = useState<ProductDTO>(EMPTY_DATA)
  const { getProduct } = useMarketspace()

  // Parameters
  const { params } = useRoute()
  const { id } = params as RouteParams

  // Styles
  const styled = useStyled()
  const { colors } = styled.config.tokens

  // Navigation
  const { navigate } = useNavigation<AppNavigationRoutesProp>()
  const returnToHome = useCallback(() => {
    navigate('home')
  }, [navigate])

  const handleContactPress = (phone: string) => {
    const whatsappLink = `https://whatsa.me/${phone}`
    Linking.openURL(whatsappLink)
  }

  useEffect(() => {
    setIsLoading(true)
    const fetchProductData = async () => {
      const data = await getProduct(id)
      setProductData(data)
      setIsLoading(false)
    }

    fetchProductData()
  }, [getProduct, id])

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        returnToHome()
        return true
      }

      BackHandler.addEventListener('hardwareBackPress', onBackPress)

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress)
      }
    }, [returnToHome]),
  )

  return (
    <SafeAreaView
      style={{
        marginTop: 30,
        flex: 1,
        backgroundColor: colors.gray600,
      }}
    >
      <VStack flex={1}>
        {/* Header */}
        <HStack px={24}>
          <TouchableOpacity onPress={returnToHome}>
            <Icon as={ArrowLeft} h={1} w={1} size={'xl'} mb={16} />
          </TouchableOpacity>
        </HStack>

        {/* Advertising Info */}
        <AdvertInfo product={productData} isLoading={isLoading} />

        {/* Footer */}
        <Box h={90} bg={'#fff'} justifyContent="center" px={24}>
          <HStack alignItems="center" justifyContent="space-between">
            <PriceLabel price={productData.price} size={'$2xl'} />

            <Button
              onPress={() => {
                handleContactPress(String(productData.user?.phone))
              }}
              ButtonIcon={WhatsappLogo}
              w={'60%'}
              bg={'$bluelight'}
              title="Entrar em contato"
            />
          </HStack>
        </Box>
      </VStack>
    </SafeAreaView>
  )
}
