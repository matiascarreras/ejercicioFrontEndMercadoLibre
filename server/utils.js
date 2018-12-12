module.exports = {

	priceConvertor: function(price) {
		let returnObject = {}
		if(price.toString().includes('.')){
			let formatPrice = price.toString().split('.')
			returnObject['amount'] = parseInt(formatPrice[0])
			returnObject['decimals'] = parseInt(formatPrice[1])
		} else {
			returnObject['amount'] = price
			returnObject['decimals'] = 0
		}
		return returnObject
	}

}