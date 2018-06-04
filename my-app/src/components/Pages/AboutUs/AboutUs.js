import React, {Component} from 'react';
import TextBox from '../.././TextBox/TextBox'
import Image from '../.././Image/Image'
import AboutUsHeader from './AboutUsHeader/AboutUsHeader'
import './AboutUs.css'

class AboutUs extends Component {

    constructor(props) {
        super(props);
    }

render () {

    return (
	<div id = "HeaderWrap">
	  <AboutUsHeader/>
	</div>

    );

}

}

export default AboutUs;
