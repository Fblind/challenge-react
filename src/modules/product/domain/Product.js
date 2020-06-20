import { generateId } from '../helper'

export const EMPTY_PRODUCT = {
  images: [],
  name: '',
  description: '',
  promotionalPrice: '',
  price: '',
  stock: ''
}

export function createProduct(literal = EMPTY_PRODUCT) {
  if (!literal) return Object.freeze(EMPTY_PRODUCT)
  const name = literal.name || EMPTY_PRODUCT.name
  const images = literal.images || EMPTY_PRODUCT.images
  const description =  literal.description || EMPTY_PRODUCT.description
  const promotionalPrice = literal.promotionalPrice || EMPTY_PRODUCT.promotionalPrice
  const price = literal.price || EMPTY_PRODUCT.price
  const stock = literal.stock || EMPTY_PRODUCT.stock
  const id = literal.id || generateId()
  
  return Object.freeze({
    id,
    images,
    name,
    description,
    promotionalPrice,
    price,
    stock
  });
}