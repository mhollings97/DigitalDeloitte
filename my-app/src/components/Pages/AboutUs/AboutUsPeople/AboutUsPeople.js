import React, {Component} from 'react';
import TextBox from '../../.././TextBox/TextBox'
import Image from '../../.././Image/Image'
import './AboutUsPeople.css'

class AboutUsPeople extends Component {

    constructor(props) {
        super(props);
    }

render () {

    return (

	<div>
	  <TextBox size = "small" message = "Our People"/>
	  <div id = "PeopleBox">
	    <div id = "POne">
	      <Image size = "small"/>
	      <p>Sydney Becker</p>
	    </div>
	    <div id = "PTwo">
	      <Image size = "small"/>
	      <p>Sydney Becker</p>
	    </div>
	    <div id = "PThree">
	      <Image size = "small"/>
	      <p>Sydney Becker</p>
	    </div>
	  </div>
	</div>

    );

}

}

export default AboutUsPeople;
