import * as types from '../constants/actionTypes'

let searchBoxActions = {

	saveSearchText: function(search) {
		return {
			type: types.SAVE_SEARCH_TEXT,
			search: search
		}
	}

}

export default searchBoxActions