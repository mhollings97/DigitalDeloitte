import React, {Component} from 'react';
import InputForm from '../.././InputForm/InputForm'
import CheckBox from '../.././CheckBox/CheckBox'
import './SignUp.css'
import {Link, Redirect, Route, BrowserRouter as Router } from 'react-router-dom'
import UserProfile from '../UserProfile/UserProfile'
class SignUp extends Component {

constructor(props) {
    super(props);

	this.state = {
		firstName: '',
		lastName: '',
		email: '',
		pw: '',
		redirect: false
	}
	this.handleSubmit = this.handleSubmit.bind(this);
	this.handleFNChange = this.handleFNChange.bind(this);
	this.handleLNChange = this.handleLNChange.bind(this);
	this.handleEChange = this.handleEChange.bind(this);
	this.handlePWChange = this.handlePWChange.bind(this);
}




handleSubmit(event){
event.preventDefault();
console.log("submit form");
fetch('http://localhost:3069/api/v1/user', {
                method: 'POST',
                headers : new Headers(),
                body:JSON.stringify(
                  {
                    "firstName": "John",
                    "lastName": "Doe",
                    "email": "xyz@mail.com",
                    "password": "abc123",
                  }
                )
            }).then((res) => res.json())
            .then((data) =>  console.log(data))
            .catch((err)=>console.log(err));
console.log("here");
	this.setState({ redirect: true});
}

handleFNChange(e){
	this.setState({ firstName: e.target.value});
}
handleLNChange(e){
	this.setState({ lastName: e.target.value});
}
handleEChange(e){
	this.setState({ email: e.target.value});
}
handlePWChange(e){
	this.setState({ pw: e.target.value});
}

    render() {

	if(this.state.redirect){

		return (
		<div>
				<Redirect to = "/signupcomplete" />

		</div>
		)
	}
	return (
	<div>
	  <div id = "SignUpWrapper">
	    <div id = "SignUpHeader">
		<p>Hi!</p>
		<p>First we need your name and email,</p>
		<p>so we can contact you later.</p>
	    </div>
	    <div id = "SignUpForm" >
		<form method="post"
		>
			<p> First Name </p>
			<input id = "firstName" name = "firstName" value={this.state.firstName}
				onChange={this.handleFNChange}/>
			<br/>
			<p> Last Name </p>
			<input id = "lastName" name = "lastName" value={this.state.lastName}
				onChange={this.handleLNChange}/>
			<br/>
			<p> Email </p>
			<input id = "email" name = "email" value={this.state.email}
				onChange={this.handleEChange}/>
			<br/>

			<p> Password </p>
			<input id = "password" name = "password" value={this.state.pw}
				onChange={this.handlePWChange}/>
			<br/>
			<Link to = "/signupcomplete">
			<button onClick = {this.handleSubmit}> Submit </button>
			</Link>
		</form>

	    </div>
	    <div id = "ConditionsBox">
	    </div>
	    <div id = "SignInRedirect">
	    </div>
	  </div>
	</div>
	);

    }

}

export default SignUp;
