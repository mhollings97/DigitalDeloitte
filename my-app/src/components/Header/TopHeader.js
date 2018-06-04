import React, { Component } from 'react';

import './TopHeader.css';
import Header from '.././Buttons/Header/Header';
import HomeButton from '.././Buttons/Home/HomeButton';
import {BrowserRouter as Router, Link} from 'react-router-dom';
class TopHeader extends Component {

    constructor(props) {
	super(props);
    }

    render() {
        return (
	<Router>
	    <div>
		<div id = "AU">
			<Link to = { '/aboutus'}>
				<Header title = "About Us" ></Header>
			</Link>
		</div>
		<div id = "AP">
			<Link to = { '/abouttheproject'}>
				<Header title = "About the Project"></Header>
			</Link>
		</div>
		<div id = "CU">
			<Link to = { '/contactus'}>
				<Header title = "Contact Us"></Header>
			</Link>
		</div>
		<div id = "SI">
				<Header func = {this.props.func} title = "Sign In"></Header>

		</div>
		<div id = "home">
			<Link to = { '/'}>
				<HomeButton>Deloitte Digital</HomeButton>
			</Link>
		</div>
	    </div>
	</Router>
	)
     }

}

export default TopHeader;
