import { combineReducers } from 'redux'
import mercadolibreReducer from './mercadolibreReducer'

const rootReducer = combineReducers({
  mercadolibre: mercadolibreReducer
})

export default rootReducer