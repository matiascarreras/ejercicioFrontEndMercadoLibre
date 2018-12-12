import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import './searchBox.scss';
import logoML from '../../assets/Logo_ML@2x.png.png.png'
import bindActionsToDispatch from '../../helpers/bindActionsToDispatch'
import searchBoxActions from '../../actions/searchBoxActions'

class SearchBox extends Component {

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.onClick = this.onClick.bind(this);
		this.onKeyPress = this.onKeyPress.bind(this);
	}

	onChange(event) {
		this.props.actions.saveSearchText(event.target.value)
	}

	onClick() {
		if(this.props.search !== '') {
			this.props.history.push('/items?search=' + this.props.search)
		}
	}

	onKeyPress(target) {
		if(target.charCode === 13 && this.props.search !== '') {
			this.props.history.push('/items?search=' + this.props.search)
		}
	}

	render() {
    	return (
    		<div id="search-box">
    			<div id="search-box-container">
	    			<img id="search-box-logo" src={logoML} alt="logoML"/>
			    	<input 
			    		type="text"
			    		placeholder="Nunca dejes de buscar"
			    		value={this.props.search}
			    		onChange={this.onChange}
			   			id="search-box-input"
			   			name="query"
			   			onKeyPress={this.onKeyPress}
			    	/>
			    	<button type="submit" id="search-box-btn" onClick={this.onClick}/>
		    	</div>
    		</div>
    	);
  	}
}


function mapStateToProps(state){
  return state.mercadolibre;
}

function mapDispatchToProps(dispatch){
    return bindActionsToDispatch({
        saveSearchText: searchBoxActions.saveSearchText,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchBox));