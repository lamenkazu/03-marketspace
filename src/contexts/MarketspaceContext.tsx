import { createContext, PropsWithChildren, useState } from 'react'

import { IMarketspaceContextData, ProductDTO } from '../dtos/MarketspaceDTO'

const MarketspaceContext = createContext<IMarketspaceContextData>(
  {} as IMarketspaceContextData,
)

const MarketspaceContextProvider = ({ children }: PropsWithChildren) => {
  const [newProduct, setNewProduct] = useState<ProductDTO>({} as ProductDTO)

  const handleNewProductInfo = (data: ProductDTO) => {
    setNewProduct(data)
  }

  const handleCleanNewProductInfo = () => {
    setNewProduct({} as ProductDTO)
  }

  const publishProduct = async (data: ProductDTO) => {}

  const fetchProducts = async () => {}

  const getProduct = async () => {}

  const updateProduct = async () => {}

  const toggleVisibility = async () => {}

  const deleteProduct = async () => {}

  const value: IMarketspaceContextData = {
    newProduct,
    handleNewProductInfo,
    handleCleanNewProductInfo,
    publishProduct,
    fetchProducts,
    getProduct,
    updateProduct,
    toggleVisibility,
    deleteProduct,
  }

  return (
    <MarketspaceContext.Provider value={value}>
      {children}
    </MarketspaceContext.Provider>
  )
}

export { MarketspaceContext, MarketspaceContextProvider }
