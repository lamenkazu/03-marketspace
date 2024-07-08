import { FlatList, Text, View } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

import { AdvertisingCard } from '@/components/AdvertisingCard'

interface AdvertListProps extends ComponentProps<typeof FlatList> {}

export const AdvertList = ({ ...props }: AdvertListProps) => {
  const dataP = [
    { id: '1', value: 'Item 1', variant: 'new' },
    { id: '2', value: 'Item 2', variant: 'used' },
    { id: '3', value: 'Item 3', variant: 'used' },
    { id: '4', value: 'Item 4', variant: 'new' },
    { id: '5', value: 'Item 5', variant: 'used' },
    { id: '6', value: 'Item 6', variant: 'new' },
    { id: '7', value: 'Item 7', variant: 'used' },
    { id: '8', value: 'Item 8', variant: 'new' },
    { id: '9', value: 'Item 9', variant: 'new' },
  ]
  return (
    <FlatList
      w={'$full'}
      data={dataP}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={{
        marginRight: 20,
        gap: 20,
        justifyContent: 'space-between',
      }}
      renderItem={({ item, index }) => (
        <AdvertisingCard
          tagTitle={item.variant === 'new' ? 'Novo' : 'Usado'}
          tagVariant={item.variant === 'new' ? 'new' : 'used'}
        />
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 75 }}
      {...props}
    />
  )
}
