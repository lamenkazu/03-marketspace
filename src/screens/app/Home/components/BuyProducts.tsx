import { VStack } from '@gluestack-ui/themed'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useState } from 'react'

import { AdvertList } from '@/components/AdvertList'
import { ProductDTO } from '@/dtos/MarketspaceDTO'
import { useMarketspace } from '@/hooks/useMarketspace'

import { SearchAdvert } from './SearchAdvert'

export const BuyProducts = () => {
  const [productList, setProductList] = useState<ProductDTO[]>([])

  const { fetchProducts } = useMarketspace()

  useFocusEffect(
    useCallback(() => {
      const getOtherUserProducts = async () => {
        const otherProductsData = await fetchProducts()
        setProductList(otherProductsData)
      }

      getOtherUserProducts()
    }, [fetchProducts]),
  )
  return (
    <VStack flex={1}>
      <SearchAdvert />
      <AdvertList condition="others" list={productList} />
    </VStack>
  )
}
