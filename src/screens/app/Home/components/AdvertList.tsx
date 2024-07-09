import { FlatList, View } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

import { AdvertisingCard } from '@/components/AdvertisingCard'

type AdvertBelongsTo = 'self' | 'others'

interface AdvertListProps extends ComponentProps<typeof FlatList> {
  condition: AdvertBelongsTo
}

export const AdvertList = ({ condition, ...props }: AdvertListProps) => {
  const dataP = [
    { id: '1', value: 'Item 1', variant: 'new', isSelf: true },
    { id: '2', value: 'Item 2', variant: 'used', isSelf: false },
    { id: '3', value: 'Item 3', variant: 'used', isSelf: true },
    { id: '4', value: 'Item 4', variant: 'new', isSelf: true },
    { id: '6', value: 'Item 1', variant: 'new', isSelf: true },
    { id: '7', value: 'Item 2', variant: 'used', isSelf: false },
    { id: '5', value: 'Item 5', variant: 'used', isSelf: true },
    { id: '8', value: 'Item 3', variant: 'used', isSelf: false },
    { id: '9', value: 'Item 4', variant: 'new', isSelf: false },
    { id: '10', value: 'Item 5', variant: 'used', isSelf: false },
  ]

  const filteredData = dataP.filter(
    (item) =>
      (condition === 'self' && item.isSelf) ||
      (condition === 'others' && !item.isSelf),
  )

  return (
    <FlatList
      w={'$full'}
      data={filteredData}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={{
        marginRight: 20,
        gap: 20,
        justifyContent: 'space-between',
      }}
      renderItem={({ item }) => {
        if (
          (condition === 'self' && item.isSelf) ||
          (condition === 'others' && !item.isSelf)
        ) {
          return (
            <AdvertisingCard
              tagTitle={item.variant === 'new' ? 'Novo' : 'Usado'}
              tagVariant={item.variant === 'new' ? 'new' : 'used'}
              isSelfAdvert={item.isSelf}
            />
          )
        }
        return null
      }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 75 }}
      {...props}
    />
  )
}
