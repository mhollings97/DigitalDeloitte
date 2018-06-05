import React, {Component} from 'react';
import TextBox from '../.././TextBox/TextBox'
import Image from '../.././Image/Image'
import AboutProjHeader from './AboutProjHeader/AboutProjHeader'
import './AboutProj.css'

class AboutProj extends Component {

    constructor(props) {
        super(props);
    }

render() {

    return (
	<div id = "AboutProjWrap">
        <div id = "ProjHeading">
            <TextBox size = "small" message = "We believe in this platform."/>
	</div>

	<div id = "HeaderContainer">
	<AboutProjHeader/>
	</div>
	</div>
    );

}

}

export default AboutProj;
