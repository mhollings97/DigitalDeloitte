import React, { Component } from 'react';

import './Header.css';
class Header extends Component {
    render() {
	return (
	<div>
	    <div id = "aboutus">
	        <button id = "abtus" onClick = {this.props.func}>
	            {this.props.title}
	        </button>
	    </div>
	</div>
	 );
    }


}

export default Header;
