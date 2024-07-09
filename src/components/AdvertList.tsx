import { FlatList } from 'react-native'

import { AdvertisingCard } from '@/components/AdvertisingCard'

type AdvertBelongsTo = 'self' | 'others'

interface AdvertListProps {
  condition: AdvertBelongsTo
}

export const AdvertList = ({ condition }: AdvertListProps) => {
  const dataP = [
    { id: '1', value: 'Item 1', variant: 'new', isSelf: true, isActive: true },
    {
      id: '2',
      value: 'Item 2',
      variant: 'used',
      isSelf: false,
      isActive: true,
    },
    { id: '3', value: 'Item 3', variant: 'used', isSelf: true, isActive: true },
    { id: '4', value: 'Item 4', variant: 'new', isSelf: true, isActive: true },
    { id: '6', value: 'Item 1', variant: 'new', isSelf: true, isActive: false },
    {
      id: '7',
      value: 'Item 2',
      variant: 'used',
      isSelf: false,
      isActive: true,
    },
    {
      id: '5',
      value: 'Item 5',
      variant: 'used',
      isSelf: true,
      isActive: false,
    },
    {
      id: '8',
      value: 'Item 3',
      variant: 'used',
      isSelf: false,
      isActive: true,
    },
    { id: '9', value: 'Item 4', variant: 'new', isSelf: false, isActive: true },
    {
      id: '10',
      value: 'Item 5',
      variant: 'used',
      isSelf: false,
      isActive: true,
    },
  ]

  const filteredData = dataP.filter(
    (item) =>
      (condition === 'self' && item.isSelf) ||
      (condition === 'others' && !item.isSelf),
  )

  return (
    <FlatList
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
              isActive={item.isActive}
            />
          )
        }
        return null
      }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 75 }}
      // {...props}
    />
  )
}
