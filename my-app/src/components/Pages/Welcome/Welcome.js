import React, { Component } from 'react';
import TextBox from '../.././TextBox/TextBox'
import WelcComp from '.././PageComps/WelcComp/WelcComp'
import Apply from '../../Buttons/Apply/Apply'
import DropDown from '../DropDown/DropDown'
import './Welcome.css'



class Welcome extends Component {

constructor(props) {
    super(props);

    this.state = {
        showDD: false
    };

        this.toggleDD = this.toggleDD.bind(this);
}
        toggleDD(showDD) {
            this.setState(prevState => ({
                showDD: !prevState.showDD
          }));
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
		<div id = "Apply">
			<Apply/>
			<button id = "HowBut" onClick = {this.toggleDD}> How we select out candidates </button>
		</div>
		<div id = "WDD">
			{this.state.showDD && <DropDown/>}
		</div>
	</div>

    );
  }
}

export default Welcome;

