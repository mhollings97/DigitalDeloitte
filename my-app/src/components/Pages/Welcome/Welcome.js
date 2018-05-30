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
		<div>
			<TextBox size = "small" message = "What is this about?"/>
		</div>
		<div>
			<TextBox size = "large" message = "Welcome to our new platform, our workplace for externam employees"/>
		</div>
	</div>

    );
  }
}

export default Welcome;

