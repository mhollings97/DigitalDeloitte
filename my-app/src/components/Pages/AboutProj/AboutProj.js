import React, {Component} from 'react';
import TextBox from '../.././TextBox/TextBox'
import Image from '../.././Image/Image'
import GreyFooter from '../.././GreyFooter/GreyFooter'
import AboutProjHeader from './AboutProjHeader/AboutProjHeader'
import AboutProjStats from './AboutProjStats/AboutProjStats'
import AboutProjHistory from './AboutProjHistory/AboutProjHistory'
import AboutProjTestimonial from './AboutProjTestimonial/AboutProjTestimonial'
import './AboutProj.css'

class AboutProj extends Component {

    constructor(props) {
        super(props);
    }

render() {

    return (
	<div id = "AllWrap">
	  <div id = "AboutProjWrap">

	    <div id = "HeaderContainer">
	      <AboutProjHeader/>
	    </div>
	
	    <div id = "StatsContainer">
	      <AboutProjStats/>
	    </div>

	    <div id = "HistoryContainer">
	      <AboutProjHistory/>
	    </div>

	    <div id = "TestimonialContainer">
	      <AboutProjTestimonial/>
	    </div>
	  </div>

	  <div id = "FooterContainer">
	    <GreyFooter/>
	  </div>

	</div>

    );

}

}

export default AboutProj;
