import { HStack, Icon, useStyled, VStack } from '@gluestack-ui/themed'
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import ArrowLeft from 'phosphor-react-native/src/icons/ArrowLeft'
import PencilSimpleLine from 'phosphor-react-native/src/icons/PencilSimpleLine'
import { useCallback, useEffect, useState } from 'react'
import { BackHandler, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ProductDTO } from '@/dtos/MarketspaceDTO'
import { useMarketspace } from '@/hooks/useMarketspace'
import { AppNavigationRoutesProp } from '@/routes/app.routes'
import { AdvertInfo } from '@/screens/app/Details/components/AdvertInfo'

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

interface RouteParams {
  id: string
}

export const MyAdvertDetails = () => {
  // Parameters
  const { params } = useRoute()
  const { id } = params as RouteParams

  // Data
  const [isLoading, setIsLoading] = useState(true)
  const [productData, setProductData] = useState<ProductDTO>(EMPTY_DATA)
  const { getProduct } = useMarketspace()

  const [isActive, setIsActive] = useState(productData.isActive)

  useEffect(() => {
    setIsLoading(true)
    const fetchProductData = async () => {
      const data = await getProduct(id)
      setProductData(data)
      setIsLoading(false)
    }

    fetchProductData()
  }, [getProduct, id, isActive])

  // Navigation
  const { navigate } = useNavigation<AppNavigationRoutesProp>()
  const goToEdit = () => {
    navigate('edit', { id: '1' })
  }
  const returnToMyAdverts = useCallback(() => {
    navigate('my-adverts')
  }, [navigate])

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        returnToMyAdverts()
        return true
      }

      BackHandler.addEventListener('hardwareBackPress', onBackPress)

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress)
      }
    }, [returnToMyAdverts]),
  )

  // Styles
  const styled = useStyled()
  const { colors } = styled.config.tokens

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
        <HStack px={24} justifyContent="space-between">
          <TouchableOpacity onPress={returnToMyAdverts}>
            <Icon as={ArrowLeft} h={1} w={1} size={'xl'} mb={16} />
          </TouchableOpacity>

          <TouchableOpacity onPress={goToEdit}>
            <Icon as={PencilSimpleLine} h={1} w={1} size={'xl'} mb={16} />
          </TouchableOpacity>
        </HStack>

        {/* Advertising Info */}
        <AdvertInfo
          isEdit
          product={productData}
          isLoading={isLoading}
          setIsActive={setIsActive}
        />
      </VStack>
    </SafeAreaView>
  )
}
