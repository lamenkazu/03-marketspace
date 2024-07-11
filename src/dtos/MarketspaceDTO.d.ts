export type ProductImagesProps = {
  uri: string
  name: string
  type: string
}[]

export interface ProductImagesDTO {
  id?: string
  path: string
  productId?: string
}

export interface ProductDTO {
  id?: string
  userId?: string

  images: ProductImagesProps
  isActive: boolean

  name: string
  description: string
  isNew: boolean

  price: number
  acceptTrade: boolean
  paymentMethods: string[]
}

export interface IMarketspaceContextData {
  newProduct: ProductDTO
  handleNewProductInfo: (data: ProductDTO) => void
  handleCleanNewProductInfo: () => void
  publishProduct: (data: ProductDTO) => Promise<void>
  fetchProducts: () => Promise<void>
  getProduct: () => Promise<void>
  updateProduct: () => Promise<void>
  toggleVisibility: () => Promise<void>
  deleteProduct: () => Promise<void>
}
