import React, { Component } from 'react';
import './SignOut.css'

class SignOut extends Component {

constructor(props){
    super(props);
}

render () {

    return (
	<div>
	    <div id = "SignOutWrap">
	      <div id = "SOtext">
		<h2>You have been logged out.</h2>
		<h3>Click below to log back in.</h3>
	      </div>
	      <div id = "SBI">
		<button id = "SBIbutton">Sign In</button>
	      </div>
	    </div>
	</div>
    );

}

}

export default SignOut;
