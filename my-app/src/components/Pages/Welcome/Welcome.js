import React, { Component } from 'react';
import TextBox from '../.././TextBox/TextBox'
import WelcComp from '.././PageComps/WelcComp'
import './Welcome.css'



class Welcome extends Component {

constructor(props) {
    super(props);

}

render() {
    return (
	<div id = "WelcomeWrapper">
		<div id = "TopText">
			<TextBox size = "small" message = "What is this about?"/>
			<TextBox size = "large" message = "Welcome to our new platform, our workplace for external employees"/>
		</div>
		<div>
			<WelcComp/>
		</div>
	</div>

    );
  }
}

export default Welcome;

