import searchBoxResultsActions from './searchBoxResultsActions'
import productDetailsActions from './productDetailsActions'
import searchBoxActions from './searchBoxActions'

const actions = {
  ...searchBoxResultsActions
  ...productDetailsActions
  ...searchBoxActions
}

export default actions