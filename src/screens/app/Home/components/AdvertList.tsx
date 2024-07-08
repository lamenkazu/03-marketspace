import { FlatList, Text, View } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

interface AdvertListProps extends ComponentProps<typeof FlatList> {}

export const AdvertList = ({ ...props }: AdvertListProps) => {
  const dataP = [
    { id: '1', value: 'Item 1' },
    { id: '2', value: 'Item 2' },
    { id: '3', value: 'Item 3' },
    { id: '4', value: 'Item 4' },
    { id: '5', value: 'Item 5' },
    { id: '6', value: 'Item 6' },
  ]
  return (
    <FlatList
      w={'$full'}
      data={dataP}
      keyExtractor={(item) => item.id}
      numColumns={2}
      renderItem={({ item }) => (
        <View flex={1}>
          <Text>{item.value}</Text>
        </View>
      )}
      {...props}
    />
  )
}
