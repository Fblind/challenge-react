import React, { useReducer } from 'react'
import ProductContext from '../contexts/Product'
import ProductReducer from '../reducers/Product'
import { TYPES } from '../actions/Product'
import { INITIAL_STATE } from '../store'
import { LocalStorage } from '../repositories'

const reducer = ProductReducer(LocalStorage)
const ProductProvider = props => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const _fireAction = action => {
    console.log(`[PRODUCT]: ${action.type.toString()}`, action)
    dispatch(action)
  }

  const actionCreators = {
    add (product) {
      if (product.id && product.id !== '') {
        return this.update(product)
      }

      const action = {
        type: TYPES.ADD,
        payload: {
          data: product
        }
      }
      _fireAction(action)
    },
    getAll () {
      const action = {
        type: TYPES.GET_ALL
      }
      _fireAction(action)
    },
    get (id) {
      const action = {
        type: TYPES.GET,
        payload: {
          data: id
        }
      }
      _fireAction(action)
    },
    remove (id) {
      const action = {
        type: TYPES.REMOVE,
        payload: {
          data: id
        }
      }
      _fireAction(action)
    },
    updateEditing (product) {
      const action = {
        type: TYPES.UPDATE_EDITING,
        payload: {
          data: product
        }
      }
      _fireAction(action)
    },
    update (product) {
      const action = {
        type: TYPES.UPDATE,
        payload: {
          data: product
        }
      }
      _fireAction(action)
    },
    resetEditing () {
      const action = {
        type: TYPES.RESET_EDITING
      }
      _fireAction(action)
    }
  }

  return (
    <ProductContext.Provider value={{ editingProduct: state.editingProduct, products: state.products, ...actionCreators }}>
      {props.children}
    </ProductContext.Provider>
  )
}

export { ProductProvider }