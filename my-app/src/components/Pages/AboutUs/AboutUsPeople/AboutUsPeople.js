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
		<div id = "ourPeople">
		  <TextBox size = "small" message = "Our People"/>
		</div>
	  <div id = "PeopleBox">
	    <div id = "POne">
		<div id = "p1">
	      <Image size = "small"/>
		</div>
	      <p>Sydney Becker</p>
	    </div>
	    <div id = "PTwo">
		<div id = "p2">
	      <Image size = "small"/>
		</div>
	      <p>Mike Hollingsworth</p>
	    </div>
	    <div id = "PThree">
		<div id = "p3">
	      <Image size = "small"/>
		</div>
	      <p>Sydney Becker</p>
	    </div>
	  </div>
	</div>

    );

}

}

export default AboutUsPeople;
