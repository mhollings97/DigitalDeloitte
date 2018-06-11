import React, {Component} from 'react';
import InputForm from '../.././InputForm/InputForm'
import CheckBox from '../.././CheckBox/CheckBox'
import './SignUp.css'

class SignUp extends Component {

constructor(props) {
    super(props);
}

    render() {

	return (

	<div>
	  <div id = "SignUpWrapper">
	    <div id = "SignUpHeader">
		<p>Hi!</p>
		<p>First we need your name and email,</p>
		<p>so we can contact you later.</p>
	    </div>
	    <div id = "SignUpForm">
		<InputForm/>
	    </div>
	    <div id = "ConditionsBox">
		<CheckBox/>
	    </div>
	    <div id = "SignInRedirect">
		
	    </div>
	  </div>
	</div>
	);

    }

}

export default SignUp;
