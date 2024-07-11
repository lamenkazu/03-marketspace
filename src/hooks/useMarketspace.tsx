import { useContext } from 'react'

import { MarketspaceContext } from '@/contexts/MarketspaceContext'

export const useMarketspace = () => {
  const context = useContext(MarketspaceContext)

  return context
}
