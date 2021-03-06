import React, { Component } from 'react';
import { connect } from 'react-redux'

import './productDetails.scss';
import SearchBox from '../searchBox/searchBox';
import bindActionsToDispatch from '../../helpers/bindActionsToDispatch'
import productDetailsActions from '../../actions/productDetailsActions'
import { localize } from '../../helpers/translator'

class ProductDetails extends Component {

	constructor(props) {
		super(props);
		this.state = {
			dataLoaded: false
		}
	}

	componentDidMount() {
		fetch('/api/items/' + this.props.match.params.id)
		.then(res => res.json())
		.then(data => {
			this.props.actions.showProductDetails(data.author, data.item, data.categories)
			this.setState({dataLoaded: true})
		})
		.catch(err => {
		   console.log(err);
		})	
	}

	formatPrice(amount) {
		return String(amount).replace(/(.)(?=(\d{3})+$)/g,'$1.')
	}

	createBreadcrumb(categories) {
    	let breadcrumb = []
    	categories.forEach((category, i) => {
    		if(i === categories.length-1) {
    			breadcrumb.push(
    				<span key={i} className="item-category">{category}</span>
    			)	
    		} else {
	    		breadcrumb.push(
	    			<span key={i}>
	    				<span>{category}</span>
	    				<span> > </span>
	    			</span>
	    		)   			
    		}
    	})
    	return breadcrumb
    }

	content() {
  		var decimals = (this.props.item.decimals === 0) ? '00' : this.props.item.decimals
	    return (
	    	<div>
	    		<SearchBox/>
	    		<div className="product-details-parent">
			    	<div className="product-details">
			    		<div className="product-details-breadcrumb">{this.createBreadcrumb(this.props.categories)}</div>
			    		<div className="product-details-container">
			    			<img className="product-details-img" src={this.props.item.picture} alt="product-img" />
			    			<div className="product-details-info">
			    				<div className="product-details-sell-info">{localize('item_condition_' + this.props.item.condition) + ' - ' + this.props.item.sold_quantity + ' ' + localize('product_details_sell_text')}</div>
			    				<div className="product-details-title">{this.props.item.title}</div>
			    				<div className="product-details-price">
			    					<span className="product-details-price-currency">{localize('item_currency_id_' + this.props.item.currency)}</span>
				    				<span className="product-details-price-amount">{this.formatPrice(this.props.item.amount)}</span>
				    				<span className="product-details-price-decimals">{decimals}</span>			    					
			    				</div>
			    				<button id="product-details-buy-button">{localize('product_details_buy_button')}</button>
			    			</div>
			    			<div className="product-details-description">
			    				<div className="product-details-description-title">{localize('product_details_description_title')}</div>
			    				<div className="product-details-description-text">{(this.props.item.description) ? this.props.item.description.replace(/ {2}/g, '\n') : localize('product_details_description_empty_text')}</div>
			    			</div>
			    		</div>
			    	</div>
			    </div>
	    	</div>
	    );
	}

	render() {
		return (
			<div>
				{this.state.dataLoaded ? this.content() : null}
			</div>
		)
	}
}

function mapStateToProps(state){
  return state.mercadolibre;
}

function mapDispatchToProps(dispatch){
    return bindActionsToDispatch({
        showProductDetails: productDetailsActions.showProductDetails,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);