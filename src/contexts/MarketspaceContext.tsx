import { createContext, PropsWithChildren } from 'react'

export interface MarketspaceContextDataProps {
  publishProduct: () => Promise<void>
  fetchProducts: () => Promise<void>
  getProduct: () => Promise<void>
  updateProduct: () => Promise<void>
  toggleVisibility: () => Promise<void>
  deleteProduct: () => Promise<void>
}

const MarketspaceContext = createContext<MarketspaceContextDataProps>(
  {} as MarketspaceContextDataProps,
)

const MarketspaceContextProvider = ({ children }: PropsWithChildren) => {
  const publishProduct = async () => {}

  const fetchProducts = async () => {}

  const getProduct = async () => {}

  const updateProduct = async () => {}

  const toggleVisibility = async () => {}

  const deleteProduct = async () => {}

  return (
    <MarketspaceContext.Provider
      value={{
        publishProduct,
        fetchProducts,
        getProduct,
        updateProduct,
        toggleVisibility,
        deleteProduct,
      }}
    >
      {children}
    </MarketspaceContext.Provider>
  )
}

export { MarketspaceContext, MarketspaceContextProvider }
