import React, { Component } from 'react';
import InputForm from '../.././InputForm/InputForm'
import TopHeader  from '../.././Header/TopHeader'
import GrayBox  from '../.././GrayBox/GrayBox'
import TextBox from '../.././TextBox/TextBox'
import './Welcome.css'


class Welcome extends Component {

constructor(props) {
    super(props);

}

render() {
    return (
	<div>
		<TextBox size = "small" message = "What is this about?"/>
		<TextBox size = "large" message = "Welcome to our new platform, our workplace for externam employees"/>

		<div>
			<div id = "LP">
				<p>"This is our new project where we created a place for students and digital technologies enthusiasts to be able to work with us remotely on real projects and get experience, feedback and reward in return" </p>
			</div>

		</div>
	</div>

    );
  }
}

export default Welcome;

