import React, {Component} from 'react';
import TextBox from '../../.././TextBox/TextBox'
import Image from '../../.././Image/Image'
import './AboutProjHeader.css'

class AboutProjHeader extends Component {

    constructor(props) {
        super(props);
    }

render() {

    return (
        <div id = "HeaderWrap">
        <div id = "Info">
	    <TextBox size = "small" message = "We believe in this platform."/>
            <p>This is actually a Beta version and our first release of a project called Virtual Deloitte. Another version will be launched after testing and careful evaluation of its first release.</p>
            <p>We aim to provide valuable feedback and growth for our best candidates inside the application.</p>
            <p>We even believe that we will be successful in finding our future colleagues or business partners here.</p>
        </div>
        <div id = "ProjPhoto">
            <Image size = "small"/>
        </div>
        </div>
    );

}

}

export default AboutProjHeader;
