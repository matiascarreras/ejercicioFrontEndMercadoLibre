import * as types from '../constants/actionTypes'

let searchBoxResultsActions = {

	saveSearchResults: function(author, items, categories, search) {
		return {
			type: types.SAVE_SEARCH_RESULTS,
			author: author,
			items: items,
			categories: categories,
			search: search
		}
	}

}

export default searchBoxResultsActions