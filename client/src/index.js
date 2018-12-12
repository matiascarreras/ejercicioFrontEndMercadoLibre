import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'

import './index.css';
import App from './App';
import SearchBox from './views/searchBox/searchBox';
import SearchBoxResults from './views/searchBoxResults/searchBoxResults';
import ProductDetails from './views/productDetails/productDetails';

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App>
				<Switch>
					<Route exact path='/' component={SearchBox}/>
					<Route exact path="/items" component={SearchBoxResults}/>
					<Route path="/items/:id" component={ProductDetails}/>
				</Switch>
			</App>
		</Router>
	</Provider>

	,document.getElementById('root')
);