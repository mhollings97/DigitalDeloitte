import React, {Component} from 'react';
import TextBox from '../.././TextBox/TextBox';
import './Expect.css';

class Expect extends Component {

constructor(props) {
    super(props);
}

render () {

    return (

	<div id = "ExpectWrap"> 

	<div id = "ExpectTitle">
	  <p>What do we expect from you?</p>
	  <TextBox size = "small" message = "We appreciate young talents."/>
	</div>

	<div id = "Should">
	  <p><b>YOU SHOULD:</b></p>
	  <p>...be excited about technologies and the digital world.</p>
	  <p>...be willing to learn new skills and get experience.</p>
	  <p>...have an analytical mind and be self-critical.</p>
	</div>
	
	<div id = "DontHave">
	  <p><b>YOU DON'T HAVE TO:</b></p>    
	  <p>...have a degree from a university.</p>
	  <p>...commute to our office.</p>
	</div>
	</div>
    );

}

}

export default Expect;
