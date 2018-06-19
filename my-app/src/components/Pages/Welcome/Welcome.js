import React, { Component } from 'react';
import TextBox from '../.././TextBox/TextBox'
import WelcComp from '.././PageComps/WelcComp/WelcComp'
import Apply from '../../Buttons/Apply/Apply'
import DropDown from '../DropDown/DropDown'
import './Welcome.css'



class Welcome extends Component {

constructor(props) {
    super(props);


}


render() {
    return (
	<div id = "WelcomeWrapper">
		<div id = "TopText">
		<div id = "smallTBx">
			<TextBox message = "WHAT IS THIS?"/>
		</div>
		<div id = "largeTBx">
			<TextBox message = "Welcome to our new platform, "/>
			<div id = "bottomp">
			<TextBox message = "our workplace for external employees."/>
			</div>
		</div>
		</div>
		<div>
			<WelcComp/>
		</div>
		<div id = "Apply">
			<Apply/>
			<button id = "HowBut" onClick = {this.props.toggleDD}> How we select our candidates </button>
		</div>
	</div>

    );
  }
}

export default Welcome;

