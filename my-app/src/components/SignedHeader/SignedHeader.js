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
                <div id = "Projects">
                        <Link to = {'/projects'} >
                                <Header func = {this.props.redirectProjects} title = "Projects" ></Header>
                        </Link>
                </div>
                <div id = "People">
                        <Link to = { '/people'}>
                                <Header func = {this.props.redirectPeople} title = "People"></Header>
                        </Link>
                </div>
                <div id = "Info">
                        <Link to = { '/info'}>
                                <Header func = {this.props.redirectInfo}title = "Info"></Header>
                        </Link>
                </div>
                <div id = "home">
                        <Link to = {'/'}>
                                <HomeButton func = {this.props.redirectHome} >Deloitte Digital</HomeButton>
                        </Link>
                </div>
            </div>
        </Router>


	);

    }


}

export default SignedHeader; 
