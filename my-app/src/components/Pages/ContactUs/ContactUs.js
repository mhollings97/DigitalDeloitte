import React, {Component} from 'react';
import './ConactUs.css'

class ContactUs extends Component {

constructor(props) {
	super(props);
	this.state = {
	    name: '',
	    email: '',
	    message: '',
	
	    redirect: false,
	};
}

render () {
    return (
	<div>
	  <form>
	    <div id = "name">
		<input type = "text" name = {this.state.name}/>
	    </div>

	    <div id = "email">
		<input type = "text" email = {this.state.email}/>
	    </div>

	    <div id = "message">
		<input type = "text" message = {this.state.message}/>
	    </div>

	    <div id = "sendbutton">
		<button id = "send">Send</button>	
	    </div>
	  </form>
	<div>
    );
}

}
