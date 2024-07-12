import { createContext, PropsWithChildren, useState } from 'react'

import { api } from '@/lib/axios'
import { mapProductList } from '@/utils/MapProductData'

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

  const publishProduct = async (data: ProductDTO) => {
    const newProduct = {
      name: data.name,
      description: data.description,
      is_new: data.isNew,
      price: data.price * 100,
      accept_trade: data.acceptTrade,
      payment_methods: data.paymentMethods,
    }

    const { data: result } = await api.post('/products', newProduct)

    const imageData = new FormData()
    data.images.forEach((image) => {
      imageData.append('images', image as unknown as Blob)
    })
    imageData.append('product_id', result.id)

    await api.post('/products/images', imageData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  const fetchProducts = async () => {
    const { data } = await api.get('/products')

    // Converte os dados recebidos para o formato camelCase
    const mappedData = mapProductList(data)

    return mappedData
  }

  const fetchOwnProducts = async () => {
    const { data } = await api.get('/users/products')

    // Converte os dados recebidos para o formato camelCase
    const mappedData = mapProductList(data)

    return mappedData
  }

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
    fetchOwnProducts,
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
