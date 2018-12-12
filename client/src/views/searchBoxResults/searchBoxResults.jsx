import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'

import './searchBoxResults.css';
import SearchBox from '../searchBox/searchBox';
import SearchBoxResult from '../../components/searchBoxResult/searchBoxResult';
import bindActionsToDispatch from '../../helpers/bindActionsToDispatch'
import searchBoxResultsActions from '../../actions/searchBoxResultsActions'

class SearchBoxResults extends Component {

	constructor(props) {
		super(props);
		this.state = {
			dataLoaded: false
		}
		this.handleOnClick = this.handleOnClick.bind(this);
	}

	componentDidMount() {
		const values = queryString.parse(this.props.location.search)
		fetch('/api/items?q=' + values.search)
		.then(res => res.json())
		.then(data => {
			this.props.actions.saveSearchResults(data.author, data.items, data.categories, values.search)
			this.setState({dataLoaded: true})
		})
		.catch(err => {
		   console.log(err);
		})	
	}

	handleOnClick(id) {
		this.props.history.push('/items/' + id)
	}

	formatPrice(amount) {
		return String(amount).replace(/(.)(?=(\d{3})+$)/g,'$1.')
	}

	listSearchResults(items, maxItems){
		let elements = []
        items.forEach((item, i) => {
        	if(i < maxItems){
	        	elements.push (
		        		<SearchBoxResult
		        			key={item.id}
		        			id={item.id}
		        			picture={item.picture}
		        			price={item.price.currency + ' ' + this.formatPrice(item.price.amount)}
		        			freeShipping={item.free_shipping}
		        			location={item.location}
		        			title={item.title}
		        			handleOnClick={this.handleOnClick}
		        		/>
	        	)
	        	if(i < maxItems - 1){
	        		elements.push(<hr key={i}/>)
	        	}
        	}

        })
        return elements
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
 	    return (
	    	<div>
	    		<SearchBox search={this.props.search}/>
	    		<div className="search-box-results-parent">
			    	<div className="search-box-results">
			    		<div className="search-box-results-breadcrumb">{this.createBreadcrumb(this.props.categories)}</div>
			    		<div className="search-box-results-container">
			    			{this.listSearchResults(this.props.items, 4)}
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
        saveSearchResults: searchBoxResultsActions.saveSearchResults
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchBoxResults));