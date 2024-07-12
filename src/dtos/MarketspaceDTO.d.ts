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

type PaymentMethods = {
  key: string
  name: string
}[]

export interface ProductDTO {
  id?: string
  userId?: string
  user?: {
    avatar: string
    name: string
    phone: string
  }

  images: ProductImagesProps
  isActive: boolean

  name: string
  description: string
  isNew: boolean

  price: number
  acceptTrade: boolean
  paymentMethods: PaymentMethods
}

export interface IMarketspaceContextData {
  newProduct: ProductDTO
  handleNewProductInfo: (data: ProductDTO) => void
  handleCleanNewProductInfo: () => void
  publishProduct: (data: ProductDTO) => Promise<void>
  fetchProducts: () => Promise<ProductDTO[]>
  fetchOwnProducts: () => Promise<ProductDTO[]>
  getProduct: (id: string) => Promise<ProductDTO>
  updateProduct: () => Promise<void>
  toggleVisibility: (id: string, visibility: boolean) => Promise<void>
  deleteProduct: (product: ProductDTO) => Promise<void>
}
