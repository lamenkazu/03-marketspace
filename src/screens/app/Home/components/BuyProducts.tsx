import { VStack } from '@gluestack-ui/themed'

import { AdvertList } from './AdvertList'
import { SearchAdvert } from './SearchAdvert'

export const BuyProducts = () => {
  return (
    <VStack flex={1}>
      <SearchAdvert />
      <AdvertList />
    </VStack>
  )
}
