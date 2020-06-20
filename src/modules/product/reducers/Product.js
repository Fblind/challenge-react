import { EMPTY_PRODUCT } from '../domain/Product'
import { TYPES } from '../actions/Product'

// action => { type, payload: { data } }
export default (Repository) => (state, action) => {
  switch (action.type) {
    case TYPES.ADD:
      return { ...state, products: Repository.add(action.payload.data) }
    case TYPES.GET_ALL:
      return { ...state, products: Repository.getAll() }
    case TYPES.GET:
      return { ...state, editingProduct: Repository.get(action.payload.data) }
    case TYPES.REMOVE:
      return { ...state, products: Repository.remove(action.payload.data) }
    case TYPES.UPDATE_EDITING:
      return { ...state, editingProduct: {...state.editingProduct, ...action.payload.data } }
    case TYPES.UPDATE:
      return { ...state, products: Repository.update(action.payload.data.id, action.payload.data) }
    case TYPES.RESET_EDITING:
      const editingProduct = { ...EMPTY_PRODUCT }
      return { ...state, editingProduct }
    default:
      return { ...state }
  }
}