import { createProduct } from '../domain/Product'
export default {
  get,
  add,
  remove,
  update,
  getAll
}

export function get (id) {
  return getAll().find(p => p.id === id)
}

export function remove (id) {
  const products = getAll().filter(p => p.id !== id)
  return _persist(products)
}

export function update (id, product) {
  const products = getAll().map(p => {
    if (p.id !== id) return p
    return createProduct({ ...p, ...product })
  })
  return _persist(products)
}

export function add (product) {
  const newProduct = createProduct(product)
  const products = getAll().concat([newProduct])
  return _persist(products)
}

export function getAll () {
  const products = localStorage.getItem('products') || []
  return _parseFromStorage(products).map(createProduct)
}

function _parseFromStorage (entity) {
  try {
    return JSON.parse(entity)
  } catch {
    return entity
  }
}

function _formatToStorage (entity) {
  return JSON.stringify(entity)
}

function _persist (entity) {
  localStorage.setItem('products', _formatToStorage(entity))
  return entity
}