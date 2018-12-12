import * as types from '../constants/actionTypes'

let productDetailsActions = {

  	showProductDetails: function(author, item, categories) {
    	return { 
        	type: types.SHOW_PRODUCT_DETAILS,
        	author: author,
        	item: item,
        	categories: categories
    	}
  	}

}

export default productDetailsActions