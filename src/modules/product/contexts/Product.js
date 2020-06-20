import { createContext } from 'react'
import { createProduct } from '../domain/Product'

const ProductContext = createContext(createProduct())
export default ProductContext