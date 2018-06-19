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
}

render() {
    return (
      <div id = "LandingContainer">
        <div id = "landingText">
        	<div id = "largeTB">
			<TextBox size = "large" message = "WE DON'T WANT YOU TO GO TO YOUR WORK" />
      <div id = "grnbox2">
      <div id = "grnbox"/>
      </div>
		</div>
          	<div id = "smallTB">
			<TextBox message = "JUST WORK FROM ANYWHERE WITH US" />
	  	</div>
      <div id = "grnbox4">
      <div id = "grnbox3"/>
      </div>
  	</div>

	<div  id = "GB">
		<ScrollArrow/>
        	<GrayBox/>
	</div>

      </div>

    );
  }
}

export default Landing;

