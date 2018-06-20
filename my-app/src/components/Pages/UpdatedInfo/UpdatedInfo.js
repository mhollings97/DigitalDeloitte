import React, { Component } from 'react';
import './UpdatedInfo.css'
import {Redirect} from 'react-router-dom'

class UpdatedInfo extends Component {

constructor (props) {
	super(props)

        this.state = {
                redirect: false,
        };

        this.handleRedirect = this.handleRedirect.bind(this);

}

handleRedirect(){

        this.setState({
                redirect: !this.state.redirect,
        });
}

render() {

        if(this.state.redirect){
                return(
                        <Redirect to = "/userprofile"/>
                )

        }

    return (

	<div>
		<div id = "UpdatedInfoWrap">
		    <div id = "UItext">
			<h2>Your account information has been updated.</h2>
		    </div>
		    <div id = "UIredirect">
			<button id = "CheckProfile" onClick = {this.handleRedirect}>Click to be redirected to your updated profile</button>
		    </div>
		</div>
	</div>

    )

}

}

export default UpdatedInfo;
