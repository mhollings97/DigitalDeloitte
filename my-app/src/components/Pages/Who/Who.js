import React, {Component} from 'react';
import TextBox from '../.././TextBox/TextBox'
import Image from '../.././Image/Image'
import './Who.css'

class Who extends Component {

    constructor(props) {
	super(props);
    }

    render () {

	return(
	    
	<div>
	    <div id = "IntroHeading">
		<TextBox size = "small" message = "WHO IS THIS FOR?" /> 
	    </div>
		
	    <div id = "MainHeading">
		<TextBox size = "large" message = "If you like digital, you will like us." />
	    </div>

	    <div id = "Paragraphs">
		<p>Are you just starting your studies or you are in the last year at University? Or you didn't study and you just wanted to try something different?</p>

		<p>Here it doesn't matter!</p>

		<p>We are seeking creative people with interest in information technologies and this whole new digital world. We are Deloitte Digital.</p>

		<p>All you have to do is to send us your your application, be selected and you can start choosing from a number of interesting projects.</p>
	    </div>

	    <div id = "Image">
		<Image size = "small"/>
	    </div>

	</div>
	)

    }


}

export default Who;
