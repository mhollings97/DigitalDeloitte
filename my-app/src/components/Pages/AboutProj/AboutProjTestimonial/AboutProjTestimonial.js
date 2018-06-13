import React, {Component} from 'react';
import Image from '../../.././Image/Image'
import './AboutProjTestimonial.css'

class AboutProjTestimonial extends Component {

    constructor(props) {
	super(props);
    }

    render () {

	return (

	  <div id = "TestimonialWrapper">
	    <div id = "TestimonialImage">
		<Image size = "small"/>
	    </div>
	    <div id = "TestimonialQuote">
		<p>"Testimonial o projektu, jak je skvělý atd.</p>
		<p>Lorem ipsum dolor sit amet"</p>
		<p>-Our Team Lead</p>
	    </div>
	  </div>

	);

    }

}

export default AboutProjTestimonial;
