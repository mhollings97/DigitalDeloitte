import React, {Component} from 'react';
import Image from '../.././Image/Image'
import './AfterSignUp.css'

class AfterSignUp extends Component {

constructor(props){
	super(props);
}

render() {

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
	    </div>
	</div>

    );

}

}

export default AfterSignUp;
