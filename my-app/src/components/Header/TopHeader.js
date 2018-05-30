import React, { Component } from 'react';

import './TopHeader.css';
import Header from '.././Buttons/Header/Header';
import HomeButton from '.././Buttons/Home/HomeButton';

class TopHeader extends Component { 

    constructor(props) {
	super(props);
    }

    render() {
        return (
        <div>

	<div id = "AU">
	<Header title = "About Us" ></Header>
	</div>
	<div id = "AP">
	<Header title = "About the Project"></Header>
	</div>
	<div id = "CU">
	<Header title = "Contact Us"></Header>
	</div>
	<div id = "SI">
	<Header func = {this.props.func} title = "Sign In"></Header>
	</div>

	<div id = "home">
	<HomeButton>Deloitte Digital</HomeButton>
	</div>
        </div>
	)
     }

}

export default TopHeader;
