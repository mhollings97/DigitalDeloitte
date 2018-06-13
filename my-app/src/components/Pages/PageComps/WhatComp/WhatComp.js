import React, { Component } from 'react';
import Image from '../../.././Image/Image'
import TextBox from '../../.././TextBox/TextBox'
import './WhatComp.css'

class WhatComp extends Component {

    constructor (props) {
	super(props);
    }

    render () {

	return (

	    <div id = "WhatProj">
		<div id = "WhatWrap">
	
		<div id = "WhatOne">
		    <div id = "oneimg">
			  <Image size = "small"/>
		    </div>
		    <div id = "onetext">
			  <p>Once you're inside you will be able to choose from variety of projects with their own category and description.</p>
		    </div>
		</div>

		<div id = "WhatTwo">
		    <div id = "twoimg">
			  <Image size = "small"/>
		    </div>
		    <div id = "twotext">
			  <p>After you choose the project and apply, you will get access to all materials you need to start working.</p>
		    </div>
		</div>

		<div id = "WhatThree">
		    <div id = "threeimg">
			  <Image size = "small"/>
		    </div>
		    <div id = "threetext">
			  <p>If you do have questions you can always ask the project lead or our ambassador.</p>
			  <p>After you will finish the project you upload the result.</p>
		    </div>
		</div>
			
		<div id = "WhatFour">
		    <div id = "fourimg">
			  <Image size = "small"/>
		    </div>
		    <div id = "fourtext">
			  <p>You will get our feedback, evaluation and promised reward.</p>
			  <p>And if you are good and finish a few projects, you can get even a job offer.</p>
		    </div>
		</div>

		</div>
	    </div>
        );
    }

}

export default WhatComp;
