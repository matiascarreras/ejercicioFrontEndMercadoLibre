import * as types from '../constants/actionTypes'

const initialState = {
	categories: [],
	items: [],
  item: {},
  search: ""
}

function showProductDetails(state, action){
  let newState = {...state}
  let newItem = {...state.item}
  let newCategories = [...state.categories]
  if(action.author.name === 'Matias' && action.author.lastname === "Carreras"){
    newItem = action.item
    newItem['currency'] = action.item.price.currency
    newItem['amount'] = action.item.price.amount
    newItem['decimals'] = action.item.price.decimals
    newCategories = action.categories
    newState.item = newItem
    newState.categories = newCategories
  }
  return newState
}

function saveSearchResults(state, action) {
  let newState = {...state}
  let newItems = [...state.items]
  let newCategories = [...state.categories]
  if(action.author.name === 'Matias' && action.author.lastname === "Carreras"){
    newItems = action.items
    newCategories = action.categories
    newState.items = newItems
    newState.categories = newCategories
    newState.search = action.search
  }
  return newState
}

function saveSearchText(state, action) {
  let newState = {...state}
  newState.search = action.search
  return newState
}


const mercadolibreReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_PRODUCT_DETAILS:
      return showProductDetails(state, action)
    case types.SAVE_SEARCH_RESULTS:
      return saveSearchResults(state, action)
    case types.SAVE_SEARCH_TEXT:
      return saveSearchText(state, action)
    default:
      return state
  }
}

export default mercadolibreReducer