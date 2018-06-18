import React, { Component } from 'react';
import './PostSubmit.css'

class PostSubmit extends Component {

constructor(props){
	super(props);
}

render () {

    return (
	<div>
	    <div id = "PostSubmitWrap">
		<div id = "PStext">
		    <h2>Thank you for your submission!</h2>
		    <h3>We will be in contact with you soon.</h3>
		</div>
		
		<div id = "PSbutton">
		    <button id = "allprojs">Click to pick another project.</button>
		</div>
	    </div>
	</div>	
    );

}

}

export default PostSubmit;
