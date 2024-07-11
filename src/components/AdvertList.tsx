import { FlatList } from 'react-native'

import { AdvertisingCard } from '@/components/AdvertisingCard'
import { ProductDTO } from '@/dtos/MarketspaceDTO'

type AdvertBelongsTo = 'self' | 'others'

interface AdvertListProps {
  condition: AdvertBelongsTo
  list: ProductDTO[]
}

export const AdvertList = ({ condition, list }: AdvertListProps) => {
  return (
    <FlatList
      data={list}
      keyExtractor={(product) => product.id!}
      numColumns={2}
      columnWrapperStyle={{
        marginRight: 20,
        gap: 20,
        justifyContent: 'space-between',
      }}
      renderItem={({ item }) => {
        return (
          <AdvertisingCard data={item} isSelfAdvert={condition === 'self'} />
        )
      }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 75 }}
      // {...props}
    />
  )
}
