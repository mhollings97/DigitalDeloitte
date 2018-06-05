import React, { Component } from 'react';
import InputForm from '../.././InputForm/InputForm'
import TopHeader  from '../.././Header/TopHeader'
import GrayBox  from '../.././GrayBox/GrayBox'
import TextBox from '../.././TextBox/TextBox'
import ScrollArrow from '../../ScrollArrow/ScrollArrow'
import './Landing.css'
class Landing extends Component {

constructor(props) {
    super(props);
    this.state = {
	showLogOn: false
    };

	this.toggleLog = this.toggleLog.bind(this);
}
	toggleLog(showLogOn) {
	    this.setState(prevState => ({
		showLogOn: !prevState.showLogOn
	  }));
}

render() {
    return (
      <div id = "LandingContainer">
        <TopHeader func = {this.toggleLog}/>
        <div id = "landingText">
        	<div id = "largeTB">
			<TextBox size = "large" message = "We don't want you to go to work" />
		</div>
          	<div id = "smallTB">
			<TextBox size = "medium" message = "Just work from anywhere with us" />
	  	</div>
  	</div>
	{ this.state.showLogOn &&
		<div id = "signIn">
			<InputForm/>
		</div>
	}

	<div  id = "GB">
		<ScrollArrow/>
        	<GrayBox/>
	</div>
	{this.state.showLogOn && <div id = "catcher" onClick = {this.toggleLog}/>}

      </div>

    );
  }
}

export default Landing;

