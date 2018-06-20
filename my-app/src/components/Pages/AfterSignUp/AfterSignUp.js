
import React, {Component} from 'react';
import Image from '../.././Image/Image'
import './AfterSignUp.css'
import Header from '../../Buttons/Header/Header'
import {Redirect} from 'react-router-dom'
class AfterSignUp extends Component {

constructor(props){
	super(props);

	this.state = {
		redirect: false

	}
	this.handleRedirect = this.handleRedirect.bind(this);
}

handleRedirect(){

	this.setState( prevState => ({
		redirect: !this.state.redirect
	}));


}
render() {


	if(this.state.redirect){

		return (
			<Redirect to = "/userprofile"/>
		)
	}
    return (

	<div>
	    <div id = "ASUWrapper">
		<div id = "Message">
		    <h2>Thank you!</h2>
		    <h3>We look forward to reading your application.</h3>
		    <h3>We'll get back to you soon.</h3>
		</div>
		<div id = "AboutButton">
		  <div id = "aboutpic">
		    <Image size = "small" align = "centre"/>
		  </div>
		  <div id = "abouttext">
		    <p>About Project</p>
		  </div>
		</div>

		<div id = "PeopleButton">
		  <div id = "peoplepic">
		    <Image size = "small"/>
		  </div>
		  <div id = "peopletext">
		    <p>People in Deloitte Digital</p>
		  </div>
		</div>

		<div id = "StatsButton">
		  <div id = "statspic">
		    <Image size = "small"/>
		  </div>
		  <div id = "statstext">
		    <p>Statistics and Numbers</p>
		  </div>
		</div>
		<div id = "linkButton">
			<button id = "CTPbutton" onClick = {this.handleRedirect}> Continue to Profile </button>
		</div>

	    </div>
	</div>

    );

}

}

export default AfterSignUp;
