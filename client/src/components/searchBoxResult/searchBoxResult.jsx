import React, { Component } from 'react';

import './searchBoxResult.css';
import freeShippingLogo from '../../assets/ic_shipping@2x.png.png.png';

class SearchBoxResult extends Component {

	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	onClick(event) {
		this.props.handleOnClick(event.target.id);
	}

	render() {
    	return (
			<div className="search-box-result">
				<img id={this.props.id} className="search-box-result-img" src={this.props.picture} alt="result-img" onClick={this.onClick} />
				<div className="search-box-result-info">
					<div className="result-info">
						<span className="search-box-result-price">{this.props.price}</span>
						{this.props.freeShipping &&
						   	<img className="search-box-result-free-shipping" src={freeShippingLogo} alt="free-shipping-logo"/>
						}
						<span className="search-box-result-location">{this.props.location}</span>
					</div>
					<p id={this.props.id} className="search-box-result-title" onClick={this.onClick}>{this.props.title}</p>
				</div>
			</div>
    	);
  	}
}

export default SearchBoxResult;