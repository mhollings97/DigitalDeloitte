import React, { Component } from 'react';
import './SignedHeader.css'
import HomeButton from '.././Buttons/Home/HomeButton';
import {BrowserRouter as Router, Link, Redirect} from 'react-router-dom';

class SignedHeader extends Component {

    constructor(props) {
	super(props);
    }

    render () {

	return (

     <Router>
            <div>
		<div id = "Wrap">

		 <div id = "Projects">
                        <Link to = {'/projects'} >
                                <button func = {this.props.redirectProjects} title = "Projects" >Projects</button>
                        </Link>
                </div>
                <div id = "People">
                        <Link to = { '/people'}>
                                <button func = {this.props.redirectPeople} title = "People">People</button>
                        </Link>
                </div>
                <div id = "Info">
                        <Link to = { '/info'}>
                                <button func = {this.props.redirectInfo}title = "Info">Info</button>
                        </Link>
                </div>
                <div id = "home">
                        <Link to = {'/'}>
                                <HomeButton func = {this.props.redirectHome} >Deloitte Digital</HomeButton>
                        </Link>
                </div>
                </div>

            </div>
        </Router>


	);

    }


}

export default SignedHeader; 
