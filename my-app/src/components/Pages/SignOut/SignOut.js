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
		<h3>Come back soon!</h3>
	      </div>
	    </div>
	</div>
    );

}

}

export default SignOut;
