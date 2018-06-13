import React, {Component} from 'react';
import TextBox from '../../.././TextBox/TextBox'
import Image from '../../.././Image/Image'
import Link from '../../.././Buttons/Link/Link'
import './AboutUsInfo.css'

class AboutUsInfo extends Component {

    constructor(props) {
        super(props);
    }

render() {

    return (
        <div id = "InfoWrap">
	  <div id = "InfoPhoto">
	    <Image size = "small"/>
	  </div>

	  <div id = "InfoText">
	    <p><b>Deloitte Digital</b> was set up a few years ago as part of the global Deloitte network.</p>

	    <p>Being a part of Deloitte gave us a silver spoon in analysis expertise, and an enormous source base from around the globe any of our clients can benefit from.</p>

	    <p>As a cutting-edge technology firm, we focus on disruptive changes, customer-centric approach, creativity, and guess what- reliability.</p>

	    <TextBox size = "small" message = "We envision, deliver, and run the future."/>

	    <p>We're a new model for a new age- we're an agency and a consultancy.</p>

	    <p>We combine leading digital technologies and creative capabilities with the deep industry knowledge and experience Deloitte is known for.</p>

	    <Link url = "https://www2.deloitte.com/cz/cs.html" text = "More at: deloittedigital.cz"/>
	  </div>
        </div>
    );

}

}

export default AboutUsInfo;
