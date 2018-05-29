import React, { Component } from 'react';

import './Header.css';
class Header extends Component {
    constructor(props) {
	super(props);
	this.handleClick = this.handleClick.bind(this);
    };


    handleClick(event) {
	event.preventDefault();
	console.log('The about us button was clicked');
    }

    render() {
	return (
	<div>   
	    <div id = "aboutus">
	        <button id = "abtus" onClick = {this.handleClick}>
	            {this.props.title}
	        </button>
	    </div>
	</div>
	)	 
    }


}

export default Header;