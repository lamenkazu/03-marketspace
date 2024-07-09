import { VStack } from '@gluestack-ui/themed'

import { AdvertList } from '../../../../components/AdvertList'
import { SearchAdvert } from './SearchAdvert'

export const BuyProducts = () => {
  return (
    <VStack flex={1}>
      <SearchAdvert />
      <AdvertList condition="others" />
    </VStack>
  )
}
