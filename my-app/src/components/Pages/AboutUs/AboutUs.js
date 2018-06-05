import React, {Component} from 'react';
import TextBox from '../.././TextBox/TextBox'
import Image from '../.././Image/Image'
import AboutUsHeader from './AboutUsHeader/AboutUsHeader'
import AboutUsInfo from './AboutUsInfo/AboutUsInfo'
import AboutUsClients from './AboutUsClients/AboutUsClients'
import AboutUsPeople from './AboutUsPeople/AboutUsPeople'
import GreyFooter from '../.././GreyFooter/GreyFooter'
import './AboutUs.css'

class AboutUs extends Component {

    constructor(props) {
        super(props);
    }

render () {

    return (
	<div>
	<div id = "HeaderWrap">
	  <AboutUsHeader/>
	</div>
	<div id = "InformationWrap">
	  <AboutUsInfo/>
	</div>
	    <div id = "bottomPart">
		<div id = "ClientsWrap">
		  <AboutUsClients/>
		</div>
		<div id = "PeopleWrap">
		  <AboutUsPeople/>
		</div>
	    </div>

	<div id = "FooterWrap">
	  <GreyFooter/>
	</div>
	</div>
    );

}

}

export default AboutUs;
