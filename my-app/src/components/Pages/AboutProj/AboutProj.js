import React, {Component} from 'react';
import TextBox from '../.././TextBox/TextBox'
import Image from '../.././Image/Image'
import GreyFooter from '../.././GreyFooter/GreyFooter'
import AboutProjHeader from './AboutProjHeader/AboutProjHeader'
import './AboutProj.css'

class AboutProj extends Component {

    constructor(props) {
        super(props);
    }

render() {

    return (
	<div id = "AboutProjWrap">

	<div id = "HeaderContainer">
	  <AboutProjHeader/>
	</div>
	<div id = "FooterContainer">
	  <GreyFooter/>
	</div>
	</div>
    );

}

}

export default AboutProj;
