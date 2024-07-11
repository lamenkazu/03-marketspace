import { camelCase, mapKeys } from 'lodash'

import {
  ProductDTO,
  ProductImagesDTO,
  ProductImagesProps,
} from '@/dtos/MarketspaceDTO'

// Função para converter chaves de um objeto de snake_case para camelCase
const convertToCamelCase = (obj: any) => {
  return mapKeys(obj, (value, key) => camelCase(key))
}

// Função para converter um produto específico
const mapProductData = (product: any): ProductDTO => {
  const mapImages = (images: ProductImagesDTO[]): ProductImagesProps => {
    return images.map((image) => ({
      uri: image.path,
      name: image.id,
      type: '',
    }))
  }

  return {
    id: product.id,
    userId: product.user_id,
    images: mapImages(product.product_images), // Converte as imagens
    isActive: product.is_active,
    name: product.name,
    description: product.description,
    isNew: product.is_new,
    price: product.price,
    acceptTrade: product.accept_trade,
    paymentMethods: product.payment_methods.map((method: any) =>
      convertToCamelCase(method),
    ),
  }
}

// Função para converter uma lista de produtos
export const mapProductList = (data: any[]): ProductDTO[] => {
  return data.map(mapProductData)
}
