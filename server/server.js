const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function get(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err))
  })
}

function currencyConvertor(currencyId) {
  if(currencyId === 'ARS'){
    return '$';
  }
}

function priceConvertor(price) {
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

function conditionConvertor(condition) {
  if(condition === 'new'){
    return 'Nuevo';
  }
  if(condition === 'used'){
    return 'Usado';
  }
}

app.get('/api/items', (req, res) => {

	let query = req.query.q;

    fetch('https://api.mercadolibre.com/sites/MLA/search?q=' + query)
    .then(res => res.json())
    .then(data => {
      let items = data.results.map((result, i) => {
        let price = priceConvertor(result.price)
        return (
          {
            id: result.id,
            title: result.title,
            price: {
              currency: currencyConvertor(result.currency_id),
              amount: price['amount'],
              decimals: price['decimals']
            },
            picture: result.thumbnail,
            condition: conditionConvertor(result.condition),
            free_shipping: result.shipping.free_shipping,
            location: result.address.state_name
          }
        )
      })

      let filters = data.filters.filter(function (filter) {
        return filter.id === 'category';
      });
      let categories = filters[0].values[0].path_from_root.map((category, i) => {
        return (category.name)
      })
      res.send({
        author: {
          name: 'Matias',
          lastname: 'Carreras'
        },
        items: items,
        categories: categories
      })
    })
    .catch(err => {
      res.send('Ops, something has gone wrong');
    });

})

app.get('/api/items/:id', (req, res) => {
	let id = req.params.id

	Promise.all([
		get('https://api.mercadolibre.com/items/' + id),
		get('https://api.mercadolibre.com/items/' + id + '/description')
	])
	.then(([itemData, descriptionData]) => {
    let price = priceConvertor(itemData.price)
    let item = {
      id: itemData.id,
      title: itemData.title,
      price: {
        currency: currencyConvertor(itemData.currency_id),
        amount: price['amount'],
        decimals: price['decimals']
      },
      picture: itemData.pictures[0].url,
      condition: conditionConvertor(itemData.condition),
      free_shipping: itemData.shipping.free_shipping,
      sold_quantity: itemData.sold_quantity,
      description: descriptionData.plain_text
    }
    fetch('https://api.mercadolibre.com/categories/' + itemData.category_id)
    .then(res => res.json())
    .then(categoryData => {
      let categories = categoryData.path_from_root.map((category, i) => {
        return (category.name)
      })
      res.send({
        author: {
          name: 'Matias',
          lastname: 'Carreras'
        },
        item: item,
        categories: categories
      })
    })
    .catch(err => {
      res.send('Ops, something has gone wrong');
    });
	})
	.catch(err => {
    res.send('Ops, something has gone wrong');
  });
})

app.listen(port, (err) => {
	if(err) { console.log(err) };
	console.log('Listening on port ' + port);
})